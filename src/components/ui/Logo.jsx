export default function Logo({ light = false }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <svg viewBox="0 0 32 32" className="h-8 w-8" aria-hidden="true">
        <rect width="32" height="32" rx="8" fill={light ? "#F7F8FA" : "#0B3B36"} />
        <rect x="8" y="16" width="4" height="9" rx="1" fill={light ? "#0B3B36" : "#F7F8FA"} />
        <rect x="14" y="11" width="4" height="14" rx="1" fill="#147D64" />
        <rect x="20" y="7" width="4" height="18" rx="1" fill={light ? "#0B3B36" : "#F7F8FA"} />
      </svg>
      <span className={`font-display text-xl font-bold tracking-tight ${light ? "text-white" : "text-ink"}`}>
        Wekeza
      </span>
    </span>
  );
}
