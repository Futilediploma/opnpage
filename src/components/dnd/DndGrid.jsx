import { DndContext, closestCenter, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';
import { arrayMove } from '@dnd-kit/sortable';

/**
 * DndGrid
 *
 * Wrapper component that manages drag-and-drop reordering of dashboard widgets.
 * Uses @dnd-kit for accessible, performant drag interactions.
 *
 * @param {Array} items - Array of widget objects with { id, type, w, h, ...props }
 * @param {Function} setItems - State setter to update widget order
 * @param {ReactNode} children - Sortable widget items
 * @param {String} className - Optional grid container classes
 *
 * Usage:
 *   <DndGrid items={widgets} setItems={setWidgets}>
 *     {widgets.map(widget => (
 *       <DraggableResizableItem key={widget.id} id={widget.id} ...>
 *         <Widget {...widget} />
 *       </DraggableResizableItem>
 *     ))}
 *   </DndGrid>
 *
 * Persistence:
 * - Parent component (SampleDashboard) handles localStorage save/load
 * - This component only manages drag state and reordering logic
 * - To add backend sync: call API in parent's setItems callback
 *
 * Accessibility:
 * - Uses PointerSensor for mouse/touch/keyboard navigation
 * - Works with screen readers via dnd-kit's built-in announcements
 * - Each child should have proper aria-labels
 */
export default function DndGrid({ items, setItems, children, className = '', disabled = false }) {
  // Sensors: how drag interactions are detected
  // PointerSensor = mouse + touch support with 5px activation distance
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5, // Prevent accidental drags on click
      },
    })
  );

  /**
   * Handle drag end event
   * Reorders items array when user drops a widget
   */
  const handleDragEnd = (event) => {
    if (disabled) return; // Don't reorder if disabled

    const { active, over } = event;

    // If dropped outside valid area or on itself, do nothing
    if (!over || active.id === over.id) return;

    setItems((prevItems) => {
      const oldIndex = prevItems.findIndex((item) => item.id === active.id);
      const newIndex = prevItems.findIndex((item) => item.id === over.id);

      // arrayMove handles array reordering cleanly
      return arrayMove(prevItems, oldIndex, newIndex);
    });
  };

  // If disabled, just render the grid without DndContext
  if (disabled) {
    return (
      <div className={`grid grid-cols-12 gap-12 ${className}`}>
        {children}
      </div>
    );
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items.map((item) => item.id)} strategy={rectSortingStrategy}>
        <div className={`grid grid-cols-12 gap-12 ${className}`}>
          {children}
        </div>
      </SortableContext>
    </DndContext>
  );
}
