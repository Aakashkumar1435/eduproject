import multer from "multer";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

// Get __dirname for ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Correct uploads path: eduproject/server/uploads
const uploadDir = path.join(__dirname, "..", "uploads");

// Ensure uploads directory exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Allowed extensions
const allowedTypes = /jpeg|jpg|png|pdf/;

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase().substring(1);
  if (allowedTypes.test(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Unsupported file type. Allowed: jpg, jpeg, png, pdf"));
  }
};

const upload = multer({ storage, fileFilter });

export default upload;
