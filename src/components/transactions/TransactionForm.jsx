import { useMemo, useState } from "react";
import Input from "../ui/Input.jsx";
import Select from "../ui/Select.jsx";
import Button from "../ui/Button.jsx";
import { FormError } from "../ui/ErrorMessage.jsx";
import { useCategories } from "../../hooks/useCategories.js";
import { parseApiError } from "../../services/api";
import { todayIsoDate } from "../../utils/format.js";
import { validateAmount, validateRequired } from "../../utils/validators.js";

const TYPES = [
  { value: "expense", label: "Expense" },
  { value: "income", label: "Income" },
];

const firstMessage = (value) => (Array.isArray(value) ? value[0] : value);

/**
 * Shared by "Add" and "Edit". `initial` present => edit mode.
 * `onSubmit(payload)` must return a promise; rejections are shown as errors.
 */
export default function TransactionForm({ initial, onSubmit, onCancel }) {
  const { categories, isLoading: categoriesLoading, error: categoriesError } = useCategories();
  const isEdit = Boolean(initial);

  const [form, setForm] = useState({
    type: initial?.type || "expense",
    amount: initial?.amount ? String(parseFloat(initial.amount)) : "",
    category: initial?.category ? String(initial.category) : "",
    description: initial?.description || "",
    date: initial?.date || todayIsoDate(),
  });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categoryOptions = useMemo(
    () => categories.filter((c) => c.type === form.type),
    [categories, form.type]
  );

  const setField = (field, value) => {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const changeType = (type) => {
    // A category belongs to one type, so clear it when the type changes.
    setForm((f) => ({ ...f, type, category: "" }));
    setErrors((prev) => ({ ...prev, type: undefined, category: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {
      amount: validateAmount(form.amount),
      category: validateRequired(form.category, "Category"),
      date: validateRequired(form.date, "Date"),
    };
    setErrors(nextErrors);
    setFormError("");
    if (Object.values(nextErrors).some(Boolean)) return;

    setIsSubmitting(true);
    try {
      await onSubmit({
        type: form.type,
        amount: Number(form.amount).toFixed(2),
        category: Number(form.category),
        description: form.description.trim(),
        date: form.date,
      });
    } catch (err) {
      const { message, details } = parseApiError(err);
      if (details) {
        const mapped = {
          amount: firstMessage(details.amount),
          category: firstMessage(details.category),
          date: firstMessage(details.date),
          type: firstMessage(details.type),
        };
        setErrors(mapped);
        if (!Object.values(mapped).some(Boolean)) setFormError(message);
      } else {
        setFormError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormError message={formError} />
      {categoriesError && (
        <FormError message="Categories couldn't be loaded. Close this window and try again." />
      )}

      <fieldset>
        <legend className="mb-1.5 text-sm font-medium">Type</legend>
        <div className="grid grid-cols-2 gap-1 rounded-xl bg-paper p-1" role="radiogroup" aria-label="Transaction type">
          {TYPES.map((t) => {
            const active = form.type === t.value;
            const tone = t.value === "income" ? "text-emerald-600" : "text-clay-600";
            return (
              <button
                key={t.value}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => changeType(t.value)}
                className={`rounded-lg py-2 text-sm font-medium transition-all ${
                  active ? `bg-white shadow-card ${tone}` : "text-ink-muted hover:text-ink"
                }`}
              >
                {t.label}
              </button>
            );
          })}
        </div>
        {errors.type && <p className="mt-1.5 text-xs text-clay-600">{errors.type}</p>}
      </fieldset>

      <Input
        label="Amount"
        type="number"
        inputMode="decimal"
        step="0.01"
        min="0.01"
        value={form.amount}
        onChange={(e) => setField("amount", e.target.value)}
        error={errors.amount}
        placeholder="0.00"
        className="tabular"
        autoFocus={!isEdit}
      />

      <Select
        label="Category"
        value={form.category}
        onChange={(e) => setField("category", e.target.value)}
        error={errors.category}
        disabled={categoriesLoading}
      >
        <option value="">{categoriesLoading ? "Loading categories…" : "Choose a category"}</option>
        {categoryOptions.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </Select>

      <Input
        label="Description (optional)"
        value={form.description}
        onChange={(e) => setField("description", e.target.value)}
        maxLength={255}
        placeholder={form.type === "income" ? "e.g. August salary" : "e.g. Weekly groceries"}
      />

      <Input
        label="Date"
        type="date"
        value={form.date}
        onChange={(e) => setField("date", e.target.value)}
        error={errors.date}
      />

      <div className="flex flex-col-reverse gap-2 pt-2 sm:flex-row sm:justify-end">
        <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" isLoading={isSubmitting}>
          {isSubmitting ? "Saving…" : isEdit ? "Save changes" : "Add transaction"}
        </Button>
      </div>
    </form>
  );
}
