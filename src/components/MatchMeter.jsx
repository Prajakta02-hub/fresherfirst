import { getLevel } from "../utils/skillMatch.js";

// Circular progress ring drawn with SVG.
export default function MatchMeter({ percent, size = 64 }) {
  const stroke = size > 80 ? 10 : 6;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;
  const level = getLevel(percent);

  return (
    <div
      className={`meter ${level.cls}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`${percent}% skill match, ${level.label}`}
    >
      <svg width={size} height={size}>
        <circle className="meter-track" cx={size / 2} cy={size / 2} r={radius} strokeWidth={stroke} fill="none" />
        <circle
          className="meter-bar"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={stroke}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <span className="meter-text" style={{ fontSize: size > 80 ? 28 : 16 }}>
        {percent}%
      </span>
    </div>
  );
}
