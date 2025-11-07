/**
 * BigNumberVisualization
 *
 * Large, prominent number display - perfect for key metrics.
 * Minimal design focused on the value itself.
 *
 * @param {Object} data - Data from dataProvider: { icon, label, value, unit, delta, metadata }
 */
export default function BigNumberVisualization({ data }) {
  const { icon, label, value, unit, delta, metadata } = data;
  const { footnote } = metadata || {};

  return (
    <div className="card h-full flex flex-col items-center justify-center text-center">
      {/* Icon */}
      <span className="text-5xl mb-4" aria-hidden="true">{icon}</span>

      {/* Title */}
      <h3 className="text-sm font-medium text-brand-navy/60 dark:text-brand-text-dark/60 mb-3">
        {label}
      </h3>

      {/* Big Number */}
      <div className="flex items-baseline gap-3 mb-3">
        <span className="text-6xl font-bold text-brand-navy dark:text-brand-text-dark">
          {value}
        </span>
        {unit && (
          <span className="text-2xl text-brand-navy/50 dark:text-brand-text-dark/50">
            {unit}
          </span>
        )}
      </div>

      {/* Delta Badge */}
      {delta !== null && delta !== undefined && (
        <div
          className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium ${
            delta > 0
              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
              : delta < 0
              ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
              : 'bg-brand-gray/20 text-brand-navy/60 dark:bg-brand-gray-dark/20 dark:text-brand-text-dark/60'
          }`}
        >
          {delta > 0 ? '↑' : delta < 0 ? '↓' : '•'} {Math.abs(delta)}%
        </div>
      )}

      {/* Footnote */}
      {footnote && (
        <p className="text-xs text-brand-navy/50 dark:text-brand-text-dark/50 mt-4">
          {footnote}
        </p>
      )}
    </div>
  );
}
