"use client";
import React, { useEffect, useState } from "react";
import styles from "./PricingPage.module.css";
import BuyForm from "@/app/components/pricing/buyForm/BuyForm";

const testTabs = ["All Courses", "MDCAT", "ECAT", "FSC", "IELTS", "GAT"];

export default function PricingPage() {
  const [billing, setBilling] = useState("monthly");
  const [activeTab, setActiveTab] = useState("All Courses");
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null); // ⬅️ For BuyForm modal

  useEffect(() => {
    fetch("http://localhost:5000/api/pricing")
      .then((res) => res.json())
      .then((data) => setPlans(data))
      .catch((err) => console.error("Error fetching plans:", err));
  }, []);

  const filteredPlans = plans.filter((plan) => {
    if (activeTab === "All Courses") return plan.category === "All";
    return plan.category === activeTab;
  });

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Simple, Transparent Pricing</h1>
        <p>
          Choose the plan that suits your learning needs. All plans include
          access to our learning platform and expert support.
        </p>
      </header>

      {/* Billing Toggle */}
      <div className={styles.pricingToggle}>
        <div className={styles.toggleButton}>
          <button
            className={billing === "monthly" ? styles.active : ""}
            onClick={() => setBilling("monthly")}
          >
            Monthly
          </button>
          <button
            className={billing === "annual" ? styles.active : ""}
            onClick={() => setBilling("annual")}
          >
            Annual
          </button>
        </div>
      </div>

      {/* Category Tabs */}
      <div className={styles.testTabs}>
        {testTabs.map((tab) => (
          <button
            key={tab}
            className={`${styles.testTab} ${
              activeTab === tab ? styles.active : ""
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Pricing Cards */}
      <div className={styles.scrollContainer}>
        {filteredPlans.map((plan, index) => (
          <div
            key={index}
            className={`${styles.priceCard} ${
              plan.isPopular ? styles.popular : ""
            }`}
          >
            {plan.isPopular && (
              <div className={styles.popularTag}>Popular</div>
            )}
            <div className={styles.cardHeader}>
              <h3>{plan.title}</h3>
              <div className={styles.price}>
                PKR{" "}
                {billing === "monthly"
                  ? plan.prices.monthly
                  : plan.prices.annual}
                <span> /{billing === "monthly" ? "mo" : "yr"}</span>
              </div>
              <div className={styles.billingCycle}>
                {billing === "monthly" ? "Billed monthly" : "Billed annually"}
              </div>
            </div>
            <div className={styles.cardBody}>
              <ul className={styles.features}>
                {plan.features.map((feature, i) => (
                  <li key={i}>{feature}</li>
                ))}
              </ul>
              <button
                className={styles.buyBtn}
                onClick={() =>
                  setSelectedPlan({
                    title: plan.title,
                    category: plan.category,
                  })
                }
              >
                Buy {plan.title}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Satisfaction Guarantee */}
      <div className={styles.guarantee}>
        <h3>100% Satisfaction Guarantee</h3>
        <p>
          Not satisfied with our platform? We offer a 7-day money-back guarantee.
          No questions asked.
        </p>
      </div>

      {/* BuyForm Modal */}
      {selectedPlan && (
        <BuyForm offer={selectedPlan} onClose={() => setSelectedPlan(null)} />
      )}
    </div>
  );
}
