require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");

const app = express();

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/book-module")
  .then(() => {
    console.log("✅ MongoDB connected successfully");
  })
  .catch((error) => {
    console.error("❌ MongoDB connection error:", error);
    process.exit(1);
  });

app.use("/api", bookRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Book Module API",
    version: "1.0.0",
    endpoints: [
      { method: "POST", path: "/api/books", description: "Create a new book" },
      { method: "GET", path: "/api/books", description: "Get all books" },
      { method: "GET", path: "/api/books/:id", description: "Get book by ID" },
      { method: "PATCH", path: "/api/books/:id", description: "Update a book" },
      {
        method: "DELETE",
        path: "/api/books/:id",
        description: "Delete a book",
      },
    ],
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: process.env.NODE_ENV === "development" ? err.message : {},
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
