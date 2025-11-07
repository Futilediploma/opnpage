import { useState } from 'react';

/**
 * CalendarVisualization
 *
 * Monthly calendar heat map showing daily completion/activity.
 * Perfect for tracking habits, streaks, and consistency.
 *
 * @param {Object} data - Data from dataProvider: { icon, label, value, unit, history, metadata }
 */
export default function CalendarVisualization({ data }) {
  const { icon, label } = data;
  const [currentDate] = useState(new Date());

  // Get calendar data for current month
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay(); // 0 = Sunday

  // Mock data: days where activity was completed (you'd get this from the data source)
  // For now, randomly mark some days as completed
  const completedDays = new Set([1, 3, 5, 7, 8, 10, 12, 14, 15, 17, 19, 21, 23, 24, 26, 28, 30]);

  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                      'July', 'August', 'September', 'October', 'November', 'December'];

  // Create array of day objects
  const calendarDays = [];

  // Add empty cells for days before month starts
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push({ day: null, isCompleted: false });
  }

  // Add actual days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push({
      day,
      isCompleted: completedDays.has(day),
      isToday: day === currentDate.getDate() &&
               month === new Date().getMonth() &&
               year === new Date().getFullYear(),
    });
  }

  return (
    <div className="card h-full flex flex-col">
      {/* Header */}
      <div className="flex items-center gap-3 mb-4">
        <span className="text-2xl" aria-hidden="true">{icon}</span>
        <div className="flex-1">
          <h3 className="text-base font-semibold text-brand-navy dark:text-brand-text-dark">
            {label}
          </h3>
          <p className="text-sm text-brand-navy/50 dark:text-brand-text-dark/50">
            {monthNames[month]} {year}
          </p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map((day) => (
            <div
              key={day}
              className="text-center text-xs font-medium text-brand-navy/50 dark:text-brand-text-dark/50 py-1"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((dayObj, index) => (
            <div
              key={index}
              className={`aspect-square flex items-center justify-center text-sm rounded-md transition-all ${
                !dayObj.day
                  ? ''
                  : dayObj.isToday
                  ? 'bg-brand-orange/20 border-2 border-brand-orange text-brand-navy dark:text-brand-text-dark font-bold'
                  : dayObj.isCompleted
                  ? 'bg-green-500/20 text-green-700 dark:text-green-400 font-medium hover:bg-green-500/30'
                  : 'bg-brand-gray/10 dark:bg-brand-gray-dark/20 text-brand-navy/40 dark:text-brand-text-dark/40 hover:bg-brand-gray/20 dark:hover:bg-brand-gray-dark/30'
              }`}
              title={dayObj.day ? `${monthNames[month]} ${dayObj.day}${dayObj.isCompleted ? ' - Completed' : ''}` : ''}
            >
              {dayObj.day}
            </div>
          ))}
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-brand-gray/20 dark:border-brand-gray-dark/30">
        <div className="flex items-center justify-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-green-500/20 border border-green-500/40"></div>
            <span className="text-brand-navy/60 dark:text-brand-text-dark/60">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-brand-gray/10 dark:bg-brand-gray-dark/20 border border-brand-gray/30"></div>
            <span className="text-brand-navy/60 dark:text-brand-text-dark/60">Not done</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded bg-brand-orange/20 border-2 border-brand-orange"></div>
            <span className="text-brand-navy/60 dark:text-brand-text-dark/60">Today</span>
          </div>
        </div>
      </div>
    </div>
  );
}
