/**
 * StatChip
 *
 * Compact stat card for overview strip with tiny sparkline.
 * Designed for col-span-12 horizontal layout with 3+ chips.
 *
 * @param {string} title - Metric label
 * @param {string} value - Primary metric value
 * @param {string} unit - Unit label (optional)
 * @param {Array} sparkData - Array of numbers for mini sparkline (6-8 points)
 * @param {number} delta - Percentage change (optional, can be positive/negative)
 *
 * Usage:
 *   <StatChip
 *     title="Total Distance"
 *     value="42.3"
 *     unit="mi"
 *     sparkData={[5, 7, 6, 8, 10, 9, 12]}
 *     delta={+12}
 *   />
 *
 * Accessibility:
 * - Includes aria-label with full metric description
 * - Delta color coded (green for positive, red for negative)
 */
export default function StatChip({
  title,
  value,
  unit,
  sparkData = [],
  delta
}) {
  // Generate mini sparkline path
  const generateSparkPath = () => {
    if (!sparkData || sparkData.length === 0) return '';

    const width = 80;
    const height = 24;
    const max = Math.max(...sparkData);
    const min = Math.min(...sparkData);
    const range = max - min || 1;

    const points = sparkData.map((val, idx) => {
      const x = (idx / (sparkData.length - 1 || 1)) * width;
      const y = height - ((val - min) / range) * height;
      return `${x},${y}`;
    });

    return points.join(' ');
  };

  const sparkPath = generateSparkPath();

  const deltaColor = delta > 0
    ? 'text-[#0B6B3A]'
    : delta < 0
    ? 'text-[#8A1C00]'
    : 'text-brand-navy/60 dark:text-brand-text-dark/60';

  const deltaIcon = delta > 0 ? '↑' : delta < 0 ? '↓' : '';

  return (
    <div
      className="chip flex items-center justify-between"
      aria-label={`${title}: ${value}${unit ? ' ' + unit : ''}${delta ? `, ${delta > 0 ? 'up' : 'down'} ${Math.abs(delta)}%` : ''}`}
    >
      {/* Left: Title + Value */}
      <div className="flex flex-col gap-4">
        <span className="text-xs text-brand-navy/60 dark:text-brand-text-dark/60 font-medium uppercase tracking-wide">
          {title}
        </span>
        <div className="flex items-baseline gap-6">
          <span className="text-2xl font-semibold text-brand-navy dark:text-brand-text-dark">
            {value}
          </span>
          {unit && (
            <span className="text-sm text-brand-navy/60 dark:text-brand-text-dark/60">
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Right: Sparkline + Delta */}
      <div className="flex flex-col items-end gap-6">
        {/* Mini Sparkline */}
        {sparkData.length > 0 && (
          <svg
            width="80"
            height="24"
            className="text-brand-orange"
            aria-hidden="true"
          >
            <polyline
              points={sparkPath}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}

        {/* Delta Badge */}
        {delta !== undefined && delta !== null && (
          <span className={`text-xs font-semibold ${deltaColor}`}>
            {deltaIcon} {Math.abs(delta)}%
          </span>
        )}
      </div>
    </div>
  );
}
