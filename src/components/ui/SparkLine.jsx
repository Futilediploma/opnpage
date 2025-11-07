export default function Sparkline({ data = [3,5,4,6,8,7,9], stroke = '#0F2233' }) {
  const width = 140, height = 40, max = Math.max(...data), min = Math.min(...data);
  const points = data.map((d, i) => {
    const x = (i / (data.length - 1)) * (width - 2) + 1;
    const y = height - ((d - min) / (max - min || 1)) * (height - 2) - 1;
    return `${x},${y}`;
  }).join(' ');
  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} aria-hidden="true">
      <polyline points={points} fill="none" stroke={stroke} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round"/>
    </svg>
  );
}
