import Button from "./Button.jsx";
import { AlertIcon, InboxIcon } from "./Icons.jsx";

export function Spinner({ className = "h-5 w-5" }) {
  return (
    <svg className={`animate-spin text-pine-500 ${className}`} viewBox="0 0 24 24" fill="none" role="status">
      <title>Loading</title>
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
  );
}

export function FullPageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-paper">
      <Spinner className="h-7 w-7" />
    </div>
  );
}

/** Pulsing placeholder block used to build skeleton screens. */
export function Skeleton({ className = "" }) {
  return <div className={`animate-pulse rounded-lg bg-border/70 ${className}`} aria-hidden="true" />;
}

export function ErrorMessage({ title = "We couldn't load this", message, onRetry }) {
  return (
    <div
      role="alert"
      className="flex flex-col items-start gap-3 rounded-2xl border border-clay-100 bg-clay-50 p-5 sm:flex-row sm:items-center"
    >
      <AlertIcon className="h-6 w-6 shrink-0 text-clay-500" />
      <div className="flex-1">
        <p className="text-sm font-semibold text-clay-600">{title}</p>
        {message && <p className="mt-0.5 text-sm text-clay-600/90">{message}</p>}
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

/** Inline form-level error banner. */
export function FormError({ message }) {
  if (!message) return null;
  return (
    <div role="alert" className="rounded-xl border border-clay-100 bg-clay-50 px-3.5 py-2.5 text-sm text-clay-600">
      {message}
    </div>
  );
}

export function EmptyState({ title, message, actionLabel, onAction, icon: Icon = InboxIcon }) {
  return (
    <div className="flex flex-col items-center px-6 py-12 text-center animate-fade-in">
      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-pine-50 text-pine-500">
        <Icon className="h-7 w-7" />
      </div>
      <h3 className="text-lg font-semibold">{title}</h3>
      {message && <p className="mt-1 max-w-sm text-sm text-ink-muted">{message}</p>}
      {actionLabel && onAction && (
        <Button className="mt-5" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}
