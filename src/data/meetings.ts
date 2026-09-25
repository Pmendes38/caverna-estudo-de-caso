export type Meeting = {
  title: string;
  weekday: number;
  hour: number;
  minute: number;
  href: string;
};

// Programação regular publicada pela igreja. Datas sazonais só entram aqui quando confirmadas.
export const regularMeetings: Meeting[] = [
  { title: 'DISCIPULADO', weekday: 4, hour: 19, minute: 30, href: '/agenda' },
  { title: 'CULTO PÚBLICO', weekday: 6, hour: 19, minute: 30, href: '/agenda' },
];

const weekdayNumbers: Record<string, number> = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

export function getNextMeeting(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: 'America/Sao_Paulo', year: 'numeric', month: '2-digit', day: '2-digit', weekday: 'short',
  }).formatToParts(now);
  const read = (type: string) => parts.find((part) => part.type === type)?.value ?? '';
  const year = Number(read('year'));
  const month = Number(read('month'));
  const day = Number(read('day'));
  const weekday = weekdayNumbers[read('weekday')];
  if (!year || !month || !day || weekday === undefined) return null;

  return regularMeetings.flatMap((meeting) => {
    const daysUntil = (meeting.weekday - weekday + 7) % 7;
    return [daysUntil, daysUntil + 7].map((extraDays) => {
      const calendarDay = new Date(Date.UTC(year, month - 1, day + extraDays));
      const date = calendarDay.toISOString().slice(0, 10);
      const localStart = `${date}T${String(meeting.hour).padStart(2, '0')}:${String(meeting.minute).padStart(2, '0')}:00-03:00`;
      return { ...meeting, start: new Date(localStart), localStart };
    });
  }).filter((meeting) => meeting.start.getTime() > now.getTime())
    .sort((a, b) => a.start.getTime() - b.start.getTime())[0] ?? null;
}
