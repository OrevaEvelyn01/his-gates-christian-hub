import { getAllEvents } from '@/lib/content';
import EventCard from '@/components/EventCard';

export const metadata = { title: 'Events | HisGatesChristianHub' };

export default function Events() {
  const today = new Date().toISOString().slice(0, 10);
  const all = getAllEvents();
  const upcoming = all.filter((e) => e.date >= today);
  const past = all.filter((e) => e.date < today).reverse();

  return (
    <>
      <div className="page-title">
        <div className="wrap">
          <h1>Events</h1>
          <p>Fellowship dates and physical prayer meetings.</p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <h2>Upcoming</h2>
          {upcoming.length === 0 ? (
            <p>No events scheduled right now. Check back soon.</p>
          ) : (
            <div className="cards">
              {upcoming.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          )}
        </div>
      </section>

      {past.length > 0 && (
        <section className="section soft">
          <div className="wrap">
            <h2>Past events</h2>
            <div className="cards">
              {past.map((e) => (
                <EventCard key={e.slug} event={e} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}