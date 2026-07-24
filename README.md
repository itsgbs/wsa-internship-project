# 🍔 AI Food Ordering Platform

A full-stack food ordering web application built with the MERN stack. Users can browse restaurants, view food items, add them to the cart, and place test orders using Stripe Checkout. The application also includes an admin panel for restaurant and menu management along with AI-powered features using the Grok API.

---

## 🚀 Features

### 👤 User Features

- User Registration & Login
- JWT Authentication
- Browse multiple restaurants
- View restaurant menus
- Add/Remove items from cart
- Update cart quantity
- Stripe Test Checkout
- Order placement
- Responsive UI

### 🔑 Admin Features

- Role-based Admin Access
- Add new restaurants
- Add new food items
- Edit existing food items
- Delete food items
- Manage restaurant menus

### 🤖 AI Features

- AI-generated food descriptions while adding new menu items
- AI-powered review summaries for restaurants using customer reviews

---

## 🛠 Tech Stack

### Frontend

- React.js
- HTML5
- CSS3
- JavaScript
- Axios

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Authentication

- JWT (JSON Web Token)
- bcrypt

### Payment

- Stripe (Test Mode)

### AI

- Grok API


## ⚙️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/itsgbs/FoodProjectApp.git
cd FoodProjectApp
```

### 2. Install frontend dependencies

```bash
cd frontend
npm install
```

### 3. Install backend dependencies

```bash
cd ../backend
npm install
```

### 4. Create Environment File

Inside the **backend** folder, create a `.env` file and add the required environment variables.

Example:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

STRIPE_SECRET_KEY=your_stripe_secret_key

GROK_API_KEY=your_grok_api_key
```

---

## ▶️ Running the Project

### Start Backend

```bash
cd backend
npm run dev
```

### Start Frontend

```bash
cd frontend
npm start
```

---

## 🔐 Authentication

The application uses JWT-based authentication.

There are two roles:

- User
- Admin

Admin users can manage restaurants and menu items.

---

## 💳 Payments

Stripe is integrated in **Test Mode** for demonstration purposes.

No real payments are processed.

---

## 🤖 AI Integration

The application uses the Grok API for:

- Automatic food description generation
- Restaurant review summarization


## 📄 License

This project is created for learning and portfolio purposes.

---

## 👨‍💻 Author

**Govind Ballab Singhania**

GitHub: https://github.com/itsgbs
