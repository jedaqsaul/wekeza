import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { FormError } from "../components/ui/ErrorMessage.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { useToast } from "../hooks/useToast.js";
import { parseApiError } from "../services/api";
import { validateEmail, validateName, validatePassword } from "../utils/validators.js";

const firstMessage = (value) => (Array.isArray(value) ? value[0] : value);

export default function RegisterPage() {
  const { register, login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const update = (field) => (e) => {
    setForm((f) => ({ ...f, [field]: e.target.value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrors = {
      name: validateName(form.name),
      email: validateEmail(form.email),
      password: validatePassword(form.password),
    };
    setErrors(nextErrors);
    setFormError("");
    if (Object.values(nextErrors).some(Boolean)) return;

    setIsSubmitting(true);
    const credentials = { email: form.email.trim().toLowerCase(), password: form.password };
    try {
      await register({ name: form.name.trim(), ...credentials });
      await login(credentials);
      toast.success("Your account is ready. Let's add your first transaction.");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const { message, details } = parseApiError(err);
      if (details) {
        setErrors({
          name: firstMessage(details.name),
          email: firstMessage(details.email),
          password: firstMessage(details.password),
        });
        const hasFieldError = ["name", "email", "password"].some((k) => details[k]);
        if (!hasFieldError) setFormError(message);
      } else {
        setFormError(message);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Create your account"
      subtitle="Start tracking what you earn and spend. It takes under a minute."
      footer={
        <>
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-pine-500 hover:underline">
            Sign in
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormError message={formError} />
        <Input
          label="Full name"
          autoComplete="name"
          autoFocus
          value={form.name}
          onChange={update("name")}
          error={errors.name}
        />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          value={form.email}
          onChange={update("email")}
          error={errors.email}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          type="password"
          autoComplete="new-password"
          value={form.password}
          onChange={update("password")}
          error={errors.password}
          hint="At least 8 characters. Avoid common passwords."
        />
        <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
          {isSubmitting ? "Creating account…" : "Create account"}
        </Button>
      </form>
    </AuthLayout>
  );
}
