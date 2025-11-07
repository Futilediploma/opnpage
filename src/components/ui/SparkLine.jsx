import React from "react";

// Simple Sparkline component using SVG
const Sparkline = ({ data = [], width = 100, height = 30, color = "#4F46E5" }) => {
  if (!data.length) return <svg width={width} height={height}></svg>;

  // Normalize data to fit SVG height
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width;
    const y = height - ((d - min) / range) * height;
    return `${x},${y}`;
  });

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        points={points.join(" ")}
      />
    </svg>
  );
};

export default Sparkline;
