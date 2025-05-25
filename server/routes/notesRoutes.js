import express from "express";
import { getNotes } from "../controllers/notesController.js";

const notesRoutes = express.Router();

notesRoutes.get('/getNotes', getNotes);

export default notesRoutes;
