'use client';

import { useState, useMemo, useCallback } from 'react';
import type { Inputs, LiftCondition, DesignResult, Selections } from './types';
import { QTY } from './types';
import { ROUND, SHACK, CONN, MLINK } from './catalogs';
import { pick, stateOf, targetFromPrio } from './selection';
import { computeGeometry, computeLoads } from './geometry';

const DAF_BY_COND: Record<LiftCondition, number> = {
  open: 1.30,
  port: 1.15,
  inshore: 1.15,
  static: 1.00,
};

const DEFAULTS: Inputs = {
  W: 22,
  caft: 3.557, cfwd: 3.738,
  la: 8.831, lf: 8.192,
  b: 1.55,
  cond: 'port',
  daf: 1.15,
  skl: 1.25,
  prio: 50,
};

export type PresetKey = 'port' | 'open' | 'inshore' | 'static';

export const PRESETS: Record<PresetKey, Inputs> = {
  port:    { ...DEFAULTS, cond: 'port',    daf: 1.15, W: 22 },
  open:    { ...DEFAULTS, cond: 'open',    daf: 1.30, W: 22 },
  inshore: { ...DEFAULTS, cond: 'inshore', daf: 1.15, W: 16.4 },
  static:  { ...DEFAULTS, cond: 'static',  daf: 1.00, W: 22, prio: 35 },
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

  const applyPreset = useCallback(
    (key: PresetKey) => setInputs(PRESETS[key]),
    []
  );

  const upgradeSelection = useCallback(() => {
    // nudges priority toward "margin" — used by the upgrade chip
    setInputs(prev => ({ ...prev, prio: Math.min(100, prev.prio + 22) }));
  }, []);

  const result = useMemo<DesignResult>(() => {
    const geom = computeGeometry(inputs);
    const loads = computeLoads(inputs, geom);
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
                : k === 'conn' ? CONN
                : SHACK;
      const sg = pick(cat, s.load, 0.70);
      safe += sg.it.p * q;
    });

    const state = geom.geomBad ? 'over' : stateOf(maxU);
    return { inputs, geom, loads, sel, total, safe, maxU, state };
  }, [inputs]);

  return { inputs, update, setCondition, applyPreset, upgradeSelection, result };
}
