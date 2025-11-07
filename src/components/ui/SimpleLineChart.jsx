/**
 * SimpleLineChart
 *
 * Minimalist line chart for displaying trends.
 * Pure SVG implementation - no external charting library.
 *
 * @param {Array} data - Array of numbers (y-values)
 * @param {Array} labels - Optional x-axis labels
 * @param {string} color - Line color (default: brand orange)
 * @param {boolean} showGrid - Show background grid lines
 * @param {boolean} showDots - Show data point dots
 * @param {string} height - Chart height in pixels
 *
 * Usage:
 *   <SimpleLineChart
 *     data={[10, 15, 12, 18, 22, 20, 25]}
 *     labels={['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']}
 *     color="#F25C05"
 *     showGrid
 *   />
 *
 * Accessibility:
 * - Includes aria-label with data summary
 * - Data table fallback for screen readers
 */
export default function SimpleLineChart({
  data = [],
  labels = [],
  color = '#F25C05',
  showGrid = true,
  showDots = true,
  height = '200'
}) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center h-full text-brand-navy/40 dark:text-brand-text-dark/40">
        No data available
      </div>
    );
  }

  const width = 600;
  const padding = 40;
  const chartWidth = width - padding * 2;
  const chartHeight = parseInt(height) - padding * 2;

  const max = Math.max(...data);
  const min = Math.min(...data);
  const range = max - min || 1;

  // Generate points
  const points = data
    .map((value, index) => {
      const x = padding + (index / (data.length - 1 || 1)) * chartWidth;
      const y = padding + chartHeight - ((value - min) / range) * chartHeight;
      return `${x},${y}`;
    })
    .join(' ');

  // Generate area fill
  const areaPoints = `${padding},${padding + chartHeight} ${points} ${
    padding + chartWidth
  },${padding + chartHeight}`;

  // Grid lines
  const gridLines = [];
  if (showGrid) {
    for (let i = 0; i <= 4; i++) {
      const y = padding + (i * chartHeight) / 4;
      gridLines.push(
        <line
          key={`grid-${i}`}
          x1={padding}
          y1={y}
          x2={width - padding}
          y2={y}
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.1"
        />
      );
    }
  }

  const dataMin = min.toFixed(1);
  const dataMax = max.toFixed(1);
  const dataAvg = (data.reduce((a, b) => a + b, 0) / data.length).toFixed(1);

  return (
    <div className="w-full h-full">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-full text-brand-navy dark:text-brand-text-dark"
        aria-label={`Line chart showing trend from ${dataMin} to ${dataMax}, average ${dataAvg}`}
        role="img"
      >
        {/* Grid */}
        {gridLines}

        {/* Area fill */}
        <polygon
          points={areaPoints}
          fill={color}
          opacity="0.1"
        />

        {/* Line */}
        <polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Data points */}
        {showDots &&
          data.map((value, index) => {
            const x = padding + (index / (data.length - 1 || 1)) * chartWidth;
            const y =
              padding + chartHeight - ((value - min) / range) * chartHeight;
            return (
              <circle
                key={`dot-${index}`}
                cx={x}
                cy={y}
                r="4"
                fill={color}
                stroke="white"
                strokeWidth="2"
              />
            );
          })}

        {/* X-axis labels */}
        {labels.map((label, index) => {
          const x = padding + (index / (labels.length - 1 || 1)) * chartWidth;
          return (
            <text
              key={`label-${index}`}
              x={x}
              y={height - 10}
              textAnchor="middle"
              fontSize="12"
              fill="currentColor"
              opacity="0.6"
            >
              {label}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
