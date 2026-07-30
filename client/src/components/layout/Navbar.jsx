import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    alert("Logout Successful");

    navigate("/login");
  };

  return (
    <nav className="bg-slate-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/"
          className="text-3xl font-bold tracking-wide hover:text-gray-200 transition"
        >
          ShopEase
        </Link>

        <div className="flex items-center gap-6 text-lg">
          <Link to="/" className="hover:text-yellow-300 transition">
            Home
          </Link>

          <Link to="/products" className="hover:text-yellow-300 transition">
            Products
          </Link>

          {token ? (
            <>
              <Link to="/cart" className="hover:text-yellow-300 transition">
                Cart
              </Link>

              <Link
                to="/my-orders"
                className="hover:text-yellow-300 transition"
              >
                My Orders
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-yellow-300 transition">
                Login
              </Link>

              <Link to="/register" className="hover:text-yellow-300 transition">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
