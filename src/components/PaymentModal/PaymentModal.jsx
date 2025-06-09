"use client";

import { useState } from "react";
import styles from "./paymentModal.module.css";

export default function PaymentModal({
  show,
  selectedPlan,
  setSelectedPlan,
  setShow,
  setUser,
}) {
  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const [upgrading, setUpgrading] = useState(false);
  const [error, setError] = useState("");

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    if (!selectedPlan) return;

    setUpgrading(true);
    setError("");

    try {
      const response = await fetch("/api/subscription/upgrade", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: selectedPlan, paymentData }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Upgrade failed");
      }

      const userResponse = await fetch("/api/user/profile");
      const userData = await userResponse.json();
      setUser(userData.user);

      setShow(false);
      setSelectedPlan(null);
      setPaymentData({
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        nameOnCard: "",
      });
      //TODO(mauli): show toast instead of alert
      alert("Successfully upgraded! Welcome to your new plan.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upgrade failed");
    } finally {
      setUpgrading(false);
    }
  };

  if (!show) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.title}>Complete Your Purchase</h3>

        {error && <div className={styles.errorBox}>{error}</div>}

        <form onSubmit={handlePaymentSubmit} className={styles.form}>
          <div className={styles.inputGroup}>
            <label htmlFor="nameOnCard">Name on Card</label>
            <input
              id="nameOnCard"
              type="text"
              required
              value={paymentData.nameOnCard}
              onChange={(e) =>
                setPaymentData({ ...paymentData, nameOnCard: e.target.value })
              }
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="cardNumber">Card Number</label>
            <input
              id="cardNumber"
              type="text"
              required
              placeholder="1234 5678 9012 3456"
              value={paymentData.cardNumber}
              onChange={(e) =>
                setPaymentData({ ...paymentData, cardNumber: e.target.value })
              }
            />
          </div>

          <div className={styles.row}>
            <div className={styles.inputGroup}>
              <label htmlFor="expiryDate">Expiry Date</label>
              <input
                id="expiryDate"
                type="text"
                required
                placeholder="MM/YY"
                value={paymentData.expiryDate}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, expiryDate: e.target.value })
                }
              />
            </div>

            <div className={styles.inputGroup}>
              <label htmlFor="cvv">CVV</label>
              <input
                id="cvv"
                type="text"
                required
                placeholder="123"
                value={paymentData.cvv}
                onChange={(e) =>
                  setPaymentData({ ...paymentData, cvv: e.target.value })
                }
              />
            </div>
          </div>

          <div className={styles.note}>
            <p>
              <strong>Note:</strong> This is a demo payment form. No real
              payment will be processed.
            </p>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              onClick={() => {
                setShow(false);
                setSelectedPlan(null);
                setError("");
              }}
              className={styles.cancelButton}
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={upgrading}
              className={styles.submitButton}
            >
              {upgrading ? "Processing..." : "Upgrade Now"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
