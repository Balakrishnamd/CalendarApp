import React, { useMemo } from 'react'
import { assignLanes } from './laneUtils.js'

function EventChip({ e, lane }) {
  return (
    <div
      title={e.title + ' — ' + e.start.format('HH:mm') + ' (' + (e.duration || 60) + 'm)'}
      className="flex items-center gap-2 text-xs rounded-lg px-2 py-1 bg-slate-100"
      style={{ transform: `translateX(${lane * 6}px)` }}
    >
      <span className="inline-block w-2 h-2 rounded-full" style={{ background: e.color || '#475569' }} />
      <span className="truncate max-w-[10rem]">{e.title}</span>
      <span className="text-[10px] text-slate-500">{e.start.format('HH:mm')}</span>
    </div>
  )
}

export default function DayCell({ date, inMonth, isToday, events }) {
  const { lanes, overflow } = useMemo(() => assignLanes(events), [events])

  const maxVisible = 3
  const visible = lanes.slice(0, maxVisible)
  const hiddenCount = Math.max(0, lanes.length - maxVisible)

  return (
    <div
      className={[
        'min-h-[110px] border rounded-xl p-2 flex flex-col gap-1 bg-white',
        inMonth ? 'border-slate-200' : 'border-slate-100 bg-slate-50',
        isToday ? 'ring-2 ring-slate-900' : ''
      ].join(' ')}
    >
      <div className="flex items-center justify-between">
        <div className={"text-sm " + (inMonth ? 'text-slate-900' : 'text-slate-400')}>{date.date()}</div>
        {overflow && (
          <span className="text-[10px] px-1 rounded bg-amber-100 text-amber-800" title="Overlapping events">
            overlap
          </span>
        )}
      </div>

      <div className="mt-1 flex-1 flex flex-col gap-1 overflow-hidden">
        {visible.map((item, idx) => (
          <EventChip key={idx} e={item.event} lane={item.lane} />
        ))}
        {hiddenCount > 0 && (
          <div className="text-xs text-slate-600">+{hiddenCount} more</div>
        )}
      </div>
    </div>
  )
}
