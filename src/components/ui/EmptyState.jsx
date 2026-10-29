import Icon from "./Icon.jsx";

export default function EmptyState({ icon = "receipt", title, message, action, className = "" }) {
  return (
    <div className={`flex flex-col items-center px-6 py-12 text-center animate-fade-in ${className}`}>
      <span className="mb-4 rounded-2xl bg-pine-50 p-3.5 text-pine-500">
        <Icon name={icon} className="h-7 w-7" />
      </span>
      <h3 className="text-lg font-semibold">{title}</h3>
      {message && <p className="mt-1.5 max-w-sm text-sm text-ink-muted">{message}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  );
}
