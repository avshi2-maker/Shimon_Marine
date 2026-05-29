// Shared types for the lifting designer.

export type Maker = 'SpanSet' | 'Crosby' | 'Gunnebo';

export type Component = {
  w: number;     // WLL (t)
  mbl: number;   // MBL (t)
  df: number;    // design factor (5 or 7)
  p: number;     // indicative price (ILS)
  lab: string;   // display label
  maker: Maker;
  c?: string;    // catalogue code
};

export type Selection = {
  it: Component;
  next: Component | null;
  util: number;
  load: number;
};

export type LiftCondition = 'open' | 'port' | 'inshore' | 'static';
export type CompKey = 'strapA' | 'strapF' | 'ml' | 'conn' | 'shk';
export type SolveMode = 'H' | 'LA';

export type Inputs = {
  // --- loading: lightship (empty boat) ---
  lightW: number;  lightLCG: number;  lightVCG: number;
  // --- loading: fuel (slack tank → free surface) ---
  fuelCap: number; fuelFill: number; fuelX: number; fuelZ: number; fuelL: number; fuelB: number;
  // --- loading: payload / cargo ---
  payW: number;    payX: number;     payZ: number;
  // --- lift points (welded eyes, fixed on hull) ---
  xAft: number;    xFwd: number;     dHeyes: number;  zEye: number;  b: number;
  // --- geometry solver (single constraint) ---
  mode: SolveMode;  H: number;        LA: number;
  // --- lift condition ---
  cond: LiftCondition; daf: number;   skl: number;     prio: number;
};

export type Loading = {
  W: number;       // total lift weight (t)
  LCG: number;     // longitudinal CoG from datum (m)
  VCG: number;     // effective vertical CoG incl. free surface (m)
  vcgSolid: number;// solid VCG before free surface (m)
  fseRise: number; // free-surface virtual rise of VCG (m)
  slack: boolean;  // is a tank partly filled?
  fuelW: number;   // current fuel weight (t)
};

export type Geometry = {
  aAft: number;    // aft strap → CoG, longitudinal (m)
  fFwd: number;    // fwd strap → CoG, longitudinal (m)
  aftFrac: number; // aft reaction fraction
  LBE: number;     // longitudinal base between eyes (m)
  LA: number;      // aft sling length (m)
  LF: number;      // fwd sling length (m)
  HA: number;      // apex above aft eye (m)
  HF: number;      // apex above fwd eye (m)
  zApex: number;   // apex height above aft-eye datum (m)
  angA: number;    // aft bottom angle (rad)
  angF: number;
  degA: number;
  degF: number;
  clearance: number; // hook → CoG vertical clearance (pendulum margin, m)
  cogBetween: boolean; // CoG between the lift points?
  reach: boolean;      // constraint geometrically valid?
  geomBad: boolean;    // any blocking geometry problem
};

export type Loads = {
  aftStat: number; fwdStat: number;
  aftDes: number;  fwdDes: number;
  legMax: number;  hook: number;
};

export type Selections = Record<CompKey, Selection>;

export type DesignResult = {
  inputs: Inputs;
  loading: Loading;
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
