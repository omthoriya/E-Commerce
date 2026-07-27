import { useEffect, useState } from "react";
import { getOrders } from "../../services/orderService";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const data = await getOrders();

      setOrders(data.orders);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch orders");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>

      {orders.length === 0 ? (
        <p>No Orders Found</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg shadow-md p-5 bg-white"
            >
              <h2 className="text-xl font-bold">Order #{order.id}</h2>

              <p className="mt-2">
                Total:
                <span className="font-semibold text-green-600">
                  ₹ {order.total_amount}
                </span>
              </p>

              <p>
                Status:
                <span className="font-semibold">{order.status}</span>
              </p>

              <p>
                Date:
                {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
