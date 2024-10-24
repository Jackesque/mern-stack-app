import React from "react";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <ul>
        <li><Link to="/admin/users">User List</Link></li>
        <li><Link to="/admin/products">Product List</Link></li>
        <li><Link to="/admin/orders">Order List</Link></li>
        <li><Link to="/admin/checkouts">Checkout List</Link></li>
      </ul>
    </div>
  );
};

export default AdminDashboard;
