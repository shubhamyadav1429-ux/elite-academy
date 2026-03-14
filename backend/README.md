# Elite Academy

A fully functional, educational platform for Maharashtra Board students built using the **MERN-like Stack** (Node.js, Express, MongoDB, Vanilla HTML/CSS/JS frontend).

## Features
- **Student Authentication** with Bcrypt and JWT
- **Differentiated Roles** (Admin vs Student)
- **Role-Based Access Control**
- **Student Dashboard** loading standards, subjects, chapters, notes, embedded videos, and tests.
- **Admin Panel** for creating and managing educational content and tracking scores & analytics.

## Prerequisites
- **Node.js**: [Download here](https://nodejs.org/)
- **MongoDB**: [Download MongoDB Community Server](https://www.mongodb.com/try/download/community). Install it and ensure the MongoDB service is running on your machine (default port 27017).

## MongoDB Setup Instructions
1. Download & Install MongoDB.
2. Ensure MongoDB service is running (you can open services.msc in Windows and check if MongoDB Server is running).
3. The server will automatically connect to `mongodb://127.0.0.1:27017/elite-academy`. The database `elite-academy` will be created automatically when the first data is inserted.

## Environment Variables (.env)
A `.env` file is already created the root of the project with the following properties:
```env
MONGO_URI=mongodb://127.0.0.1:27017/elite-academy
PORT=5000
JWT_SECRET=supersecretjwtkey_for_elite_academy_secure_2026
```

## Step-By-Step Guide To Run Locally
1. Open the project folder `elite-academy` in your terminal or command prompt.
2. Run `npm install` to install all dependencies (if not already installed).
3. Run `npm run dev` to start the backend with nodemon (development mode) or `npm start` for standard mode.
4. You should see:
   ```
   Server running on port 5000
   MongoDB Connected: 127.0.0.1
   ```
5. Open your web browser and navigate to: `http://localhost:5000`
6. **Setting up an Admin**: 
   Since registration defaults to Student, you can create an admin quickly by using a tool like Postman:
   - Make a POST to `http://localhost:5000/api/auth/register` with Body JSON:
   `{"name": "Admin", "email": "admin@elite.com", "password":"password123", "role": "admin"}`
   - Alternatively, login via the GUI with a registered user, and use MongoDB Compass to manually change their role field to "admin" in the `users` collection.
7. Login as an admin using `/login.html` by clicking "Admin Login" links.

## Project Structure
- `config/db.js` - MongoDB connection securely
- `controllers/` - Logic for admin, student, and auth.
- `middleware/` - JWT auth validation and Multer file upload setup.
- `models/` - Mongoose schemas (User, Standard, Subject, Chapter, Video, Note, MCQ, Result).
- `public/` - The static frontend application (HTML, CSS, JS).
- `routes/` - Express routers mapping endpoints to controllers.
- `uploads/` - Serves loaded PDF notes statically.
- `server.js` - Server entry point with XSS, rate limitation, CORS, and Helmet configuration.

Happy Coding!
