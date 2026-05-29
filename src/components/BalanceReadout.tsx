'use client';

import type { Loading, Geometry } from '@/lib/types';

export function BalanceReadout({ loading, geom }: { loading: Loading; geom: Geometry }) {
  const aft = Math.round(geom.aftFrac * 100);

  return (
    <section className="card">
      <h2>שיווי משקל וגיאומטריה <span className="en">BALANCE</span></h2>
      <div className="body">
        {!geom.cogBetween && (
          <div className="derived bad">
            <b>⚠ מרכז הכובד מחוץ לנקודות ההרמה</b> — לא ניתן לאזן. הזז עומס או נקודות הרמה.
          </div>
        )}
        {geom.cogBetween && geom.geomBad && (
          <div className="derived bad">
            <b>⚠ אילוץ לא תקף</b> — האורך/הגובה שנקבע קצר מהמרחק לנקודת ההרמה.
          </div>
        )}

        <div className="bgrid">
          <Cell k="משקל הרמה" v={`${loading.W.toFixed(2)} t`} />
          <Cell k="עומס וו דינמי" v={`${(loading.W * 1).toFixed(2)} t ×DAF`} dim />
          <Cell k="LCG" v={`${loading.LCG.toFixed(3)} m`} />
          <Cell k="VCG אפקטיבי" v={`${loading.VCG.toFixed(3)} m`} warn={loading.slack} />
          <Cell k="חלוקה אחורי/קדמי" v={`${aft} / ${100 - aft}%`} />
          <Cell k="L.B.E" v={`${geom.LBE.toFixed(3)} m`} />
          <Cell k="זווית אחורית" v={`${geom.degA.toFixed(1)}°`} />
          <Cell k="זווית קדמית" v={`${geom.degF.toFixed(1)}°`} />
          <Cell k="אורך LA / LF" v={`${geom.LA.toFixed(2)} / ${geom.LF.toFixed(2)} m`} />
          <Cell k="גובה וו · ΔH" v={`${geom.HA.toFixed(2)} m · Δ${(geom.HA - geom.HF).toFixed(2)}`} />
        </div>

        <div className={`trim ${geom.geomBad ? 'bad' : 'ok'}`}>
          {geom.geomBad
            ? 'טרים לא מוגדר'
            : <>הוו מעל מרכז הכובד → <b>טרים 0° (אף ישר)</b> · מרווח וו↔מרכז כובד <b>{geom.clearance.toFixed(2)} m</b></>}
        </div>

        {loading.slack && (
          <div className="fse">
            <b>נוזל חופשי במיכל</b> — מילוי חלקי מעלה את ה־VCG ב־<b>{(loading.fseRise * 1000).toFixed(0)} מ&quot;מ</b>
            {' '}ויוצר חוסר ודאות במיקום מרכז הכובד תוך כדי הרמה (תזוזת נוזל → טרים/הטיה).
            המלצה: למלא עד הסוף או לרוקן את המיכל הרלוונטי, או לקחת מרווח נוסף.
          </div>
        )}
      </div>
    </section>
  );
}

function Cell({ k, v, dim, warn }: { k: string; v: string; dim?: boolean; warn?: boolean }) {
  return (
    <div className="bcell">
      <span className="bk">{k}</span>
      <span className="bv" style={{ color: warn ? 'var(--amber)' : dim ? 'var(--dim)' : 'var(--ink)' }}>{v}</span>
    </div>
  );
}
