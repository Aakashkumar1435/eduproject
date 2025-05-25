import Notes from "../models/Notes.js";

// Capitalize the first letter of a string
const capitalizeFirst = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

// GET /api/notes?subject=physics
export const getNotes = async (req, res) => {
  try {
    const { subject } = req.query;

    if (!subject) {
      return res.status(400).json({ message: "Missing subject in query." });
    }

    const formattedSubject = capitalizeFirst(subject);

    const notes = await Notes.find({ subjectName: formattedSubject });

    if (notes.length === 0) {
      return res.status(404).json({ message: "No notes found for the given subject." });
    }

    res.status(200).json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).json({ message: "Server error while fetching notes." });
  }
};
