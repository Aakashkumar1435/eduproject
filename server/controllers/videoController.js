// controllers/videoController.js
import VideoLecture from '../models/VideoLectures.js';

export const getVideos = async (req, res) => {
  try {
    let { subject } = req.query;

    if (!subject) {
      return res.status(400).json({ message: 'Subject is required in query.' });
    }

    // Capitalize the first letter of the subject
    subject = subject.charAt(0).toUpperCase() + subject.slice(1).toLowerCase();

    const videos = await VideoLecture.find({ subjectName: subject });

    if (!videos.length) {
      return res.status(404).json({ message: 'No videos found for the provided subject.' });
    }

    res.status(200).json(videos);
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Server error while fetching videos.' });
  }
};
