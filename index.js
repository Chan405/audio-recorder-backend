const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
const port = 5000;

// Enable CORS
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

// Endpoint to handle audio file upload
app.post("/upload", upload.single("audio"), (req, res) => {
  res.json({ filePath: `/uploads/${req.file.filename}` });
});

// Endpoint to get uploaded files
app.get("/files", (req, res) => {
  const fs = require("fs");
  const files = fs.readdirSync("./uploads");
  res.json(files.map((file) => `/uploads/${file}`));
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
