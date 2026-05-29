'use client';

import type { DesignResult, CompKey } from '@/lib/types';
import { QTY } from '@/lib/types';
import { ComponentCard } from './ComponentCard';

type Props = {
  result: DesignResult;
  onUpgrade: () => void;
};

const TITLES: Record<CompKey, string> = {
  strapA: 'רצועה אחורית · AFT ×2',
  strapF: 'רצועה קדמית · FWD ×2',
  ml:     'טבעת מסטר · MASTER LINK ×1',
  conn:   'מחבר HP · S-237 ×4',
  shk:    'שאקל · G-209A ×4',
};

const ORDER: CompKey[] = ['strapA', 'strapF', 'ml', 'conn', 'shk'];

function statusText(state: 'ok' | 'marg' | 'over', geomBad: boolean): string {
  if (geomBad) return '⚠ גיאומטריה לא תקפה — רצועה קצרה מהמרחק לנקודה';
  if (state === 'over') return '⚠ עומס יתר — נדרשת מידה גדולה יותר';
  if (state === 'marg') return '◐ תקין · רכיבים בגבול הניצול';
  return '✓ תקין · מרווח טוב בכל הרכיבים';
}

export function ResultsPanel({ result, onUpgrade }: Props) {
  const { geom, loads, maxU, total, state, sel } = result;

  return (
    <section className="card">
      <h2>פלט · בחירת ערכה <span className="en">SELECTED SET</span></h2>
      <div className="body">
        <div className={`statusline s-${state}`}>{statusText(state, geom.geomBad)}</div>

        <div className="metrics">
          <Metric k="עומס וו דינמי" val={loads.hook.toFixed(1)} unit="t" />
          <Metric k="עומס רגל (תכן)" val={loads.legMax.toFixed(2)} unit="t" />
          <Metric k="ניצול מרבי" val={Math.round(maxU * 100).toString()} unit="%" />
          <Metric k="עלות ערכה" val={Math.round(total).toLocaleString('en-US')} unit="₪" />
        </div>

        {ORDER.map(k => (
          <ComponentCard
            key={k}
            title={TITLES[k]}
            sel={sel[k]}
            qty={QTY[k]}
            onUpgrade={onUpgrade}
          />
        ))}
      </div>
    </section>
  );
}

function Metric({ k, val, unit }: { k: string; val: string; unit: string }) {
  return (
    <div className="metric">
      <div className="k">{k}</div>
      <div className="val">{val}<small> {unit}</small></div>
    </div>
  );
}
