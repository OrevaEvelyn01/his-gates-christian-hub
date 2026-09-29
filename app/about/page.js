import { getLeaders } from '@/lib/content';

export const metadata = { title: 'About | HisGatesChristianHub' };

export default function About() {
  const leaders = getLeaders();

  return (
    <>
      <div className="page-title">
        <div className="wrap">
          <h1>About Us</h1>
        </div>
      </div>

      <section className="section">
        <div className="wrap prose">
          <h2>Who we are</h2>
          <p>Write a short introduction to the fellowship here: who you are and how you began.</p>

          <h2>Our vision</h2>
          <p>Write the fellowship's vision and purpose here.</p>

          <h2>What we believe</h2>
          <p>Write the fellowship's statement of beliefs here, in your own words.</p>
        </div>
      </section>

      {leaders.length > 0 && (
        <section className="section soft">
          <div className="wrap">
            <h2>Our leaders</h2>
            <div className="cards">
              {leaders.map((l) => (
                <div className="card leader" key={l.slug}>
                  {l.photo && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={l.photo} alt={l.name} />
                  )}
                  <h3>{l.name}</h3>
                  <p className="meta">{l.role}</p>
                  <p>{l.body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}