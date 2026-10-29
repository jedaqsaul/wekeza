import Input from "../ui/Input.jsx";
import Select from "../ui/Select.jsx";
import Button from "../ui/Button.jsx";
import Icon from "../ui/Icon.jsx";
import { useCategories } from "../../hooks/useCategories.js";

export const EMPTY_FILTERS = { search: "", type: "", category: "", date_from: "", date_to: "" };

export function hasActiveFilters(filters) {
  return Object.values(filters).some(Boolean);
}

export default function TransactionFilters({ filters, onChange, onClear }) {
  const { categories } = useCategories();
  const visibleCategories = filters.type ? categories.filter((c) => c.type === filters.type) : categories;

  const set = (field) => (e) => {
    const next = { ...filters, [field]: e.target.value };
    // Switching type can invalidate the chosen category.
    if (field === "type") next.category = "";
    onChange(next);
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <Icon name="search" className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-faint" />
        <Input
          type="search"
          aria-label="Search transactions by description"
          placeholder="Search by description"
          value={filters.search}
          onChange={set("search")}
          className="pl-10"
        />
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Select aria-label="Filter by type" value={filters.type} onChange={set("type")}>
          <option value="">All types</option>
          <option value="income">Income</option>
          <option value="expense">Expenses</option>
        </Select>
        <Select aria-label="Filter by category" value={filters.category} onChange={set("category")}>
          <option value="">All categories</option>
          {visibleCategories.map((c) => (
            <option key={c.id} value={c.id}>
              {filters.type ? c.name : `${c.name} (${c.type})`}
            </option>
          ))}
        </Select>
        <Input type="date" aria-label="From date" value={filters.date_from} max={filters.date_to || undefined} onChange={set("date_from")} />
        <Input type="date" aria-label="To date" value={filters.date_to} min={filters.date_from || undefined} onChange={set("date_to")} />
      </div>

      {hasActiveFilters(filters) && (
        <Button variant="ghost" size="sm" onClick={onClear}>
          <Icon name="x" className="h-4 w-4" />
          Clear filters
        </Button>
      )}
    </div>
  );
}
