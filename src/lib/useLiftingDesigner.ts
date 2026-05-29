'use client';

import { useState, useMemo, useCallback } from 'react';
import type { Inputs, LiftCondition, DesignResult, Selections } from './types';
import { QTY } from './types';
import { ROUND, SHACK, CONN, MLINK } from './catalogs';
import { pick, stateOf, targetFromPrio } from './selection';
import { computeLoading } from './loading';
import { solveGeometry, computeLoads } from './geometry';

const DAF_BY_COND: Record<LiftCondition, number> = {
  open: 1.30, port: 1.15, inshore: 1.15, static: 1.00,
};

// defaults tuned so the loaded condition ≈ Ginton 602M (W 22 t, LCG ≈ 5.10)
const DEFAULTS: Inputs = {
  lightW: 14, lightLCG: 5.0, lightVCG: 1.45,
  fuelCap: 6, fuelFill: 80, fuelX: 5.0, fuelZ: 0.5, fuelL: 2.0, fuelB: 1.8,
  payW: 3.2, payX: 5.7, payZ: 1.3,
  xAft: 1.55, xFwd: 8.845, dHeyes: 0.81, zEye: 1.8, b: 1.55,
  mode: 'LA', H: 7.93, LA: 8.831,
  cond: 'port', daf: 1.15, skl: 1.25, prio: 50,
};

export type PresetKey = 'port' | 'open' | 'inshore' | 'static';

export const PRESETS: Record<PresetKey, Inputs> = {
  port:    { ...DEFAULTS },
  open:    { ...DEFAULTS, cond: 'open',    daf: 1.30 },
  inshore: { ...DEFAULTS, cond: 'inshore', daf: 1.15, fuelFill: 0, payW: 0 },
  static:  { ...DEFAULTS, cond: 'static',  daf: 1.00, prio: 35 },
};

export function useLiftingDesigner() {
  const [inputs, setInputs] = useState<Inputs>(DEFAULTS);

  const update = useCallback(
    <K extends keyof Inputs>(k: K, v: Inputs[K]) =>
      setInputs(prev => ({ ...prev, [k]: v })),
    []
  );

  const setCondition = useCallback(
    (cond: LiftCondition) =>
      setInputs(prev => ({ ...prev, cond, daf: DAF_BY_COND[cond] })),
    []
  );

  const applyPreset = useCallback((key: PresetKey) => setInputs(PRESETS[key]), []);

  const upgradeSelection = useCallback(() => {
    setInputs(prev => ({ ...prev, prio: Math.min(100, prev.prio + 22) }));
  }, []);

  const result = useMemo<DesignResult>(() => {
    const loading = computeLoading(inputs);
    const geom = solveGeometry(inputs, loading.LCG, loading.VCG);
    const loads = computeLoads(inputs, geom, loading.W);
    const tgt = targetFromPrio(inputs.prio);

    const sel: Selections = {
      strapA: pick(ROUND, loads.aftDes, tgt),
      strapF: pick(ROUND, loads.fwdDes, tgt),
      conn:   pick(CONN,  loads.legMax, tgt),
      shk:    pick(SHACK, loads.legMax, tgt),
      ml:     pick(MLINK, loads.hook,   tgt),
    };

    let total = 0, safe = 0, maxU = 0;
    (Object.keys(sel) as Array<keyof Selections>).forEach(k => {
      const s = sel[k]; const q = QTY[k];
      total += s.it.p * q;
      maxU = Math.max(maxU, s.util);
      const cat = k === 'strapA' || k === 'strapF' ? ROUND
                : k === 'ml' ? MLINK
                : k === 'conn' ? CONN : SHACK;
      safe += pick(cat, s.load, 0.70).it.p * q;
    });

    const state = geom.geomBad ? 'over' : stateOf(maxU);
    return { inputs, loading, geom, loads, sel, total, safe, maxU, state };
  }, [inputs]);

  return { inputs, update, setCondition, applyPreset, upgradeSelection, result };
}
