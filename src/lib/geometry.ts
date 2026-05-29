// Derive sling angles, hook height H per leg, ΔH, and load split
// from Ginton-style inputs (strap-to-CoG distances + sling lengths + transverse spread).

import type { Inputs, Geometry, Loads } from './types';

export function computeGeometry(i: Inputs): Geometry {
  const { caft, cfwd, la, lf, b } = i;
  const LBE = caft + cfwd;
  // moment balance about CoG: R_aft × caft = R_fwd × cfwd ; R_aft + R_fwd = W
  // => aftFrac = cfwd / (caft + cfwd)
  const aftFrac = cfwd / LBE;

  const runA = Math.hypot(caft, b);
  const runF = Math.hypot(cfwd, b);
  const okA = la > runA + 0.005;
  const okF = lf > runF + 0.005;
  const geomBad = !okA || !okF;

  const angA = okA ? Math.acos(runA / la) : 0;
  const angF = okF ? Math.acos(runF / lf) : 0;
  const HA = okA ? Math.sqrt(la * la - runA * runA) : 0;
  const HF = okF ? Math.sqrt(lf * lf - runF * runF) : 0;

  return {
    LBE,
    aftFrac,
    angA, angF,
    degA: angA * 180 / Math.PI,
    degF: angF * 180 / Math.PI,
    HA, HF,
    dH: Math.abs(HA - HF),
    geomBad,
  };
}

export function computeLoads(i: Inputs, g: Geometry): Loads {
  const sA = Math.sin(g.angA) || 1;
  const sF = Math.sin(g.angF) || 1;
  const aftStat = (i.W * g.aftFrac / 2) / sA;
  const fwdStat = (i.W * (1 - g.aftFrac) / 2) / sF;
  const aftDes = aftStat * i.daf * i.skl;
  const fwdDes = fwdStat * i.daf * i.skl;
  return {
    aftStat, fwdStat,
    aftDes, fwdDes,
    legMax: Math.max(aftDes, fwdDes),
    hook: i.W * i.daf,
  };
}
