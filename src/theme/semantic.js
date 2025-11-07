/**
 * Semantic Color Tokens
 *
 * Non-brand colors for UI feedback (success, error, warning, info).
 * Use these for trends, alerts, and interactive states.
 *
 * Integration with Tailwind:
 * - Import these in components that need semantic colors
 * - For Tailwind config extension, add to tailwind.config.js
 *
 * Usage:
 *   import { SEMANTIC_COLORS } from '../../theme/semantic';
 *   <div style={{ color: SEMANTIC_COLORS.success.text }}>...</div>
 */

export const SEMANTIC_COLORS = {
  success: {
    text: '#0B6B3A',      // Dark green for text
    bg: '#E7F6EC',        // Light green background
    border: '#34D399',    // Medium green for borders
  },
  error: {
    text: '#8A1C00',      // Dark red for text
    bg: '#FDEDEA',        // Light red background
    border: '#EF4444',    // Medium red for borders
  },
  warning: {
    text: '#92400E',      // Dark amber
    bg: '#FEF3C7',        // Light amber
    border: '#F59E0B',    // Medium amber
  },
  info: {
    text: '#1E40AF',      // Dark blue
    bg: '#DBEAFE',        // Light blue
    border: '#3B82F6',    // Medium blue
  },
};

export default SEMANTIC_COLORS;
