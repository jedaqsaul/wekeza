import Logo from "../components/ui/Logo.jsx";

export default function AuthLayout({ title, subtitle, children, footer }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-[1.05fr_1fr]">
      {/* Brand panel — desktop only */}
      <aside className="relative hidden overflow-hidden bg-pine-500 p-12 text-white lg:flex lg:flex-col lg:justify-between">
        <Logo light />
        <div className="max-w-md">
          <p className="font-display text-4xl font-semibold leading-tight">
            Know what you have, what you spent, and where it went.
          </p>
          <ul className="mt-10 space-y-3 border-t border-white/15 pt-6 text-sm text-white/70">
            <li>Record income and expenses in seconds.</li>
            <li>See your balance calculated for you.</li>
            <li>Spot your biggest spending categories.</li>
          </ul>
        </div>
        <p className="text-sm text-white/50">Simple, calm personal finance.</p>
      </aside>

      <main className="flex items-center justify-center px-4 py-10 sm:px-8">
        <div className="w-full max-w-sm animate-fade-in">
          <div className="mb-8 lg:hidden">
            <Logo />
          </div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">{title}</h1>
          {subtitle && <p className="mt-2 text-sm text-ink-muted">{subtitle}</p>}
          <div className="mt-8">{children}</div>
          {footer && <p className="mt-6 text-center text-sm text-ink-muted">{footer}</p>}
        </div>
      </main>
    </div>
  );
}
