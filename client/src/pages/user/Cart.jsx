import { useEffect, useState } from "react";
import {
  getCart,
  updateCart,
  deleteCart,
  clearCart,
} from "../../services/cartService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const data = await getCart();

      setCartItems(data.cart);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (cartId) => {
    try {
      const data = await deleteCart(cartId);

      toast.success(data.message);

      fetchCart();
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete cart item",
      );
    }
  };

  const handleUpdateQuantity = async (cartId, quantity) => {
    try {
      if (quantity <= 0) {
        const data = await deleteCart(cartId);

        toast.success(data.message);

        fetchCart();
        return;
      }
      const data = await updateCart(cartId, quantity);

      toast.success(data.message);
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message);
    }
  };

  const handleClearCart = async () => {
    try {
      const data = await clearCart();

      toast.success(data.message);
      fetchCart();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to clear cart");
    }
  };

  const totalItems = cartItems.reduce((total, item) => {
    return total + item.quantity;
  }, 0);

  const subtotal = cartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">My Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-16">
          <h2 className="text-2xl font-semibold">Your Cart is Empty</h2>

          <p className="text-gray-500 mt-2">Add some products to your cart.</p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Shop Now
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          {cartItems.map((item) => (
            <div
              key={item.cartId}
              className="flex items-center justify-between border rounded-xl shadow-md p-5 bg-white"
            >
              {/* Product Details */}
              <div className="flex items-center gap-5">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-contain border rounded-lg"
                />

                <div>
                  <h2 className="text-2xl font-semibold">{item.name}</h2>

                  <p className="text-gray-600 mt-2">
                    Price:
                    <span className="text-blue-600 font-bold ml-2">
                      ₹ {item.price}
                    </span>
                  </p>

                  <div className="flex items-center gap-3 mt-3">
                    <button
                      className="bg-red-500 text-white w-8 h-8 rounded"
                      onClick={() =>
                        handleUpdateQuantity(item.cartId, item.quantity - 1)
                      }
                    >
                      -
                    </button>

                    <span className="text-xl font-bold">{item.quantity}</span>

                    <button
                      className="bg-green-500 text-white w-8 h-8 rounded"
                      onClick={() =>
                        handleUpdateQuantity(item.cartId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Total */}
              <div className="text-right">
                <p className="text-gray-500">Subtotal</p>

                <h2 className="text-2xl font-bold text-green-600">
                  ₹ {item.price * item.quantity}
                </h2>

                <button
                  className="mt-4 bg-red-600 text-white px-5 py-2 rounded-lg hover:bg-red-700"
                  onClick={() => handleDelete(item.cartId)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}

          {/* Cart Summary */}
          <div className="border rounded-xl shadow-lg p-6 bg-gray-100">
            <div className="flex justify-between mb-3">
              <span>Total Items</span>
              <span>{totalItems}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>₹ {subtotal}</span>
            </div>

            <div className="flex justify-between mb-3">
              <span>Delivery</span>
              <span className="text-green-600">FREE</span>
            </div>

            <hr className="my-3" />

            <div className="flex justify-between text-xl font-bold">
              <span>Total</span>
              <span>₹ {subtotal}</span>
            </div>

            <button
              className="w-full mt-5 bg-red-600 text-white py-2 rounded-lg hover:bg-red-700"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
            <button
              onClick={() => navigate("/products")}
              className="w-full mt-3 bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700"
            >
              Continue Shopping
            </button>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full mt-3 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
