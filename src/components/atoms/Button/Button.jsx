import styles from "./button.module.css";

export default function Button({
  type = "button",
  disabled = false,
  loading = false,
  variant = "primary",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`${styles.button} ${styles[variant]}`}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
