import React, { useMemo } from 'react'
import { dayjs } from '../lib/date.js'
import DayCell from './DayCell.jsx'

export default function MonthGrid({ month, events }) {
  // Compute 6x7 grid starting on Monday (ISO week)
  const start = month.startOf('month').startOf('week') // Monday
  const days = useMemo(() => {
    return Array.from({ length: 42 }, (_, i) => start.add(i, 'day'))
  }, [month])

  // Group events by day (YYYY-MM-DD)
  const eventsByDay = useMemo(() => {
    const map = new Map()
    for (const e of events) {
      const key = e.start.format('YYYY-MM-DD')
      if (!map.has(key)) map.set(key, [])
      map.get(key).push(e)
    }
    // sort each day's events by start time
    for (const [k, arr] of map.entries()) {
      arr.sort((a, b) => a.start.valueOf() - b.start.valueOf())
    }
    return map
  }, [events])

  return (
    <div className="grid grid-cols-7 gap-2">
      {days.map((d) => (
        <DayCell
          key={d.toString()}
          date={d}
          inMonth={d.month() === month.month()}
          isToday={d.isToday()}
          events={eventsByDay.get(d.format('YYYY-MM-DD')) ?? []}
        />
      ))}
    </div>
  )
}
