const Book = require("../models/Book");

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
    const books = await Book.find();
    res.status(200).json({
      message: "Books retrieved successfully",
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
