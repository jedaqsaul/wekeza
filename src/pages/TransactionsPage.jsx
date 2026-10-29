import { useEffect, useState } from "react";
import PageContainer from "../layouts/PageContainer.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Icon from "../components/ui/Icon.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import ErrorMessage from "../components/ui/ErrorMessage.jsx";
import Pagination from "../components/ui/Pagination.jsx";
import { TransactionRowSkeleton } from "../components/ui/Skeleton.jsx";
import TransactionRow from "../components/transactions/TransactionRow.jsx";
import TransactionFilters, { EMPTY_FILTERS, hasActiveFilters } from "../components/transactions/TransactionFilters.jsx";
import { useDebounce } from "../hooks/useDebounce.js";
import { useTransactionActions } from "../hooks/useTransactionActions.js";
import { fetchTransactions } from "../services/transactions";
import { parseApiError } from "../services/api";

// Must match the backend's PAGE_SIZE.
const PAGE_SIZE = 20;

export default function TransactionsPage() {
  const { version, openAdd, openEdit, openDelete } = useTransactionActions();

  const [filters, setFilters] = useState(EMPTY_FILTERS);
  const [page, setPage] = useState(1);
  const [data, setData] = useState({ count: 0, results: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  // Debounce only the free-text search; the other filters apply immediately.
  const debouncedSearch = useDebounce(filters.search);

  const changeFilters = (next) => {
    setFilters(next);
    setPage(1);
  };

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError("");
    fetchTransactions({
      page,
      search: debouncedSearch.trim(),
      type: filters.type,
      category: filters.category,
      date_from: filters.date_from,
      date_to: filters.date_to,
    })
      .then((result) => {
        if (!cancelled) setData(result);
      })
      .catch((err) => {
        if (cancelled) return;
        // Deleting the last item on a page leaves it out of range; step back.
        if (err.response?.status === 404 && page > 1) {
          setPage((p) => p - 1);
          return;
        }
        setError(parseApiError(err).message);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [page, debouncedSearch, filters.type, filters.category, filters.date_from, filters.date_to, version, reloadKey]);

  const pageCount = Math.max(1, Math.ceil(data.count / PAGE_SIZE));
  const filtered = hasActiveFilters(filters);

  return (
    <PageContainer
      title="Transactions"
      subtitle="Search, filter, and manage everything you've recorded."
      actions={
        <Button onClick={openAdd} className="hidden sm:inline-flex">
          <Icon name="plus" className="h-4 w-4" />
          Add transaction
        </Button>
      }
    >
      <div className="space-y-5">
        <TransactionFilters
          filters={filters}
          onChange={changeFilters}
          onClear={() => changeFilters(EMPTY_FILTERS)}
        />

        {error ? (
          <ErrorMessage
            title="We couldn't load your transactions"
            message={error}
            onRetry={() => setReloadKey((k) => k + 1)}
          />
        ) : (
          <Card className="overflow-hidden">
            {isLoading && data.results.length === 0 ? (
              <div className="divide-y divide-border">
                {[0, 1, 2, 3, 4].map((i) => (
                  <TransactionRowSkeleton key={i} />
                ))}
              </div>
            ) : data.results.length === 0 ? (
              filtered ? (
                <EmptyState
                  icon="search"
                  title="No matching transactions"
                  message="Nothing fits these filters. Try a different search or date range."
                  action={
                    <Button variant="secondary" onClick={() => changeFilters(EMPTY_FILTERS)}>
                      Clear filters
                    </Button>
                  }
                />
              ) : (
                <EmptyState
                  title="No transactions yet"
                  message="Start tracking your finances by adding your first transaction."
                  action={
                    <Button onClick={openAdd}>
                      <Icon name="plus" className="h-4 w-4" />
                      Add your first transaction
                    </Button>
                  }
                />
              )
            ) : (
              <>
                <ul
                  className={`divide-y divide-border transition-opacity ${isLoading ? "opacity-60" : "opacity-100"}`}
                  aria-busy={isLoading}
                >
                  {data.results.map((tx) => (
                    <TransactionRow key={tx.id} transaction={tx} onEdit={openEdit} onDelete={openDelete} />
                  ))}
                </ul>
                <Pagination
                  page={page}
                  pageCount={pageCount}
                  count={data.count}
                  pageSize={PAGE_SIZE}
                  onChange={setPage}
                />
              </>
            )}
          </Card>
        )}
      </div>
    </PageContainer>
  );
}
