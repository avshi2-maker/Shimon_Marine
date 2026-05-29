'use client';

import type { Inputs, LiftCondition } from '@/lib/types';

type Props = {
  inputs: Inputs;
  onChange: <K extends keyof Inputs>(k: K, v: Inputs[K]) => void;
  onCondition: (c: LiftCondition) => void;
};

type SliderDef = {
  k: keyof Inputs;
  label: string;
  unit: string;
  min: number; max: number; step: number;
  digits: number;
};

const NUMERIC: SliderDef[] = [
  { k: 'W',    label: 'משקל כלי השיט · W',           unit: 't', min: 2,   max: 60, step: 0.1,   digits: 1 },
  { k: 'caft', label: 'רצועה אחורית · מרחק ממרכז־כובד', unit: 'm', min: 1.5, max: 6,  step: 0.001, digits: 3 },
  { k: 'cfwd', label: 'רצועה קדמית · מרחק ממרכז־כובד',  unit: 'm', min: 1.5, max: 6,  step: 0.001, digits: 3 },
  { k: 'la',   label: 'אורך רצועה אחורית · LA',        unit: 'm', min: 4,   max: 14, step: 0.001, digits: 3 },
  { k: 'lf',   label: 'אורך רצועה קדמית · LF',         unit: 'm', min: 4,   max: 14, step: 0.001, digits: 3 },
  { k: 'b',    label: 'מחצית מפתח רוחבי · ½ spread',  unit: 'm', min: 0,   max: 4,  step: 0.001, digits: 3 },
];

const CONDS: Array<{ k: LiftCondition; label: string; daf: number }> = [
  { k: 'open',    label: 'ים פתוח',   daf: 1.30 },
  { k: 'port',    label: 'נמל · גל 0', daf: 1.15 },
  { k: 'inshore', label: 'מוגן צף',   daf: 1.15 },
  { k: 'static',  label: 'יבשתי סטטי', daf: 1.00 },
];

const SKLS: Array<{ v: number; label: string }> = [
  { v: 1.25, label: '4 רגליים (לא־סטטי)' },
  { v: 1.00, label: 'סטטית מוגדרת' },
];

function prioLabel(p: number): string {
  return p < 33 ? 'חיסכון' : p > 66 ? 'מרווח' : 'איזון';
}

export function InputPanel({ inputs, onChange, onCondition }: Props) {
  return (
    <section className="card">
      <h2>קלט <span className="en">INPUT</span></h2>
      <div className="body">
        {NUMERIC.map(s => (
          <label key={s.k} className="field">
            <span className="lab">
              {s.label}
              <span className="v">{(inputs[s.k] as number).toFixed(s.digits)} {s.unit}</span>
            </span>
            <input
              type="range"
              min={s.min} max={s.max} step={s.step}
              value={inputs[s.k] as number}
              onChange={e => onChange(s.k, +e.target.value as Inputs[typeof s.k])}
            />
          </label>
        ))}

        <div className="lab" style={{ fontSize: 13, fontWeight: 600, margin: '4px 0 6px' }}>
          תנאי הרמה · מקדם דינמי DAF
        </div>
        <div className="seg">
          {CONDS.map(c => (
            <button
              key={c.k}
              className={inputs.cond === c.k ? 'on' : ''}
              onClick={() => onCondition(c.k)}
            >
              {c.label}<span className="d">DAF {c.daf.toFixed(2)}</span>
            </button>
          ))}
        </div>

        <label className="field" style={{ marginTop: 16 }}>
          <span className="lab">
            מקדם הטיה · SKL <span className="v">{inputs.skl.toFixed(2)}</span>
          </span>
          <div className="seg">
            {SKLS.map(s => (
              <button
                key={s.v}
                className={inputs.skl === s.v ? 'on' : ''}
                onClick={() => onChange('skl', s.v)}
              >
                {s.label}<span className="d">SKL {s.v.toFixed(2)}</span>
              </button>
            ))}
          </div>
        </label>

        <label className="field" style={{ marginTop: 6 }}>
          <span className="lab">
            עדיפות · עלות ↔ מקדם ביטחון <span className="v">{prioLabel(inputs.prio)}</span>
          </span>
          <input
            type="range" min={0} max={100} step={1}
            value={inputs.prio}
            onChange={e => onChange('prio', +e.target.value)}
          />
          <div className="prio"><span>חיסכון בעלות</span><span>מקסימום מרווח</span></div>
        </label>
      </div>
    </section>
  );
}
