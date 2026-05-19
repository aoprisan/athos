import { useEffect, useState } from 'react';

export type GeolocationStatus =
  | 'unsupported'
  | 'idle'
  | 'pending'
  | 'granted'
  | 'denied'
  | 'error';

export interface GeolocationState {
  status: GeolocationStatus;
  coords: { lat: number; lng: number; accuracy: number } | null;
  error: string | null;
}

const INITIAL: GeolocationState = { status: 'idle', coords: null, error: null };

/** Single-shot geolocation hook. Returns the device position and a `request()`
 *  trigger. We avoid a continuous watcher to keep battery cost trivial — the
 *  monastery-detail use case is "where am I right now relative to here?",
 *  not turn-by-turn navigation. */
export function useGeolocation() {
  const [state, setState] = useState<GeolocationState>(() => ({
    ...INITIAL,
    status:
      typeof navigator !== 'undefined' && 'geolocation' in navigator
        ? 'idle'
        : 'unsupported',
  }));

  useEffect(() => {
    if (state.status !== 'pending') return;
    let cancelled = false;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        if (cancelled) return;
        setState({
          status: 'granted',
          coords: {
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            accuracy: pos.coords.accuracy,
          },
          error: null,
        });
      },
      (err) => {
        if (cancelled) return;
        setState({
          status: err.code === err.PERMISSION_DENIED ? 'denied' : 'error',
          coords: null,
          error: err.message,
        });
      },
      { enableHighAccuracy: true, timeout: 10000, maximumAge: 15000 },
    );
    return () => {
      cancelled = true;
    };
  }, [state.status]);

  const request = () => {
    if (state.status === 'unsupported') return;
    setState((prev) => ({ ...prev, status: 'pending', error: null }));
  };

  return { ...state, request };
}
