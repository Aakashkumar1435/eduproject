import mongoose from 'mongoose';

const subjectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  testsCount: {
    type: Number,
    default: 0, // Tracks number of tests in this subject
  }
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);
export default Subject;
