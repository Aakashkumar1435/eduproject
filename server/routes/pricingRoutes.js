import express from "express";
import Pricing from "../models/Pricing.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const pricingPlans = await Pricing.find();
    res.json(pricingPlans);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pricing plans" });
  }
});

export default router;
