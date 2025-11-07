import { useState, useEffect } from 'react';
import DashboardLayout from '../components/layout/DashboardLayout';
import NoteCard from '../components/ui/NoteCard';
import DndGrid from '../components/dnd/DndGrid';
import DraggableResizableItem from '../components/dnd/DraggableResizableItem';
import WidgetRenderer from '../components/WidgetRenderer';
import ReadingWidgetPopup from '../components/ReadingWidgetPopup';
import MetricWidgetPopup from '../components/MetricWidgetPopup';
import WidgetConfigModal from '../components/WidgetConfigModal';

/**
 * SampleDashboard
 *
 * Production dashboard with 12-column CSS grid layout.
 * Wrapped in DashboardLayout for sidebar + topbar.
 *
 * Layout sections:
 * 1. Overview strip: 3 stat chips (col-span-12)
 * 2. Trends row: wide chart (col-span-8) + 2 highlights (col-span-4 stacked)
 * 3. Goals & Habits: 6 DRAGGABLE + RESIZABLE widgets (drag to reorder, resize handles in corners)
 * 4. Right rail: donut + calendar (col-span-4, collapse on md)
 * 5. Notes card: full-width textarea (col-span-12)
 *
 * Drag & Drop:
 * - Widgets can be reordered via drag-and-drop (@dnd-kit/sortable)
 * - Widgets can be resized via corner handles (react-resizable)
 * - Layout persists to localStorage ('opnpage.layout')
 * - On mount, loads saved layout or uses defaults
 *
 * Data Integration Points:
 * - TODO: Replace hardcoded values with API calls
 * - TODO: Wire date filter from DashboardLayout to update all metrics
 * - TODO: Connect NoteCard onSave to POST /api/notes/{date}
 * - TODO: Replace localStorage with API:
 *   // Save: await fetch('/api/layouts', { method: 'POST', body: JSON.stringify(widgets) })
 *   // Load: const { data } = await fetch('/api/layouts').then(r => r.json())
 */

const STORAGE_KEY = 'opnpage.layout.v2';

// Default widget configurations using new model
// Each widget has: visualizationType + dataSource (instead of hardcoded data)
const DEFAULT_WIDGETS = [
  { id: 'widget-1', visualizationType: 'pill', dataSource: 'running', w: 4, h: 1 },
  { id: 'widget-2', visualizationType: 'pill', dataSource: 'reading', w: 4, h: 1 },
  { id: 'widget-3', visualizationType: 'pill', dataSource: 'gaming', w: 4, h: 1 },
  { id: 'widget-4', visualizationType: 'pill', dataSource: 'caffeine', w: 4, h: 1 },
  { id: 'widget-5', visualizationType: 'pill', dataSource: 'studying', w: 4, h: 1 },
  { id: 'widget-6', visualizationType: 'pill', dataSource: 'walking', w: 4, h: 1 },
];

