import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { MonasteryDetail } from './components/MonasteryDetail';
import { SettlementDetail } from './components/SettlementDetail';
import { GettingThere } from './components/GettingThere';
import { FerrySchedule } from './components/FerrySchedule';
import type { View } from './types';
import { parseHash, viewToHash } from './lib/router';

function readView(): View {
  return parseHash(window.location.hash);
}

export function App() {
  const [view, setView] = useState<View>(readView);

  useEffect(() => {
    const onHash = () => setView(readView());
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, []);

  const navigate = (next: View) => {
    const hash = viewToHash(next);
    if (window.location.hash !== hash) {
      window.location.hash = hash;
    } else {
      setView(next);
    }
  };

  return (
    <div className="app">
      <Header view={view} onNavigate={navigate} />
      <main className="layout">
        {view.kind === 'home' && <HomeView onNavigate={navigate} />}
        {view.kind === 'monastery' && (
          <MonasteryDetail slug={view.slug} onNavigate={navigate} />
        )}
        {view.kind === 'settlement' && (
          <SettlementDetail slug={view.slug} onNavigate={navigate} />
        )}
        {view.kind === 'getting-there' && <GettingThere onNavigate={navigate} />}
        {view.kind === 'ferries' && <FerrySchedule onNavigate={navigate} />}
      </main>
      <footer className="footer">
        Information for pilgrims to the Holy Mountain. Verify ferry sailings and
        the <em>Diamonitirion</em> with official sources before you travel.
      </footer>
    </div>
  );
}
