import { useState } from "react";
import { loginUser } from "../../services/authService";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData)

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success(data.message);

      if (data.user.role === "ADMIN") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error) {

     toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="email"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
