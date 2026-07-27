import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../services/adminService";

const OrderDetails = () => {
  const { id } = useParams();

  const [order, setOrder] = useState(null);
  const [items, setItems] = useState([]);

  const fetchOrder = async () => {
    try {
      const data = await getOrderById(id);

      setOrder(data.order);
      setItems(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  if (!order) {
    return <h2 className="text-center text-xl mt-10">Loading...</h2>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Order Details</h1>
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Products</h2>

        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-3 text-left">Product</th>
              <th className="border p-3 text-center">Quantity</th>
              <th className="border p-3 text-right">Price</th>
            </tr>
          </thead>

          <tbody>
            {items.map((item) => (
              <tr key={item.product_id}>
                <td className="border p-3">{item.name}</td>

                <td className="border p-3 text-center">{item.quantity}</td>

                <td className="border p-3 text-right">₹{item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="bg-white shadow rounded-lg p-6 mb-6">
        <p>
          <strong>Order ID:</strong> {order.id}
        </p>

        <p>
          <strong>User ID:</strong> {order.user_id}
        </p>

        <p>
          <strong>Total Amount:</strong> ₹{order.total_amount}
        </p>

        <p>
          <strong>Status:</strong> {order.status}
        </p>

        <p>
          <strong>Order Date:</strong>{" "}
          {new Date(order.created_at).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default OrderDetails;
