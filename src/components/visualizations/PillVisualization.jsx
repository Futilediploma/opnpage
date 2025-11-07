import Sparkline from '../ui/Sparkline';

/**
 * PillVisualization
 *
 * Compact metric card with icon, value, trend indicator, and sparkline.
 * Generic visualization that works with any data source.
 *
 * @param {Object} data - Data from dataProvider: { icon, label, value, unit, delta, history, metadata }
 */
export default function PillVisualization({ data, readingData, showOnWidget, metricData }) {
  const { icon, label, value, unit, delta, history, metadata } = data;
  const { progress, footnote } = metadata || {};

  return (
    <div className="card h-full w-full flex flex-col items-center justify-center p-6">
      {/* Header: Icon + Title */}
      <div className="flex flex-col items-center justify-center gap-2 mb-4 w-full">
        <span className="text-3xl" aria-hidden="true">{icon}</span>
        <h3 className="text-base font-medium text-brand-navy/60 dark:text-brand-text-dark/60 text-center w-full">
          {label}
        </h3>
      </div>

      {/* Main Metric */}
      <div className="flex items-baseline justify-center gap-2 mb-3 w-full">
        <span className="text-4xl font-semibold text-brand-navy dark:text-brand-text-dark">
          {value}
        </span>
        {unit && (
          <span className="text-lg text-brand-navy/50 dark:text-brand-text-dark/50">
            {unit}
          </span>
        )}
      </div>

      {/* Delta Badge */}
      {delta !== null && delta !== undefined && (
        <div
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium mb-3 w-fit mx-auto ${
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

      {/* Progress Bar (if applicable) */}
      {progress !== undefined && (
        <div className="mb-3 w-full">
          <div className="h-2 bg-brand-gray/20 dark:bg-brand-gray-dark/40 rounded-full overflow-hidden">
            <div
              className="h-full bg-brand-orange rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Sparkline */}
      {history && history.length > 0 && (
        <div className="mb-3 w-full flex justify-center">
          <Sparkline data={history} color="#F25C05" height={40} />
        </div>
      )}

      {/* Footnote */}
      {footnote && (
        <p className="text-xs text-brand-navy/50 dark:text-brand-text-dark/50 mt-auto text-center w-full">
          {footnote}
        </p>
      )}

      {/* Reading Data Display */}
      {showOnWidget && readingData && (
        <div className="mt-4 text-left w-full">
          <div className="mb-2">
            <span className="font-semibold text-brand-navy">Last 5 Books:</span>
            <ul className="list-disc ml-5 text-xs">
              {readingData.books.filter(b => b).map((book, idx) => (
                <li key={idx}>{book}</li>
              ))}
            </ul>
          </div>
          <div className="mb-2">
            <span className="font-semibold text-brand-navy">Top 3 Favorites:</span>
            <ul className="list-disc ml-5 text-xs">
              {readingData.favorites.filter(f => f).map((fav, idx) => (
                <li key={idx}>{fav}</li>
              ))}
            </ul>
          </div>
          {readingData.goodreadsUrl && (
            <div className="mb-2 opacity-50 pointer-events-none select-none">
              <span className="text-brand-orange underline text-xs">View Goodreads Profile (Account linking under development)</span>
            </div>
          )}
        </div>
      )}
      {/* Metric Data Display for other widgets */}
      {showOnWidget && metricData && (
        <div className="mt-4 text-left w-full">
          <div className="mb-2">
            <span className="font-semibold text-brand-navy">Highlights / Notes:</span>
            <ul className="list-disc ml-5 text-xs">
              {metricData.notes && metricData.notes.filter(n => n).map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
          {metricData.customLink && (
            <div className="mb-2 opacity-50 pointer-events-none select-none">
              <span className="text-brand-orange underline text-xs">View Link (Account linking under development)</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
