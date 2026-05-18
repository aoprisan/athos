import { FERRIES, FERRY_LINKS } from '../data/transport';
import type { View } from '../types';
import { CrossFlourish } from './Ornaments';

interface Props {
  onNavigate: (view: View) => void;
}

export function FerrySchedule({ onNavigate }: Props) {
  return (
    <article className="page">
      <div className="parchment">
        <header className="page__header">
          <p className="page__eyebrow">δι' ὕδατος · by way of water</p>
          <h1>Ferry Routes &amp; Timetable</h1>
          <CrossFlourish className="section-divider" />
          <p className="page__lede">
            All sailings depend on weather and season. Sunday and feast-day schedules
            are often reduced. Confirm at the harbour the evening before, especially
            for the smaller boats along the south-east coast.
          </p>
        </header>

        <section>
          <h2>Routes</h2>
          <ul className="ferry-list">
            {FERRIES.map((f) => (
              <li key={f.id}>
                <h3>
                  {f.from} → {f.to}
                </h3>
                <div className="ferry-list__meta">
                  {f.vessel && <span>Vessel: {f.vessel}</span>}
                  {f.operator && <span>Operator: {f.operator}</span>}
                  <span>Duration ~ {f.durationMin} min</span>
                </div>
                <div className="ferry-list__departures">
                  <strong>Departures</strong> {f.departures.join(' · ')}
                </div>
                {f.notes && <p className="ferry-list__notes">{f.notes}</p>}
              </li>
            ))}
          </ul>
        </section>

        <CrossFlourish className="section-divider" />

        <section>
          <h2>Official links</h2>
          <ul className="notes">
            {FERRY_LINKS.map((l) => (
              <li key={l.url}>
                <a href={l.url} target="_blank" rel="noreferrer noopener">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </section>

        <div className="page__actions">
          <button type="button" onClick={() => onNavigate({ kind: 'getting-there' })}>
            ← Back to Getting There
          </button>
        </div>
      </div>
    </article>
  );
}
