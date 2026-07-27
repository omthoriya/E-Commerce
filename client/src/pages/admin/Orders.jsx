import { useEffect, useState } from "react";
import {
  getAllOrders,
  updateOrderStatus,
} from "../../services/adminOrderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getAllOrders();
      setOrders(data.orders);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      const data = await updateOrderStatus(id, status);
      alert(data.message);
      fetchOrders();
    } catch (error) {
      alert(error.response?.data?.message || "Failed");
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Orders</h1>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3">Order ID</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="px-4 py-3">{order.id}</td>

                  <td className="px-4 py-3">{order.name}</td>

                  <td className="px-4 py-3">{order.email}</td>

                  <td className="px-4 py-3">₹{order.total_amount}</td>

                  <td className="px-4 py-3">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order.id, e.target.value)
                      }
                      className="border rounded px-2 py-1"
                    >
                      <option value="PENDING">PENDING</option>
                      <option value="CONFIRMED">CONFIRMED</option>
                      <option value="SHIPPED">SHIPPED</option>
                      <option value="DELIVERED">DELIVERED</option>
                      <option value="CANCELLED">CANCELLED</option>
                    </select>
                  </td>

                  <td className="px-4 py-3">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center py-6">
                  No Orders Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
