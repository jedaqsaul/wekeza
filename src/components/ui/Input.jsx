import { forwardRef, useId } from "react";

const Input = forwardRef(function Input({ label, error, hint, className = "", id, ...rest }, ref) {
  const autoId = useId();
  const inputId = id || autoId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={inputId} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={inputId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink transition-colors
          placeholder:text-ink-faint
          ${error ? "border-clay-500" : "border-border focus:border-pine-500"}
          focus:outline-none focus:ring-2 focus:ring-pine-500/15
          disabled:bg-paper disabled:text-ink-faint ${className}`}
        {...rest}
      />
      {error && (
        <p id={`${inputId}-error`} className="text-xs text-clay-600">
          {error}
        </p>
      )}
      {!error && hint && (
        <p id={`${inputId}-hint`} className="text-xs text-ink-faint">
          {hint}
        </p>
      )}
    </div>
  );
});

export default Input;
