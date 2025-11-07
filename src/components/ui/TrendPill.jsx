import { SEMANTIC_COLORS } from '../../theme/semantic';

/**
 * TrendPill
 *
 * Displays percentage change with directional indicator.
 * Uses semantic colors for success (up) / error (down).
 *
 * @param {number} value - Percentage change (positive = up, negative = down)
 *
 * Usage:
 *   <TrendPill value={+12} />  // Green, up arrow
 *   <TrendPill value={-8} />   // Red, down arrow
 */
export default function TrendPill({ value = 0 }) {
  const up = value >= 0;
  const color = up
    ? `text-[${SEMANTIC_COLORS.success.text}] bg-[${SEMANTIC_COLORS.success.bg}]`
    : `text-[${SEMANTIC_COLORS.error.text}] bg-[${SEMANTIC_COLORS.error.bg}]`;
  const sign = up ? '▲' : '▼';

  return (
    <span className={`inline-flex items-center gap-2 px-10 py-4 rounded-full text-sm font-medium ${color}`}>
      <span aria-hidden="true">{sign}</span>
      {Math.abs(value)}%
    </span>
  );
}
