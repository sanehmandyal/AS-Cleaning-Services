# AS Cleaning Services — Full-Stack MERN Website

**Clean Spaces. Healthy Lives.**

A production-style full-stack MERN application for a professional cleaning company: public marketing site, service booking system, customer dashboard, and an admin panel with analytics, bookings, services, customers, testimonials, blog, and messages management.

---

## 1. Tech Stack

**Frontend:** React 18, Vite, React Router DOM, Axios, Tailwind CSS, React Icons, Framer Motion, Recharts, React Hot Toast

**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, dotenv, CORS, Helmet, express-rate-limit, express-mongo-sanitize

---

## 2. Folder Structure

```
as-cleaning-services/
├── client/                     # React frontend (Vite)
│   ├── public/
│   │   └── favicon.svg
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── Hero.jsx
│   │   │   ├── ServiceCard.jsx
│   │   │   ├── TestimonialCard.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── UIState.jsx          # Spinner / EmptyState / ErrorState / StatusBadge
│   │   ├── pages/
│   │   │   ├── Home.jsx, About.jsx, Services.jsx, ServiceDetails.jsx
│   │   │   ├── Booking.jsx, Pricing.jsx, Contact.jsx
│   │   │   ├── Blog.jsx, BlogPost.jsx
│   │   │   ├── Login.jsx, Register.jsx, NotFound.jsx
│   │   │   ├── CustomerDashboard.jsx, MyBookings.jsx, Profile.jsx, Notifications.jsx
│   │   │   └── admin/
│   │   │       ├── AdminDashboard.jsx, AdminBookings.jsx, AdminServices.jsx
│   │   │       ├── AdminCustomers.jsx, AdminTestimonials.jsx, AdminBlog.jsx
│   │   │       ├── AdminMessages.jsx, AdminSettings.jsx
│   │   ├── services/            # Axios API layer
│   │   │   ├── axiosClient.js, authApi.js, bookingApi.js, serviceApi.js
│   │   │   ├── contactApi.js, testimonialApi.js, blogApi.js, adminApi.js
│   │   ├── context/
│   │   │   └── AuthContext.jsx
│   │   ├── layouts/
│   │   │   ├── MainLayout.jsx, DashboardLayout.jsx, AdminLayout.jsx
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── vite.config.js
│   ├── package.json
│   └── .env.example
│
├── server/                      # Express backend
│   ├── config/db.js
│   ├── controllers/             # auth, service, booking, contact, testimonial, blog, admin
│   ├── middleware/               # authMiddleware, adminMiddleware, errorMiddleware
│   ├── models/                  # User, Service, Booking, Contact, Testimonial, Blog, Notification
│   ├── routes/                  # authRoutes, serviceRoutes, bookingRoutes, contactRoutes,
│   │                             # testimonialRoutes, blogRoutes, adminRoutes
│   ├── utils/
│   │   ├── generateToken.js
│   │   └── seed.js               # Seeds demo services, testimonials, blog posts & admin user
│   ├── uploads/
│   ├── server.js
│   ├── package.json
│   └── .env.example
│
├── .gitignore
└── README.md
```

---

## 3. Prerequisites

- Node.js 18+ and npm
- A MongoDB database (local MongoDB or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster)

---

## 4. Installation & Local Setup

### 4.1 Clone / unzip the project and install dependencies

```bash
# Backend
cd server
npm install

# Frontend (in a new terminal tab)
cd client
npm install
```

### 4.2 Configure environment variables

**server/.env** (copy from `server/.env.example`):

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/as-cleaning-services
JWT_SECRET=replace_this_with_a_long_random_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

**client/.env** (copy from `client/.env.example`):

```env
VITE_API_URL=http://localhost:5000/api
```

> Never commit your real `.env` files — only `.env.example` is version-controlled.

### 4.3 Seed the database (recommended)

Populates 10 services, 3 approved testimonials, 3 blog posts, and creates an admin account using `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `server/.env`.

```bash
cd server
npm run seed
```

### 4.4 Run the app

```bash
# Terminal 1 — backend (http://localhost:5000)
cd server
npm run dev

# Terminal 2 — frontend (http://localhost:5173)
cd client
npm run dev
```

The Vite dev server proxies `/api` requests to `http://localhost:5000`, so the frontend and backend talk to each other out of the box in development.

---

## 5. Database Models (Mongoose)

| Model | Key Fields |
|---|---|
| **User** | name, email (unique), phone, password (hashed), role (`customer`/`admin`), isActive |
| **Service** | title, slug, icon, description, image, price, duration, features[], included[], excluded[], faqs[], isActive |
| **Booking** | user, service, customerName, email, phone, address, propertyType, bookingDate, bookingTime, rooms, notes, status, totalAmount |
| **Contact** | name, email, phone, subject, message, status |
| **Testimonial** | name, role, image, rating, message, isApproved |
| **Blog** | title, slug, image, excerpt, content, category, author, published, publishedDate |
| **Notification** | user, title, message, type, isRead |

---

## 6. REST API Reference

