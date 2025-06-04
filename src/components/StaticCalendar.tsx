'use client'
import '@/styles/calendar.scss';
import { useMemo } from 'react';

export default function StaticCalendar() {
   const year = 2025;
  const month = 7; // тамыз (0-based)
  const selectedDate = new Date(2025, 7, 31);

  const daysInMonth = useMemo(() => {
    const total = new Date(year, month + 1, 0).getDate();
    return Array.from({ length: total }, (_, i) => i + 1);
  }, [year, month]);

  const firstDay = new Date(year, month, 1).getDay(); // 0 = Sunday
  const paddedStart = (firstDay + 6) % 7; // make Monday = 0

  const weeks = useMemo(() => {
    const days = Array(paddedStart).fill(null).concat(daysInMonth);
    const result = [];
    for (let i = 0; i < days.length; i += 7) {
      result.push(days.slice(i, i + 7));
    }
    return result;
  }, [daysInMonth, paddedStart]);

  const weekdays = ["ДС", "СС", "СР", "БС", "ЖМ", "СБ", "ЖС"];

  return (
    <div className="calendar">
      <div className="calendar__title">Той салтанаты:</div>
      <div className="calendar__meta">
        <span>жексенбі</span>
        <div><strong>31</strong></div>
        <span>тамыз 2025</span>
      </div>

      <div className="calendar__weekdays">
        {weekdays.map((day) => <span key={day}>{day}</span>)}
      </div>

      <div className="calendar__days">
        {weeks.map((week, i) => (
          <div className="calendar__week" key={i}>
            {week.map((day, j) => (
              <div
                key={j}
                className={`calendar__day ${day === 31 ? "selected" : ""}`}
              >
                {day && day}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div className='calendar__time'>
        сағат 17:00-де
      </div>
    </div>
  );
}