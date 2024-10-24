import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Switch,
} from "react-router-dom";

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
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div>
          <h1>E-commerce Demo</h1>
          <div className="w-full p-6">
            <Navbar />
            <Outlet />
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
          </Routes>
          <Route
            path="/checkout"
            element={
              <ProtectedRoute>
                <CheckoutPage />
              </ProtectedRoute>
            }
          />
        </div>
        <Switch>
          <Route path="/admin" exact component={AdminDashboard} />
          <Route path="/admin/users" component={UserList} />
          <Route path="/admin/products" component={ProductList} />
          <Route path="/admin/orders" component={OrderList} />
          <Route path="/admin/checkouts" component={CheckoutList} />
        </Switch>
      </Router>
    </CartProvider>
  );
};
export default App;
