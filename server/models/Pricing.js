import mongoose from "mongoose";

const PricingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  prices: {
    monthly: {
      type: Number,
      required: true,
    },
    annual: {
      type: Number,
      required: true,
    },
  },
  billingCycle: {
    type: String,
    enum: ["monthly", "annual"],
    default: "monthly",
  },
  category: {
    type: String,
    enum: ["All", "MDCAT", "ECAT", "FSC", "IELTS", "GAT"],
    default: "All",
  },
  features: {
    type: [String],
    required: true,
  },
  isPopular: {
    type: Boolean,
    default: false,
  },
});

const Pricing = mongoose.model("Pricing", PricingSchema);
export default Pricing;
