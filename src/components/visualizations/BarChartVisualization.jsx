/**
 * BarChartVisualization
 *
 * Vertical bar chart for comparing values over time or categories.
 *
 * @param {Object} data - Data from dataProvider: { icon, label, value, unit, history, metadata }
 */
export default function BarChartVisualization({ data }) {
  const { icon, label, value, unit, history } = data;

  // Calculate bar heights (normalize to max value)
  const maxValue = Math.max(...history);
  const bars = history.map((val) => ({
    value: val,
    height: (val / maxValue) * 100,
  }));

  // Generate labels
  const labels = history.map((_, i) => {
    const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
    const date = new Date();
    date.setDate(date.getDate() - (history.length - 1 - i));
    return days[date.getDay()];
  });

  return (
    <div className="card h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl" aria-hidden="true">{icon}</span>
          <h3 className="text-base font-semibold text-brand-navy dark:text-brand-text-dark">
            {label}
          </h3>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-semibold text-brand-navy dark:text-brand-text-dark">
            {value}
          </span>
          {unit && (
            <span className="text-sm text-brand-navy/50 dark:text-brand-text-dark/50">
              {unit}
            </span>
          )}
        </div>
      </div>

      {/* Bar Chart */}
      <div className="flex-1 flex items-end gap-2">
        {bars.map((bar, i) => (
          <div key={i} className="flex-1 flex flex-col items-center gap-2">
            {/* Bar */}
            <div className="w-full bg-brand-gray/10 dark:bg-brand-gray-dark/20 rounded-t-md relative overflow-hidden" style={{ height: '160px' }}>
              <div
                className="absolute bottom-0 w-full bg-brand-orange rounded-t-md transition-all duration-500"
                style={{ height: `${bar.height}%` }}
                title={`${bar.value} ${unit || ''}`}
              />
            </div>
            {/* Label */}
            <span className="text-xs text-brand-navy/50 dark:text-brand-text-dark/50">
              {labels[i]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
