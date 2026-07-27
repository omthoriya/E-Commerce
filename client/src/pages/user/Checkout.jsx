import { useState } from "react";
import { placeOrder } from "../../services/orderService";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async () => {
    try{
        const data = await placeOrder();

        alert(data.message)
        navigate("/orders");
    } catch(error){
        alert(error.response?.data?.message || "Failed to place order");
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>

      <div className="space-y-4">
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          className="w-full border p-3 rounded"
          value={formData.fullName}
          onChange={handleChange}
        />

        <input
          type="text"
          name="phone"
          placeholder="Phone Number"
          className="w-full border p-3 rounded"
          value={formData.phone}
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Delivery Address"
          className="w-full border p-3 rounded"
          rows="4"
          value={formData.address}
          onChange={handleChange}
        />

        <button
          className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
          onClick={handlePlaceOrder}
        >
          Place Order
        </button>   
      </div>
    </div>
  );
};

export default Checkout;
