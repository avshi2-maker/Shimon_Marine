export function Header() {
  return (
    <header className="app-header">
      <div className="logo">
        <svg viewBox="0 0 24 24" fill="none" stroke="#2ec9c2" strokeWidth="1.8">
          <path d="M12 2v4M12 6l-7 9M12 6l7 9M5 15l7 5 7-5" />
          <circle cx="12" cy="4" r="1.6" />
        </svg>
      </div>
      <div className="titles">
        <h1>מתכנן ערכת הרמה ימית</h1>
        <div className="en">MARINE LIFTING&nbsp;SET DESIGNER · v0.1</div>
      </div>
      <div className="badges">
        <span className="badge">תקן <b>GL 0027/ND&nbsp;Rev&nbsp;10</b></span>
        <span className="badge">רצועות <b>SpanSet</b></span>
        <span className="badge">אביזרים <b>Crosby</b></span>
      </div>
    </header>
  );
}
