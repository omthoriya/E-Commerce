import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-slate-600 text-gray-300 mt-10">
      <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">ShopEase</h2>
          <p className="text-sm mt-2">
            Your trusted online shopping destination.
          </p>
        </div>

        <div className="flex gap-6">
          <Link to="/" className="hover:text-white transition">
            Home
          </Link>

          <Link to="/products" className="hover:text-white transition">
            Products
          </Link>

          <Link to="/login" className="hover:text-white transition">
            Login
          </Link>

          <Link to="/register" className="hover:text-white transition">
            Register
          </Link>
        </div>
      </div>

      <div className="border-t border-gray-700 py-4 text-center text-sm">
        © {new Date().getFullYear()} ShopEase. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
