export function LogoIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="none"
      className={className}
      aria-hidden
    >
      <polygon
        points="16,2 28,9 28,23 16,30 4,23 4,9"
        stroke="#EC721A"
        strokeWidth="1.2"
        fill="none"
        strokeOpacity="0.8"
      />
      <polygon
        points="16,8 22,11.5 22,20.5 16,24 10,20.5 10,11.5"
        stroke="#EC721A"
        strokeWidth="0.8"
        fill="rgba(236,113,26,0.08)"
        strokeOpacity="0.5"
      />
      <circle cx="16" cy="16" r="2" fill="#EC721A" fillOpacity="0.7" />
      <line x1="16" y1="8" x2="16" y2="14" stroke="#EC721A" strokeWidth="0.6" strokeOpacity="0.4" />
      <line x1="16" y1="18" x2="16" y2="24" stroke="#EC721A" strokeWidth="0.6" strokeOpacity="0.4" />
      <line x1="10" y1="11.5" x2="14" y2="14" stroke="#EC721A" strokeWidth="0.6" strokeOpacity="0.4" />
      <line x1="18" y1="18" x2="22" y2="20.5" stroke="#EC721A" strokeWidth="0.6" strokeOpacity="0.4" />
    </svg>
  );
}
