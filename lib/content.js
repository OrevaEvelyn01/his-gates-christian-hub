import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const root = path.join(process.cwd(), 'content');

function toDateString(d) {
  if (!d) return '';
  return d instanceof Date ? d.toISOString().slice(0, 10) : String(d);
}

function readFolder(folder) {
  const dir = path.join(root, folder);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), 'utf8');
      const { data, content } = matter(raw);
      return {
        slug: file.replace(/\.md$/, ''),
        ...data,
        date: toDateString(data.date),
        body: content,
      };
    });
}

function readJson(name) {
  const file = path.join(root, name);
  if (!fs.existsSync(file)) return {};
  return JSON.parse(fs.readFileSync(file, 'utf8'));
}

export const getSettings = () => readJson('settings.json');
export const getOnlineFellowship = () => readJson('online-fellowship.json');

export function getAllEvents() {
  return readFolder('events').sort((a, b) => a.date.localeCompare(b.date));
}

export function getEvent(slug) {
  return getAllEvents().find((e) => e.slug === slug);
}

export function getUpcomingEvents() {
  const today = new Date().toISOString().slice(0, 10);
  return getAllEvents().filter((e) => e.date >= today);
}

export function getAnnouncements() {
  return readFolder('announcements')
    .filter((a) => a.published !== false)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getLeaders() {
  return readFolder('leaders').sort((a, b) => (a.order || 99) - (b.order || 99));
}

export function formatDate(dateStr) {
  return new Date(dateStr + 'T00:00:00Z').toLocaleDateString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function formatTime(t) {
  if (!t) return '';
  const [h, m] = t.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, '0')} ${suffix}`;
}