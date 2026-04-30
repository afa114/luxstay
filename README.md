# 🏨 LuxStay — Luxury Hotel Reservation System

A full-stack hotel booking web application built with Node.js, Express, PostgreSQL, EJS, Tailwind CSS, and Alpine.js.

---

## ✨ Features

- 🔐 Authentication (Register, Login, Logout) with bcrypt password hashing
- 👤 Role-based access (User / Admin)
- 🏨 Hotel & Room CRUD (Admin)
- 📅 Booking system with availability check
- 💳 Simulated checkout
- 📊 Admin dashboard with stats
- 🖼️ Luxury hotel images from Unsplash
- 📱 Fully responsive (mobile-first)
- 🔒 Security: Helmet, Rate Limiting, Input Validation

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js v18+
- PostgreSQL 14+

### 2. Clone & Install
```bash
cd hotel-app
npm install
```

### 3. Setup Environment
```bash
cp .env.example .env
# Edit .env with your DB credentials
```

### 4. Create PostgreSQL Database
```sql
CREATE DATABASE hotel_db;
```

### 5. Seed Database (creates tables + sample data)
```bash
npm run seed
```

### 6. Start Development Server
```bash
npm run dev
```

Visit: **http://localhost:3000**

---

## 🔑 Demo Accounts

| Role  | Email                | Password  |
|-------|----------------------|-----------|
| Admin | admin@luxstay.com    | admin123  |
| User  | user@luxstay.com     | user1234  |

---

## 📁 Project Structure

```
hotel-app/
├── app.js                    # Entry point
├── .env.example              # Environment variables template
├── package.json
├── config/
│   └── database.js           # Sequelize config
├── controllers/
│   ├── authController.js
│   ├── hotelController.js
│   ├── bookingController.js
│   └── adminController.js
├── middleware/
│   ├── auth.js               # Auth & role middleware
│   └── upload.js             # Multer file upload
├── models/
│   ├── index.js              # Associations
│   ├── User.js
│   ├── Hotel.js
│   ├── Room.js
│   └── Booking.js
├── routes/
│   ├── index.js
│   ├── auth.js
│   ├── hotels.js
│   ├── bookings.js
│   └── admin.js
├── views/
│   ├── index.ejs             # Homepage
│   ├── 404.ejs
│   ├── 500.ejs
│   ├── partials/
│   │   ├── navbar.ejs
│   │   ├── footer.ejs
│   │   ├── flash.ejs
│   │   └── hotel-card.ejs
│   ├── auth/
│   │   ├── login.ejs
│   │   └── register.ejs
│   ├── hotels/
│   │   ├── index.ejs
│   │   └── show.ejs
│   ├── bookings/
│   │   ├── form.ejs
│   │   ├── confirmation.ejs
│   │   └── list.ejs
│   └── admin/
│       ├── dashboard.ejs
│       ├── users.ejs
│       ├── bookings.ejs
│       ├── hotels/
│       │   ├── index.ejs
│       │   └── form.ejs
│       └── rooms/
│           ├── index.ejs
│           └── form.ejs
├── public/
│   ├── js/main.js
│   └── uploads/              # Uploaded hotel images
└── seeders/
    └── seed.js               # Database seed script
```

---

## 🗄️ Database Schema

### Users
| Field    | Type    |
|----------|---------|
| id       | INTEGER |
| name     | STRING  |
| email    | STRING  |
| password | STRING  |
| role     | ENUM    |
| phone    | STRING  |

### Hotels
| Field         | Type    |
|---------------|---------|
| id            | INTEGER |
| name          | STRING  |
| slug          | STRING  |
| description   | TEXT    |
| city/country  | STRING  |
| stars         | INTEGER |
| category      | ENUM    |
| mainImage     | STRING  |
| images        | JSON    |
| amenities     | JSON    |
| rating        | FLOAT   |

### Rooms
| Field       | Type    |
|-------------|---------|
| id          | INTEGER |
| hotelId     | INTEGER |
| name        | STRING  |
| type        | ENUM    |
| price       | DECIMAL |
| capacity    | INTEGER |
| image/images| STRING/JSON |

### Bookings
| Field         | Type    |
|---------------|---------|
| id            | INTEGER |
| bookingRef    | STRING  |
| userId        | INTEGER |
| roomId        | INTEGER |
| hotelId       | INTEGER |
| checkIn/Out   | DATE    |
| nights        | INTEGER |
| totalPrice    | DECIMAL |
| status        | ENUM    |
| paymentStatus | ENUM    |

---

## 🛠️ Tech Stack

| Layer     | Technology                    |
|-----------|-------------------------------|
| Runtime   | Node.js                       |
| Framework | Express.js                    |
| Database  | PostgreSQL + Sequelize ORM    |
| Templates | EJS                           |
| Styling   | Tailwind CSS (CDN)            |
| Frontend  | Alpine.js                     |
| Auth      | express-session + bcryptjs    |
| Upload    | Multer                        |
| Security  | Helmet + express-rate-limit   |
| Images    | Unsplash (free)               |
