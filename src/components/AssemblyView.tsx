'use client';

import type { DesignResult } from '@/lib/types';

const teal = '#2ec9c2';
const steel = '#9fb6c6';
const dim = '#6f8aa0';
const amb = '#f1ab3a';

export function AssemblyView({ result }: { result: DesignResult }) {
  const { inputs, geom, loads, sel } = result;
  const hookY = 22;
  const baseY = 176;
  const pts = [28, 100, 200, 272];

  return (
    <section className="card assembly">
      <h2>תצוגת הרכבה <span className="en">ASSEMBLY</span></h2>
      <div className="body">
        <svg viewBox="0 0 300 210">
          {/* hook */}
          <circle cx="150" cy={hookY} r="9" fill="none" stroke={steel} strokeWidth="2.4" />
          <ellipse cx="150" cy={hookY + 24} rx="8" ry="11" fill="none" stroke={steel} strokeWidth="2.6" />

          {/* legs */}
          {pts.map(x => (
            <line key={x} x1={150} y1={hookY + 30} x2={x} y2={baseY} stroke={teal} strokeWidth="3.2" />
          ))}
          {pts.map(x => (
            <circle key={`p${x}`} cx={x} cy={baseY} r="3.4" fill="#0f2233" stroke={amb} strokeWidth="1.6" />
          ))}

          {/* deck */}
          <line x1="20" y1={baseY + 14} x2="280" y2={baseY + 14} stroke={steel} strokeWidth="2" />

          {/* labels */}
          <text x="150" y="14" fill={dim} fontFamily="monospace" fontSize="8" textAnchor="middle">
            HOOK {loads.hook.toFixed(1)}t
          </text>
          <text x="150" y={hookY + 27} fill={amb} fontFamily="monospace" fontSize="7.5" textAnchor="middle">
            {sel.ml.it.lab} {sel.ml.it.w.toFixed(1)}t
          </text>
          <text x="60" y="120" fill={teal} fontFamily="monospace" fontSize="8" textAnchor="middle" transform="rotate(58 60 120)">
            AFT {sel.strapA.it.w.toFixed(0)}t · {loads.aftDes.toFixed(1)}t · {geom.degA.toFixed(1)}°
          </text>
          <text x="238" y="120" fill={teal} fontFamily="monospace" fontSize="8" textAnchor="middle" transform="rotate(-58 238 120)">
            FWD {sel.strapF.it.w.toFixed(0)}t · {loads.fwdDes.toFixed(1)}t · {geom.degF.toFixed(1)}°
          </text>
          <text x="150" y={baseY + 27} fill={dim} fontFamily="monospace" fontSize="7.5" textAnchor="middle">
            4× G-209A · USV {inputs.W.toFixed(1)}t · H {geom.HA.toFixed(2)}m
          </text>
        </svg>
      </div>
    </section>
  );
}
