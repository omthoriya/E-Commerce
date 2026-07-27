import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getProducts } from "../../services/productService";

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();

      // Show only first 4 products
      setProducts(data.products.slice(0, 4));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="max-w-7xl mx-auto py-16 px-6">
      <h2 className="text-3xl font-bold text-center mb-10">
        Featured Products
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl shadow-md hover:shadow-xl transition p-4"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-52 w-full object-contain"
            />

            <h3 className="mt-4 text-lg font-semibold">{product.name}</h3>

            <p className="text-blue-600 font-bold mt-2">₹ {product.price}</p>

            <Link
              to={`/products/${product.id}`}
              className="block mt-4 bg-blue-600 text-white text-center py-2 rounded-lg hover:bg-blue-700"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      <div className="text-center mt-10">
        <Link
          to="/products"
          className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white"
        >
          View All Products
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProducts;
