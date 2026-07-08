# Mini Admin Dashboard

A simple MERN Stack Admin Dashboard that allows administrators to securely manage users through a responsive web interface.

This project was built as a beginner-friendly full-stack application to practice authentication, CRUD operations, protected routes, and MongoDB integration.

---

## Features

- Secure Admin Login using JWT Authentication
- Password Encryption using bcrypt
- Protected Dashboard
- View All Users
- Add New Users
- Edit Existing Users
- Delete Users
- Search Users by Name or Email
- Input Validation
- Responsive Bootstrap UI
- MongoDB Database Integration

---

## Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Bootstrap

### Backend
- Node.js
- Express.js

### Database
- MongoDB Atlas
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcryptjs

---

## Project Structure

```
mern-admin-dashboard/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── .env
│   ├── server.js
│   └── package.json
│
├── README.md
└── .gitignore
```

---

## Installation

### Clone the repository

```bash
git clone https://github.com/yourusername/mern-admin-dashboard.git
```

### Install frontend dependencies

```bash
cd client
npm install
```

### Install backend dependencies

```bash
cd ../server
npm install
```

---

## Environment Variables

Create a `.env` file inside the `server` folder.

```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
PORT=5000
```

---

## Running the Project

### Start Backend

```bash
cd server
node server.js
```

### Start Frontend

```bash
cd client
npm run dev
```

---

## Test Credentials

Use the following admin account to access the dashboard:

**Email**
```
admin@test.com
```

**Password**
```
admin123
```
---

## Future Improvements

- Pagination
- Role-based Authorization
- Profile Management
- Dashboard Analytics
- User Profile Images

---

## Author

**Kritika Prabhu Penta**

BCA Student | MERN Stack & AI/ML Enthusiast

GitHub: https://github.com/yourusername

LinkedIn: https://linkedin.com/in/yourprofile