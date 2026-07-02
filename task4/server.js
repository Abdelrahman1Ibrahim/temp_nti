const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;
const FILE_PATH = path.join(__dirname, "books.json");

const readData = () => {
  try {
    if (!fs.existsSync(FILE_PATH)) {
      fs.writeFileSync(FILE_PATH, JSON.stringify([]));
      return [];
    }
    const data = fs.readFileSync(FILE_PATH, "utf8");
    return JSON.parse(data);
  } catch (error) {
    return null;
  }
};

const writeData = (data) => {
  try {
    fs.writeFileSync(FILE_PATH, JSON.stringify(data, null, 2));
    return true;
  } catch (error) {
    return false;
  }
};

const sendJSON = (res, status, body) => {
  res.writeHead(status, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
};

const server = http.createServer((req, res) => {
  const { method, url } = req;
  const books = readData();

  if (books === null) {
    return sendJSON(res, 500, {
      error: "Internal Server Error: Database access failed",
    });
  }

  if (url === "/books" && method === "GET") {
    return sendJSON(res, 200, books);
  }

  if (url === "/books" && method === "POST") {
    let body = "";
    req.on("data", (chunk) => (body += chunk));
    req.on("end", () => {
      try {
        const newBookData = JSON.parse(body);
        if (
          !newBookData.title ||
          !newBookData.author ||
          newBookData.price === undefined ||
          newBookData.available === undefined
        ) {
          return sendJSON(res, 400, { error: "Missing required fields" });
        }

        const newId =
          books.length > 0 ? Math.max(...books.map((b) => b.id)) + 1 : 1;
        const newBook = { id: newId, ...newBookData };
        books.push(newBook);

        if (!writeData(books)) {
          return sendJSON(res, 500, { error: "Failed to save data" });
        }

        sendJSON(res, 201, newBook);
      } catch (error) {
        sendJSON(res, 400, { error: "Invalid JSON format in request body" });
      }
    });
    return;
  }

  if (
    url.startsWith("/books/") &&
    (method === "GET" || method === "PUT" || method === "DELETE")
  ) {
    const idParam = url.split("/")[2];
    const bookId = parseInt(idParam);

    if (isNaN(bookId)) {
      return sendJSON(res, 400, { error: "Invalid book ID format" });
    }

    const bookIndex = books.findIndex((b) => b.id === bookId);

    if (bookIndex === -1) {
      return sendJSON(res, 404, { error: `Book with ID ${bookId} not found` });
    }

    if (method === "GET") {
      return sendJSON(res, 200, books[bookIndex]);
    }

    if (method === "DELETE") {
      books.splice(bookIndex, 1);
      if (!writeData(books)) {
        return sendJSON(res, 500, { error: "Failed to update database" });
      }
      return sendJSON(res, 200, {
        message: `Book with ID ${bookId} has been deleted`,
      });
    }

    if (method === "PUT") {
      let body = "";
      req.on("data", (chunk) => (body += chunk));
      req.on("end", () => {
        try {
          const updateData = JSON.parse(body);
          books[bookIndex] = { ...books[bookIndex], ...updateData, id: bookId };

          if (!writeData(books)) {
            return sendJSON(res, 500, { error: "Failed to update database" });
          }

          sendJSON(res, 200, books[bookIndex]);
        } catch (error) {
          sendJSON(res, 400, { error: "Invalid JSON format in request body" });
        }
      });
      return;
    }
  }

  sendJSON(res, 404, { error: "Route not found" });
});

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
