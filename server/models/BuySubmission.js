import mongoose from "mongoose";

const BuySubmissionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  screenshot: { type: String },
  offerTitle: { type: String, required: true },
  category: { type: String, default: "Other" },
  submittedAt: { type: Date, default: Date.now },
});

const BuySubmission = mongoose.model("BuySubmission", BuySubmissionSchema);
export default BuySubmission;
