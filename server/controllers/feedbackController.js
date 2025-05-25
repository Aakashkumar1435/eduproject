import Feedback from '../models/Feedback.js'; // adjust the path if needed

export const submitFeedback = async (req, res) => {
  try {
    const { userId } = req.query;

    if (!userId) {
      return res.status(400).json({ error: 'Missing userId in query parameters' });
    }

    const feedbackData = {
      ...req.body,
      userId,
    };

    const feedback = new Feedback(feedbackData);
    await feedback.save();

    res.status(201).json({ message: 'Feedback submitted successfully!' });
  } catch (error) {
    res.status(400).json({ error: 'Failed to submit feedback', details: error.message });
  }
};