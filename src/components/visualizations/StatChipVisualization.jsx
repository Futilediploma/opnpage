import Sparkline from '../ui/Sparkline';

/**
 * StatChipVisualization
 *
 * Minimal stat display with sparkline - perfect for overview strips.
 * Compact alternative to Pill visualization.
 *
 * @param {Object} data - Data from dataProvider: { icon, label, value, unit, delta, history }
 */
export default function StatChipVisualization({ data }) {
  const { label, value, unit, delta, history } = data;

  return (
    <div className="chip h-full flex flex-col justify-between">
      {/* Title */}
      <p className="text-sm text-brand-navy/60 dark:text-brand-text-dark/60 mb-2">
        {label}
      </p>

      {/* Value + Delta */}
      <div className="flex items-center justify-between mb-3">
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

        {delta !== null && delta !== undefined && (
          <span
            className={`text-xs font-medium ${
              delta > 0
                ? 'text-green-600 dark:text-green-400'
                : delta < 0
                ? 'text-red-600 dark:text-red-400'
                : 'text-brand-navy/60 dark:text-brand-text-dark/60'
            }`}
          >
            {delta > 0 ? '+' : ''}{delta}%
          </span>
        )}
      </div>

      {/* Sparkline */}
      {history && history.length > 0 && (
        <Sparkline data={history} color="#F25C05" height={32} />
      )}
    </div>
  );
}
