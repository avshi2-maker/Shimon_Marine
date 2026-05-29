// Shared types for the lifting designer.

export type Maker = 'SpanSet' | 'Crosby' | 'Gunnebo';

export type Component = {
  w: number;     // WLL (t)
  mbl: number;   // MBL (t)
  df: number;    // design factor (5 or 7)
  p: number;     // indicative price (ILS)
  lab: string;   // display label
  maker: Maker;
  c?: string;    // catalogue code (e.g. '1"', 'A-345')
};

export type Selection = {
  it: Component;
  next: Component | null;
  util: number;
  load: number;
};

export type LiftCondition = 'open' | 'port' | 'inshore' | 'static';

export type CompKey = 'strapA' | 'strapF' | 'ml' | 'conn' | 'shk';

export type Inputs = {
  W: number;
  caft: number;   // aft strap from CoG (m)
  cfwd: number;   // fwd strap from CoG (m)
  la: number;     // aft sling length (m)
  lf: number;     // fwd sling length (m)
  b: number;      // transverse ½ spread (m)
  cond: LiftCondition;
  daf: number;
  skl: number;
  prio: number;   // 0 cost ↔ 100 margin
};

export type Geometry = {
  LBE: number;
  aftFrac: number;
  angA: number;   // radians
  angF: number;
  degA: number;
  degF: number;
  HA: number;     // m
  HF: number;
  dH: number;
  geomBad: boolean;
};

export type Loads = {
  aftStat: number;
  fwdStat: number;
  aftDes: number;
  fwdDes: number;
  legMax: number;
  hook: number;
};

export type Selections = Record<CompKey, Selection>;

export type DesignResult = {
  inputs: Inputs;
  geom: Geometry;
  loads: Loads;
  sel: Selections;
  total: number;
  safe: number;
  maxU: number;
  state: 'ok' | 'marg' | 'over';
};

export const QTY: Record<CompKey, number> = {
  strapA: 2, strapF: 2, ml: 1, conn: 4, shk: 4,
};
