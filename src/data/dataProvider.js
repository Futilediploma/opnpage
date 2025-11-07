/**
 * Data Provider
 *
 * Centralized data layer that provides metrics in a standardized format.
 * Each data source returns: { value, unit, delta, history, metadata }
 *
 * Future: Replace with API calls to backend
 */

// Mock data for different metrics
const DATA_SOURCES = {
  running: {
    id: 'running',
    label: 'Running',
    icon: '🏃',
    value: '18.4',
    unit: 'mi',
    delta: 6,
    history: [2, 3, 4, 3, 5, 6, 7],
    metadata: {
      goal: 20,
      progress: 92,
      footnote: 'This week • Goal 20 mi',
    },
  },
  reading: {
    id: 'reading',
    label: 'Reading',
    icon: '📚',
    value: '3',
    unit: 'books',
    delta: 50,
    history: [0, 1, 1, 2, 2, 3, 3],
    metadata: {
      footnote: 'This month',
    },
  },
  gaming: {
    id: 'gaming',
    label: 'Gaming',
    icon: '🎮',
    value: '12.6',
    unit: 'hrs',
    delta: -12,
    history: [5, 6, 7, 6, 5, 4, 3],
    metadata: {
      footnote: 'This week',
    },
  },
  caffeine: {
    id: 'caffeine',
    label: 'Caffeine',
    icon: '☕',
    value: '210',
    unit: 'mg',
    delta: -8,
    history: [280, 260, 240, 230, 220, 210],
    metadata: {
      footnote: 'Daily avg',
    },
  },
  alcohol: {
    id: 'alcohol',
    label: 'Alcohol',
    icon: '🍺',
    value: '2',
    unit: 'drinks',
    delta: -25,
    history: [3, 2, 4, 2, 1, 2, 2],
    metadata: {
      footnote: 'This week',
    },
  },
  activeDays: {
    id: 'activeDays',
    label: 'Active Days',
    icon: '📅',
    value: '5',
    unit: 'days',
    delta: 8,
    history: [3, 4, 5, 5, 6, 6, 7],
    metadata: {
      footnote: 'This week',
    },
  },
  studying: {
    id: 'studying',
    label: 'Studying',
    icon: '📖',
    value: '9',
    unit: 'hrs',
    delta: 18,
    history: [1, 1, 0, 2, 1, 2, 2],
    metadata: {
      footnote: 'This week',
    },
  },
  walking: {
    id: 'walking',
    label: 'Walking',
    icon: '🚶',
    value: '8,500',
    unit: 'steps',
    delta: 12,
    history: [7000, 7500, 8000, 8200, 8300, 8400, 8500],
    metadata: {
      footnote: 'Daily average',
    },
  },
  custom: {
    id: 'custom',
    label: 'Custom Metric',
    icon: '✏️',
    value: '0',
    unit: '',
    delta: 0,
    history: [0, 0, 0, 0, 0, 0, 0],
    metadata: {
      footnote: 'Custom data',
    },
  },
};

/**
 * Get data for a specific source
 * @param {String} sourceId - Data source identifier
 * @returns {Object} Metric data object
 */
export function getDataSource(sourceId) {
  const data = DATA_SOURCES[sourceId];
  if (!data) {
    console.warn(`Data source "${sourceId}" not found`);
    return {
      id: sourceId,
      label: 'Unknown',
      icon: '❓',
      value: '0',
      unit: '',
      delta: null,
      history: [],
      metadata: {},
    };
  }
  return data;
}

/**
 * Get all available data sources
 * @returns {Array} List of all data sources
 */
export function getAllDataSources() {
  return Object.values(DATA_SOURCES);
}

/**
 * Get data source IDs for dropdown/selection
 * @returns {Array} List of { id, label, icon }
 */
export function getDataSourceOptions() {
  return Object.values(DATA_SOURCES).map(({ id, label, icon }) => ({
    id,
    label,
    icon,
  }));
}
