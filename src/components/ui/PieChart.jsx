import React from 'react';

// Simple PieChart using SVG. Data is an array of { value, color, label }
export default function PieChart({ data = [], size = 120 }) {
  const total = data.reduce((sum, d) => sum + d.value, 0);
  let cumulative = 0;
  const center = size / 2;
  const radius = center - 8;
  const strokeWidth = 16;

  // Helper to describe an SVG arc
  const describeArc = (startAngle, endAngle) => {
    const start = polarToCartesian(center, center, radius, endAngle);
    const end = polarToCartesian(center, center, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y
    ].join(' ');
  };

  function polarToCartesian(cx, cy, r, angle) {
    const rad = (angle - 90) * Math.PI / 180.0;
    return {
      x: cx + r * Math.cos(rad),
      y: cy + r * Math.sin(rad)
    };
  }

  let arcs = data.map((slice, i) => {
    const valueAngle = (slice.value / total) * 360;
    const startAngle = cumulative;
    const endAngle = cumulative + valueAngle;
    cumulative += valueAngle;
    return (
      <path
        key={i}
        d={describeArc(startAngle, endAngle)}
        fill="none"
        stroke={slice.color}
        strokeWidth={strokeWidth}
      />
    );
  });

  return (
    <div className="flex flex-col items-center">
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {arcs}
      </svg>
      <div className="flex flex-wrap justify-center gap-8 mt-8">
        {data.map((slice, i) => (
          <span key={i} className="flex items-center gap-4 text-sm">
            <span style={{background: slice.color}} className="inline-block w-10 h-10 rounded-full"></span>
            {slice.label}
          </span>
        ))}
      </div>
    </div>
  );
}
