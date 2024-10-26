import Navbar from "./components/Navbar";

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import pages
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductPage from "./pages/ProductPage";
import OrderPage from "./pages/OrderPage";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import ProtectedRoute from "./pages/ProtectedRoute";
import AdminDashboard from "./components/admin/AdminDashboard";
import UserList from "./components/admin/UserList";
import ProductList from "./components/admin/ProductList";
import OrderList from "./components/admin/OrderList";
import CheckoutList from "./components/admin/CheckoutList";

// Import context
import { CartProvider } from "./context/CartContext";
import AuthProvider from "./context/AuthContext";
import AddProduct from "./components/admin/AddProduct";

const App = () => {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div>
            <h1>E-commerce Demo</h1>
            <div className="w-full p-6">
              <Navbar />
            </div>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/product/:id" element={<ProductPage />} />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <CartPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order"
                element={
                  <ProtectedRoute>
                    <OrderPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <CheckoutPage />
                  </ProtectedRoute>
                }
              />

              {/* /admin */}
              <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
              <Route path="/admin/user" element={<ProtectedRoute><UserList /></ProtectedRoute>} />
              <Route path="/admin/product" element={<ProtectedRoute><ProductList /></ProtectedRoute>} />
              <Route path="/admin/product/add" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
              <Route path="/admin/product/edit/:id" element={<ProtectedRoute><AddProduct /></ProtectedRoute>} />
              <Route path="/admin/order" element={<ProtectedRoute><OrderList /></ProtectedRoute>} />
              <Route path="/admin/checkout" element={<ProtectedRoute><CheckoutList /></ProtectedRoute>} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
};
export default App;
