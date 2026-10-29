export default function Card({ as: Tag = "div", className = "", children, ...rest }) {
  return (
    <Tag
      className={`rounded-2xl border border-border/70 bg-surface shadow-card ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
}
