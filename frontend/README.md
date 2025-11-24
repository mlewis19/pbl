# Kisan Kart 🌾

An ecommerce platform that removes middlemen between farmers (producers) and consumers in Mangalore.

## Features

### For Producers (Farmers)
- 👨‍🌾 Register and create profile
- 📦 Add, edit, and delete products
- 💰 Set prices and manage inventory
- ⭐ View ratings and reviews from consumers
- 📊 Dashboard with analytics

### For Consumers
- 🛒 Browse fresh produce from local farmers
- 🔍 Search and filter by category
- 📱 Two order options: Pickup or Delivery
- 💳 Multiple payment methods (COD, UPI, Card via Razorpay)
- 📍 Live delivery tracking with maps
- ⭐ Rate and review products

### General Features
- 🔐 Authentication with Email/Password or Google Sign-In (Firebase)
- 🌓 Light/Dark mode toggle
- 📱 Responsive design for mobile and desktop
- 🎨 Modern agricultural theme (soft greens/yellows)
- ✨ Smooth animations and transitions

## Tech Stack

- **Frontend**: React + Vite
- **Styling**: Plain CSS (no frameworks)
- **Authentication**: Firebase Authentication
- **Database**: Firebase Firestore
- **Storage**: Firebase Storage (for product images)
- **Maps**: Leaflet (OpenStreetMap)
- **Payments**: Razorpay
- **Routing**: React Router v6

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Firebase Configuration

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication (Email/Password and Google Sign-In)
3. Create a Firestore Database
4. Enable Firebase Storage
5. Copy your Firebase config and update `src/firebase/config.js`:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

### 3. Razorpay Configuration

1. Sign up at [Razorpay](https://razorpay.com/)
2. Get your API Key from the dashboard
3. Update `src/utils/razorpay.js`:

```javascript
key: 'YOUR_RAZORPAY_KEY_ID'
```

### 4. Run Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
src/
├── components/
│   ├── Header/
│   ├── Footer/
│   ├── AddProductModal/
│   └── CheckoutModal/
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
├── firebase/
│   └── config.js
├── pages/
│   ├── Auth/
│   │   ├── Login.jsx
│   │   └── Register.jsx
│   ├── Consumer/
│   │   ├── ConsumerDashboard.jsx
│   │   └── ProductDetails.jsx
│   ├── Landing/
│   │   └── Landing.jsx
│   └── Producer/
│       └── ProducerDashboard.jsx
├── utils/
│   ├── helpers.js
│   └── razorpay.js
├── App.jsx
├── main.jsx
└── index.css
```

## Firestore Collections

The app uses the following Firestore collections:

### users
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  role: 'producer' | 'consumer',
  phone: string,
  about: string (for producers),
  createdAt: timestamp
}
```

### products
```javascript
{
  name: string,
  category: string,
  quantity: number,
  unit: string,
  price: number,
  description: string,
  images: array,
  producerId: string,
  producerName: string,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### orders
```javascript
{
  orderId: string,
  productId: string,
  productName: string,
  producerId: string,
  consumerId: string,
  quantity: number,
  totalPrice: number,
  orderType: 'pickup' | 'delivery',
  paymentMethod: string,
  status: string,
  createdAt: timestamp,
  // Additional fields based on order type
}
```

### reviews
```javascript
{
  productId: string,
  productName: string,
  userId: string,
  userName: string,
  rating: number (1-5),
  comment: string,
  createdAt: timestamp
}
```

## Build for Production

```bash
npm run build
```

The production-ready files will be in the `dist/` directory.

---

Made with ❤️ for farmers in Mangalore