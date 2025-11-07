import SimpleLineChart from '../ui/SimpleLineChart';

/**
 * LineGraphVisualization
 *
 * Full-featured line chart visualization for time series data.
 * Shows trend over time with grid and data points.
 *
 * @param {Object} data - Data from dataProvider: { icon, label, value, unit, delta, history, metadata }
 */
export default function LineGraphVisualization({ data }) {
  const { icon, label, value, unit, delta, history } = data;

  // Generate labels (e.g., Mon, Tue, Wed...)
  const labels = history.map((_, i) => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
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
          <div>
            <h3 className="text-base font-semibold text-brand-navy dark:text-brand-text-dark">
              {label}
            </h3>
            <p className="text-sm text-brand-navy/50 dark:text-brand-text-dark/50">
              Last {history.length} days
            </p>
          </div>
        </div>

        {/* Current Value */}
        <div className="text-right">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-semibold text-brand-navy dark:text-brand-text-dark">
              {value}
            </span>
            {unit && (
              <span className="text-sm text-brand-navy/50 dark:text-brand-text-dark/50">
                {unit}
              </span>
            )}
          </div>
          {delta !== null && delta !== undefined && (
            <div
              className={`inline-flex items-center gap-1 text-xs font-medium mt-1 ${
                delta > 0
                  ? 'text-green-600 dark:text-green-400'
                  : delta < 0
                  ? 'text-red-600 dark:text-red-400'
                  : 'text-brand-navy/60 dark:text-brand-text-dark/60'
              }`}
            >
              {delta > 0 ? '↑' : delta < 0 ? '↓' : '•'} {Math.abs(delta)}%
            </div>
          )}
        </div>
      </div>

      {/* Line Chart */}
      <div className="flex-1 min-h-[200px]">
        <SimpleLineChart
          data={history}
          labels={labels}
          color="#F25C05"
          showGrid
          showDots
          height="200"
        />
      </div>
    </div>
  );
}
