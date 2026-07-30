import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import AppRoutes from "./routes/AppRoutes";
import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster position="top-right" reverseOrder={false} />

      {!isAdminRoute && <Navbar />}

      <main className="flex-1">
        <AppRoutes />
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

export default App;
