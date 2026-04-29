# UMKM Web Marketplace

A modern, high-performance web marketplace platform designed for UMKM (Micro, Small, and Medium Enterprises). This application enables store owners to manage their businesses effectively while providing customers with a seamless shopping experience.

## 🚀 Tech Stack

Built with the latest and most powerful web technologies:

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router & React 19)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Authentication:** [NextAuth.js](https://next-auth.js.org/)
- **Maps & Geolocation:** [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Notifications:** [SweetAlert2](https://sweetalert2.github.io/) & [React Hot Toast](https://react-hot-toast.com/)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Forms & Selection:** [React Select](https://react-select.com/)
- **State Management:** React Context API (Custom Auth & Cart Providers)

## ✨ Features

### 🛒 Customer Experience
- **Browse & Search:** Discover UMKM stores and products through category filtering and search.
- **Smart Cart:** Persistent shopping cart system to manage items before checkout.
- **Order Tracking:** Monitor the status of your orders from pending to completed.
- **Geolocation:** Find stores near you using interactive map integration.
- **Responsive Design:** Optimized for both mobile and desktop users.

### 🏪 Store Owner Dashboard
- **Product Management:** Full CRUD operations for products, including image cropping (`react-easy-crop`).
- **Inventory Control:** Manage product categories and stock effectively.
- **Order Processing:** Real-time dashboard to track and update customer orders.
- **Store Profile:** Customize your store's identity and operational status.
- **Notifications:** Stay updated with instant alerts for new orders and activities.

## 🛠️ Installation

Follow these steps to set up the project locally:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/umkm-web.git
cd umkm-web
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Configuration
Create a `.env.local` file in the root directory and add the following variables (adjust the values to your setup):

```env
# Server-side API URL
API_SECRET_URL=your_api_secret_url

# Public API URL for client-side
NEXT_PUBLIC_SITE_URL=https://api.your-domain.com/
```

### 4. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## 🏗️ Project Structure

- `/app`: Next.js App Router (Routes, Layouts, and Pages)
- `/components`: Reusable UI components
- `/context`: Global state management (Auth, Cart)
- `/helper`: Utility functions and formatting helpers
- `/types`: TypeScript interface definitions
- `/public`: Static assets (images, icons)

---

Developed with ❤️ to empower local businesses.
