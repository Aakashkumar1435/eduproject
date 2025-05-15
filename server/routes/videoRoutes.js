import express from "express";
import { getVideos } from "../controllers/videoController.js";

const videoRoutes = express.Router();

videoRoutes.get('/getLectures', getVideos);

export default videoRoutes;
