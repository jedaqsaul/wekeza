import Button from "./Button.jsx";
import Icon from "./Icon.jsx";

export default function Pagination({ page, pageCount, count, pageSize, onChange }) {
  if (pageCount <= 1) return null;
  const start = (page - 1) * pageSize + 1;
  const end = Math.min(page * pageSize, count);

  return (
    <nav className="flex items-center justify-between gap-3 border-t border-border px-4 py-3" aria-label="Pagination">
      <p className="text-xs text-ink-muted sm:text-sm">
        <span className="tabular">{start}–{end}</span> of <span className="tabular">{count}</span>
      </p>
      <div className="flex items-center gap-2">
        <Button variant="secondary" size="sm" disabled={page <= 1} onClick={() => onChange(page - 1)} aria-label="Previous page">
          <Icon name="chevronLeft" className="h-4 w-4" />
          Prev
        </Button>
        <span className="text-xs text-ink-muted">
          Page {page} of {pageCount}
        </span>
        <Button variant="secondary" size="sm" disabled={page >= pageCount} onClick={() => onChange(page + 1)} aria-label="Next page">
          Next
          <Icon name="chevronRight" className="h-4 w-4" />
        </Button>
      </div>
    </nav>
  );
}
