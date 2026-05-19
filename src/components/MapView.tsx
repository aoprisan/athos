import { Suspense, lazy, useEffect, useState } from 'react';
import { MedievalMap } from './MedievalMap';
import type { View } from '../types';
import { useI18n } from '../i18n';

const ModernMap = lazy(() => import('./ModernMap'));

type MapMode = 'medieval' | 'modern';

const STORAGE_KEY = 'athos:map-mode';

function readStoredMode(): MapMode {
  if (typeof window === 'undefined') return 'medieval';
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'modern' ? 'modern' : 'medieval';
  } catch {
    return 'medieval';
  }
}

interface Props {
  onNavigate: (view: View) => void;
  selectedSlug?: string;
}

export function MapView({ onNavigate, selectedSlug }: Props) {
  const { t } = useI18n();
  const [mode, setMode] = useState<MapMode>(readStoredMode);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore quota or privacy-mode failures */
    }
  }, [mode]);

  return (
    <div className="map-view">
      <div className="map-toggle" role="tablist" aria-label={t('map.styleLabel')}>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'medieval'}
          className={`map-toggle__btn ${mode === 'medieval' ? 'is-active' : ''}`}
          onClick={() => setMode('medieval')}
        >
          <span className="map-toggle__mark" aria-hidden="true">⚜</span>
          {t('map.portolano')}
        </button>
        <button
          type="button"
          role="tab"
          aria-selected={mode === 'modern'}
          className={`map-toggle__btn ${mode === 'modern' ? 'is-active' : ''}`}
          onClick={() => setMode('modern')}
        >
          <span className="map-toggle__mark" aria-hidden="true">⊕</span>
          {t('map.topographic')}
        </button>
      </div>

      <div className="map-view__body">
        {mode === 'medieval' ? (
          <MedievalMap onNavigate={onNavigate} selectedSlug={selectedSlug} />
        ) : (
          <Suspense
            fallback={
              <div className="modern-map modern-map--loading" role="status">
                <span>{t('map.loadingTopo')}</span>
              </div>
            }
          >
            <ModernMap onNavigate={onNavigate} selectedSlug={selectedSlug} />
          </Suspense>
        )}
      </div>
    </div>
  );
}
