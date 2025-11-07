/**
 * WidgetGrid
 *
 * Responsive CSS grid for dashboard widgets.
 * Eliminates repeated grid class logic across pages.
 *
 * @param {object} cols - Column configuration: { base, md, lg }
 *   Default: { base: 1, md: 2, lg: 3 }
 * @param {number} gap - Grid gap in 8-pt units (e.g., 20 = 1.25rem)
 *   Default: 20
 * @param {ReactNode} children - Widget components
 * @param {string} className - Additional classes
 *
 * Usage:
 *   <WidgetGrid>
 *     <Widget ... />
 *     <Widget ... />
 *   </WidgetGrid>
 *
 *   <WidgetGrid cols={{ base: 1, md: 1, lg: 2 }} gap={32}>
 *     <LargeWidget ... />
 *   </WidgetGrid>
 *
 * Data Integration Notes:
 * - When connecting to API, map response widgets to <Widget> components
 * - Grid automatically handles responsive breakpoints
 * - Add loading/empty states as direct children
 */
export default function WidgetGrid({
  cols = { base: 1, md: 2, lg: 3 },
  gap = 20,
  children,
  className = ''
}) {
  // Build Tailwind grid class strings from props
  const gridCols = `grid-cols-${cols.base} md:grid-cols-${cols.md} lg:grid-cols-${cols.lg}`;
  const gridGap = `gap-${gap}`;

  return (
    <div className={`grid ${gridCols} ${gridGap} ${className}`}>
      {children}
    </div>
  );
}
