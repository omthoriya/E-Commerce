# 🛒 E-Commerce Management System

A full-stack E-Commerce web application built using **React.js**, **Node.js**, **Express.js**, and **MySQL**. The application provides a complete online shopping experience with secure authentication, role-based authorization, product management, shopping cart, and order management.

---

## 🚀 Live Demo

🔗 Live Website: https://e-commerce-lsmv.vercel.app/

---

## 📂 GitHub Repository

🔗 https://github.com/omthoriya/E-Commerce

---

## ✨ Features

### 👤 User Features
- User Registration & Login
- JWT Authentication
- Browse Products
- Product Details
- Search Products
- Filter by Category
- Shopping Cart
- Checkout
- Place Orders
- View Order History
- Responsive Design

### 👨‍💼 Admin Features
- Secure Admin Login
- Dashboard
- Manage Categories
- Manage Products
- Upload Product Images
- Manage Orders
- Manage Users
- CRUD Operations

---

## 🛠 Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Hot Toast

### Backend
- Node.js
- Express.js
- JWT Authentication
- bcrypt.js
- Multer
- Cloudinary

### Database
- MySQL (TiDB Cloud)

### Deployment
- Frontend: Vercel
- Backend: Vercel
- Database: TiDB Cloud
- Image Storage: Cloudinary

---

## 📁 Project Structure

```
E-Commerce
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── utils
│   ├── uploads
│   └── server.js
│
└── README.md
```

---

## 🔐 Authentication

- JWT Authentication
- Protected Routes
- Role-Based Authorization
- Password Encryption using bcrypt

---

## 📦 Modules

### User
- Register
- Login
- Profile

### Category
- Add Category
- Update Category
- Delete Category
- View Categories

### Product
- Add Product
- Update Product
- Delete Product
- View Products

### Cart
- Add to Cart
- Update Quantity
- Remove Product

### Order
- Place Order
- My Orders
- Manage Orders (Admin)

---

## ☁ Cloud Services

- Cloudinary for Image Upload
- TiDB Cloud MySQL Database

---

## ⚙ Environment Variables

### Backend (.env)

```env
PORT=5000

DB_HOST=
DB_PORT=
DB_USER=
DB_PASSWORD=
DB_NAME=

JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

### Frontend (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

For production:

```env
VITE_API_URL=https://your-backend-url.vercel.app/api
```

---

## 💻 Installation

### Clone Repository

```bash
git clone https://github.com/omthoriya/E-Commerce.git
```

### Install Frontend

```bash
cd client
npm install
```

### Install Backend

```bash
cd server
npm install
```

### Run Backend

```bash
npm run dev
```

### Run Frontend

```bash
npm run dev
```

---

## 📸 Screenshots

Add screenshots here.

Example:

```
screenshots/
    home.png
    login.png
    admin-dashboard.png
    products.png
```

---

## 👨‍💻 Author

**Om Thoriya**

- GitHub: https://github.com/omthoriya
- LinkedIn: https://linkedin.com/in/om-thoriya-a4153328b

---

## ⭐ If you like this project

Please give the repository a ⭐ on GitHub.
