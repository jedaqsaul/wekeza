import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import Logo from "../components/ui/Logo.jsx";
import Icon from "../components/ui/Icon.jsx";
import Button from "../components/ui/Button.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useToast } from "../hooks/useToast.js";
import { TransactionActionsProvider } from "../context/TransactionActionsContext.jsx";
import { useTransactionActions } from "../hooks/useTransactionActions.js";

const NAV_ITEMS = [
  { to: "/dashboard", label: "Dashboard", icon: "home" },
  { to: "/transactions", label: "Transactions", icon: "list" },
];

function SidebarLink({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-colors ${
          isActive ? "bg-pine-50 text-pine-500" : "text-ink-muted hover:bg-paper hover:text-ink"
        }`
      }
    >
      <Icon name={icon} />
      {label}
    </NavLink>
  );
}

function TabLink({ to, label, icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex flex-1 flex-col items-center gap-0.5 py-2 text-[11px] font-medium transition-colors ${
          isActive ? "text-pine-500" : "text-ink-faint"
        }`
      }
    >
      <Icon name={icon} />
      {label}
    </NavLink>
  );
}

function Shell() {
  const { user, logout } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();
  const location = useLocation();
  const { openAdd } = useTransactionActions();

  const handleLogout = () => {
    logout();
    toast.success("You've been signed out.");
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen lg:pl-64">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 flex-col border-r border-border bg-surface p-5 lg:flex">
        <div className="px-1.5 pb-6">
          <Logo />
        </div>
        <Button onClick={openAdd} className="mb-6 w-full">
          <Icon name="plus" className="h-4 w-4" />
          Add transaction
        </Button>
        <nav className="flex flex-col gap-1" aria-label="Main">
          {NAV_ITEMS.map((item) => (
            <SidebarLink key={item.to} {...item} />
          ))}
        </nav>
        <div className="mt-auto border-t border-border pt-4">
          <p className="truncate text-sm font-semibold">{user?.name}</p>
          <p className="truncate text-xs text-ink-muted">{user?.email}</p>
          <button
            type="button"
            onClick={handleLogout}
            className="mt-3 flex items-center gap-2 rounded-lg py-1 text-sm text-ink-muted transition-colors hover:text-clay-500"
          >
            <Icon name="logout" className="h-4 w-4" />
            Sign out
          </button>
        </div>
      </aside>

      {/* Mobile top bar */}
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border bg-surface/90 px-4 py-3 backdrop-blur lg:hidden">
        <Logo />
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-lg p-2 text-ink-muted transition-colors hover:bg-paper hover:text-clay-500"
          aria-label="Sign out"
        >
          <Icon name="logout" />
        </button>
      </header>

      <main className="pb-28 lg:pb-0">
        {/* key re-triggers the entrance animation on route change */}
        <div key={location.pathname} className="animate-fade-in">
          <Outlet />
        </div>
      </main>

      {/* Mobile bottom tab bar with a central add action */}
      <nav
        className="fixed inset-x-0 bottom-0 z-30 border-t border-border bg-surface/95 pb-[env(safe-area-inset-bottom)] backdrop-blur lg:hidden"
        aria-label="Main"
      >
        <div className="mx-auto flex max-w-md items-center px-2">
          <TabLink {...NAV_ITEMS[0]} />
          <button
            type="button"
            onClick={openAdd}
            className="-mt-6 flex h-14 w-14 items-center justify-center rounded-full bg-pine-500 text-white shadow-modal transition-transform active:scale-95"
            aria-label="Add transaction"
          >
            <Icon name="plus" className="h-6 w-6" />
          </button>
          <TabLink {...NAV_ITEMS[1]} />
        </div>
      </nav>
    </div>
  );
}

export default function AppLayout() {
  return (
    <TransactionActionsProvider>
      <Shell />
    </TransactionActionsProvider>
  );
}
