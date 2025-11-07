/**
 * PageSection
 *
 * Reusable section wrapper that handles:
 * - Max-width container (7xl)
 * - Horizontal padding (responsive 8-pt grid)
 * - Optional section header with title/subtitle
 * - Optional action buttons in header
 * - Consistent vertical spacing
 *
 * @param {string} title - Optional section heading
 * @param {string} subtitle - Optional section subtext
 * @param {ReactNode} actions - Optional header action buttons
 * @param {ReactNode} children - Section content
 * @param {string} id - Optional ID for anchor links
 * @param {string} className - Additional classes for content wrapper
 * @param {string} spacing - Vertical padding: 'sm' | 'md' | 'lg' (default: 'md')
 *
 * Usage:
 *   <PageSection title="Profile" spacing="lg">
 *     <ProfileHeader ... />
 *   </PageSection>
 *
 *   <PageSection
 *     title="Stats"
 *     actions={<button>Edit</button>}
 *   >
 *     <WidgetGrid>...</WidgetGrid>
 *   </PageSection>
 */
export default function PageSection({
  title,
  subtitle,
  actions,
  children,
  id,
  className = '',
  spacing = 'md'
}) {
  const spacingMap = {
    sm: 'pt-24 pb-16',
    md: 'pt-48 pb-32',
    lg: 'pt-64 pb-48',
  };

  const verticalSpacing = spacingMap[spacing] || spacingMap.md;

  return (
    <section id={id} className={`max-w-7xl mx-auto px-16 md:px-32 ${verticalSpacing}`}>
      {(title || subtitle || actions) && (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-16 mb-32">
          <div>
            {title && (
              <h2 className="text-2xl font-semibold text-brand-navy mb-8">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-brand-navy/70 leading-[1.7]">
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div className="flex gap-12">{actions}</div>}
        </div>
      )}

      <div className={className}>
        {children}
      </div>
    </section>
  );
}
