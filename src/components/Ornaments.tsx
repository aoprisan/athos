/* Reusable Byzantine ornaments — pure SVG, no runtime cost, no dependencies.
   Each is sized via CSS, currentColor where appropriate so they pick up the
   surrounding text/gold colour. */

export function ByzantineCross({ className }: { className?: string }) {
  // Traditional three-bar (Orthodox) cross. The lower bar slants — Christ's
  // right side raised toward heaven.
  return (
    <svg
      className={className}
      viewBox="0 0 24 40"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
        fill="none"
      >
        <line x1="12" y1="2" x2="12" y2="38" />
        <line x1="6" y1="8" x2="18" y2="8" />
        <line x1="3" y1="15" x2="21" y2="15" />
        <line x1="5" y1="28" x2="19" y2="25" />
      </g>
    </svg>
  );
}

export function CrossFlourish({ className }: { className?: string }) {
  // Centred cross with a flanking pair of dots — a quiet section divider, the
  // sort that appears between paragraphs in liturgical books.
  return (
    <svg
      className={className}
      viewBox="0 0 200 24"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <g stroke="currentColor" strokeWidth="0.8" fill="currentColor" opacity="0.85">
        <line x1="0" y1="12" x2="70" y2="12" />
        <line x1="130" y1="12" x2="200" y2="12" />
        <circle cx="80" cy="12" r="1.6" />
        <circle cx="120" cy="12" r="1.6" />
      </g>
      <g
        transform="translate(100 12)"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
        strokeLinecap="square"
      >
        <line x1="0" y1="-9" x2="0" y2="9" />
        <line x1="-6" y1="0" x2="6" y2="0" />
        <line x1="-4" y1="-5" x2="4" y2="-5" />
        <line x1="-3" y1="5" x2="3" y2="3.5" />
      </g>
    </svg>
  );
}

export function HaloMedallion({
  number,
  className,
  active,
}: {
  number: number;
  className?: string;
  active?: boolean;
}) {
  // Gilded medallion — the numbered roundel each monastery wears, like the
  // saint's nimbus in an icon. Two concentric gold rings, ray-burst within.
  const fill = active ? 'url(#halo-active)' : 'url(#halo-rest)';
  return (
    <svg
      className={className}
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="halo-rest" cx="0.5" cy="0.5" r="0.55">
          <stop offset="0%" stopColor="#fff3c4" />
          <stop offset="55%" stopColor="#d6ad32" />
          <stop offset="100%" stopColor="#7a5b12" />
        </radialGradient>
        <radialGradient id="halo-active" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0%" stopColor="#fff9d9" />
          <stop offset="40%" stopColor="#f5e08e" />
          <stop offset="100%" stopColor="#b88a1c" />
        </radialGradient>
      </defs>
      <circle cx="30" cy="30" r="27" fill={fill} stroke="#6f4f0e" strokeWidth="1" />
      <circle cx="30" cy="30" r="23" fill="none" stroke="#6f4f0e" strokeWidth="0.6" opacity="0.5" />
      {/* ray burst, the kind incised on a saint's nimbus */}
      <g stroke="#6f4f0e" strokeWidth="0.5" opacity="0.45">
        {Array.from({ length: 24 }).map((_, i) => {
          const a = (i / 24) * Math.PI * 2;
          const x1 = 30 + Math.cos(a) * 18;
          const y1 = 30 + Math.sin(a) * 18;
          const x2 = 30 + Math.cos(a) * 26;
          const y2 = 30 + Math.sin(a) * 26;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      <text
        x="30"
        y="30"
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Cinzel Decorative', 'Cinzel', serif"
        fontWeight="700"
        fontSize="18"
        fill="#3a2406"
      >
        {number}
      </text>
    </svg>
  );
}

export function ArchedFrame({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  // Wraps content in a horseshoe-arched frame with double-gold border. Used
  // for the home view's headings and key panels.
  return (
    <div className={`arched-frame ${className ?? ''}`}>
      <svg
        className="arched-frame__top"
        viewBox="0 0 200 80"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="arch-gold" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f5e08e" />
            <stop offset="60%" stopColor="#d6ad32" />
            <stop offset="100%" stopColor="#7a5b12" />
          </linearGradient>
        </defs>
        <path
          d="M0 80 L0 50 Q0 0 100 0 Q200 0 200 50 L200 80 Z"
          fill="none"
          stroke="url(#arch-gold)"
          strokeWidth="2"
        />
        <path
          d="M4 80 L4 50 Q4 4 100 4 Q196 4 196 50 L196 80"
          fill="none"
          stroke="#6f4f0e"
          strokeWidth="0.6"
        />
      </svg>
      <div className="arched-frame__body">{children}</div>
    </div>
  );
}

export function KeystoneBadge({ children }: { children: React.ReactNode }) {
  // Decorative inline badge — the small lozenge that holds a label, like an
  // emperor's monogram in a fresco border.
  return <span className="keystone">{children}</span>;
}

export function DropCap({ children }: { children: string }) {
  // Illuminated drop-cap. Rendered as a span so flow text can wrap it.
  return <span className="drop-cap">{children}</span>;
}

export function SaintNimbus({ className }: { className?: string }) {
  // Saint's nimbus — a gilded disc with a tau cross at the centre and the
  // ray burst of a Byzantine halo. The cross arms are inscribed with the
  // three letters Ὁ Ὤ Ν as on icons of Christ; we leave them blank for
  // generic saints so it reads as a halo, not as the Pantokrator.
  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="nimbus-fill" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0%" stopColor="#fff9d9" />
          <stop offset="55%" stopColor="#d6ad32" />
          <stop offset="100%" stopColor="#7a5b12" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="36" fill="url(#nimbus-fill)" stroke="#1f1408" strokeWidth="1" />
      <circle cx="40" cy="40" r="31" fill="none" stroke="#6f4f0e" strokeWidth="0.6" opacity="0.6" />
      {/* incised ray burst */}
      <g stroke="#6f4f0e" strokeWidth="0.55" opacity="0.55">
        {Array.from({ length: 36 }).map((_, i) => {
          const a = (i / 36) * Math.PI * 2;
          const x1 = 40 + Math.cos(a) * 23;
          const y1 = 40 + Math.sin(a) * 23;
          const x2 = 40 + Math.cos(a) * 34;
          const y2 = 40 + Math.sin(a) * 34;
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />;
        })}
      </g>
      {/* tau cross at centre */}
      <g stroke="#1f1408" strokeWidth="1.6" strokeLinecap="square" fill="none">
        <line x1="40" y1="20" x2="40" y2="58" />
        <line x1="26" y1="28" x2="54" y2="28" />
        <line x1="22" y1="36" x2="58" y2="36" />
        <line x1="28" y1="50" x2="52" y2="48" />
      </g>
    </svg>
  );
}

export function GreekKeyDivider({ className }: { className?: string }) {
  // Decorative ruled divider drawn from the --greek-key data-URI tile.
  return <div className={`greek-key-divider ${className ?? ''}`} aria-hidden="true" />;
}
