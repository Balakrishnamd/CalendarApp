import React, { useEffect, useMemo, useState } from 'react'
import Calendar from './components/Calendar.jsx'
import { dayjs } from './lib/date.js'

export default function App() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch('/events.json')
        if (!res.ok) throw new Error('Failed to load events.json')
        const data = await res.json()
        setEvents(data)
      } catch (e) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [])

  const today = useMemo(() => dayjs(), [])

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <header className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold">Calendar</h1>
          <p className="text-slate-600">A simple, Google Calendar–style month view</p>
        </header>
        {loading && <p>Loading events…</p>}
        {error && (
          <p className="text-red-600">Could not load events: {error}. Make sure events.json exists in /public.</p>
        )}
        <Calendar events={events} initialMonth={today} />
        <footer className="mt-10 text-xs text-slate-500">
          <p>
            Tip: Click “Today” to jump back. Overlapping events get color-coded lanes and a warning on hover.
          </p>
        </footer>
      </div>
    </div>
  )
}
