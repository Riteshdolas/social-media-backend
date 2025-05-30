# 📸 Instagram - Backend

This is the **backend server** for an Instagram clone built with Node.js, Express.js, and MongoDB.  
It handles user authentication, posting, commenting, liking, following, messaging, and more.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB**
- **JWT (Authentication)**
- **Multer (File Uploads)**
- **Cloudinary (Image Hosting)**

---

## 📁 Project Structure
src/
├── controllers/       → Logic for user, post, comment, story, etc.
├── middlewares/       → Custom middlewares (auth, multer, token)
├── routes/            → All API route definitions 
├── models/            → Mongoose schemas for User, Post, Comment, etc.
├── utils/             → Utility functions, Cloudinary config, etc.
├── db/                → DB connection
├── server.js           → App entry point

---


---

## 🔧 Installation & Setup

```bash
 
# 1. Clone the repository
git clone https://github.com/Riteshdolas/instagram-backend.git

# 2. Navigate to the project folder
cd instagram-backend

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev

```
Create a .env file
PORT=8000                              # Port your server runs on
CLOUD_NAME=your_cloudinary_name        # Cloudinary account name
CLOUD_API_KEY=your_cloudinary_api_key  # Cloudinary API key
CLOUD_API_SECRET=your_cloudinary_secret # Cloudinary secret key
JWT_ACCESS_SECRET=your_access_secret    # JWT access token secret
JWT_REFRESH_SECRET=your_refresh_secret  # JWT refresh token secret
MONGODB_URL_LOCAL=mongodb://localhost:27017/your_db # MongoDB URI
