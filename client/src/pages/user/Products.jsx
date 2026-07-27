import { useEffect, useState } from "react";
import { getProducts } from "../../services/productService";
import { addToCart } from "../../services/cartService";
import { Link } from "react-router-dom";
import { getCategories } from "../../services/categoryService";
import toast from "react-hot-toast";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts();
      setProducts(data.products);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      const data = await addToCart(productId, 1);

      toast.success(data.message);
    } catch (error) {
      console.log("Full Error:", error);

      if (error.response) {
        console.log("Status:", error.response.status);
        console.log("Data:", error.response.data);
      }
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8 text-center">Our Products</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-96 border rounded-lg px-4 py-2"
        />
      </div>
      <div className="flex flex-wrap gap-3 justify-center mb-8">
        <button
          onClick={() => setSelectedCategory("All")}
          className={`px-4 py-2 rounded-lg ${
            selectedCategory === "All"
              ? "bg-blue-600 text-white"
              : "bg-gray-200"
          }`}
        >
          All
        </button>

        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-4 py-2 rounded-lg ${
              selectedCategory === category.name
                ? "bg-blue-600 text-white"
                : "bg-gray-200"
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products
          .filter((product) => {
            const matchesSearch = product.name
              .toLowerCase()
              .includes(search.toLowerCase());

            const matchesCategory =
              selectedCategory === "All" ||
              product.category === selectedCategory;

            return matchesSearch && matchesCategory;
          })
          .map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition"
            >
              <Link to={`/products/${product.id}`}>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-contain rounded-lg"
                />

                <h2 className="text-xl font-semibold mt-4">{product.name}</h2>

                <p className="text-gray-500 mt-2">{product.category}</p>

                <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                  {product.description}
                </p>

                <p className="mt-2">
                  <span className="font-semibold">Stock:</span> {product.stock}
                </p>

                <p className="text-blue-600 text-2xl font-bold mt-3">
                  ₹ {product.price}
                </p>
              </Link>

              <button
                onClick={() => handleAddToCart(product.id)}
                className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4 hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Products;
