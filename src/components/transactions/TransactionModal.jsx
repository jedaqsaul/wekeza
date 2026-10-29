import Modal from "../ui/Modal.jsx";
import TransactionForm from "./TransactionForm.jsx";
import { useToast } from "../../hooks/useToast.js";
import { createTransaction, updateTransaction } from "../../services/transactions";

/** Add (no `transaction`) or edit (with `transaction`) in one modal. */
export default function TransactionModal({ open, transaction, onClose, onSaved }) {
  const toast = useToast();
  const isEdit = Boolean(transaction);

  const handleSubmit = async (payload) => {
    if (isEdit) {
      await updateTransaction(transaction.id, payload);
      toast.success("Transaction updated.");
    } else {
      await createTransaction(payload);
      toast.success("Transaction added.");
    }
    onSaved();
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={isEdit ? "Edit transaction" : "Add transaction"}
      description={isEdit ? undefined : "Record money coming in or going out."}
    >
      {/* key resets the form state each time the modal opens for a different record */}
      <TransactionForm
        key={transaction ? `edit-${transaction.id}` : "new"}
        initial={transaction}
        onSubmit={handleSubmit}
        onCancel={onClose}
      />
    </Modal>
  );
}
