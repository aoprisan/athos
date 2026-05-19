import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { MonasteryDetail } from './components/MonasteryDetail';
import { SettlementDetail } from './components/SettlementDetail';
import { GettingThere } from './components/GettingThere';
import { FerrySchedule } from './components/FerrySchedule';
import { TripsView } from './components/TripsView';
import { TripDetail } from './components/TripDetail';
import { TimelineView } from './components/TimelineView';
import { SaintsView } from './components/SaintsView';
import { SaintDetail } from './components/SaintDetail';
import { TripImport } from './components/TripImport';
import { OfflineIndicator } from './components/OfflineIndicator';
import { SaintOfTheDay } from './components/SaintOfTheDay';
import type { View } from './types';
import { parseHash, viewToHash } from './lib/router';
import { useI18n } from './i18n';

function readView(): View {
  return parseHash(window.location.hash);
}

function renderFooter(template: string, diamonitirion: string) {
  const parts = template.split('{diamonitirion}');
  return (
    <>
      {parts[0]}
      <em>{diamonitirion}</em>
      {parts[1] ?? ''}
    </>
  );
}

export function App() {
  const [view, setView] = useState<View>(readView);
  const { t } = useI18n();

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
      <SaintOfTheDay onNavigate={navigate} />
      <OfflineIndicator />
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
        {view.kind === 'trips' && <TripsView onNavigate={navigate} />}
        {view.kind === 'trip' && (
          <TripDetail slug={view.slug} onNavigate={navigate} />
        )}
        {view.kind === 'timeline' && <TimelineView onNavigate={navigate} />}
        {view.kind === 'saints' && <SaintsView onNavigate={navigate} />}
        {view.kind === 'saint' && (
          <SaintDetail slug={view.slug} onNavigate={navigate} />
        )}
        {view.kind === 'trip-import' && (
          <TripImport blob={view.blob} onNavigate={navigate} />
        )}
      </main>
      <footer className="footer">
        {renderFooter(t('app.footer'), t('app.footer.diamonitirion'))}
      </footer>
    </div>
  );
}
