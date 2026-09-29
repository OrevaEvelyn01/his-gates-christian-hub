import Link from 'next/link';
import {
  getOnlineFellowship,
  getUpcomingEvents,
  getAnnouncements,
  formatDate,
  formatTime,
} from '@/lib/content';

export default function Home() {
  const online = getOnlineFellowship();
  const events = getUpcomingEvents().slice(0, 3);
  const latest = getAnnouncements()[0];

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <h1>Welcome to HisGatesChristianHub</h1>
          <p>A growing community. Find our fellowship times, online links and upcoming meetings below.</p>
          <Link href="/fellowship" className="btn">Join the online fellowship</Link>
        </div>
      </section>

      {latest && (
        <section className="section soft">
          <div className="wrap">
            <h2>Latest update</h2>
            <div className="card">
              <p className="meta">{formatDate(latest.date)}</p>
              <h3>{latest.title}</h3>
              <p>{latest.body}</p>
            </div>
          </div>
        </section>
      )}

      {online.active && (
        <section className="section">
          <div className="wrap">
            <h2>Online fellowship</h2>
            <div className="card">
              <p className="meta">{online.schedule}</p>
              <h3>{online.platform}</h3>
              <p style={{ margin: '0.75rem 0' }}>Join us from anywhere.</p>
              <a className="btn" href={online.link}>Open meeting link</a>
            </div>
          </div>
        </section>
      )}

      <section className="section soft">
        <div className="wrap">
          <h2>Upcoming events</h2>
          {events.length === 0 ? (
            <p>No events scheduled right now. Check back soon.</p>
          ) : (
            <div className="cards">
              {events.map((e) => (
                <div className="card" key={e.slug}>
                  <p className="meta">
                    {formatDate(e.date)} {e.time && `· ${formatTime(e.time)}`}
                  </p>
                  <h3>{e.title}</h3>
                  <p>{e.type === 'online' ? 'Online' : e.venue}</p>
                </div>
              ))}
            </div>
          )}
          <p style={{ marginTop: '1.25rem' }}>
            <Link href="/events">See all events</Link>
          </p>
        </div>
      </section>
    </>
  );
}