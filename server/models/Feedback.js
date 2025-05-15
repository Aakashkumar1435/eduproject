import mongoose from 'mongoose';

const feedbackSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  service: { type: String, required: true },
  rating: { type: Number, required: true },
  message: { type: String, required: true },
  suggestions: { type: String },
  submittedAt: { type: Date, default: Date.now }
});

const Feedback = mongoose.model('Feedback', feedbackSchema);
export default Feedback;
