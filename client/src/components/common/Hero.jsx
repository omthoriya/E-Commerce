import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gray-50 border-b">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left */}
        <div className="md:w-1/2">
          <span className="inline-block bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-medium mb-4">
            🛍️ Online Shopping Made Easy
          </span>

          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
            Shop the Latest
            <br />
            Products at
            <span className="text-blue-600"> Best Prices</span>
          </h1>

          <p className="mt-5 text-gray-600 text-lg">
            Explore mobiles, laptops, electronics and many more products with
            secure payments and fast delivery.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/products"
              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/products"
              className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition"
            >
              Browse Products
            </Link>
          </div>
        </div>

        {/* Right */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700"
            alt="Shopping"
            className="w-full max-w-sm rounded-xl shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
