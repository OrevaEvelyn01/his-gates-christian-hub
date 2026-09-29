import { getOnlineFellowship, getUpcomingEvents } from '@/lib/content';
import EventCard from '@/components/EventCard';

export const metadata = { title: 'Online Fellowship | HisGatesChristianHub' };

export default function Fellowship() {
  const online = getOnlineFellowship();
  const onlineEvents = getUpcomingEvents().filter((e) => e.type === 'online');

  return (
    <>
      <div className="page-title">
        <div className="wrap">
          <h1>Online Fellowship</h1>
          <p>Join us from wherever you are.</p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          {online.active ? (
            <div className="card">
              <p className="meta">{online.schedule}</p>
              <h3>{online.platform}</h3>
              {online.notes && <p style={{ margin: '0.75rem 0' }}>{online.notes}</p>}
              <a className="btn" href={online.link}>Open meeting link</a>
            </div>
          ) : (
            <p>There is no online fellowship link at the moment. Please check back soon.</p>
          )}
        </div>
      </section>

      {onlineEvents.length > 0 && (
        <section className="section soft">
          <div className="wrap">
            <h2>Upcoming online events</h2>
            <div className="cards">
              {onlineEvents.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}