import { getDataSource } from '../data/dataProvider';
import PillVisualization from './visualizations/PillVisualization';
import LineGraphVisualization from './visualizations/LineGraphVisualization';
import StatChipVisualization from './visualizations/StatChipVisualization';
import BarChartVisualization from './visualizations/BarChartVisualization';
import BigNumberVisualization from './visualizations/BigNumberVisualization';
import CalendarVisualization from './visualizations/CalendarVisualization';

/**
 * WidgetRenderer
 *
 * Central component that renders the appropriate visualization based on type.
 * Fetches data from dataProvider and passes it to the visualization component.
 *
 * @param {Object} widget - Widget configuration
 * @param {String} widget.visualizationType - Type of visualization (pill, lineGraph, etc.)
 * @param {String} widget.dataSource - Data source ID (running, books, etc.)
 * @param {Object} widget.config - Optional visualization-specific config
 */
export default function WidgetRenderer({ widget, readingData, showOnWidget, metricData }) {
  const { visualizationType, dataSource, config = {}, customLabel, customIcon } = widget;

  // Fetch data from provider
  let data = getDataSource(dataSource);

  // If custom data source and custom label/icon provided, override
  if (dataSource === 'custom' && customLabel) {
    data = {
      ...data,
      label: customLabel,
      icon: customIcon || '📊',
    };
  }

  // Map visualization type to component
  const visualizationComponents = {
    pill: PillVisualization,
    lineGraph: LineGraphVisualization,
    statChip: StatChipVisualization,
    barChart: BarChartVisualization,
    bigNumber: BigNumberVisualization,
    calendar: CalendarVisualization,
  };

  const VisualizationComponent = visualizationComponents[visualizationType];

  if (!VisualizationComponent) {
    return (
      <div className="card h-full flex items-center justify-center">
        <p className="text-brand-navy/50 dark:text-brand-text-dark/50">
          Unknown visualization: {visualizationType}
        </p>
      </div>
    );
  }

  // For reading widget, pass extra info if requested
  if (dataSource === 'reading') {
    return <VisualizationComponent data={data} config={config} readingData={readingData} showOnWidget={showOnWidget} />;
  }
  return <VisualizationComponent data={data} config={config} metricData={metricData} showOnWidget={showOnWidget} />;
}

/**
 * Get all available visualization types
 * @returns {Array} List of { id, label, description }
 */
export function getVisualizationTypes() {
  return [
    {
      id: 'pill',
      label: 'Pill',
      description: 'Compact card with icon, value, and sparkline',
      preview: '📊',
    },
    {
      id: 'lineGraph',
      label: 'Line Graph',
      description: 'Time series chart with trend line',
      preview: '📈',
    },
    {
      id: 'barChart',
      label: 'Bar Chart',
      description: 'Vertical bars comparing values',
      preview: '📊',
    },
    {
      id: 'calendar',
      label: 'Calendar',
      description: 'Monthly calendar showing daily completion',
      preview: '📅',
    },
    {
      id: 'statChip',
      label: 'Stat Chip',
      description: 'Minimal stat with small sparkline',
      preview: '🔢',
    },
    {
      id: 'bigNumber',
      label: 'Big Number',
      description: 'Large, prominent number display',
      preview: '💯',
    },
  ];
}
