export default function Spinner({ label = "Loading", className = "h-6 w-6" }) {
  return (
    <span role="status" className="inline-flex items-center">
      <svg className={`animate-spin text-pine-500 ${className}`} viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
        <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
      </svg>
      <span className="sr-only">{label}</span>
    </span>
  );
}

export function FullPageSpinner() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <Spinner className="h-8 w-8" label="Loading Wekeza" />
    </div>
  );
}
