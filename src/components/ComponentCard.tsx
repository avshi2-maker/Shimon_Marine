'use client';

import type { Selection } from '@/lib/types';
import { barColor, money, stateOf } from '@/lib/selection';

type Props = {
  title: string;
  sel: Selection;
  qty: number;
  onUpgrade: () => void;
};

export function ComponentCard({ title, sel, qty, onUpgrade }: Props) {
  const u = sel.util;
  const st = stateOf(u);
  const pct = Math.min(u * 100, 118);
  const it = sel.it;

  const tag =
    st === 'over' ? <span className="tag t-over">OVERLOAD</span>
    : st === 'marg' ? <span className="tag t-marg">בגבול · MARGINAL</span>
    : <span className="tag t-ok">OK</span>;

  const showUpgrade = (st !== 'ok' || u > 0.78) && sel.next;
  let upgrade: React.ReactNode = null;
  if (showUpgrade && sel.next) {
    const nu = sel.load / sel.next.w;
    const dCost = (sel.next.p - it.p) * qty;
    const valueLabel = st === 'marg'
      ? <b style={{ color: 'var(--amber)' }}>בטיחות</b>
      : <span style={{ color: 'var(--dim)' }}>שולי</span>;
    upgrade = (
      <div className="upgrade">
        <button className="chip" onClick={onUpgrade}>שדרוג ↑ {sel.next.lab}</button>
        <div className="txt">
          +{money(dCost)} → ניצול <b>{Math.round(nu * 100)}%</b>
          {' '}(מרווח +{Math.round((u - nu) * 100)} נק&apos;)
          {' '}· ערך מוסף: {valueLabel}
        </div>
      </div>
    );
  }

  return (
    <div className={`comp ${st}`}>
      {tag}
      <div className="top">
        <div className="nm">
          {title}
          <small>{it.maker} · {it.lab}</small>
        </div>
        <div className="price">
          {money(it.p * qty)}
          <small>{money(it.p)} ×{qty}</small>
        </div>
      </div>
      <div className="specs">
        <span>WLL <b>{it.w.toFixed(it.w < 10 ? 2 : 1)} t</b></span>
        <span>MBL <b>{it.mbl.toFixed(0)} t</b> <span style={{ opacity: 0.6 }}>({it.df}:1)</span></span>
        <span>עומס <b>{sel.load.toFixed(2)} t</b></span>
      </div>
      <div className="bar"><i style={{ width: `${pct}%`, background: barColor(u) }} /></div>
      <div className="barlab">
        <span style={{ color: barColor(u) }}>ניצול {Math.round(u * 100)}%</span>
        <span style={{ color: 'var(--dim)' }}>SF {(it.mbl / sel.load).toFixed(1)}:1</span>
      </div>
      {upgrade}
    </div>
  );
}
