import express from "express";
import { signup, login, resetPassword, getUser } from "../controllers/authController.js";
import { getUserTestSummary } from "../controllers/progressController.js";


const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/reset-password", resetPassword);
authRoutes.get('/getUser', getUser);
authRoutes.get('/tests', getUserTestSummary);

export default authRoutes;
