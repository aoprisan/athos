import type { View } from '../types';

export function parseHash(hash: string): View {
  const clean = hash.replace(/^#\/?/, '');
  if (clean === '' || clean === 'home') return { kind: 'home' };
  if (clean === 'getting-there') return { kind: 'getting-there' };
  if (clean === 'ferries') return { kind: 'ferries' };
  const m = clean.match(/^monastery\/([a-z0-9-]+)$/);
  if (m) return { kind: 'monastery', slug: m[1] };
  const s = clean.match(/^settlement\/([a-z0-9-]+)$/);
  if (s) return { kind: 'settlement', slug: s[1] };
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
  }
}
