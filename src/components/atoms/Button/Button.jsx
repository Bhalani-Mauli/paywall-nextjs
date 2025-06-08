import styles from "./button.module.css";

export default function Button({
  type = "button",
  disabled = false,
  loading = false,
  children,
  ...props
}) {
  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={styles.button}
      {...props}
    >
      {loading ? "Loading..." : children}
    </button>
  );
}
