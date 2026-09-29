import { getSettings } from '@/lib/content';
import ContactForm from '@/components/ContactForm';

export const metadata = { title: 'Contact | HisGatesChristianHub' };

export default function Contact() {
  const s = getSettings();

  return (
    <>
      <div className="page-title">
        <div className="wrap">
          <h1>Contact Us</h1>
          <p>We would love to hear from you.</p>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          {(s.email || s.phone) && (
            <div className="facts">
              {s.email && <p><strong>Email:</strong> {s.email}</p>}
              {s.phone && <p><strong>Phone:</strong> {s.phone}</p>}
            </div>
          )}
          <ContactForm />
        </div>
      </section>
    </>
  );
}