import { useToast } from "../../hooks/useToast.js";
import Icon from "./Icon.jsx";

export default function Toaster() {
  const { toasts, dismiss } = useToast();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-4 z-[60] flex flex-col items-center gap-2 px-4"
      aria-live="polite"
    >
      {toasts.map((toast) => {
        const isError = toast.type === "error";
        return (
          <div
            key={toast.id}
            role={isError ? "alert" : "status"}
            className="pointer-events-auto flex w-full max-w-sm animate-slide-up items-start gap-3 rounded-xl border border-border bg-surface p-3.5 shadow-modal"
          >
            <span className={`mt-0.5 ${isError ? "text-clay-500" : "text-emerald-500"}`}>
              <Icon name={isError ? "alert" : "check"} className="h-5 w-5" />
            </span>
            <p className="flex-1 text-sm text-ink">{toast.message}</p>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              className="text-ink-faint transition-colors hover:text-ink"
              aria-label="Dismiss notification"
            >
              <Icon name="x" className="h-4 w-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
}
