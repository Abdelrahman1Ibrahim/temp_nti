## 🧱 This Task Is Your First Step Towards the Final Project

🎯 Task Title: Create Your First Module (Based on Your Final Project)

✅ Objective:
You will build the first backend module of your graduation project using what you’ve learned so far: Node.js, Express, and MongoDB.

📌 Requirements:

🧩 1. Choose Entities from Your Project
Examples:

- Product, Doctor, Patient, Course, Book, Task, etc.
  💡 Choose an entity that actually exists in your project idea.

🧱 2. Create a Mongoose Model for That Entity
Include at least 4-6 fields, such as:

- Name/title
- Description
- Date fields
- Category/type
- Any relevant custom field for your project

🔄 3. Implement the Following Routes:
Using Express and Mongoose, implement:

- POST /yourEntity → Create a new item
- GET /yourEntity → Get all items
- GET /yourEntity/:id → Get item by ID
- PATCH /yourEntity/:id → Update an item
- DELETE /yourEntity/:id → Delete an item

🧪 4. Test with Postman:

- Send test requests for each route.
- Take screenshots showing the request and response.
- Upload them to your repo or folder.

🧾 5. Prepare Your Submission:

- Push your code to GitHub (in a folder called entity-module or inside your full project repo).
- Include a README.md that explains:
  - What entity you chose and why
  - Routes summary
  - How to run your code locally

📘 Notes:

- You must use mongoose and express.
- Use async/await with try/catch.
- Don’t forget express.json() in your server file.
- You will extend this later when we learn users, login, tokens, and role-based access.
