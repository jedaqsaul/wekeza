export default function PageContainer({ title, subtitle, actions, children }) {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {(title || actions) && (
        <header className="mb-6 flex flex-wrap items-end justify-between gap-3 sm:mb-8">
          <div>
            {title && <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">{title}</h1>}
            {subtitle && <p className="mt-1 text-sm text-ink-muted">{subtitle}</p>}
          </div>
          {actions && <div className="flex items-center gap-2">{actions}</div>}
        </header>
      )}
      {children}
    </div>
  );
}
