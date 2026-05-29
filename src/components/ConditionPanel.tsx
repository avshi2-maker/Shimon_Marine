'use client';

import type { Inputs, LiftCondition } from '@/lib/types';

type Props = {
  inputs: Inputs;
  onChange: <K extends keyof Inputs>(k: K, v: Inputs[K]) => void;
  onCondition: (c: LiftCondition) => void;
};

const CONDS: Array<{ k: LiftCondition; label: string; daf: number }> = [
  { k: 'open',    label: 'ים פתוח',    daf: 1.30 },
  { k: 'port',    label: 'נמל · גל 0',  daf: 1.15 },
  { k: 'inshore', label: 'מוגן צף',     daf: 1.15 },
  { k: 'static',  label: 'יבשתי סטטי',  daf: 1.00 },
];

const SKLS: Array<{ v: number; label: string }> = [
  { v: 1.25, label: '4 רגליים (לא־סטטי)' },
  { v: 1.00, label: 'סטטית מוגדרת' },
];

const prioLabel = (p: number) => (p < 33 ? 'חיסכון' : p > 66 ? 'מרווח' : 'איזון');

export function ConditionPanel({ inputs, onChange, onCondition }: Props) {
  return (
    <section className="card">
      <h2>תנאי הרמה <span className="en">CONDITION</span></h2>
      <div className="body">
        <div className="sub">תנאי הרמה · מקדם דינמי DAF</div>
        <div className="seg">
          {CONDS.map(c => (
            <button key={c.k} className={inputs.cond === c.k ? 'on' : ''} onClick={() => onCondition(c.k)}>
              {c.label}<span className="d">DAF {c.daf.toFixed(2)}</span>
            </button>
          ))}
        </div>

        <div className="sub" style={{ marginTop: 14 }}>מקדם הטיה · SKL</div>
        <div className="seg">
          {SKLS.map(s => (
            <button key={s.v} className={inputs.skl === s.v ? 'on' : ''} onClick={() => onChange('skl', s.v)}>
              {s.label}<span className="d">SKL {s.v.toFixed(2)}</span>
            </button>
          ))}
        </div>

        <label className="field" style={{ marginTop: 16 }}>
          <span className="lab">
            עדיפות · עלות ↔ מקדם ביטחון <span className="v">{prioLabel(inputs.prio)}</span>
          </span>
          <input
            type="range" min={0} max={100} step={1} value={inputs.prio}
            onChange={e => onChange('prio', +e.target.value)}
          />
          <div className="prio"><span>חיסכון בעלות</span><span>מקסימום מרווח</span></div>
        </label>
      </div>
    </section>
  );
}
