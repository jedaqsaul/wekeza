import { forwardRef } from "react";

const VARIANTS = {
  primary: "bg-pine-500 text-white hover:bg-pine-600 active:bg-pine-600 disabled:bg-pine-500/50",
  secondary: "bg-white text-ink border border-border hover:bg-paper active:bg-paper disabled:opacity-50",
  danger: "bg-clay-500 text-white hover:bg-clay-600 active:bg-clay-600 disabled:bg-clay-500/50",
  ghost: "bg-transparent text-ink-muted hover:bg-paper hover:text-ink disabled:opacity-50",
};

const SIZES = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2.5 gap-2",
  lg: "text-base px-5 py-3 gap-2",
};

const Button = forwardRef(function Button(
  { variant = "primary", size = "md", isLoading = false, className = "", children, disabled, type = "button", ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || isLoading}
      aria-busy={isLoading || undefined}
      className={`inline-flex items-center justify-center rounded-xl font-medium transition duration-150 ease-out
        active:scale-[0.98] disabled:cursor-not-allowed ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      {...rest}
    >
      {isLoading && (
        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
        </svg>
      )}
      {children}
    </button>
  );
});

export default Button;
