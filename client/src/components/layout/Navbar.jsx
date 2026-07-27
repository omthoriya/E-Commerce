import { Link,useNavigate } from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const handleLogout = () =>{
        localStorage.removeItem("token");
        alert("Logout Successful");
        navigate("/login");
    }
  return (
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-3xl font-bold">
            ShopEase
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-6 text-lg">
            <Link to="/" className="hover:text-gray-200">
              Home
            </Link>

            <Link to="/products" className="hover:text-gray-200">
              Products
            </Link>

            {token ? (
              <>
                <Link to="/cart" className="hover:text-gray-200">
                  Cart
                </Link>

                <Link to="/my-orders" className="hover:text-gray-200">
                  My Orders
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="hover:text-gray-200">
                  Login
                </Link>

                <Link to="/register" className="hover:text-gray-200">
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
