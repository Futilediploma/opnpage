/**
 * OverviewCard
 *
 * Wide metric card for key stats in overview row.
 * Displays large number + context + optional trend.
 *
 * @param {string} title - Metric label
 * @param {string} value - Main stat value
 * @param {string} unit - Unit label
 * @param {string} context - Descriptive context (e.g., "This week")
 * @param {number} delta - Optional percentage change
 * @param {string} icon - Emoji or icon
 * @param {string} trend - Optional trend direction: 'up' | 'down' | 'neutral'
 *
 * Usage:
 *   <OverviewCard
 *     title="Total Distance"
 *     value="247"
 *     unit="miles"
 *     context="This year"
 *     delta={+12}
 *     icon="🏃"
 *     trend="up"
 *   />
 *
 * Data Integration:
 * - Fetch from /api/dashboard/overview
 * - Update in real-time on timeframe filter change
 */
export default function OverviewCard({
  title,
  value,
  unit,
  context,
  delta,
  icon,
  trend = 'neutral'
}) {
  const trendColors = {
    up: 'text-[#0B6B3A]',
    down: 'text-[#8A1C00]',
    neutral: 'text-brand-navy/60 dark:text-brand-text-dark/60',
  };

  return (
    <div className="bg-white dark:bg-brand-gray-dark rounded-xl p-24 shadow-subtle dark:shadow-dark-subtle border border-brand-gray/30 dark:border-brand-gray-dark/30 card-hover">
      <div className="flex items-start justify-between mb-12">
        <div>
          <p className="text-sm font-medium text-brand-navy/60 dark:text-brand-text-dark/60 uppercase tracking-wide">
            {title}
          </p>
        </div>
        {icon && (
          <span className="text-3xl" aria-hidden="true">
            {icon}
          </span>
        )}
      </div>

      <div className="flex items-end gap-8 mb-8">
        <span className="text-4xl font-bold text-brand-navy dark:text-brand-text-dark tracking-tight">
          {value}
        </span>
        <span className="text-lg text-brand-navy/60 dark:text-brand-text-dark/60 mb-4">
          {unit}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-sm text-brand-navy/60 dark:text-brand-text-dark/60">
          {context}
        </p>
        {delta !== undefined && (
          <span className={`text-sm font-medium ${trendColors[trend]}`}>
            {delta > 0 ? '+' : ''}
            {delta}%
          </span>
        )}
      </div>
    </div>
  );
}
