'use client';

export function Slider({
  label, unit, value, min, max, step, digits = 2, onChange,
}: {
  label: string; unit?: string; value: number;
  min: number; max: number; step: number; digits?: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="field">
      <span className="lab">
        {label}
        <span className="v">{value.toFixed(digits)}{unit ? ` ${unit}` : ''}</span>
      </span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(+e.target.value)}
      />
    </label>
  );
}

export function NumField({
  label, unit, value, step = 0.1, onChange,
}: {
  label: string; unit?: string; value: number; step?: number;
  onChange: (v: number) => void;
}) {
  return (
    <label className="numfield">
      <span>{label}{unit ? ` (${unit})` : ''}</span>
      <input
        type="number" value={value} step={step}
        onChange={e => onChange(e.target.value === '' ? 0 : +e.target.value)}
      />
    </label>
  );
}
