import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PageContainer from "../layouts/PageContainer.jsx";
import Card from "../components/ui/Card.jsx";
import Button from "../components/ui/Button.jsx";
import Icon from "../components/ui/Icon.jsx";
import EmptyState from "../components/ui/EmptyState.jsx";
import ErrorMessage from "../components/ui/ErrorMessage.jsx";
import { TransactionRowSkeleton } from "../components/ui/Skeleton.jsx";
import { BalanceCard, StatCard, StatsSkeleton } from "../components/dashboard/StatCards.jsx";
import { ExpensesByCategory, IncomeVsExpenses } from "../components/dashboard/SpendingBreakdown.jsx";
import TransactionRow from "../components/transactions/TransactionRow.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useTransactionActions } from "../hooks/useTransactionActions.js";
import { fetchDashboardSummary, fetchRecentTransactions } from "../services/transactions";
import { parseApiError } from "../services/api";
import { formatMoney } from "../utils/format.js";

export default function DashboardPage() {
  const { user } = useAuth();
  const { version, openAdd } = useTransactionActions();

  const [summary, setSummary] = useState(null);
  const [recent, setRecent] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);

  const retry = useCallback(() => {
    setIsLoading(true);
    setReloadKey((k) => k + 1);
  }, []);

  useEffect(() => {
    let cancelled = false;
    setError("");
    Promise.all([fetchDashboardSummary(), fetchRecentTransactions(6)])
      .then(([summaryData, recentData]) => {
        if (cancelled) return;
        setSummary(summaryData);
        setRecent(recentData);
      })
      .catch((err) => {
        if (!cancelled) setError(parseApiError(err).message);
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [version, reloadKey]);

  const firstName = user?.name?.split(" ")[0];
  const addButton = (
    <Button onClick={openAdd} className="hidden sm:inline-flex">
      <Icon name="plus" className="h-4 w-4" />
      Add transaction
    </Button>
  );

  return (
    <PageContainer
      title={firstName ? `Hello, ${firstName}` : "Dashboard"}
      subtitle="Here's where your money stands."
      actions={addButton}
    >
      {isLoading && !summary ? (
        <div className="space-y-6">
          <StatsSkeleton />
          <Card>
            <div className="divide-y divide-border">
              {[0, 1, 2].map((i) => (
                <TransactionRowSkeleton key={i} />
              ))}
            </div>
          </Card>
        </div>
      ) : error && !summary ? (
        <ErrorMessage
          title="We couldn't load your dashboard"
          message={error}
          onRetry={retry}
        />
      ) : summary.transaction_count === 0 ? (
        <Card>
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
        </Card>
      ) : (
        <div className="space-y-6">
          {error && <ErrorMessage title="Showing older data" message={error} onRetry={retry} />}

          <BalanceCard summary={summary} />

          <div className="grid gap-4 sm:grid-cols-3">
            <StatCard kind="income" label="Total income" value={formatMoney(summary.total_income)} delay={50} />
            <StatCard kind="expense" label="Total expenses" value={formatMoney(summary.total_expenses)} delay={100} />
            <StatCard kind="count" label="Total transactions" value={summary.transaction_count} delay={150} />
          </div>

          <Card className="animate-slide-up overflow-hidden" style={{ animationDelay: "200ms" }}>
            <div className="flex items-center justify-between px-4 pb-2 pt-5 sm:px-6">
              <h2 className="text-lg font-semibold">Recent transactions</h2>
              <Link to="/transactions" className="text-sm font-medium text-pine-500 hover:underline">
                View all
              </Link>
            </div>
            <ul className="divide-y divide-border">
              {recent.map((tx) => (
                <TransactionRow key={tx.id} transaction={tx} />
              ))}
            </ul>
          </Card>

          <div className="grid gap-4 lg:grid-cols-2">
            <ExpensesByCategory rows={summary.expenses_by_category} />
            <IncomeVsExpenses income={summary.total_income} expenses={summary.total_expenses} />
          </div>
        </div>
      )}
    </PageContainer>
  );
}
