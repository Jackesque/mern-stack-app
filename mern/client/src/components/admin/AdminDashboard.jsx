import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/admin/user">User List</Link></li>
        <li><Link to="/admin/product">Product List</Link></li>
        <li><Link to="/admin/order">Order List</Link></li>
        <li><Link to="/admin/checkout">Checkout List</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
