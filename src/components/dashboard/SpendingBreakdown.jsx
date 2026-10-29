import Card from "../ui/Card.jsx";
import { formatMoney, toNumber } from "../../utils/format.js";

/**
 * Lightweight CSS bar charts (no chart library): the data is a handful of
 * categories, so plain bars keep the bundle small and read just as clearly.
 */
export function ExpensesByCategory({ rows }) {
  const total = rows.reduce((sum, r) => sum + toNumber(r.total), 0);

  return (
    <Card className="p-5 sm:p-6">
      <h2 className="text-lg font-semibold">Where your money went</h2>
      {rows.length === 0 ? (
        <p className="mt-4 text-sm text-ink-muted">No expenses yet. Spending by category will appear here.</p>
      ) : (
        <ul className="mt-5 space-y-4">
          {rows.map((row) => {
            const amount = toNumber(row.total);
            const pct = total > 0 ? (amount / total) * 100 : 0;
            return (
              <li key={row.category_id}>
                <div className="flex items-baseline justify-between gap-3 text-sm">
                  <span className="font-medium">{row.category}</span>
                  <span className="tabular text-ink-muted">
                    {formatMoney(amount)} · {Math.round(pct)}%
                  </span>
                </div>
                <div
                  className="mt-1.5 h-2 overflow-hidden rounded-full bg-paper"
                  role="img"
                  aria-label={`${row.category}: ${Math.round(pct)} percent of expenses`}
                >
                  <div
                    className="h-full rounded-full bg-clay-500 transition-[width] duration-700 ease-out"
                    style={{ width: `${Math.max(pct, 2)}%` }}
                  />
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </Card>
  );
}

export function IncomeVsExpenses({ income, expenses }) {
  const inc = toNumber(income);
  const exp = toNumber(expenses);
  const max = Math.max(inc, exp);
  const bars = [
    { label: "Income", value: inc, color: "bg-emerald-500" },
    { label: "Expenses", value: exp, color: "bg-clay-500" },
  ];

  return (
    <Card className="p-5 sm:p-6">
      <h2 className="text-lg font-semibold">Income vs expenses</h2>
      {max === 0 ? (
        <p className="mt-4 text-sm text-ink-muted">Add income and expenses to compare them here.</p>
      ) : (
        <div className="mt-5 space-y-4">
          {bars.map((bar) => (
            <div key={bar.label}>
              <div className="flex items-baseline justify-between text-sm">
                <span className="font-medium">{bar.label}</span>
                <span className="tabular text-ink-muted">{formatMoney(bar.value)}</span>
              </div>
              <div className="mt-1.5 h-3 overflow-hidden rounded-full bg-paper">
                <div
                  className={`h-full rounded-full ${bar.color} transition-[width] duration-700 ease-out`}
                  style={{ width: `${(bar.value / max) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </Card>
  );
}
