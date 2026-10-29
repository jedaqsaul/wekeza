import Card from "../ui/Card.jsx";
import Icon from "../ui/Icon.jsx";
import Skeleton from "../ui/Skeleton.jsx";
import { formatMoney, toNumber } from "../../utils/format.js";

export function BalanceCard({ summary }) {
  const balance = toNumber(summary.balance);
  return (
    <div className="relative overflow-hidden rounded-2xl bg-pine-500 p-6 text-white shadow-card sm:p-8">
      <div className="flex items-center gap-2 text-sm text-white/70">
        <Icon name="wallet" className="h-4 w-4" />
        Current balance
      </div>
      <p className={`tabular mt-3 text-4xl font-semibold sm:text-5xl ${balance < 0 ? "text-clay-100" : ""}`}>
        {formatMoney(balance)}
      </p>
      <p className="mt-3 text-sm text-white/60">
        {balance < 0
          ? "You've spent more than you've earned."
          : "Total income minus total expenses."}
      </p>
    </div>
  );
}

const STAT_STYLES = {
  income: { icon: "arrowDown", tint: "bg-emerald-50 text-emerald-500", value: "text-emerald-600" },
  expense: { icon: "arrowUp", tint: "bg-clay-50 text-clay-500", value: "text-clay-600" },
  count: { icon: "receipt", tint: "bg-pine-50 text-pine-500", value: "text-ink" },
};

export function StatCard({ kind, label, value, delay = 0 }) {
  const style = STAT_STYLES[kind];
  return (
    <Card className="animate-slide-up p-5" style={{ animationDelay: `${delay}ms` }}>
      <span className={`inline-flex rounded-xl p-2 ${style.tint}`}>
        <Icon name={style.icon} />
      </span>
      <p className="mt-4 text-sm text-ink-muted">{label}</p>
      <p className={`tabular mt-1 text-2xl font-semibold ${style.value}`}>{value}</p>
    </Card>
  );
}

export function StatsSkeleton() {
  return (
    <div className="space-y-4" aria-hidden="true">
      <Skeleton className="h-40 rounded-2xl sm:h-44" />
      <div className="grid gap-4 sm:grid-cols-3">
        {[0, 1, 2].map((i) => (
          <Skeleton key={i} className="h-32 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
