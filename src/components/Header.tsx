'use client';

import { useState, useEffect } from 'react';

export function Header() {
  // null on first render → set on client only, to avoid SSR hydration mismatch
  const [now, setNow] = useState<Date | null>(null);

  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const time = now
    ? now.toLocaleTimeString('he-IL', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    : '--:--:--';
  const date = now
    ? now.toLocaleDateString('he-IL', { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' })
    : '';

  return (
    <header className="app-header">
      <div className="logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="#2ec9c2" strokeWidth="1.8">
          <path d="M12 2v4M12 6l-7 9M12 6l7 9M5 15l7 5 7-5" />
          <circle cx="12" cy="4" r="1.6" />
        </svg>
      </div>

      <div className="titles">
        <div className="firm">SHIMON REINICH ENGINEERING&nbsp;LTD</div>
        <h1>מתכנן ערכת הרמה ימית</h1>
        <div className="en">MARINE LIFTING&nbsp;SET DESIGNER · v0.2</div>
      </div>

      <div className="headright">
        <div className="clock">
          <div className="time">{time}</div>
          <div className="date">{date}</div>
        </div>
        <div className="badges">
          <span className="badge">תקן <b>GL 0027/ND&nbsp;Rev&nbsp;10</b></span>
          <span className="badge">רצועות <b>SpanSet</b></span>
          <span className="badge">אביזרים <b>Crosby</b></span>
        </div>
      </div>
    </header>
  );
}
