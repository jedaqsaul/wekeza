export function validateEmail(email) {
  if (!email.trim()) return "Enter your email address.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return "Enter a valid email address, like you@example.com.";
  return null;
}

export function validatePassword(password) {
  if (!password) return "Enter a password.";
  if (password.length < 8) return "Use at least 8 characters.";
  return null;
}

export function validateName(name) {
  return name.trim() ? null : "Enter your name.";
}

export function validateAmount(amount) {
  if (amount === "" || amount === null || amount === undefined) return "Enter an amount.";
  const num = Number(amount);
  if (Number.isNaN(num)) return "Amount must be a number.";
  if (num <= 0) return "Amount must be greater than zero.";
  if (num >= 1e10) return "Amount is too large.";
  return null;
}

export function validateRequired(value, label) {
  return value && String(value).trim() ? null : `Choose a ${label.toLowerCase()}.`;
}
