// App.jsx
import { Routes, Route, Navigate } from "react-router-dom";

import Landing from './pages/Landing/Landing.jsx';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';

import ProducerDashboard from './pages/Producer/ProducerDashboard.jsx';

import ConsumerDashboard from './pages/Consumer/ConsumerDashboard.jsx';
import ProductDetails from './pages/Consumer/ProductDetails.jsx';
import OrderPage from "./pages/Consumer/OrderPage";

import PaymentPage from "./pages/PaymentPage/PaymentPage.jsx";
import PaymentSuccessPage from "./pages/PaymentSuccess/PaymentSuccess.jsx";
import TrackOrderPage from "./pages/TrackOrder/TrackOrderPage.jsx";

function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<Landing />} />

      {/* Auth */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Producer */}
      <Route path="/producer/dashboard" element={<ProducerDashboard />} />

      {/* Consumer */}
      <Route path="/consumer/dashboard" element={<ConsumerDashboard />} />
      <Route path="/consumer/product/:productId" element={<ProductDetails />} />
      <Route path="/consumer/order/:id" element={<OrderPage />} />

      {/* Payment Flow */}
      <Route path="/payment/:orderId" element={<PaymentPage />} />
      <Route path="/payment/success/:orderId" element={<PaymentSuccessPage />} />

      {/* Order Tracking */}
      <Route path="/track/:orderId" element={<TrackOrderPage />} />

      {/* Redirect unknown paths */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
