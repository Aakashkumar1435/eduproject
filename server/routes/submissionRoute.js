import express from "express";
import BuySubmission from "../models/BuySubmission.js";
import upload from "../middleware/upload.js";

const router = express.Router();

// ⬇️ Upload route (already done)
router.post("/", upload.single("screenshot"), async (req, res) => {
  try {
    const { name, email, offerTitle, category } = req.body;
    const screenshot = req.file ? req.file.filename : null;

    const submission = new BuySubmission({
      name,
      email,
      offerTitle,
      category: category || "Other",
      screenshot,
    });

    await submission.save();
    res.status(201).json({ message: "Form submitted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET all submissions
router.get("/", async (req, res) => {
  try {
    const submissions = await BuySubmission.find().sort({ submittedAt: -1 });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch submissions" });
  }
});

export default router;
