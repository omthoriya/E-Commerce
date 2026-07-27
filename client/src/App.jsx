import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {/* Toast Notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      {/* Navbar */}
      {!isAdminRoute && <Navbar />}

      {/* Routes */}
      <AppRoutes />

      {/* Footer */}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
