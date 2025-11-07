import dayjs from 'dayjs'
import isoWeek from 'dayjs/plugin/isoWeek'
import isToday from 'dayjs/plugin/isToday'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import duration from 'dayjs/plugin/duration'

dayjs.extend(isoWeek)
dayjs.extend(isToday)
dayjs.extend(localizedFormat)
dayjs.extend(customParseFormat)
dayjs.extend(duration)

export { dayjs }
