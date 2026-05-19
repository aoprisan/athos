import { describe, expect, it } from 'vitest';
import {
  bearingDeg,
  cardinalFromDeg,
  haversineKm,
  walkingMinutes,
} from './geo';

// Reference points: Iviron (40.3013, 24.2856) and Stavronikita (40.2742, 24.2683).
const IVIRON = { lat: 40.3013, lng: 24.2856 };
const STAVRONIKITA = { lat: 40.2742, lng: 24.2683 };

describe('haversineKm', () => {
  it('returns 0 between identical points', () => {
    expect(haversineKm(40, 24, 40, 24)).toBe(0);
  });

  it('matches the coastal-path distance between Iviron and Stavronikita (~3.4 km)', () => {
    const d = haversineKm(IVIRON.lat, IVIRON.lng, STAVRONIKITA.lat, STAVRONIKITA.lng);
    expect(d).toBeGreaterThan(3.0);
    expect(d).toBeLessThan(3.8);
  });
});

describe('bearingDeg', () => {
  it('returns 0° due north', () => {
    const b = bearingDeg(40, 24, 41, 24);
    expect(b).toBeCloseTo(0, 1);
  });

  it('returns 90° due east at the equator', () => {
    const b = bearingDeg(0, 0, 0, 1);
    expect(b).toBeCloseTo(90, 1);
  });

  it('Iviron → Stavronikita points south-southwest', () => {
    const b = bearingDeg(IVIRON.lat, IVIRON.lng, STAVRONIKITA.lat, STAVRONIKITA.lng);
    expect(b).toBeGreaterThan(180);
    expect(b).toBeLessThan(225);
  });
});

describe('cardinalFromDeg', () => {
  it('maps the eight principal directions', () => {
    expect(cardinalFromDeg(0)).toBe('N');
    expect(cardinalFromDeg(45)).toBe('NE');
    expect(cardinalFromDeg(90)).toBe('E');
    expect(cardinalFromDeg(135)).toBe('SE');
    expect(cardinalFromDeg(180)).toBe('S');
    expect(cardinalFromDeg(225)).toBe('SW');
    expect(cardinalFromDeg(270)).toBe('W');
    expect(cardinalFromDeg(315)).toBe('NW');
  });

  it('rounds to the nearest cardinal at the boundaries', () => {
    expect(cardinalFromDeg(22)).toBe('N');
    expect(cardinalFromDeg(23)).toBe('NE');
    expect(cardinalFromDeg(359)).toBe('N');
  });
});

describe('walkingMinutes', () => {
  it('uses a 4 km/h pace', () => {
    expect(walkingMinutes(4)).toBe(60);
    expect(walkingMinutes(2)).toBe(30);
  });
});
