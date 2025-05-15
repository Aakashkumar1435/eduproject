// ✅ AggregateCalculator.jsx (component)
"use client";
import React, { useState } from "react";
import styles from "./aggregateCalculator.module.css";

const defaultWeights = {
  mdcat: { matric: 0.10, inter: 0.40, test: 0.50 },
  nums: { matric: 0.10, inter: 0.15, test: 0.75 },
  ecat: { matric: 0.10, inter: 0.30, test: 0.60 },
  net: { matric: 0.10, inter: 0.15, test: 0.75 },
};

export default function AggregateCalculator() {
  const [form, setForm] = useState({
    testType: "",
    matricObt: "",
    matricTotal: "",
    interObt: "",
    interTotal: "",
    testObt: "",
    testTotal: "",
    customMatric: "",
    customInter: "",
    customTest: "",
  });

  const [result, setResult] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleCalculate = () => {
    const {
      testType,
      matricObt,
      matricTotal,
      interObt,
      interTotal,
      testObt,
      testTotal,
      customMatric,
      customInter,
      customTest,
    } = form;

    let weights;
    if (testType === "custom") {
      const cm = parseFloat(customMatric) / 100 || 0;
      const ci = parseFloat(customInter) / 100 || 0;
      const ct = parseFloat(customTest) / 100 || 0;
      if (cm + ci + ct !== 1) {
        alert("Custom weights must add up to 100%.");
        return;
      }
      weights = { matric: cm, inter: ci, test: ct };
    } else {
      if (!defaultWeights[testType]) {
        alert("Please select a valid test type!");
        return;
      }
      weights = defaultWeights[testType];
    }

    const mObt = parseFloat(matricObt) || 0;
    const mTotal = parseFloat(matricTotal) || 1;
    const iObt = parseFloat(interObt) || 0;
    const iTotal = parseFloat(interTotal) || 1;
    const tObt = parseFloat(testObt) || 0;
    const tTotal = parseFloat(testTotal) || 1;

    if (mObt > mTotal || iObt > iTotal || tObt > tTotal) {
      alert("Obtained marks cannot exceed total marks.");
      return;
    }

    const mPercent = (mObt / mTotal) * 100;
    const iPercent = (iObt / iTotal) * 100;
    const tPercent = (tObt / tTotal) * 100;

    const aggregate =
      mPercent * weights.matric +
      iPercent * weights.inter +
      tPercent * weights.test;

    setResult(aggregate.toFixed(2));
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1><b>Aggregate Calculator</b></h1>
        <p>Calculate your academic aggregate score instantly</p>
      </div>

      <div className={styles.card}>
        {/* Test Type */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Test Type</h3>
          <select
            name="testType"
            value={form.testType}
            onChange={handleChange}
            required
            className={styles.select}
          >
            <option value="">Select Test</option>
            <option value="mdcat">MDCAT</option>
            <option value="nums">NUMS</option>
            <option value="ecat">ECAT</option>
            <option value="net">NET</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {/* Custom Weightage */}
        {form.testType === "custom" && (
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Custom Weightage (%)</h3>
            <div className={styles.row}>
              <input
                type="number"
                name="customMatric"
                placeholder="Matric %"
                value={form.customMatric}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="number"
                name="customInter"
                placeholder="Inter %"
                value={form.customInter}
                onChange={handleChange}
                className={styles.input}
              />
              <input
                type="number"
                name="customTest"
                placeholder="Test %"
                value={form.customTest}
                onChange={handleChange}
                className={styles.input}
              />
            </div>
          </div>
        )}

        {/* Matric */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Matriculation</h3>
          <div className={styles.row}>
            <input
              type="number"
              name="matricObt"
              placeholder="Obtained Marks"
              value={form.matricObt}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
              type="number"
              name="matricTotal"
              placeholder="Total Marks"
              value={form.matricTotal}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Intermediate */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Intermediate</h3>
          <div className={styles.row}>
            <input
              type="number"
              name="interObt"
              placeholder="Obtained Marks"
              value={form.interObt}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
              type="number"
              name="interTotal"
              placeholder="Total Marks"
              value={form.interTotal}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        {/* Test */}
        <div className={styles.section}>
          <h3 className={styles.sectionTitle}>Test Score</h3>
          <div className={styles.row}>
            <input
              type="number"
              name="testObt"
              placeholder="Obtained Score"
              value={form.testObt}
              onChange={handleChange}
              className={styles.input}
              required
            />
            <input
              type="number"
              name="testTotal"
              placeholder="Total Score"
              value={form.testTotal}
              onChange={handleChange}
              className={styles.input}
              required
            />
          </div>
        </div>

        <button onClick={handleCalculate} className={styles.button}>
          Calculate Aggregate
        </button>

        {result && (
          <div className={styles.result}>
            <h3>Your Aggregate Percentage</h3>
            <div className={styles.resultValue}>{result}%</div>
          </div>
        )}
      </div>
    </div>
  );
}
