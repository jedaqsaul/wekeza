import { createContext, useCallback, useMemo, useState } from "react";
import TransactionModal from "../components/transactions/TransactionModal.jsx";
import DeleteTransactionModal from "../components/transactions/DeleteTransactionModal.jsx";

export const TransactionActionsContext = createContext(null);

/**
 * Owns the add / edit / delete modals for the whole signed-in area, and a
 * `version` counter that pages watch to refetch after any change.
 */
export function TransactionActionsProvider({ children }) {
  const [version, setVersion] = useState(0);
  const [formState, setFormState] = useState({ open: false, transaction: null });
  const [deleting, setDeleting] = useState(null);

  const openAdd = useCallback(() => setFormState({ open: true, transaction: null }), []);
  const openEdit = useCallback((transaction) => setFormState({ open: true, transaction }), []);
  const openDelete = useCallback((transaction) => setDeleting(transaction), []);
  const closeForm = useCallback(() => setFormState((s) => ({ ...s, open: false })), []);
  const closeDelete = useCallback(() => setDeleting(null), []);
  const bump = useCallback(() => setVersion((v) => v + 1), []);

  const value = useMemo(
    () => ({ version, openAdd, openEdit, openDelete }),
    [version, openAdd, openEdit, openDelete]
  );

  return (
    <TransactionActionsContext.Provider value={value}>
      {children}
      <TransactionModal
        open={formState.open}
        transaction={formState.transaction}
        onClose={closeForm}
        onSaved={() => {
          closeForm();
          bump();
        }}
      />
      <DeleteTransactionModal
        transaction={deleting}
        onClose={closeDelete}
        onDeleted={() => {
          closeDelete();
          bump();
        }}
      />
    </TransactionActionsContext.Provider>
  );
}
