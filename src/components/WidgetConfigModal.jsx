import { useState } from 'react';
import { getVisualizationTypes } from './WidgetRenderer';
import { getDataSourceOptions } from '../data/dataProvider';

/**
 * WidgetConfigModal
 *
 * Modal for configuring widget visualization type and data source.
 * Appears when user clicks edit icon on a widget in edit mode.
 *
 * @param {Object} widget - Current widget configuration
 * @param {Function} onSave - Callback: (updatedWidget) => void
 * @param {Function} onClose - Callback to close modal
 * @param {Function} onDelete - Callback to delete widget
 */
export default function WidgetConfigModal({ widget, onSave, onClose, onDelete }) {
  const [visualizationType, setVisualizationType] = useState(widget.visualizationType);
  const [dataSource, setDataSource] = useState(widget.dataSource);
  const [customLabel, setCustomLabel] = useState(widget.customLabel || '');
  const [customIcon, setCustomIcon] = useState(widget.customIcon || '📊');

  const visualizationTypes = getVisualizationTypes();
  const dataSourceOptions = getDataSourceOptions();

  const handleSave = () => {
    const updatedWidget = {
      ...widget,
      visualizationType,
      dataSource,
    };

    // If custom data source, include custom label and icon
    if (dataSource === 'custom') {
      updatedWidget.customLabel = customLabel;
      updatedWidget.customIcon = customIcon;
    }

    onSave(updatedWidget);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-brand-gray-dark rounded-xl shadow-lifted max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="p-6 border-b border-brand-gray/20 dark:border-brand-gray-dark/30">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-brand-navy dark:text-brand-text-dark">
              Configure Widget
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-brand-gray/10 dark:hover:bg-brand-navy-dark rounded-md transition-colors"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          {/* Data Source Selection */}
          <div>
            <label className="block text-sm font-medium text-brand-navy dark:text-brand-text-dark mb-3">
              Data Source
            </label>
            <div className="grid grid-cols-2 gap-3">
              {dataSourceOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => setDataSource(option.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    dataSource === option.id
                      ? 'border-brand-orange bg-brand-orange/5'
                      : 'border-brand-gray/30 dark:border-brand-gray-dark/30 hover:border-brand-orange/50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{option.icon}</span>
                    <span className="font-medium text-brand-navy dark:text-brand-text-dark">
                      {option.label}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Custom Label Input - Only show if custom data source is selected */}
            {dataSource === 'custom' && (
              <div className="mt-4 space-y-3">
                <div>
                  <label className="block text-sm font-medium text-brand-navy dark:text-brand-text-dark mb-2">
                    Custom Label (e.g., "Podcasts", "Meditation")
                  </label>
                  <input
                    type="text"
                    value={customLabel}
                    onChange={(e) => setCustomLabel(e.target.value)}
                    placeholder="Enter custom metric name"
                    className="w-full px-4 py-2 rounded-lg border-2 border-brand-gray/30 dark:border-brand-gray-dark/30 bg-white dark:bg-brand-navy-dark text-brand-navy dark:text-brand-text-dark placeholder:text-brand-navy/40 dark:placeholder:text-brand-text-dark/40 focus:outline-none focus:border-brand-orange transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-navy dark:text-brand-text-dark mb-2">
                    Icon (emoji)
                  </label>
                  <input
                    type="text"
                    value={customIcon}
                    onChange={(e) => setCustomIcon(e.target.value)}
                    placeholder="📊"
                    maxLength={2}
                    className="w-24 px-4 py-2 rounded-lg border-2 border-brand-gray/30 dark:border-brand-gray-dark/30 bg-white dark:bg-brand-navy-dark text-brand-navy dark:text-brand-text-dark placeholder:text-brand-navy/40 dark:placeholder:text-brand-text-dark/40 focus:outline-none focus:border-brand-orange transition-colors text-center text-2xl"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Visualization Type Selection */}
          <div>
            <label className="block text-sm font-medium text-brand-navy dark:text-brand-text-dark mb-3">
              Visualization Type
            </label>
            <div className="space-y-3">
              {visualizationTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => setVisualizationType(type.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all text-left ${
                    visualizationType === type.id
                      ? 'border-brand-orange bg-brand-orange/5'
                      : 'border-brand-gray/30 dark:border-brand-gray-dark/30 hover:border-brand-orange/50'
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className="text-3xl">{type.preview}</span>
                    <div className="flex-1">
                      <p className="font-medium text-brand-navy dark:text-brand-text-dark">
                        {type.label}
                      </p>
                      <p className="text-sm text-brand-navy/60 dark:text-brand-text-dark/60">
                        {type.description}
                      </p>
                    </div>
                    {visualizationType === type.id && (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-brand-orange">
                        <path d="M5 13L9 17L19 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-brand-gray/20 dark:border-brand-gray-dark/30 flex items-center justify-between">
          <button
            onClick={() => {
              if (confirm('Delete this widget?')) {
                onDelete(widget.id);
                onClose();
              }
            }}
            className="px-4 py-2 rounded-lg font-medium text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          >
            Delete Widget
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg font-medium text-sm text-brand-navy dark:text-brand-text-dark hover:bg-brand-gray/10 dark:hover:bg-brand-navy-dark transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 rounded-lg font-medium text-sm bg-brand-orange text-white hover:bg-[#d94f04] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
