import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

/**
 * DraggableResizableItem
 *
 * Wraps a widget to make it draggable (via @dnd-kit).
 * Works with CSS Grid layout system.
 *
 * @param {String} id - Unique widget identifier
 * @param {Number} w - Width in grid columns (1-12)
 * @param {Number} h - Height in grid rows
 * @param {String} label - Accessible label for drag handle
 * @param {ReactNode} children - Widget content to wrap
 *
 * Grid Sizing:
 * - Uses CSS Grid col-span and row-span
 * - Respects parent grid's gap and column configuration
 *
 * Styling:
 * - Dragging: opacity-50 + scale-105 for visual feedback
 * - Drag handle: top-right corner with 6-dot icon
 *
 * Accessibility:
 * - Drag handle is keyboard focusable
 * - Aria-label describes drag action
 * - Screen reader announcements via dnd-kit
 */
export default function DraggableResizableItem({
  id,
  w,
  h,
  label,
  children,
  isEditMode = false,
  onEdit,
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id, disabled: !isEditMode });

  // Apply drag transform and grid positioning
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    gridColumn: `span ${w}`,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative ${
        isDragging ? 'opacity-50 z-50' : ''
      } ${isEditMode ? 'ring-2 ring-brand-orange/20 rounded-lg' : ''}`}
    >
      {/* Edit Mode Controls - Only show in edit mode */}
      {isEditMode && (
        <div className="absolute top-2 right-2 z-10 flex items-center gap-2">
          {/* Edit Button */}
          <button
            onClick={() => onEdit && onEdit(id)}
            className="p-2 cursor-pointer bg-white dark:bg-brand-gray-dark hover:bg-brand-gray/10 dark:hover:bg-brand-navy-dark rounded-md transition-all shadow-sm border border-brand-gray/30 dark:border-brand-gray-dark/30"
            aria-label={`Edit ${label || 'widget'} configuration`}
            title="Edit widget"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-brand-navy dark:text-brand-text-dark"
            >
              <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M18.5 2.5C18.8978 2.10217 19.4374 1.87868 20 1.87868C20.5626 1.87868 21.1022 2.10217 21.5 2.5C21.8978 2.89782 22.1213 3.43739 22.1213 4C22.1213 4.56261 21.8978 5.10217 21.5 5.5L12 15L8 16L9 12L18.5 2.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            className="p-2 cursor-move bg-brand-orange/90 hover:bg-brand-orange rounded-md transition-all shadow-sm"
            aria-label={`Drag to reorder ${label || 'widget'}`}
            role="button"
            tabIndex={0}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="text-white"
            >
              <circle cx="9" cy="5" r="1.5" fill="currentColor" />
              <circle cx="9" cy="12" r="1.5" fill="currentColor" />
              <circle cx="9" cy="19" r="1.5" fill="currentColor" />
              <circle cx="15" cy="5" r="1.5" fill="currentColor" />
              <circle cx="15" cy="12" r="1.5" fill="currentColor" />
              <circle cx="15" cy="19" r="1.5" fill="currentColor" />
            </svg>
          </div>
        </div>
      )}

      {/* Widget Content */}
      {children}
    </div>
  );
}
