import { Suspense, lazy, useEffect, useState } from 'react';
import { MedievalMap } from './MedievalMap';
import type { View } from '../types';
import { useI18n } from '../i18n';

const ModernMap = lazy(() => import('./ModernMap'));

type MapMode = 'medieval' | 'modern';

const STORAGE_KEY = 'athos:map-mode';
const SKETES_STORAGE_KEY = 'athos:map-show-sketes';

function readStoredMode(): MapMode {
  if (typeof window === 'undefined') return 'medieval';
  try {
    const v = window.localStorage.getItem(STORAGE_KEY);
    return v === 'modern' ? 'modern' : 'medieval';
  } catch {
    return 'medieval';
  }
}

function readStoredShowSketes(): boolean {
  if (typeof window === 'undefined') return true;
  try {
    const v = window.localStorage.getItem(SKETES_STORAGE_KEY);
    // Default on: only "0" turns it off.
    return v !== '0';
  } catch {
    return true;
  }
}

interface Props {
  onNavigate: (view: View) => void;
  selectedSlug?: string;
}

export function MapView({ onNavigate, selectedSlug }: Props) {
  const { t } = useI18n();
  const [mode, setMode] = useState<MapMode>(readStoredMode);
  const [showSketes, setShowSketes] = useState<boolean>(readStoredShowSketes);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, mode);
    } catch {
      /* ignore quota or privacy-mode failures */
    }
  }, [mode]);

  useEffect(() => {
    try {
      window.localStorage.setItem(SKETES_STORAGE_KEY, showSketes ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, [showSketes]);

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

      <div className="map-view__layers">
        <label className="map-layer-toggle">
          <input
            type="checkbox"
            checked={showSketes}
            onChange={(e) => setShowSketes(e.target.checked)}
          />
          <span className="map-layer-toggle__mark" aria-hidden="true">⛪</span>
          <span>{t('map.showSketes')}</span>
        </label>
      </div>

      <div className="map-view__body">
        {mode === 'medieval' ? (
          <MedievalMap
            onNavigate={onNavigate}
            selectedSlug={selectedSlug}
            showSettlements={showSketes}
          />
        ) : (
          <Suspense
            fallback={
              <div className="modern-map modern-map--loading" role="status">
                <span>{t('map.loadingTopo')}</span>
              </div>
            }
          >
            <ModernMap
              onNavigate={onNavigate}
              selectedSlug={selectedSlug}
              showSettlements={showSketes}
            />
          </Suspense>
        )}
      </div>
    </div>
  );
}
