// Hook-above-CoG single-constraint solver + load derivation.
//
// Shimon's constraint: the hook must sit vertically above the CoG so the vessel
// hangs at ZERO TRIM (bow 0°). The lift eyes are welded at fixed hull frames; the
// CoG moves with the load, so the strap-to-CoG distances change with every
// loading condition. The operator fixes ONE parameter (hook height H, or the aft
// sling length LA) and the solver computes the rest.

import type { Inputs, Geometry, Loads } from './types';

export function solveGeometry(i: Inputs, lcg: number, vcg: number): Geometry {
  // strap → CoG longitudinal distances (eyes fixed, CoG from loading)
  const aAft = lcg - i.xAft;   // aft eye is aft of CoG  → positive
  const fFwd = i.xFwd - lcg;   // fwd eye is fwd of CoG  → positive
  const LBE = aAft + fFwd;
  const cogBetween = aAft > 0.05 && fFwd > 0.05;

  // moment balance about CoG: R_aft·aAft = R_fwd·fFwd ; R_aft + R_fwd = W
  const aftFrac = cogBetween ? fFwd / LBE : 0.5;

  // eye heights relative to the aft eye: aft = 0, fwd = dHeyes (fwd higher)
  const zAft = 0;
  const zFwd = i.dHeyes;
  const runA = Math.hypot(aAft, i.b);  // horizontal run to aft eye (long + transverse)
  const runF = Math.hypot(fFwd, i.b);

  let zApex: number;
  let LA: number;
  let LF: number;
  let reach = cogBetween;

  if (i.mode === 'H') {
    // fix hook height above the aft eye → both sling lengths follow
    zApex = i.H + zAft;
    LA = Math.sqrt(runA * runA + (zApex - zAft) ** 2);
    LF = Math.sqrt(runF * runF + (zApex - zFwd) ** 2);
  } else {
    // fix aft sling length → solve apex height, then fwd sling length
    const vA2 = i.LA * i.LA - runA * runA;
    reach = reach && vA2 > 0;
    zApex = reach ? zAft + Math.sqrt(vA2) : 0;
    LA = i.LA;
    LF = Math.sqrt(runF * runF + (zApex - zFwd) ** 2);
  }

  const HA = zApex - zAft;
  const HF = zApex - zFwd;
  reach = reach && HA > 0 && HF > 0;

  const angA = reach ? Math.atan2(HA, runA) : 0;
  const angF = reach ? Math.atan2(HF, runF) : 0;

  // pendulum stability: hook above keel = zEye + zApex; CoG above keel = vcg
  const clearance = i.zEye + zApex - vcg;

  return {
    aAft, fFwd, aftFrac, LBE,
    LA, LF, HA, HF, zApex,
    angA, angF,
    degA: angA * 180 / Math.PI,
    degF: angF * 180 / Math.PI,
    clearance,
    cogBetween, reach,
    geomBad: !reach,
  };
}

export function computeLoads(i: Inputs, g: Geometry, W: number): Loads {
  const sA = Math.sin(g.angA) || 1;
  const sF = Math.sin(g.angF) || 1;
  const aftStat = (W * g.aftFrac / 2) / sA;
  const fwdStat = (W * (1 - g.aftFrac) / 2) / sF;
  const aftDes = aftStat * i.daf * i.skl;
  const fwdDes = fwdStat * i.daf * i.skl;
  return {
    aftStat, fwdStat,
    aftDes, fwdDes,
    legMax: Math.max(aftDes, fwdDes),
    hook: W * i.daf,
  };
}
