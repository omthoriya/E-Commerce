import { Routes, Route } from "react-router-dom";

import Home from "../pages/user/Home";
import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import Products from "../pages/user/Products";
import Cart from "../pages/user/Cart";
import Checkout from "../pages/user/Checkout";
import Orders from "../pages/user/Orders";
import Dashboard from "../pages/admin/Dashboard";
import AdminLayout from "../layouts/AdminLayout";
import Categories from "../pages/admin/Categories";
import AdminProducts from "../pages/admin/Products";
import ProductDetails from "../pages/user/ProductDetails";
import AdminOrders from "../pages/admin/Orders";
import Users from "../pages/admin/Users";
import OrderDetails from "../pages/admin/OrderDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/products" element={<Products />}></Route>
      <Route path="/cart" element={<Cart />}></Route>
      <Route path="/my-orders" element={<Orders />} />
      <Route path="/checkout" element={<Checkout />}></Route>
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/admin" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="categories" element={<Categories />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="orders" element={<AdminOrders />} />
        <Route path="users" element={<Users />} />
        <Route path="orders/:id" element={<OrderDetails />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
