# Book Module API

This project is a Node.js, Express, and MongoDB backend module for books.

## Features

- Create, read, update, and delete books
- Filter books with query parameters
- Paginate results
- Sort results ascending or descending
- Upload a book image with Multer

## Setup

1. Install dependencies
2. Add your MongoDB connection string in `.env`
3. Start the server

## Run

- `npm run dev`
- `npm start`

## API Usage Examples

- Create a book with `POST /api/books` using `multipart/form-data` and attach an image in `coverImage`
- Get all books with filtering such as `GET /api/books?category=Science&price[gte]=100`
- Paginate with `GET /api/books?page=2&limit=5`
- Sort with `GET /api/books?sort=price` or `GET /api/books?sort=-price`
- Update a book with `PATCH /api/books/:id` and optionally upload a new image
- Fetch one book with `GET /api/books/:id`
- Delete a book with `DELETE /api/books/:id`

## Response Metadata

The list endpoint returns `currentPage`, `itemsPerPage`, `totalItems`, and `totalPages`.
