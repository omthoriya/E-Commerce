import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductById } from "../../services/productService";
import { addToCart } from "../../services/cartService";

const ProductDetails = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const data = await getProductById(id);
      setProduct(data.product);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch product");
    }
  };

  const handleAddToCart = async () => {
    try {
      const data = await addToCart(product.id, quantity);
      alert(data.message);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to add product");
    }
  };

  if (!product) {
    return <div className="text-center mt-20 text-2xl">Loading...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-10 px-5">
      <div className="grid md:grid-cols-2 gap-10 bg-white shadow-lg rounded-xl p-8">
        {/* Left Side */}
        <div>
          <img src={product.image} alt={product.name} />
        </div>

        {/* Right Side */}
        <div>
          <h1 className="text-4xl font-bold">{product.name}</h1>

          <p className="text-3xl text-blue-600 font-bold mt-5">
            ₹{product.price}
          </p>

          <p className="mt-4">
            <span className="font-semibold">Category : </span>
            {product.category}
          </p>

          <p className="mt-2">
            <span className="font-semibold">Stock : </span>
            {product.stock}
          </p>

          <hr className="my-6" />

          <h2 className="text-xl font-semibold">Description</h2>

          <p className="text-gray-600 mt-2">{product.description}</p>

          <div className="flex items-center gap-4 mt-6">
            <button
              onClick={() => quantity > 1 && setQuantity(quantity - 1)}
              className="w-10 h-10 bg-gray-200 rounded-lg text-xl"
            >
              -
            </button>

            <span className="text-xl font-semibold">{quantity}</span>

            <button
              onClick={() => {
                if (quantity < product.stock) {
                  setQuantity(quantity + 1);
                }
              }}
              className="w-10 h-10 bg-gray-200 rounded-lg text-xl"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-8 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
