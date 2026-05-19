import { useEffect, useState } from 'react';
import { useI18n } from '../i18n';

function readOnline(): boolean {
  if (typeof navigator === 'undefined') return true;
  return navigator.onLine;
}

export function OfflineIndicator() {
  const { t } = useI18n();
  const [online, setOnline] = useState<boolean>(readOnline);

  useEffect(() => {
    const onOnline = () => setOnline(true);
    const onOffline = () => setOnline(false);
    window.addEventListener('online', onOnline);
    window.addEventListener('offline', onOffline);
    return () => {
      window.removeEventListener('online', onOnline);
      window.removeEventListener('offline', onOffline);
    };
  }, []);

  if (online) return null;

  return (
    <div className="offline-banner" role="status" aria-live="polite">
      <span className="offline-banner__mark" aria-hidden="true">∅</span>
      <span className="offline-banner__text">{t('offline.banner')}</span>
    </div>
  );
}
