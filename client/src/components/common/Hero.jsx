import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
      <div className="max-w-7xl mx-auto px-6 py-20 flex flex-col-reverse md:flex-row items-center justify-between">
        {/* Left Side */}
        <div className="md:w-1/2 text-center md:text-left mt-10 md:mt-0">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Welcome to <span className="text-yellow-300">ShopEase</span>
          </h1>

          <p className="mt-6 text-lg text-gray-200">
            Discover the latest products at the best prices. Shop smarter with
            fast delivery and secure payments.
          </p>

          <div className="mt-8 flex justify-center md:justify-start gap-4">
            <Link
              to="/products"
              className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition"
            >
              Shop Now
            </Link>

            <Link
              to="/products"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-blue-700 transition"
            >
              Explore Products
            </Link>
          </div>
        </div>

        {/* Right Side */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=700"
            alt="Shopping"
            className="w-full max-w-md rounded-xl shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
