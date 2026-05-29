'use client';

import type { PresetKey } from '@/lib/useLiftingDesigner';

type PresetMeta = { key: PresetKey; label: string; sub: string };

const PRESETS: PresetMeta[] = [
  { key: 'port',    label: 'נמל · גובה גל 0', sub: 'טעון · DAF 1.15' },
  { key: 'open',    label: 'ים פתוח',         sub: 'טעון · DAF 1.30' },
  { key: 'inshore', label: 'מוגן · ריק',      sub: 'דלק 0% · DAF 1.15' },
  { key: 'static',  label: 'יבשתי סטטי',      sub: 'טעון · DAF 1.00' },
];

export function Presets({ onPick }: { onPick: (k: PresetKey) => void }) {
  return (
    <div className="presets">
      {PRESETS.map(p => (
        <button key={p.key} className="preset" onClick={() => onPick(p.key)}>
          {p.label}
          <small>{p.sub}</small>
        </button>
      ))}
    </div>
  );
}
