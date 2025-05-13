export default function timeAgo(date: Date): string {
  const now: Date = new Date()
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000)
  const intervals: { [key: string]: number } = {
    year: 31536000,
    month: 2592000,
    week: 604800,
    day: 86400,
    hour: 3600,
    minute: 60,
    second: 1,
  }
  if (seconds > intervals.year * 5) {
    return `Posted on ${date.toLocaleDateString()}`
  }
  for (const [unit, value] of Object.entries(intervals)) {
    const count = Math.floor(seconds / value)
    if (count > 0) {
      return `Posted ${count} ${unit}${count > 1 ? 's' : ''} ago`
    }
  }
  return 'Just now'
}
