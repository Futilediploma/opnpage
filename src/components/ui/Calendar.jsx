import React from 'react';

// Simple calendar for current month
export default function Calendar() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay(); // 0 (Sun) - 6 (Sat)
  const weeks = [];
  let day = 1 - startDay;

  for (let w = 0; w < 6; w++) {
    let week = [];
    for (let d = 0; d < 7; d++, day++) {
      if (day < 1 || day > daysInMonth) {
        week.push(null);
      } else {
        week.push(day);
      }
    }
    weeks.push(week);
    if (day > daysInMonth) break;
  }

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="bg-white rounded-xl border border-brand-gray p-16 shadow-subtle w-full max-w-xs">
      <div className="flex justify-between items-center mb-8">
        <span className="font-semibold text-brand-navy">{today.toLocaleString('default', { month: 'long' })} {year}</span>
      </div>
      <div className="grid grid-cols-7 gap-2 text-xs text-brand-navy/60 mb-2">
        {dayNames.map((d) => <div key={d} className="text-center">{d}</div>)}
      </div>
      <div className="grid grid-cols-7 gap-2">
        {weeks.flat().map((d, i) => (
          <div key={i} className={`h-10 flex items-center justify-center rounded ${d === today.getDate() ? 'bg-brand-orange text-white font-bold' : 'text-brand-navy/80'}`}>
            {d || ''}
          </div>
        ))}
      </div>
    </div>
  );
}
