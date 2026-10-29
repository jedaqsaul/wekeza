import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout.jsx";
import Input from "../components/ui/Input.jsx";
import Button from "../components/ui/Button.jsx";
import { FormError } from "../components/ui/ErrorMessage.jsx";
import { useAuth } from "../hooks/useAuth.js";
import { parseApiError } from "../services/api";
import { validateEmail } from "../utils/validators.js";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const redirectTo = location.state?.from || "/dashboard";

  const [form, setForm] = useState({ email: "", password: "" });
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
      email: validateEmail(form.email),
      password: form.password ? null : "Password is required.",
    };
    setErrors(nextErrors);
    setFormError("");
    if (Object.values(nextErrors).some(Boolean)) return;

    setIsSubmitting(true);
    try {
      await login({ email: form.email.trim().toLowerCase(), password: form.password });
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const status = err.response?.status;
      setFormError(
        status === 401
          ? "That email and password don't match an account. Check both and try again."
          : parseApiError(err).message
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      title="Welcome back"
      subtitle="Sign in to see your balance and recent activity."
      footer={
        <>
          New to Wekeza?{" "}
          <Link to="/register" className="font-medium text-pine-500 hover:underline">
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} noValidate className="space-y-4">
        <FormError message={formError} />
        <Input
          label="Email"
          type="email"
          autoComplete="email"
          autoFocus
          value={form.email}
          onChange={update("email")}
          error={errors.email}
          placeholder="you@example.com"
        />
        <Input
          label="Password"
          type="password"
          autoComplete="current-password"
          value={form.password}
          onChange={update("password")}
          error={errors.password}
        />
        <Button type="submit" size="lg" className="w-full" isLoading={isSubmitting}>
          {isSubmitting ? "Signing in…" : "Sign in"}
        </Button>
      </form>
    </AuthLayout>
  );
}
