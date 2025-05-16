import express from "express";
import Course from "../models/Course.js";

const router = express.Router();

router.get("/", getCourse);

export default router;