function SampleDashboard() {
  const [widgets, setWidgets] = useState(DEFAULT_WIDGETS);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingWidget, setEditingWidget] = useState(null);
  const [showModal, setShowModal] = useState(true);
  const [showReadingPopup, setShowReadingPopup] = useState(false);
  const [readingData, setReadingData] = useState({ books: Array(5).fill(''), favorites: Array(3).fill(''), goodreadsUrl: '' });
  const [showOnWidget, setShowOnWidget] = useState(false);
  // State for other metric popups
  const [activeMetricPopup, setActiveMetricPopup] = useState(null); // metric id
  const [metricPopupData, setMetricPopupData] = useState({}); // { metricId: { notes: [], customLink: '' } }
  const [metricShowOnWidget, setMetricShowOnWidget] = useState({}); // { metricId: bool }

  // Load layout from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setWidgets(parsed);
      } catch (error) {
        console.error('Failed to load layout:', error);
      }
    }
  }, []);

  // Save layout to localStorage whenever widgets change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(widgets));
  }, [widgets]);

  return (
    <DashboardLayout>
      {/* Popup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white rounded-xl shadow-xl p-10 max-w-md w-full text-center">
            <h3 className="text-xl font-semibold mb-4 text-brand-navy">Welcome to the Sample Dashboard!</h3>
            <p className="mb-6 text-brand-navy/80">Try the <span className="font-bold text-brand-orange">Edit Layout</span> button above and see what you can come up with using pregenerated information.</p>
            <button
              className="btn btn-primary w-full"
              onClick={() => setShowModal(false)}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
      {/* Edit Mode Toggle */}
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {isEditMode && (
            <>
              <div className="flex items-center gap-2 text-sm text-brand-orange">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2"/>
                  <path d="M12 8V12L14 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                <span className="font-medium">Edit Mode: Drag to reorder widgets</span>
              </div>
              {/* Add Widget Button */}
              <button
                onClick={() => {
                  const newWidget = {
                    id: `widget-${Date.now()}`,
                    visualizationType: 'pill',
                    dataSource: 'running',
                    w: 4,
                    h: 1,
                  };
                  setWidgets((prev) => [...prev, newWidget]);
                  setEditingWidget(newWidget);
                }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg font-medium text-sm bg-white dark:bg-brand-gray-dark border border-brand-gray/30 dark:border-brand-gray-dark/30 text-brand-navy dark:text-brand-text-dark hover:bg-brand-gray/10 dark:hover:bg-brand-navy-dark transition-all"
                title="Add new widget"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add Widget
              </button>
            </>
          )}
        </div>
        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all ${
            isEditMode
              ? 'bg-brand-orange text-white shadow-sm hover:bg-[#d94f04]'
              : 'bg-white dark:bg-brand-gray-dark border border-brand-gray/30 dark:border-brand-gray-dark/30 text-brand-navy dark:text-brand-text-dark hover:bg-brand-gray/10 dark:hover:bg-brand-navy-dark'
          }`}
          aria-pressed={isEditMode}
        >
          {isEditMode ? (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <rect x="5" y="11" width="14" height="10" rx="2" stroke="currentColor" strokeWidth="2"/>
                <path d="M7 11V7C7 4.79086 8.79086 3 11 3H13C15.2091 3 17 4.79086 17 7V11" stroke="currentColor" strokeWidth="2"/>
              </svg>
              Lock Layout
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M12 20H21M16 16.5L18.5 19L23 14.5M3 20H7.5M3 16H9M3 12H9M3 8H9M3 4H9M13.5 8H21M13.5 4H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit Layout
            </>
          )}
        </button>
      </div>

      {/* 12-column grid container */}
      <div className="grid grid-cols-12 gap-12">

        {/* SECTION 3: Goals & Habits Grid - DRAGGABLE widgets */}
        <div className="col-span-12">
          <DndGrid items={widgets} setItems={setWidgets} disabled={!isEditMode}>
            {widgets.map((widget) => (
              <DraggableResizableItem
                key={widget.id}
                id={widget.id}
                w={widget.w}
                h={widget.h}
                label={widget.dataSource}
                isEditMode={isEditMode}
                onEdit={(widgetId) => {
                  const widgetToEdit = widgets.find((w) => w.id === widgetId);
                  setEditingWidget(widgetToEdit);
                }}
              >
                {widget.dataSource === 'reading' ? (
                  <div onClick={() => setShowReadingPopup(true)} style={{ cursor: 'pointer' }}>
                    <WidgetRenderer widget={widget} readingData={readingData} showOnWidget={showOnWidget} />
                  </div>
                ) : (
                  <div onClick={() => setActiveMetricPopup(widget.dataSource)} style={{ cursor: 'pointer' }}>
                    <WidgetRenderer
                      widget={widget}
                      metricData={metricPopupData[widget.dataSource]}
                      showOnWidget={metricShowOnWidget[widget.dataSource]}
                    />
                  </div>
                )}
              </DraggableResizableItem>
            ))}
          </DndGrid>
        </div>

        {/* Widget Configuration Modal */}
        {editingWidget && (
          <WidgetConfigModal
            widget={editingWidget}
            onSave={(updatedWidget) => {
              setWidgets((prev) =>
                prev.map((w) => (w.id === updatedWidget.id ? updatedWidget : w))
              );
            }}
            onClose={() => setEditingWidget(null)}
            onDelete={(widgetId) => {
              setWidgets((prev) => prev.filter((w) => w.id !== widgetId));
            }}
          />
        )}

        {/* Reading Widget Popup */}
        <ReadingWidgetPopup
          open={showReadingPopup}
          onClose={() => setShowReadingPopup(false)}
          books={readingData.books}
          onSave={(data) => setReadingData(data)}
          showOnWidget={showOnWidget}
          setShowOnWidget={setShowOnWidget}
        />
        {/* Metric popups for all other widgets */}
        {activeMetricPopup && (
          <MetricWidgetPopup
            open={true}
            onClose={() => setActiveMetricPopup(null)}
            metric={activeMetricPopup.charAt(0).toUpperCase() + activeMetricPopup.slice(1)}
            data={metricPopupData[activeMetricPopup]}
            onSave={data => {
              setMetricPopupData(prev => ({ ...prev, [activeMetricPopup]: data }));
            }}
            showOnWidget={!!metricShowOnWidget[activeMetricPopup]}
            setShowOnWidget={checked => setMetricShowOnWidget(prev => ({ ...prev, [activeMetricPopup]: checked }))}
          />
        )}
        {/* SECTION 5: Notes Card - Full Width (Under Development) */}
        <div className="col-span-12">
          <div className="bg-brand-gray/40 border border-brand-gray rounded-xl p-20 flex flex-col items-center justify-center text-center opacity-60 select-none mb-8">
            <h4 className="text-lg font-semibold text-brand-navy mb-4">Notes & Reflection</h4>
            <p className="text-brand-navy/60 mb-2">Under Development</p>
            <p className="text-sm text-brand-navy/40">This section will allow you to reflect on your progress and add notes soon.</p>
          </div>
        </div>

        {/* SECTION 6: Connection Hub - Under Development */}
        <div className="col-span-12">
          <div className="bg-brand-gray/40 border border-brand-gray rounded-xl p-20 flex flex-col items-center justify-center text-center opacity-60 select-none">
            <h4 className="text-lg font-semibold text-brand-navy mb-4">Connection Hub</h4>
            <p className="text-brand-navy/60 mb-2">Under Development</p>
            <p className="text-sm text-brand-navy/40">This section will help you connect with others and share your progress in future updates.</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default SampleDashboard;
