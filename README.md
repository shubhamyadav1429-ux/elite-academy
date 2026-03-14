# 🎓 Elite Academy

> A full-stack educational platform for **Maharashtra Board students**, built with Node.js, Express, MongoDB, and Vanilla HTML/CSS/JS.

---

## 📁 Project Structure

```
elite-academy/
├── backend/                  # Express + Node.js API server
│   ├── config/
│   │   └── db.js             # MongoDB connection
│   ├── controllers/
│   │   ├── adminController.js
│   │   ├── authController.js
│   │   └── studentController.js
│   ├── middleware/
│   │   ├── authMiddleware.js  # JWT verification
│   │   └── uploadMiddleware.js# Multer file upload
│   ├── models/
│   │   ├── Chapter.js
│   │   ├── MCQ.js
│   │   ├── Note.js
│   │   ├── Result.js
│   │   ├── Standard.js
│   │   ├── Subject.js
│   │   ├── User.js
│   │   └── Video.js
│   ├── routes/
│   │   ├── adminRoutes.js
│   │   ├── authRoutes.js
│   │   ├── publicRoutes.js
│   │   └── studentRoutes.js
│   ├── seed.js               # Database seeding script
│   ├── seedSubjects.js
│   ├── seedChapters9thEnglish.js
│   ├── seedChapters9thGeography.js
│   ├── seedChapters9thMaths.js
│   ├── seedChapters9thScience.js
│   ├── seedVideosMCQs9thSci.js
│   ├── server.js             # Main server entry point
│   ├── .env.example          # ⚠️ Copy this to .env and fill in your values
│   └── package.json
│
└── frontend/                 # Vanilla HTML/CSS/JS frontend
    ├── css/
    │   └── style.css
    ├── js/
    │   └── main.js
    ├── index.html            # Landing page
    ├── login.html
    ├── register.html
    ├── dashboard.html        # Student dashboard
    ├── admin-dashboard.html  # Admin panel
    ├── courses.html
    ├── features.html
    └── select-standard.html
```

---

## ✨ Features

- 🔐 **Student Authentication** — Secure login/register with Bcrypt + JWT
- 👥 **Role-Based Access Control** — Admin vs Student roles with separate dashboards
- 📚 **Student Dashboard** — Browse standards, subjects, chapters, notes (PDFs), embedded videos, and MCQ tests
- 🛠️ **Admin Panel** — Create & manage educational content, track scores and analytics
- 🛡️ **Security** — Helmet, Express Rate Limiter, and CORS protection

---

## 🚀 Getting Started (Run Locally)

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+)
- A [MongoDB Atlas](https://www.mongodb.com/atlas) account (free tier works fine) or local MongoDB

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/elite-academy.git
cd elite-academy
```

### 2. Install backend dependencies

```bash
cd backend
npm install
```

### 3. Set up environment variables

```bash
# In the backend/ folder:
cp .env.example .env
```

Now open `.env` and fill in your real values:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/elite-academy
PORT=5000
JWT_SECRET=your_super_secret_key_here
```

### 4. Start the server

```bash
# Development mode (with auto-restart)
npm run dev

# OR production mode
npm start
```

You should see:
```
Server running on port 5000
MongoDB Connected: ...
```

### 5. Open in browser

Visit: **http://localhost:5000**

---

## 🌱 Seeding the Database

To pre-populate the database with subjects, chapters, and MCQs:

```bash
cd backend
node seedSubjects.js
node seedChapters9thScience.js
node seedVideosMCQs9thSci.js
# ... run any other seed files as needed
```

---

## 👤 Setting up an Admin Account

Since registration defaults to the **Student** role, to create an Admin:

**Option A: Postman / Thunder Client**

Make a `POST` request to `http://localhost:5000/api/auth/register` with:
```json
{
  "name": "Admin",
  "email": "admin@elite.com",
  "password": "password123",
  "role": "admin"
}
```

**Option B: MongoDB Compass**

Register a normal user, then open MongoDB Compass → `users` collection → change the `role` field to `"admin"`.

---

## 🛠️ Tech Stack

| Layer     | Technology                          |
|-----------|-------------------------------------|
| Backend   | Node.js, Express.js                 |
| Database  | MongoDB + Mongoose                  |
| Auth      | JWT + Bcrypt                        |
| Frontend  | HTML5, CSS3, Vanilla JavaScript     |
| Security  | Helmet, CORS, express-rate-limit    |
| Dev Tools | Nodemon                             |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

*Built with ❤️ for Maharashtra Board students.*
