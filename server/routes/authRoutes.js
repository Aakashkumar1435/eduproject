import express from "express";
import { signup, login, resetPassword, getUser, updateProfile } from "../controllers/authController.js";
import { getUserTestSummary } from "../controllers/progressController.js";



const authRoutes = express.Router();

authRoutes.post("/signup", signup);
authRoutes.post("/login", login);
authRoutes.post("/reset-password", resetPassword);
authRoutes.get('/getUser', getUser);
authRoutes.get('/tests', getUserTestSummary);
authRoutes.post('/updateUser', updateProfile);

export default authRoutes;
