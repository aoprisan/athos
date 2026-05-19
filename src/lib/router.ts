import type { View } from '../types';

export function parseHash(hash: string): View {
  const clean = hash.replace(/^#\/?/, '');
  if (clean === '' || clean === 'home') return { kind: 'home' };
  if (clean === 'getting-there') return { kind: 'getting-there' };
  if (clean === 'ferries') return { kind: 'ferries' };
  if (clean === 'timeline') return { kind: 'timeline' };
  if (clean === 'saints') return { kind: 'saints' };
  const sa = clean.match(/^saint\/([a-z0-9-]+)$/);
  if (sa) return { kind: 'saint', slug: sa[1] };
  const imp = clean.match(/^trip-import\?d=([A-Za-z0-9_-]+)$/);
  if (imp) return { kind: 'trip-import', blob: imp[1] };
  const m = clean.match(/^monastery\/([a-z0-9-]+)$/);
  if (m) return { kind: 'monastery', slug: m[1] };
  const s = clean.match(/^settlement\/([a-z0-9-]+)$/);
  if (s) return { kind: 'settlement', slug: s[1] };
  if (clean === 'trips') return { kind: 'trips' };
  const t = clean.match(/^trip\/([a-z0-9-]+)$/);
  if (t) return { kind: 'trip', slug: t[1] };
  return { kind: 'home' };
}

export function viewToHash(view: View): string {
  switch (view.kind) {
    case 'home':
      return '#/';
    case 'monastery':
      return `#/monastery/${view.slug}`;
    case 'settlement':
      return `#/settlement/${view.slug}`;
    case 'getting-there':
      return '#/getting-there';
    case 'ferries':
      return '#/ferries';
    case 'trips':
      return '#/trips';
    case 'trip':
      return `#/trip/${view.slug}`;
    case 'timeline':
      return '#/timeline';
    case 'saints':
      return '#/saints';
    case 'saint':
      return `#/saint/${view.slug}`;
    case 'trip-import':
      return `#/trip-import?d=${view.blob}`;
  }
}
