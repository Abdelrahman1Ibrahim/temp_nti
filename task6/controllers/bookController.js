const Book = require("../models/Book");
const mongoose = require("mongoose");

const buildFilter = (query) => {
  const filter = { ...query };

  ["page", "limit", "sort"].forEach((key) => delete filter[key]);

  const queryString = JSON.stringify(filter).replace(
    /\b(gte|gt|lte|lt)\b/g,
    (matched) => `$${matched}`,
  );

  return JSON.parse(queryString);
};

const getImagePath = (file) => {
  if (!file) {
    return undefined;
  }

  return `/uploads/books/${file.filename}`;
};

exports.createBook = async (req, res) => {
  try {
    const {
      title,
      author,
      description,
      category,
      publicationDate,
      pages,
      isbn,
      price,
    } = req.body;

    if (
      !title ||
      !author ||
      !description ||
      !category ||
      !publicationDate ||
      !pages ||
      !price
    ) {
      return res
        .status(400)
        .json({ message: "Please provide all required fields" });
    }

    const newBook = new Book({
      title,
      author,
      description,
      category,
      publicationDate,
      pages,
      isbn,
      price,
      coverImage: getImagePath(req.file),
    });

    const savedBook = await newBook.save();
    res.status(201).json({
      message: "Book created successfully",
      data: savedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error creating book",
      error: error.message,
    });
  }
};

exports.getAllBooks = async (req, res) => {
  try {
    const filter = buildFilter(req.query);
    const page = Math.max(parseInt(req.query.page, 10) || 1, 1);
    const limit = Math.max(parseInt(req.query.limit, 10) || 10, 1);
    const sort = req.query.sort
      ? req.query.sort.split(",").join(" ")
      : "-createdAt";
    const skip = (page - 1) * limit;

    const [totalItems, books] = await Promise.all([
      Book.countDocuments(filter),
      Book.find(filter).sort(sort).skip(skip).limit(limit),
    ]);

    const totalPages = Math.ceil(totalItems / limit) || 1;

    res.status(200).json({
      message: "Books retrieved successfully",
      currentPage: page,
      itemsPerPage: limit,
      totalItems,
      totalPages,
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching books",
      error: error.message,
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching book",
      error: error.message,
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const imagePath = getImagePath(req.file);
    if (imagePath) {
      updates.coverImage = imagePath;
    }

    const updatedBook = await Book.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book updated successfully",
      data: updatedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating book",
      error: error.message,
    });
  }
};

exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid book ID" });
    }

    const deletedBook = await Book.findByIdAndDelete(id);

    if (!deletedBook) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.status(200).json({
      message: "Book deleted successfully",
      data: deletedBook,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error deleting book",
      error: error.message,
    });
  }
};
