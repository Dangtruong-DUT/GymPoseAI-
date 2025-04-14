import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)

export const numberFormatter = new Intl.NumberFormat('en', {
    notation: 'compact',
    compactDisplay: 'short'
})

export const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        day: 'numeric',
        month: 'short'
    }
    return date.toLocaleDateString('en-US', options)
}

export const formatRelativeTimeFromNow = (isoString: string): string => {
    const now = dayjs().tz('Asia/Ho_Chi_Minh')
    const date = dayjs(isoString).tz('Asia/Ho_Chi_Minh')
    return `About ${now.to(date)}`
}
