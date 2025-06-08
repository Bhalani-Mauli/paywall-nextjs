import styles from "./input.module.css";

export default function Input({
  id,
  name,
  type = "text",
  value,
  onChange,
  required = false,
  ...props
}) {
  return (
    <input
      id={id}
      name={name}
      type={type}
      required={required}
      className={styles.input}
      value={value}
      onChange={onChange}
      {...props}
    />
  );
}
