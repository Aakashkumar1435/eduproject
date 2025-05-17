import User from "../models/User.js";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
import multer from 'multer';
import path from 'path';
import fs from 'fs';

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// Configure multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, '-');
    cb(null, `${Date.now()}-${base}${ext}`);
  },
});

const upload = multer({ storage }).single("image");

export const updateProfile = (req, res) => {
  console.log("i came here");
  upload(req, res, async (err) => {
    try {
      if (err) {
        console.error("Upload error:", err);
        return res.status(400).json({ message: "File upload error" });
      }

      const userId = req.query.userId;
      console.log('userId ', userId);
      if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
      }

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      console.log('user also found');

      console.log('Uploaded file:', req.file);

      // Save image URL if file uploaded
      if (req.file) {
        const imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
        user.avatar = imageUrl;
        console.log("Image uploaded to:", imageUrl);
      }

      await user.save();
      res.status(200).json({ message: "Profile updated successfully", user });

    } catch (error) {
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  });
};

const maxAge = 7 * 24 * 60 * 60; // 7 days in seconds

// Function to create a JWT token
const createToken = (email, userId) => {
  return jwt.sign({ email, userId }, process.env.JWT_KEY, {
    expiresIn: maxAge,
  });
};



// Signup Function
export const signup = async (req, res, next) => {
  try {
    const { email, username, phone, password } = req.body;

    // Validate required fields
    if (!email || !username) {
      return res
        .status(400)
        .json({ error: "Please provide all required fields" });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await hash(password, 10);

    // Create new user
    const user = await User.create({
      email: email,
      name: username, // Save username as name in the database
      phone: phone || null,
      password: hashedPassword || null,
    });

    // Create JWT token for the user
    const token = createToken(email, user.id);

    // Set the token in a cookie
    res.cookie("jwt", token, {
      maxAge: maxAge * 1000, // Cookie expiration time
      httpOnly: true, // Makes the cookie inaccessible to JavaScript, improving security
      secure: process.env.NODE_ENV === "production", // Only enable secure cookies in production
      sameSite: "None", // Required for cross-origin cookies (works with `secure: true` in production)
      path: "/", // Ensures cookie is available for all paths
    });

    console.log("Response Cookies:", res.getHeaders()["set-cookie"]);

    // Return response with user data
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name, // Return name (username) in response
        phone: user.phone || null,
      },
    });
  } catch (e) {
    console.log("Error in signup:", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Login Function
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res
        .status(400)
        .json({ error: "Please provide email and password" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Compare passwords
    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Create JWT token for the user
    const token = createToken(email, user.id);

    // Set the token in a cookie
    res.cookie("jwt", token, {
      maxAge: maxAge * 1000, // Cookie expiration time in milliseconds
      httpOnly: true, // Prevents JavaScript access
      secure: false, // Must be false for local HTTP (not HTTPS)
      sameSite: "Lax", // Use Lax for local development
      path: "/", // Makes cookie accessible on all routes
    });

    console.log("Response Cookies:", res.getHeaders()["set-cookie"]);

    // Return response with user data
    return res.status(200).json({
      user: {
        id: user.id,
        email: user.email,
        name: user.name, // Return name (username) in response
        phone: user.phone,
      },
    });
  } catch (e) {
    console.log("Error in login:", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

// Reset Password Function
export const resetPassword = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Generate a reset token (valid for 1 hour)
    const resetToken = jwt.sign({ email }, process.env.JWT_KEY, {
      expiresIn: "1h",
    });

    // Here, you would send an email with the reset token link.
    // For simplicity, we'll just return the token in the response (don't do this in production).

    return res
      .status(200)
      .json({ message: "Password reset link sent", resetToken });
  } catch (e) {
    console.log("Error in resetPassword:", e);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

export const getUser = async (req, res) => {
  try {
    const { userId } = req.query;

    // Find user by ID
    const user = await User.findById(userId).select("-password"); // Exclude password field

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Return user data
    return res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        phone: user.phone || null,
        avatar: user.avatar || null,
        points: user.point || 0,
        level: user.level || 1,
        isPremium: user.isPremium || false,
        subscription: user.subscription || null,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    console.error("Error fetching user:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

