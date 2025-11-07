# Drag & Drop Widget System

## Overview

Your opnpage.me dashboard now supports **interactive widget rearrangement and resizing**. Users can customize their dashboard layout by dragging widgets to reorder them and resizing them using corner handles. All changes persist between page refreshes via `localStorage`.

---

## Features

✅ **Drag to Reorder** - Grab the 6-dot handle in the top-right corner to drag widgets
✅ **Resize** - Hover over bottom-right corner to see resize handle (⋰ icon)
✅ **Local Persistence** - Layout saved to `localStorage.opnpage.layout`
✅ **Keyboard Accessible** - Drag handles are focusable with Tab key
✅ **Smooth Animations** - Hover lift effects and drag transitions
✅ **Grid-Based Sizing** - Widgets snap to 12-column grid (each widget spans 4 columns by default)

---

## Files Added

### 1. `src/components/dnd/DndGrid.jsx`
Wrapper component that manages drag-and-drop state using `@dnd-kit/sortable`.

**Props:**
- `items` - Array of widget objects with `{ id, type, w, h, ...props }`
- `setItems` - State setter to update widget order
- `children` - Sortable widget items
- `className` - Optional grid container classes

**Key Features:**
- Uses `PointerSensor` for mouse/touch/keyboard support
- 5px activation distance prevents accidental drags
- `closestCenter` collision detection for intuitive dragging
- `rectSortingStrategy` for grid-based items

### 2. `src/components/dnd/DraggableResizableItem.jsx`
Wraps individual widgets to add drag + resize functionality.

**Props:**
- `id` - Unique widget identifier
- `w` - Width in grid columns (1-12)
- `h` - Height in grid rows
- `onResize` - Callback: `(id, newW, newH) => void`
- `label` - Accessible label for drag handle
- `children` - Widget content

**Sizing:**
- Each column ≈ 80px (adjustable via `baseColWidth`)
- Each row ≈ 100px (adjustable via `baseRowHeight`)
- Min size: 1 column × 1 row
- Max size: 12 columns × 4 rows

**Visual Feedback:**
- Dragging: opacity-50 + scale-105
- Hover: shadow-card + scale-[1.01]
- Resize handle: appears on hover at bottom-right corner

### 3. `src/index.css` (Updated)
Added Tailwind utilities for resize handles:

```css
.resize-handle {
  @apply absolute bottom-0 right-0 w-8 h-8 cursor-se-resize
         flex items-center justify-center opacity-0 hover:opacity-100
         transition-opacity duration-200;
}

.react-resizable-handle-se {
  @apply bottom-0 right-0 cursor-se-resize;
}
```

### 4. `src/pages/SampleDashboard.jsx` (Updated)
Integrated drag-and-drop for the Goals & Habits section.

**State Management:**
```javascript
const [widgets, setWidgets] = useState(DEFAULT_WIDGETS);

// Load from localStorage on mount
useEffect(() => {
  const saved = localStorage.getItem('opnpage.layout');
  if (saved) {
    setWidgets(JSON.parse(saved));
  }
}, []);

// Save to localStorage on change
useEffect(() => {
  localStorage.setItem('opnpage.layout', JSON.stringify(widgets));
}, [widgets]);
```

**Default Widget Config:**
```javascript
const DEFAULT_WIDGETS = [
  {
    id: 'run',
    type: 'running',
    w: 4,  // column span
    h: 1,  // row span
    icon: '🏃',
    title: 'Running distance',
    metric: '18.4',
    unit: 'mi',
    delta: 6,
    footnote: 'This week • Goal 20 mi',
    progress: 92,
    spark: [2,3,4,3,5,6,7]
  },
  // ... 5 more widgets
];
```

---

## Usage

### Basic Example
```jsx
import DndGrid from '../components/dnd/DndGrid';
import DraggableResizableItem from '../components/dnd/DraggableResizableItem';

function Dashboard() {
  const [widgets, setWidgets] = useState([
    { id: 'widget1', w: 4, h: 1, ...props },
    { id: 'widget2', w: 4, h: 2, ...props },
  ]);

  const handleResize = (id, newW, newH) => {
    setWidgets(prev =>
      prev.map(widget =>
        widget.id === id ? { ...widget, w: newW, h: newH } : widget
      )
    );
  };

  return (
    <DndGrid items={widgets} setItems={setWidgets}>
      {widgets.map(widget => (
        <DraggableResizableItem
          key={widget.id}
          id={widget.id}
          w={widget.w}
          h={widget.h}
          onResize={handleResize}
          label={widget.title}
        >
          <YourWidgetComponent {...widget} />
        </DraggableResizableItem>
      ))}
    </DndGrid>
  );
}
```

