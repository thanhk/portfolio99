/**
 * Scrolling status bar across the top of every page — the one piece of pure
 * era decoration. The item list is duplicated so the marquee loops seamlessly;
 * the copy is hidden from screen readers rather than read out twice.
 */
const ITEMS = [
  '★ welcome to my portfolio ★',
  'now building: mise — an ai planning co-pilot for market bakers',
  '★ welcome to my ideas ★',
  'new: turnip bakes',
  '★ welcome to my thoughts ★',
  'last updated aug 2026',
];

export default function Ticker() {
  return (
    <div className="ticker">
      <div className="ticker-track">
        {ITEMS.map((item) => (
          <span key={item}>{item}</span>
        ))}
        {ITEMS.map((item) => (
          <span key={`dup-${item}`} aria-hidden="true">{item}</span>
        ))}
      </div>
    </div>
  );
}
