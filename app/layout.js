import Link from 'next/link';
import Image from 'next/image';
import { Playfair_Display, Inter } from 'next/font/google';
import { getSettings } from '@/lib/content';
import './globals.css';

const heading = Playfair_Display({ subsets: ['latin'], variable: '--font-heading' });
const body = Inter({ subsets: ['latin'], variable: '--font-body' });

export const metadata = {
  title: 'HisGatesChristianHub',
  description: 'Fellowship times, online links, events and updates.',
};

const links = [
  ['/', 'Home'],
  ['/fellowship', 'Online Fellowship'],
  ['/events', 'Events'],
  ['/about', 'About'],
  ['/give', 'Give'],
  ['/contact', 'Contact'],
];

export default function RootLayout({ children }) {
  const s = getSettings();
  return (
    <html lang="en" className={`${heading.variable} ${body.variable}`}>
      <body>
        <header className="header">
          <div className="wrap">
            <Link href="/" className="brand">
              <Image src="/logo.png" alt="" width={40} height={40} />
              {s.siteName}
            </Link>
            <nav className="nav">
              {links.map(([href, label]) => (
                <Link key={href} href={href}>{label}</Link>
              ))}
            </nav>
          </div>
        </header>
        <main>{children}</main>
        <footer className="footer">
          <div className="wrap">
            <p>{s.siteName}</p>
            {s.email && <p>{s.email}</p>}
            <p>
              {Object.entries(s.socials || {})
                .filter(([, url]) => url)
                .map(([name, url]) => (
                  <a key={name} href={url} style={{ marginRight: '1rem' }}>{name}</a>
                ))}
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}