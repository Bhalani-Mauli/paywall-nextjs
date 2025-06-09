"use client";

import { useState } from "react";
import { useUser } from "../context/UserProvider";
import PaymentModal from "../PaymentModal/PaymentModal";
import styles from "./paywall.module.css";
import PaywallCard from "./PaywallCard/PaywallCard";

const plans = [
  {
    title: "Free",
    price: "$0",
    period: "forever",
    isPremium: false,
    features: [
      "Access to free courses",
      "Basic community support",
      "Limited course materials",
    ],
    getButtonConfig: (currentPlan) => ({
      variant: "secondary",
      text:
        currentPlan?.toUpperCase() === "FREE" ? "Current Plan" : "Free forever",
    }),
  },
  {
    title: "Premium",
    price: "$29",
    period: "month",
    isPremium: true,
    features: [
      "Access to all courses",
      "Priority community support",
      "Downloadable course materials",
      "Exclusive webinars",
    ],
    getButtonConfig: (currentPlan) => ({
      variant: "primary",
      text:
        currentPlan?.toUpperCase() === "PREMIUM"
          ? "Current Plan"
          : "Upgrade Premium",
    }),
  },
  {
    title: "Pro",
    price: "$299",
    period: "year",
    isPremium: true,
    features: [
      "Everything in Premium",
      "1-on-1 mentorship sessions",
      "Exclusive masterclasses",
      "Career guidance",
    ],
    getButtonConfig: (currentPlan) => ({
      variant: "primary",
      text:
        currentPlan?.toUpperCase() === "PRO" ? "Current Plan" : "Upgrade Pro",
    }),
  },
];

export default function Paywall() {
  const { user, setUser } = useUser();
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscribe = (plan) => {
    setSelectedPlan(plan);
    setShowPaymentForm(true);
  };

  return (
    <div className={styles.paywall}>
      <h2 className={styles.title}>Choose your plan</h2>
      <p className={styles.description}>
        Subscribe to access exclusive content and features.
      </p>
      <div className={styles.plans}>
        {plans.map((plan) => {
          const buttonConfig = plan.getButtonConfig(user?.subscription?.plan);
          return (
            <PaywallCard
              key={plan.title}
              title={plan.title}
              price={plan.price}
              period={plan.period}
              isPremium={plan.isPremium}
              currentPlan={user?.subscription?.plan}
              features={plan.features}
              buttonVariant={buttonConfig.variant}
              onSubscribe={() => handleSubscribe(plan.title)}
              buttonText={buttonConfig.text}
            />
          );
        })}
      </div>

      {showPaymentForm && (
        <PaymentModal
          show={showPaymentForm}
          setShow={setShowPaymentForm}
          selectedPlan={selectedPlan}
          setSelectedPlan={setSelectedPlan}
          setUser={setUser}
        />
      )}
    </div>
  );
}
