/** A quiet fabric-like transition between the portfolio's main chapters. */
export function ChapterCurve() {
  const resting = "M0 50 C120 50 160 12 360 12 S540 88 720 88 S1020 12 1200 12 S1360 50 1440 50";
  const lifted = "M0 50 C120 50 160 28 300 28 S650 74 840 74 S1100 24 1240 24 S1360 50 1440 50";
  return <div className="chapter-curve" aria-hidden="true">
    <svg viewBox="0 0 1440 100" preserveAspectRatio="none" focusable="false">
      <path className="chapter-curve-edge" d={resting} fill="none" vectorEffect="non-scaling-stroke">
        <animate attributeName="d" dur="18s" repeatCount="indefinite" values={`${resting};${lifted};${resting}`} />
      </path>
    </svg>
    <svg className="chapter-curve-static" viewBox="0 0 1440 100" preserveAspectRatio="none" focusable="false">
      <path className="chapter-curve-edge" d={resting} fill="none" vectorEffect="non-scaling-stroke" />
    </svg>
  </div>;
}