Base URL: `/api`

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | `/auth/register` | Public |
| POST | `/auth/login` | Public |
| GET | `/auth/me` | Private |
| PUT | `/auth/profile` | Private |

### Services
| Method | Endpoint | Access |
|---|---|---|
| GET | `/services` | Public (add `?all=true` for admin to include inactive) |
| GET | `/services/:idOrSlug` | Public |
| POST | `/services` | Admin |
| PUT | `/services/:id` | Admin |
| DELETE | `/services/:id` | Admin |

### Bookings
| Method | Endpoint | Access |
|---|---|---|
| POST | `/bookings` | Public / Customer |
| GET | `/bookings` | Private (own bookings; admin sees all, with `?status=&service=&search=&date=` filters) |
| GET | `/bookings/:id` | Private (owner or admin) |
| PUT | `/bookings/:id` | Private (customers can only cancel; admin can set any status) |
| DELETE | `/bookings/:id` | Admin |

### Contact
| Method | Endpoint | Access |
|---|---|---|
| POST | `/contact` | Public |
| GET | `/contact` | Admin |
| PUT | `/contact/:id` | Admin |
| DELETE | `/contact/:id` | Admin |

### Testimonials
| Method | Endpoint | Access |
|---|---|---|
| GET | `/testimonials` | Public (approved only; `?all=true` for admin) |
| POST | `/testimonials` | Public |
| PUT | `/testimonials/:id` | Admin |
| DELETE | `/testimonials/:id` | Admin |

### Blog
| Method | Endpoint | Access |
|---|---|---|
| GET | `/blogs` | Public (published only; `?all=true` for admin) |
| GET | `/blogs/:slug` | Public |
| POST | `/blogs` | Admin |
| PUT | `/blogs/:id` | Admin |
| DELETE | `/blogs/:id` | Admin |

### Admin
| Method | Endpoint | Access |
|---|---|---|
| GET | `/admin/dashboard` | Admin — stats + monthly bookings/revenue + service popularity |
| GET | `/admin/customers` | Admin |
| GET | `/admin/customers/:id` | Admin — customer + their bookings |
| PUT | `/admin/customers/:id` | Admin — activate/deactivate |
| GET | `/admin/bookings` | Admin |
| GET | `/admin/messages` | Admin |

---

## 7. Security

- Passwords hashed with **bcryptjs** (never stored in plain text)
- **JWT** authentication with configurable expiry
- **Role-based access control** (`customer` / `admin`) enforced via middleware
- **Helmet** for secure HTTP headers
- **express-mongo-sanitize** to prevent NoSQL injection
- **express-rate-limit** on auth and contact endpoints
- **CORS** restricted to the configured `CLIENT_URL`
- Centralized error handling (no stack traces leaked in production)
- `.env` files excluded from version control

---

## 8. Deployment

### 8.1 Backend → Render

1. Push this repository to GitHub.
2. In [Render](https://render.com), create a **New Web Service** and connect your repo.
3. Set the **Root Directory** to `server`.
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Add environment variables in the Render dashboard (matching `server/.env.example`):
   - `PORT` (Render sets this automatically — you can omit it)
   - `MONGO_URI` → your MongoDB Atlas connection string
   - `JWT_SECRET`
   - `JWT_EXPIRES_IN`
   - `CLIENT_URL` → your deployed Vercel frontend URL (e.g. `https://as-cleaning-services.vercel.app`)
   - `NODE_ENV=production`
7. Deploy. Render will give you a URL like `https://as-cleaning-services-api.onrender.com`.
8. (Optional) Run the seed script once via Render's Shell tab: `npm run seed`.

### 8.2 Frontend → Vercel

1. In [Vercel](https://vercel.com), import the same GitHub repo.
2. Set the **Root Directory** to `client`.
3. Framework Preset: **Vite**.
4. Build Command: `npm run build` — Output Directory: `dist`.
5. Add environment variable:
   - `VITE_API_URL` → `https://as-cleaning-services-api.onrender.com/api`
6. Deploy. Vercel will give you a URL like `https://as-cleaning-services.vercel.app`.
7. Go back to Render and update `CLIENT_URL` to this Vercel URL, then redeploy the backend so CORS allows it.

### 8.3 MongoDB Atlas

1. Create a free cluster at [mongodb.com/atlas](https://www.mongodb.com/atlas).
2. Create a database user and allow network access from `0.0.0.0/0` (or Render's IPs).
3. Copy the connection string into `MONGO_URI`.

---

## 9. Accounts (after seeding)

The admin account uses the `ADMIN_EMAIL` and `ADMIN_PASSWORD` values configured in `server/.env`.

Create customer accounts via the **Register** page on the site.

---

## 10. Notes

- Service, blog, and testimonial images use hosted Unsplash URLs by default. Replace with your own hosted images or wire up the `multer` upload setup in `server/uploads` for file uploads in a custom admin image-upload flow.
- The customer "Notifications" page is a lightweight view derived from booking status changes; extend the `Notification` model/controller if you need a dedicated notifications feed with read/unread state.
- Run `npm run build` inside `client/` to produce a production build in `client/dist`.

---

© AS Cleaning Services. Clean Spaces. Healthy Lives.
