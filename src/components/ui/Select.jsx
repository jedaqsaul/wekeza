import { forwardRef, useId } from "react";

const Select = forwardRef(function Select(
  { label, error, hint, className = "", id, children, ...rest },
  ref
) {
  const autoId = useId();
  const selectId = id || autoId;

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={selectId} className="text-sm font-medium text-ink">
          {label}
        </label>
      )}
      <select
        ref={ref}
        id={selectId}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${selectId}-error` : undefined}
        className={`w-full rounded-xl border bg-white px-3.5 py-2.5 text-sm text-ink transition-colors
          ${error ? "border-clay-500" : "border-border focus:border-pine-500"}
          focus:outline-none focus:ring-2 focus:ring-pine-500/15 disabled:bg-paper disabled:text-ink-faint
          ${className}`}
        {...rest}
      >
        {children}
      </select>
      {error && (
        <p id={`${selectId}-error`} className="text-xs text-clay-600">
          {error}
        </p>
      )}
      {!error && hint && <p className="text-xs text-ink-faint">{hint}</p>}
    </div>
  );
});

export default Select;
