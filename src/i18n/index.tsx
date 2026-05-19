import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { LANGS, STRINGS, type Lang } from './strings';

export type { Lang } from './strings';
export { LANGS } from './strings';

const STORAGE_KEY = 'athos:lang';

function isLang(value: unknown): value is Lang {
  return value === 'en' || value === 'ro' || value === 'el';
}

function loadLang(): Lang {
  if (typeof window === 'undefined') return 'en';
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (isLang(stored)) return stored;
  } catch {
    /* ignore */
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language : '';
  const lc = nav.toLowerCase();
  if (lc.startsWith('ro')) return 'ro';
  if (lc.startsWith('el') || lc.startsWith('gr')) return 'el';
  return 'en';
}

function saveLang(lang: Lang): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* ignore */
  }
}

type Vars = Record<string, string | number>;

function interpolate(template: string, vars?: Vars): string {
  if (!vars) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) =>
    key in vars ? String(vars[key]) : `{${key}}`,
  );
}

interface I18n {
  lang: Lang;
  setLang: (lang: Lang) => void;
  /** Look up a UI string by key, optionally interpolating {placeholders}. */
  t: (key: string, vars?: Vars) => string;
  /** Pick a localised override (Romanian variant) over the original English. */
  tr: <T>(en: T, ro: T | undefined | null) => T;
}

const I18nContext = createContext<I18n | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(loadLang);

  useEffect(() => {
    saveLang(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  const setLang = useCallback((next: Lang) => setLangState(next), []);

  const t = useCallback(
    (key: string, vars?: Vars) => {
      const template = STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
      return interpolate(template, vars);
    },
    [lang],
  );

  const tr = useCallback(
    <T,>(en: T, ro: T | undefined | null): T => {
      if (lang === 'ro' && ro !== undefined && ro !== null) return ro;
      return en;
    },
    [lang],
  );

  const value = useMemo<I18n>(() => ({ lang, setLang, t, tr }), [lang, setLang, t, tr]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18n {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}

/** Visual selector for switching the active language. Used in the header. */
export function LanguageToggle() {
  const { lang, setLang, t } = useI18n();
  return (
    <div className="lang-toggle" role="group" aria-label={t('lang.label')}>
      {LANGS.map((opt) => (
        <button
          key={opt.code}
          type="button"
          className={`lang-toggle__btn ${lang === opt.code ? 'is-active' : ''}`}
          aria-pressed={lang === opt.code}
          aria-label={opt.label}
          onClick={() => setLang(opt.code)}
        >
          {opt.short}
        </button>
      ))}
    </div>
  );
}
