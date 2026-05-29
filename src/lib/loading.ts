// Loading condition: combine lightship + fuel + payload into total weight & CoG.
// Models the FREE SURFACE EFFECT of a slack (partly-filled) fuel tank, which
// raises the effective VCG and introduces CoG uncertainty during the lift.

import type { Inputs, Loading } from './types';

const RHO_DIESEL = 0.85; // t/m^3

export function computeLoading(i: Inputs): Loading {
  const fuelW = i.fuelCap * (i.fuelFill / 100);

  const items = [
    { w: i.lightW, x: i.lightLCG, z: i.lightVCG },
    { w: fuelW,    x: i.fuelX,    z: i.fuelZ },
    { w: i.payW,   x: i.payX,     z: i.payZ },
  ];

  const W = items.reduce((s, it) => s + it.w, 0) || 1;
  const LCG = items.reduce((s, it) => s + it.w * it.x, 0) / W;
  const vcgSolid = items.reduce((s, it) => s + it.w * it.z, 0) / W;

  // free surface: only a slack tank (0 < fill < 100) has a moving liquid surface.
  const slack = i.fuelFill > 0 && i.fuelFill < 100 && fuelW > 0;
  // transverse second moment of the free surface for a rectangular tank: L·B³/12
  const iTank = (i.fuelL * Math.pow(i.fuelB, 3)) / 12;
  const fseRise = slack ? (RHO_DIESEL * iTank) / W : 0;

  return {
    W,
    LCG,
    VCG: vcgSolid + fseRise,
    vcgSolid,
    fseRise,
    slack,
    fuelW,
  };
}
