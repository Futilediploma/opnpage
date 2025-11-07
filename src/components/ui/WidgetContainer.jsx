/**
 * WidgetContainer
 *
 * Unified shell for non-stat widgets (charts, calendars, lists).
 * Matches the visual style of Widget.jsx but without metric/trend logic.
 *
 * Provides consistent:
 * - Border, shadow, padding
 * - Optional header with title/icon
 * - Optional action buttons in header
 *
 * @param {string} title - Widget heading
 * @param {string} icon - Emoji or icon character
 * @param {ReactNode} actions - Optional header buttons (e.g., "View all")
 * @param {ReactNode} children - Widget body content
 * @param {string} className - Additional classes for container
 *
 * Usage:
 *   <WidgetContainer title="Activity Breakdown" icon="📊">
 *     <PieChart data={...} />
 *   </WidgetContainer>
 *
 *   <WidgetContainer
 *     title="This Month"
 *     actions={<button>Today</button>}
 *   >
 *     <Calendar />
 *   </WidgetContainer>
 *
 * Data Integration:
 * - Wrap any visualization or list component
 * - Pass loading/error states as children
 * - Use actions prop for interactive controls
 */
export default function WidgetContainer({
  title,
  icon,
  actions,
  children,
  className = ''
}) {
  return (
    <div
      className={`bg-white rounded-xl border border-brand-gray p-20 shadow-subtle hover:shadow-card transition-shadow ${className}`}
    >
      {(title || icon || actions) && (
        <header className="flex items-center justify-between mb-16">
          <div className="flex items-center gap-10">
            {icon && (
              <span className="text-xl" aria-hidden="true">
                {icon}
              </span>
            )}
            {title && (
              <h4 className="text-base font-semibold text-brand-navy">
                {title}
              </h4>
            )}
          </div>
          {actions && <div className="flex gap-8">{actions}</div>}
        </header>
      )}

      <div className="flex flex-col items-center">
        {children}
      </div>
    </div>
  );
}
