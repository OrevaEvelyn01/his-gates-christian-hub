import Link from 'next/link';
import { formatDate, formatTime } from '@/lib/content';

export default function EventCard({ event }) {
  return (
    <Link href={`/events/${event.slug}`} className="card card-link">
      {event.cover && (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="card-img" src={event.cover} alt="" />
      )}
      <p className="meta">
        {formatDate(event.date)} {event.time && `· ${formatTime(event.time)}`}
      </p>
      <h3>{event.title}</h3>
      <p>{event.type === 'online' ? 'Online' : event.venue}</p>
    </Link>
  );
}