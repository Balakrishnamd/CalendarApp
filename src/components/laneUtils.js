// Assign events to "lanes" for a day to visualize overlaps.
// Input events must have .start (dayjs) and .end (dayjs)
export function assignLanes(events) {
  const lanes = [] // array of { lane, event }
  const laneEndTimes = [] // last end time for each lane
  let overflow = false

  for (const e of events) {
    let placed = false
    for (let i = 0; i < laneEndTimes.length; i++) {
      if (e.start.isSameOrAfter ? e.start.isSameOrAfter(laneEndTimes[i]) : e.start.valueOf() >= laneEndTimes[i].valueOf()) {
        lanes.push({ lane: i, event: e })
        laneEndTimes[i] = e.end
        placed = true
        break
      }
    }
    if (!placed) {
      lanes.push({ lane: laneEndTimes.length, event: e })
      laneEndTimes.push(e.end)
      if (laneEndTimes.length > 1) overflow = true
    }
  }
  return { lanes, overflow }
}
