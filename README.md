# Mini SaaS Template Store

A full-stack web application that allows users to browse, search, and favorite Pinterest-style templates.

## 🚀 Tech Stack
- **Frontend**: React.js (Vite), TailwindCSS, Lucide React, Axios, React Router.
- **Backend**: Node.js, Express.js.
- **Database**: MongoDB with Mongoose.
- **Authentication**: JWT (JSON Web Tokens) with bcrypt password hashing.

## 🛠️ Setup Instructions

### 1. Prerequisites
- Node.js installed on your machine.
- MongoDB running locally (default: `mongodb://127.0.0.1:27017/template-store`).

### 2. Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Initialize the database with sample templates:
   ```bash
   npm run seed
   ```
4. Start the server:
   ```bash
   npm run dev
   ```
   *The backend will run on http://localhost:5000*

### 3. Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the application:
   ```bash
   npm run dev
   ```
   *The frontend will run on http://localhost:5173*

## 🧑‍💻 Author
- **Name**: Dinesh
- **GitHub**: [Dinesh3072002](https://github.com/Dinesh3072002)
- **Repository**: [fullstack-intern-task](https://github.com/Dinesh3072002/fullstack-intern-task)

---
*Created for the Fullstack Intern Task.*
