# MERN Task Manager Application

A full-stack Task Manager application developed using the **MERN Stack (MongoDB, Express.js, React.js, and Node.js)**. The application allows users to register, log in securely, and efficiently manage their daily tasks. It provides a modern user interface with complete CRUD (Create, Read, Update, Delete) functionality and JWT-based authentication.

---

## 🚀 Features

* User Registration
* User Login
* JWT Authentication
* Password Encryption using bcrypt
* Create New Task
* View All Tasks
* Update Existing Task
* Delete Task
* Mark Task as Completed
* Search Tasks
* Filter Tasks by Status
* Filter Tasks by Priority
* Responsive Dashboard
* Toast Notifications
* Protected Routes

---

## 🛠️ Technologies Used

### Frontend

* React.js
* Vite
* React Router DOM
* Axios
* Bootstrap 5
* React Icons
* React Toastify

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication
* bcryptjs
* Morgan
* CORS
* dotenv

---

## 📁 Project Structure

```text
task-manager/
│
├── backend/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── server.js
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   └── index.html
│
└── README.md
```

---

## ⚙️ Backend Installation

```bash
cd backend
npm install
npm run dev
```

Backend runs on:

```text
http://localhost:5000
```

---

## ⚙️ Frontend Installation

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/taskmanager

JWT_SECRET=mySuperSecretJWTKey12345
```

---

## 📡 API Endpoints

### Authentication

| Method | Endpoint           |
| ------ | ------------------ |
| POST   | /api/auth/register |
| POST   | /api/auth/login    |
| GET    | /api/auth/profile  |

### Tasks

| Method | Endpoint              |
| ------ | --------------------- |
| GET    | /api/tasks            |
| POST   | /api/tasks            |
| GET    | /api/tasks/:id        |
| PUT    | /api/tasks/:id        |
| DELETE | /api/tasks/:id        |
| PATCH  | /api/tasks/:id/status |
| GET    | /api/tasks/search     |
| GET    | /api/tasks/filter     |

---

## 📸 Screenshots

You can add screenshots here after running the application.

Example:

* Login Page
* Register Page
* Dashboard
* Create Task
* Task List

---

## 🚀 Future Enhancements

* Email Verification
* Password Reset
* Dark Mode
* Drag & Drop Tasks
* File Attachments
* Task Categories
* Team Collaboration
* Calendar Integration
* Due Date Notifications
* Cloud Deployment

---

## 👨‍💻 Author

**Yeswanth Varma**

Blackbucks Internship Project

MERN Stack Task Manager Application
