import { useState } from "react";
import Modal from "../ui/Modal.jsx";
import Button from "../ui/Button.jsx";
import { FormError } from "../ui/ErrorMessage.jsx";
import { useToast } from "../../hooks/useToast.js";
import { deleteTransaction } from "../../services/transactions";
import { parseApiError } from "../../services/api";
import { formatDate, formatMoney } from "../../utils/format.js";

export default function DeleteTransactionModal({ transaction, onClose, onDeleted }) {
  const toast = useToast();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    setError("");
    try {
      await deleteTransaction(transaction.id);
      toast.success("Transaction deleted.");
      onDeleted();
    } catch (err) {
      setError(parseApiError(err).message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleClose = () => {
    setError("");
    onClose();
  };

  return (
    <Modal open={Boolean(transaction)} onClose={handleClose} title="Delete this transaction?" size="sm">
      {transaction && (
        <div className="space-y-4">
          <p className="text-sm text-ink-muted">
            <span className="tabular font-medium text-ink">{formatMoney(transaction.amount)}</span>{" "}
            {transaction.type === "income" ? "from" : "on"} {transaction.category_name}
            {transaction.description ? ` (${transaction.description})` : ""},{" "}
            {formatDate(transaction.date)}. Your balance will update. This can't be undone.
          </p>
          <FormError message={error} />
          <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={handleClose} disabled={isDeleting}>
              Keep it
            </Button>
            <Button variant="danger" onClick={handleDelete} isLoading={isDeleting}>
              {isDeleting ? "Deleting…" : "Delete transaction"}
            </Button>
          </div>
        </div>
      )}
    </Modal>
  );
}
