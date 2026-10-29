import Icon from "../ui/Icon.jsx";
import { formatDate, formatSignedMoney } from "../../utils/format.js";

/**
 * One scannable ledger row. Pass onEdit/onDelete to show row actions
 * (transactions page); omit them for the compact dashboard list.
 */
export default function TransactionRow({ transaction, onEdit, onDelete }) {
  const isIncome = transaction.type === "income";
  const title = transaction.description || transaction.category_name;

  return (
    <li className="group flex items-center gap-3 px-4 py-3.5 transition-colors hover:bg-paper/70 sm:gap-4">
      <span
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
          isIncome ? "bg-emerald-50 text-emerald-500" : "bg-clay-50 text-clay-500"
        }`}
      >
        <Icon name={isIncome ? "arrowDown" : "arrowUp"} className="h-5 w-5" />
        <span className="sr-only">{isIncome ? "Income" : "Expense"}</span>
      </span>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        <p className="truncate text-xs text-ink-muted">
          {transaction.description ? `${transaction.category_name} · ` : ""}
          {formatDate(transaction.date)}
        </p>
      </div>

      <p className={`tabular shrink-0 text-sm font-semibold ${isIncome ? "text-emerald-600" : "text-ink"}`}>
        {formatSignedMoney(transaction.amount, transaction.type)}
      </p>

      {(onEdit || onDelete) && (
        <div className="flex shrink-0 gap-0.5 sm:opacity-0 sm:transition-opacity sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
          {onEdit && (
            <button
              type="button"
              onClick={() => onEdit(transaction)}
              className="rounded-lg p-2 text-ink-faint transition-colors hover:bg-white hover:text-pine-500"
              aria-label={`Edit ${title}`}
            >
              <Icon name="edit" className="h-4 w-4" />
            </button>
          )}
          {onDelete && (
            <button
              type="button"
              onClick={() => onDelete(transaction)}
              className="rounded-lg p-2 text-ink-faint transition-colors hover:bg-white hover:text-clay-500"
              aria-label={`Delete ${title}`}
            >
              <Icon name="trash" className="h-4 w-4" />
            </button>
          )}
        </div>
      )}
    </li>
  );
}
