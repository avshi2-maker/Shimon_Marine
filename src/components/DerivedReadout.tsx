'use client';

import type { Geometry } from '@/lib/types';

export function DerivedReadout({ geom }: { geom: Geometry }) {
  if (geom.geomBad) {
    return (
      <div className="derived bad">
        <b>⚠ רצועה קצרה מדי</b> — האורך קטן מהמרחק האלכסוני לנקודת ההרמה
      </div>
    );
  }
  const aft = Math.round(geom.aftFrac * 100);
  return (
    <div className="derived">
      L.B.E <b>{geom.LBE.toFixed(3)} m</b> · חלוקה א/ק <b>{aft} / {100 - aft}%</b>
      <br />
      זוויות (מחושב) <b>{geom.degA.toFixed(1)}° / {geom.degF.toFixed(1)}°</b>
      {' '}· גובה וו <b>{geom.HA.toFixed(2)} m</b>
      {' '}· ΔH <b>{geom.dH.toFixed(2)} m</b>
    </div>
  );
}
