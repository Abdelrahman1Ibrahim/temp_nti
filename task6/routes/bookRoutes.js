const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

const uploadDir = path.join(__dirname, "..", "uploads", "books");
fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `${uniqueSuffix}${path.extname(file.originalname)}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"));
    }

    cb(null, true);
  },
});

router.post("/books", upload.single("coverImage"), bookController.createBook);

router.get("/books", bookController.getAllBooks);

router.get("/books/:id", bookController.getBookById);

router.patch(
  "/books/:id",
  upload.single("coverImage"),
  bookController.updateBook,
);

router.delete("/books/:id", bookController.deleteBook);

module.exports = router;
