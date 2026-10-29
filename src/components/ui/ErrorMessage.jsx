import Button from "./Button.jsx";
import Icon from "./Icon.jsx";

/** Inline error. Pass `onRetry` to show a retry action. */
export default function ErrorMessage({ title = "Couldn't load this", message, onRetry, className = "" }) {
  return (
    <div
      role="alert"
      className={`flex flex-col items-start gap-3 rounded-2xl border border-clay-100 bg-clay-50 p-4 sm:flex-row sm:items-center ${className}`}
    >
      <span className="rounded-xl bg-white p-2 text-clay-500">
        <Icon name="alert" />
      </span>
      <div className="flex-1">
        <p className="text-sm font-semibold text-clay-600">{title}</p>
        {message && <p className="mt-0.5 text-sm text-ink-muted">{message}</p>}
      </div>
      {onRetry && (
        <Button variant="secondary" size="sm" onClick={onRetry}>
          Try again
        </Button>
      )}
    </div>
  );
}

/** Small form-level error banner. */
export function FormError({ message }) {
  if (!message) return null;
  return (
    <p role="alert" className="rounded-xl bg-clay-50 px-3.5 py-2.5 text-sm text-clay-600">
      {message}
    </p>
  );
}
