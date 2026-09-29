import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import { getAllEvents, getEvent, formatDate, formatTime } from '@/lib/content';

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllEvents().map((e) => ({ slug: e.slug }));
}

function calendarLink(e) {
  if (!e.time) return null;
  const pad = (n) => String(n).padStart(2, '0');
  const day = e.date.replaceAll('-', '');
  const [h, m] = e.time.split(':').map(Number);
  const start = `${day}T${pad(h)}${pad(m)}00`;
  const end = `${day}T${pad(Math.min(h + 2, 23))}${pad(m)}00`;
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: e.title,
    dates: `${start}/${end}`,
    location: e.venue || 'Online',
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export default async function EventPage({ params }) {
  const { slug } = await params;
  const event = getEvent(slug);
  if (!event) notFound();

  const calendar = calendarLink(event);

  return (
    <>
      <div className="page-title">
        <div className="wrap">
          <h1>{event.title}</h1>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          {event.cover && (
            // eslint-disable-next-line @next/next/no-img-element
            <img className="detail-img" src={event.cover} alt="" />
          )}

          <div className="facts">
            <p><strong>Date:</strong> {formatDate(event.date)}</p>
            {event.time && <p><strong>Time:</strong> {formatTime(event.time)}</p>}
            <p><strong>Where:</strong> {event.type === 'online' ? 'Online' : event.venue}</p>
          </div>

          <div className="prose">
            <ReactMarkdown>{event.body}</ReactMarkdown>
          </div>

          <p style={{ marginTop: '1rem', display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            {event.mapLink && <a className="btn" href={event.mapLink}>Open in Maps</a>}
            {calendar && <a className="btn" href={calendar}>Add to calendar</a>}
          </p>

          {event.gallery && event.gallery.length > 0 && (
            <div className="gallery">
              {event.gallery.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="" />
              ))}
            </div>
          )}

          <p style={{ marginTop: '2rem' }}><Link href="/events">Back to all events</Link></p>
        </div>
      </section>
    </>
  );
}