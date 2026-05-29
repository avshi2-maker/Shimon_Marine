'use client';

import type { Inputs, SolveMode } from '@/lib/types';
import { Slider, NumField } from './controls';

type Props = {
  inputs: Inputs;
  onChange: <K extends keyof Inputs>(k: K, v: Inputs[K]) => void;
};

export function LiftSolverPanel({ inputs, onChange }: Props) {
  const mode = inputs.mode;
  return (
    <section className="card">
      <h2>נקודות הרמה ופותר <span className="en">LIFT POINTS · SOLVER</span></h2>
      <div className="body">
        <div className="sub">עיני הרמה מרותכות (קבוע על הגוף)</div>
        <div className="numgrid">
          <NumField label="אחורית xAft" unit="m" value={inputs.xAft} onChange={v => onChange('xAft', v)} />
          <NumField label="קדמית xFwd" unit="m" value={inputs.xFwd} onChange={v => onChange('xFwd', v)} />
          <NumField label="ΔH עיניים" unit="m" value={inputs.dHeyes} onChange={v => onChange('dHeyes', v)} />
          <NumField label="גובה עין zEye" unit="m" value={inputs.zEye} onChange={v => onChange('zEye', v)} />
          <NumField label="½ מפתח רוחבי b" unit="m" value={inputs.b} onChange={v => onChange('b', v)} />
        </div>

        <div className="sub">אילוץ יחיד · הקובע את הגיאומטריה</div>
        <div className="seg">
          <button className={mode === 'H' ? 'on' : ''} onClick={() => onChange('mode', 'H' as SolveMode)}>
            גובה וו<span className="d">FIX H</span>
          </button>
          <button className={mode === 'LA' ? 'on' : ''} onClick={() => onChange('mode', 'LA' as SolveMode)}>
            אורך רצועה אחורית<span className="d">FIX LA</span>
          </button>
        </div>

        {mode === 'H' ? (
          <Slider
            label="גובה וו · H"
            unit="m" value={inputs.H}
            min={3} max={12} step={0.01} digits={2}
            onChange={v => onChange('H', v)}
          />
        ) : (
          <Slider
            label="אורך רצועה אחורית · LA"
            unit="m" value={inputs.LA}
            min={4} max={14} step={0.001} digits={3}
            onChange={v => onChange('LA', v)}
          />
        )}

        <div className="hint">
          הוו ממוקם אנכית מעל מרכז הכובד → הרמה בטרים 0°. שינוי האילוץ היחיד מחשב את כל היתר.
        </div>
      </div>
    </section>
  );
}
