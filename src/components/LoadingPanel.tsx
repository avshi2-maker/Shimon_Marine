'use client';

import type { Inputs, Loading } from '@/lib/types';
import { Slider, NumField } from './controls';

type Props = {
  inputs: Inputs;
  loading: Loading;
  onChange: <K extends keyof Inputs>(k: K, v: Inputs[K]) => void;
};

export function LoadingPanel({ inputs, loading, onChange }: Props) {
  return (
    <section className="card">
      <h2>עומס ושיווי משקל <span className="en">LOADING</span></h2>
      <div className="body">
        <div className="sub">כלי ריק · LIGHTSHIP</div>
        <div className="numgrid">
          <NumField label="משקל" unit="t" value={inputs.lightW} onChange={v => onChange('lightW', v)} />
          <NumField label="LCG" unit="m" value={inputs.lightLCG} onChange={v => onChange('lightLCG', v)} />
          <NumField label="VCG" unit="m" value={inputs.lightVCG} onChange={v => onChange('lightVCG', v)} />
        </div>

        <div className="sub">דלק · FUEL (נוזל חופשי)</div>
        <Slider
          label="מילוי מיכל · fill"
          unit="%"
          value={inputs.fuelFill}
          min={0} max={100} step={1} digits={0}
          onChange={v => onChange('fuelFill', v)}
        />
        <div className="numgrid">
          <NumField label="קיבולת מלאה" unit="t" value={inputs.fuelCap} onChange={v => onChange('fuelCap', v)} />
          <NumField label="מיקום LCG" unit="m" value={inputs.fuelX} onChange={v => onChange('fuelX', v)} />
          <NumField label="גובה VCG" unit="m" value={inputs.fuelZ} onChange={v => onChange('fuelZ', v)} />
          <NumField label="אורך מיכל" unit="m" value={inputs.fuelL} onChange={v => onChange('fuelL', v)} />
          <NumField label="רוחב מיכל" unit="m" value={inputs.fuelB} onChange={v => onChange('fuelB', v)} />
        </div>

        <div className="sub">מטען · PAYLOAD</div>
        <div className="numgrid">
          <NumField label="משקל" unit="t" value={inputs.payW} onChange={v => onChange('payW', v)} />
          <NumField label="LCG" unit="m" value={inputs.payX} onChange={v => onChange('payX', v)} />
          <NumField label="VCG" unit="m" value={inputs.payZ} onChange={v => onChange('payZ', v)} />
        </div>

        <div className="loadtot">
          משקל הרמה <b>{loading.W.toFixed(2)} t</b>
          {' · '}LCG <b>{loading.LCG.toFixed(3)} m</b>
          {' · '}VCG <b>{loading.VCG.toFixed(3)} m</b>
        </div>
      </div>
    </section>
  );
}
