import React, { useMemo, useState } from 'react'
import { dayjs } from '../lib/date.js'
import MonthGrid from './MonthGrid.jsx'

function Header({ month, onPrev, onNext, onToday }) {
  const label = month.format('MMMM YYYY')
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between mb-4">
      <div className="flex items-center gap-2">
        <button onClick={onPrev} className="px-3 py-2 rounded-xl bg-white shadow-soft hover:shadow">
          ‹
        </button>
        <button onClick={onNext} className="px-3 py-2 rounded-xl bg-white shadow-soft hover:shadow">
          ›
        </button>
        <button onClick={onToday} className="px-3 py-2 rounded-xl bg-slate-900 text-white shadow-soft hover:opacity-90">
          Today
        </button>
        <div className="ml-3 text-xl font-semibold">{label}</div>
      </div>
      <div className="grid grid-cols-7 text-center text-xs uppercase tracking-wide text-slate-500">
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>
    </div>
  )
}

export default function Calendar({ events = [], initialMonth }) {
  const [month, setMonth] = useState(initialMonth?.startOf('month') ?? dayjs().startOf('month'))

  const monthEvents = useMemo(() => {
    // Normalize events for the visible month
    return events.map((e, idx) => {
      const start = dayjs(`${e.date} ${e.time}`, 'YYYY-MM-DD HH:mm')
      const end = start.add(e.duration || 60, 'minute')
      return { ...e, id: e.id ?? idx, start, end }
    })
  }, [events])

  return (
    <section className="bg-white rounded-2xl p-4 md:p-6 shadow-soft">
      <Header
        month={month}
        onPrev={() => setMonth(month.subtract(1, 'month'))}
        onNext={() => setMonth(month.add(1, 'month'))}
        onToday={() => setMonth(dayjs().startOf('month'))}
      />
      <MonthGrid month={month} events={monthEvents} />
    </section>
  )
}
