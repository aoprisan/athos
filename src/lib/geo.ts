/* Geodetic helpers — distance and bearing on the WGS84 ellipsoid, simplified
   to spherical earth. Athos is a 50-km peninsula, so the spherical approximation
   is well within a metre of the ellipsoidal answer. */

const EARTH_RADIUS_KM = 6371.0088;

function toRad(deg: number): number {
  return (deg * Math.PI) / 180;
}

function toDeg(rad: number): number {
  return (rad * 180) / Math.PI;
}

/** Great-circle distance between two WGS84 points, in kilometres. */
export function haversineKm(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

/** Initial bearing (forward azimuth) from point A to point B, in degrees
 *  clockwise from true north [0, 360). */
export function bearingDeg(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number,
): number {
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δλ = toRad(lng2 - lng1);
  const y = Math.sin(Δλ) * Math.cos(φ2);
  const x =
    Math.cos(φ1) * Math.sin(φ2) -
    Math.sin(φ1) * Math.cos(φ2) * Math.cos(Δλ);
  const θ = Math.atan2(y, x);
  return (toDeg(θ) + 360) % 360;
}

const CARDINALS = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'] as const;
export type Cardinal = (typeof CARDINALS)[number];

export function cardinalFromDeg(deg: number): Cardinal {
  const idx = Math.round(((deg % 360) / 45)) % 8;
  return CARDINALS[idx];
}

/** Estimated walking time, in minutes, for `km` over Athonite terrain.
 *  4 km/h is a conservative pilgrim pace on stone paths with ascent. */
export function walkingMinutes(km: number): number {
  return Math.round((km / 4) * 60);
}
