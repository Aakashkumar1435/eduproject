import mongoose from "mongoose";

const CourseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: "/courses.png" },
});

const Course = mongoose.model("Course", CourseSchema);
export default Course;
