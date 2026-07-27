import { Outlet, NavLink, useNavigate } from "react-router-dom";

const AdminLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (!confirmLogout) return;

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-slate-100">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white shadow-xl">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold text-blue-400">ShopEase</h1>
          <p className="text-sm text-slate-400 mt-1">Admin Panel</p>
        </div>

        <nav className="mt-6 px-3 space-y-2">
          <NavLink
            to="/admin/dashboard"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            📊 Dashboard
          </NavLink>

          <NavLink
            to="/admin/categories"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            📂 Categories
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            🛍 Products
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            📦 Orders
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `block px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "bg-blue-600 text-white"
                  : "hover:bg-slate-800 text-slate-300"
              }`
            }
          >
            👥 Users
          </NavLink>
        </nav>
      </aside>

      {/* Right Side */}
      <div className="flex-1 flex flex-col">
        {/* Top Navbar */}
        <header className="bg-white shadow-md px-8 py-4 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-slate-700">Admin Dashboard</h2>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg transition"
          >
            Logout
          </button>
        </header>

        {/* Page Content */}
        <main className="p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
