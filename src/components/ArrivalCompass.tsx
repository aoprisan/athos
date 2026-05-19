import { useI18n } from '../i18n';
import { useGeolocation } from '../lib/useGeolocation';
import {
  bearingDeg,
  cardinalFromDeg,
  haversineKm,
  walkingMinutes,
} from '../lib/geo';

interface Props {
  destinationLat: number;
  destinationLng: number;
  destinationName: string;
}

/** A small painted-compass overlay for the monastery detail. Lets a pilgrim
 *  already on Athos see the bearing and walking distance to the house from
 *  wherever they currently stand. Stays out of the way until the pilgrim taps
 *  "show direction" — we never grab geolocation unprompted. */
export function ArrivalCompass({
  destinationLat,
  destinationLng,
  destinationName,
}: Props) {
  const { t } = useI18n();
  const geo = useGeolocation();

  if (geo.status === 'unsupported') {
    return null;
  }

  if (geo.status === 'idle' || geo.status === 'pending') {
    return (
      <section className="compass compass--idle" aria-label={t('compass.aria')}>
        <div className="compass__intro">
          <span className="compass__intro-mark" aria-hidden="true">⌖</span>
          <span className="compass__intro-text">{t('compass.intro')}</span>
        </div>
        <button
          type="button"
          className="compass__request"
          onClick={geo.request}
          disabled={geo.status === 'pending'}
        >
          {geo.status === 'pending' ? t('compass.locating') : t('compass.show')}
        </button>
      </section>
    );
  }

  if (geo.status === 'denied' || geo.status === 'error') {
    return (
      <section className="compass compass--error" aria-label={t('compass.aria')}>
        <p className="compass__error">
          {geo.status === 'denied'
            ? t('compass.errorDenied')
            : t('compass.errorGeneric')}
        </p>
      </section>
    );
  }

  // status === 'granted'
  const { coords } = geo;
  if (!coords) return null;

  const km = haversineKm(
    coords.lat,
    coords.lng,
    destinationLat,
    destinationLng,
  );
  const bearing = bearingDeg(
    coords.lat,
    coords.lng,
    destinationLat,
    destinationLng,
  );
  const cardinal = cardinalFromDeg(bearing);
  const minutes = walkingMinutes(km);
  const kmDisplay = km < 1 ? `${Math.round(km * 1000)} m` : `${km.toFixed(1)} km`;
  const nearby = km <= 2;

  return (
    <section
      className={`compass compass--ready ${nearby ? 'compass--nearby' : ''}`}
      aria-label={t('compass.aria')}
    >
      <svg
        className="compass__rose"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="compass-face" cx="0.5" cy="0.45" r="0.55">
            <stop offset="0%" stopColor="#fbf5e6" />
            <stop offset="70%" stopColor="#f0e3c4" />
            <stop offset="100%" stopColor="#d6c290" />
          </radialGradient>
          <linearGradient id="compass-needle-n" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a02838" />
            <stop offset="100%" stopColor="#4a0f1a" />
          </linearGradient>
          <linearGradient id="compass-needle-s" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5e08e" />
            <stop offset="100%" stopColor="#6f4f0e" />
          </linearGradient>
        </defs>
        {/* outer rim */}
        <circle cx="60" cy="60" r="58" fill="url(#compass-face)" stroke="#6f4f0e" strokeWidth="1.5" />
        <circle cx="60" cy="60" r="55" fill="none" stroke="#6f4f0e" strokeWidth="0.6" opacity="0.55" />
        {/* sixteen-point rose ticks */}
        <g stroke="#6f4f0e" strokeLinecap="square">
          {Array.from({ length: 16 }).map((_, i) => {
            const a = (i / 16) * Math.PI * 2;
            const inner = i % 4 === 0 ? 44 : 49;
            const outer = 53;
            const x1 = 60 + Math.cos(a - Math.PI / 2) * inner;
            const y1 = 60 + Math.sin(a - Math.PI / 2) * inner;
            const x2 = 60 + Math.cos(a - Math.PI / 2) * outer;
            const y2 = 60 + Math.sin(a - Math.PI / 2) * outer;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                strokeWidth={i % 4 === 0 ? 1.1 : 0.5}
                opacity={i % 4 === 0 ? 1 : 0.5}
              />
            );
          })}
        </g>
        {/* cardinals */}
        <g
          fontFamily="'Cinzel', 'Cardo', serif"
          fontWeight="700"
          fontSize="9"
          fill="#1f1408"
          textAnchor="middle"
        >
          <text x="60" y="20">N</text>
          <text x="60" y="106">S</text>
          <text x="103" y="63.5">E</text>
          <text x="17" y="63.5">W</text>
        </g>
        {/* needle, rotated to the target bearing */}
        <g transform={`rotate(${bearing} 60 60)`} style={{ transition: 'transform 350ms ease' }}>
          <polygon
            points="60,12 67,60 60,52"
            fill="url(#compass-needle-n)"
            stroke="#1f1408"
            strokeWidth="0.4"
          />
          <polygon
            points="60,12 53,60 60,52"
            fill="#7b1f2c"
            stroke="#1f1408"
            strokeWidth="0.4"
            opacity="0.9"
          />
          <polygon
            points="60,108 67,60 60,68"
            fill="#b88a1c"
            stroke="#1f1408"
            strokeWidth="0.4"
            opacity="0.9"
          />
          <polygon
            points="60,108 53,60 60,68"
            fill="url(#compass-needle-s)"
            stroke="#1f1408"
            strokeWidth="0.4"
          />
        </g>
        {/* pivot */}
        <circle cx="60" cy="60" r="3" fill="#d6ad32" stroke="#1f1408" strokeWidth="0.8" />
        <circle cx="60" cy="60" r="1" fill="#1f1408" />
      </svg>
      <div className="compass__readout">
        <div className="compass__primary">
          <span className="compass__distance">{kmDisplay}</span>
          <span className="compass__cardinal">{t(`compass.cardinal.${cardinal}`)}</span>
        </div>
        <div className="compass__secondary">
          {t('compass.walkingTime', { min: minutes })}
        </div>
        <div className="compass__caption">
          {nearby
            ? t('compass.captionNearby', { name: destinationName })
            : t('compass.captionFar', { name: destinationName })}
        </div>
      </div>
    </section>
  );
}
