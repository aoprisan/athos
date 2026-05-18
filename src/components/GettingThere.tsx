import {
  DIAMONITIRION,
  GETTING_THERE_STEPS,
  PORTS,
} from '../data/transport';
import type { View } from '../types';
import { CrossFlourish, KeystoneBadge } from './Ornaments';

interface Props {
  onNavigate: (view: View) => void;
}

export function GettingThere({ onNavigate }: Props) {
  return (
    <article className="page">
      <div className="parchment">
        <header className="page__header">
          <p className="page__eyebrow">πῶς ἀναβαίνομεν · how we ascend</p>
          <h1>Getting to the Holy Mountain</h1>
          <CrossFlourish className="section-divider" />
          <p className="page__lede">
            Mount Athos is a self-governing monastic republic on the easternmost
            finger of the Halkidiki peninsula in northern Greece. There is no road
            crossing — all pilgrims arrive by boat from Ouranoupoli or Ierissos,
            and only after obtaining the <em>Diamonitirion</em> entry permit.
          </p>
        </header>

        <section>
          <h2>The Diamonitirion <KeystoneBadge>entry permit</KeystoneBadge></h2>
          <ul className="kv">
            <li>
              <span>Issuing office</span>
              <span>{DIAMONITIRION.bureauName}, {DIAMONITIRION.bureauCity}</span>
            </li>
            <li>
              <span>Address</span>
              <span>{DIAMONITIRION.bureauAddress}</span>
            </li>
            <li>
              <span>Phone</span>
              <span>
                <a href={`tel:${DIAMONITIRION.bureauPhone.replace(/\s+/g, '')}`}>
                  {DIAMONITIRION.bureauPhone}
                </a>
              </span>
            </li>
            <li>
              <span>Email</span>
              <span>
                <a href={`mailto:${DIAMONITIRION.bureauEmail}`}>
                  {DIAMONITIRION.bureauEmail}
                </a>
              </span>
            </li>
            <li>
              <span>Online reservation</span>
              <span>
                <a href={DIAMONITIRION.bureauUrl} target="_blank" rel="noreferrer noopener">
                  {DIAMONITIRION.bureauUrl}
                </a>
              </span>
            </li>
            <li>
              <span>Daily quota</span>
              <span>
                {DIAMONITIRION.dailyQuotaOrthodox} Orthodox /{' '}
                {DIAMONITIRION.dailyQuotaNonOrthodox} non-Orthodox
              </span>
            </li>
            <li>
              <span>Standard stay</span>
              <span>{DIAMONITIRION.standardStayNights} nights</span>
            </li>
          </ul>
          <ul className="notes">
            {DIAMONITIRION.notes.map((n, i) => (
              <li key={i}>{n}</li>
            ))}
          </ul>
        </section>

        <CrossFlourish className="section-divider" />

        <section>
          <h2>Step by step</h2>
          <ol className="steps">
            {GETTING_THERE_STEPS.map((s) => (
              <li key={s.step}>
                <h3>{s.title}</h3>
                <p>{s.body}</p>
              </li>
            ))}
          </ol>
        </section>

        <CrossFlourish className="section-divider" />

        <section>
          <h2>Ports</h2>
          <ul className="port-list">
            {PORTS.map((p) => (
              <li key={p.id}>
                <h3>{p.name}</h3>
                <p className="port-list__role">{p.role}</p>
                {p.notes && <p>{p.notes}</p>}
              </li>
            ))}
          </ul>
          <div className="page__actions">
            <button type="button" onClick={() => onNavigate({ kind: 'ferries' })}>
              See ferry timetable
            </button>
          </div>
        </section>
      </div>
    </article>
  );
}
