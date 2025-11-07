/**
 * ChartCard
 *
 * Container for trend charts (line, bar, area).
 * Provides title bar + chart area with consistent padding.
 *
 * @param {string} title - Chart title
 * @param {string} subtitle - Optional subtitle/description
 * @param {ReactNode} children - Chart component (SVG, Canvas, etc.)
 * @param {ReactNode} actions - Optional header actions (filter buttons, etc.)
 * @param {string} height - Card height: 'sm' | 'md' | 'lg' (default: 'md')
 *
 * Usage:
 *   <ChartCard title="Running Trends" subtitle="Last 30 days">
 *     <LineChart data={...} />
 *   </ChartCard>
 *
 * Data Integration:
 * - Chart data fetched based on timeframe filter
 * - Use react-chartjs-2, recharts, or custom SVG
 * - Include aria-label for accessibility
 */
export default function ChartCard({
  title,
  subtitle,
  children,
  actions,
  height = 'md'
}) {
  const heightMap = {
    sm: 'h-64',
    md: 'h-96',
    lg: 'h-128',
  };

  return (
    <div className="bg-white dark:bg-brand-gray-dark rounded-xl shadow-card dark:shadow-dark-card border border-brand-gray/30 dark:border-brand-gray-dark/30 overflow-hidden card-hover">
      {/* Header */}
      <div className="px-24 pt-24 pb-16 border-b border-brand-gray/30 dark:border-brand-gray-dark/30">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="text-lg font-semibold text-brand-navy dark:text-brand-text-dark mb-4">
              {title}
            </h3>
            {subtitle && (
              <p className="text-sm text-brand-navy/60 dark:text-brand-text-dark/60">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="flex gap-8">{actions}</div>}
        </div>
      </div>

      {/* Chart Area */}
      <div className={`px-24 py-24 ${heightMap[height]}`}>
        {children}
      </div>
    </div>
  );
}