---

## Migrating to Backend API

Currently, layouts are saved to `localStorage`. To sync with a backend:

### 1. Update Save Logic
Replace the localStorage `useEffect` with an API call:

```javascript
// In SampleDashboard.jsx
useEffect(() => {
  // Debounce to avoid excessive API calls
  const timeoutId = setTimeout(async () => {
    try {
      await fetch('/api/layouts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(widgets),
      });
    } catch (error) {
      console.error('Failed to save layout:', error);
    }
  }, 500);

  return () => clearTimeout(timeoutId);
}, [widgets]);
```

### 2. Update Load Logic
Replace localStorage load with API fetch:

```javascript
// In SampleDashboard.jsx
useEffect(() => {
  async function loadLayout() {
    try {
      const response = await fetch('/api/layouts');
      const { data } = await response.json();
      if (data && data.length > 0) {
        setWidgets(data);
      }
    } catch (error) {
      console.error('Failed to load layout:', error);
    }
  }
  loadLayout();
}, []);
```

### 3. Backend API Endpoints

**POST `/api/layouts`**
```json
{
  "userId": "user123",
  "widgets": [
    { "id": "run", "type": "running", "w": 4, "h": 1, ... }
  ]
}
```

**GET `/api/layouts`**
```json
{
  "data": [
    { "id": "run", "type": "running", "w": 4, "h": 1, ... }
  ]
}
```

---

## Keyboard Navigation

- **Tab** - Focus drag handle
- **Enter/Space** - Activate drag (when handle focused)
- **Arrow Keys** - Move widget (when dragging)
- **Escape** - Cancel drag

---

## Styling Customization

### Change Grid Sizing
In `DraggableResizableItem.jsx`:

```javascript
const baseColWidth = 100;  // Increase for wider columns
const baseRowHeight = 120; // Increase for taller rows
```

### Change Hover Effects
In `DraggableResizableItem.jsx`:

```javascript
className={`... ${
  isDragging
    ? 'opacity-50 scale-105 z-50'      // Dragging state
    : 'hover:shadow-card hover:scale-[1.01]'  // Hover state
}`}
```

### Change Resize Handle Icon
In `DraggableResizableItem.jsx`, replace the SVG in the `handle` prop:

```jsx
<div className="resize-handle">
  <svg ...>
    {/* Your custom icon */}
  </svg>
</div>
```

---

## Troubleshooting

### Widgets overlap after resize
- Ensure `w` values don't exceed 12 (grid has 12 columns)
- Check that total width of widgets in same row ≤ 12

### Drag doesn't work
- Verify `@dnd-kit/core` and `@dnd-kit/sortable` are installed
- Check console for errors
- Ensure each widget has unique `id`

### Resize handle not visible
- Check that parent has enough height for handle to appear
- Verify `.resize-handle` CSS is loaded
- Try increasing `opacity` in hover state

### Layout not persisting
- Check browser console for localStorage errors
- Verify `STORAGE_KEY` constant matches
- Clear localStorage and test: `localStorage.removeItem('opnpage.layout')`

---

## Dependencies

```json
{
  "@dnd-kit/core": "^6.x",
  "@dnd-kit/sortable": "^8.x",
  "react-resizable": "^3.x"
}
```

Install with:
```bash
npm i @dnd-kit/core @dnd-kit/sortable react-resizable
```

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile Safari (iOS 14+)
- ✅ Chrome Mobile (Android)

---

## Performance Notes

- **Debounced saves**: localStorage writes are debounced to 500ms
- **Transform-based dragging**: Uses CSS transforms (GPU-accelerated)
- **Memoization**: Consider `useMemo` for large widget lists (50+)
- **Virtual scrolling**: For 100+ widgets, consider `react-window`

---

## Future Enhancements

- [ ] Multi-select for bulk operations
- [ ] Undo/redo functionality
- [ ] Layout presets (compact, spacious, etc.)
- [ ] Widget duplication
- [ ] Export/import layouts
- [ ] Collaborative editing (WebSocket sync)
- [ ] Mobile touch gestures (pinch to resize)

---

## Credits

Built with:
- [@dnd-kit](https://dndkit.com) - Modern drag-and-drop for React
- [react-resizable](https://github.com/react-grid-layout/react-resizable) - Resize components

Designed for **opnpage.me** by @alexruns 🏃
