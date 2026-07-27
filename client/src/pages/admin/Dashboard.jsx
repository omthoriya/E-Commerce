import { useEffect, useState } from "react";
import { getDashboard, getRecentOrders } from "../../services/adminService";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [dashboard, setDashboard] = useState({
    totalUsers: 0,
    totalCategories: 0,
    totalProducts: 0,
    totalOrders: 0,
    totalRevenue: 0,
  });

  const [recentOrders, setRecentOrders] = useState([]);

  useEffect(() => {
    fetchDashboard();
    fetchRecentOrders();
  }, []);

  const fetchDashboard = async () => {
    try {
      const data = await getDashboard();
      setDashboard(data);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch dashboard");
    }
  };

  const fetchRecentOrders = async () => {
    try {
      const data = await getRecentOrders();
      setRecentOrders(data.recentOrders);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {/* Users */}
        <div className="bg-blue-500 text-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-medium">Users</h2>
          <p className="text-4xl font-bold mt-2">{dashboard.totalUsers}</p>
        </div>

        {/* Categories */}
        <div className="bg-indigo-500 text-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-medium">Categories</h2>
          <p className="text-4xl font-bold mt-2">{dashboard.totalCategories}</p>
        </div>

        {/* Products */}
        <div className="bg-green-500 text-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-medium">Products</h2>
          <p className="text-4xl font-bold mt-2">{dashboard.totalProducts}</p>
        </div>

        {/* Orders */}
        <div className="bg-yellow-500 text-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-medium">Orders</h2>
          <p className="text-4xl font-bold mt-2">{dashboard.totalOrders}</p>
        </div>

        {/* Revenue */}
        <div className="bg-purple-500 text-white rounded-lg p-6 shadow">
          <h2 className="text-lg font-medium">Revenue</h2>
          <p className="text-3xl font-bold mt-2">₹ {dashboard.totalRevenue}</p>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mt-8">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Order ID</th>
              <th className="border p-3 text-left">Customer</th>
              <th className="border p-3 text-left">Email</th>
              <th className="border p-3 text-left">Amount</th>
              <th className="border p-3 text-left">Status</th>
              <th className="border p-3 text-left">Date</th>
              <th className="border p-3 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id}>
                <td className="border p-3">{order.id}</td>
                <td className="border p-3">{order.name}</td>
                <td className="border p-3">{order.email}</td>
                <td className="border p-3">₹{order.total_amount}</td>
                <td className="border p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-white text-sm font-medium
                        ${
                          order.status === "PENDING"
                            ? "bg-yellow-500"
                            : order.status === "SHIPPED"
                              ? "bg-blue-500"
                              : order.status === "DELIVERED"
                                ? "bg-green-500"
                                : "bg-red-500"
                        }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="border p-3">
                  {new Date(order.created_at).toLocaleDateString()}
                </td>
                <td className="border p-3 text-center">
                  <Link
                    to={`/admin/orders/${order.id}`}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
