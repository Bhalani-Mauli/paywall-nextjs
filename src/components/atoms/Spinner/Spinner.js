import React from "react";
import { LoaderCircle } from "lucide-react";

import styles from "./spinner.module.css";

const Spinner = () => {
  return (
    <div className={styles.overlay}>
      <LoaderCircle className={styles.spinner} />
    </div>
  );
};

export default Spinner;
