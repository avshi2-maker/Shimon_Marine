'use client';

import type { DesignResult } from '@/lib/types';
import { money } from '@/lib/selection';

export function CostValuePanel({ result }: { result: DesignResult }) {
  const { total, safe, maxU, state, inputs } = result;
  const delta = safe - total;
  const pctDelta = total ? Math.round((delta / total) * 100) : 0;
  const pinPos = Math.round(inputs.prio * 0.98 + 1);

  let note: React.ReactNode;
  if (state === 'over') {
    note = <>הערכה <b style={{ color: 'var(--red)' }}>לא עומדת</b> בעומס — הגדל מידות או הקטן DAF / עומס.</>;
  } else if (maxU > 0.85) {
    note = (
      <>
        הרכיב החלש בניצול <b style={{ color: 'var(--amber)' }}>{Math.round(maxU * 100)}%</b>.
        שדרוג מידה אחת מוסיף מרווח בעלות שמוצגת לעיל — שיקול עלות מול ערך.
      </>
    );
  } else {
    note = <>כל הרכיבים במרווח נוח. הזזת מחוון <b>העדיפות</b> לכיוון &ldquo;חיסכון&rdquo; תקטין מידות ועלות עד גבול הניצול.</>;
  }

  return (
    <section className="card">
      <h2>איזון עלות / ערך <span className="en">COST · VALUE</span></h2>
      <div className="body">
        <div className="cv">
          <div className="row"><span className="k">עלות נבחרת</span><span className="v">{money(total)}</span></div>
          <div className="row"><span className="k">עלות &quot;מרווח מלא&quot;</span><span className="v" style={{ color: 'var(--dim)' }}>{money(safe)}</span></div>
          <div className="row">
            <span className="k">פער (ערך מוסף)</span>
            <span className="v" style={{ color: 'var(--amber)' }}>
              {delta >= 0 ? '+' : '−'}{money(Math.abs(delta))} ({pctDelta}%)
            </span>
          </div>
        </div>
        <div className="gauge"><div className="pin" style={{ insetInlineStart: `${pinPos}%` }} /></div>
        <div className="prio"><span>חסכוני</span><span>מרווח גבוה</span></div>
        <div className="note">
          {note}
          <div style={{ marginTop: 6, opacity: 0.7 }}>
            רכיבים <b style={{ color: 'var(--amber)' }}>בגבול</b> (ניצול &gt;85%) מסומנים — לחיצה על <code>שדרוג</code> מציגה את עלות המידה הבאה מול תוספת המרווח.
          </div>
        </div>
      </div>
    </section>
  );
}
