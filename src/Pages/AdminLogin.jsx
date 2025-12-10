import { useState } from "react";
import { User, Lock, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../Services/axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!formData.username) e.username = "Username is required";
    if (!formData.password) e.password = "Password is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async (e) => {
  e.preventDefault();
  if (!validate()) return;

  setIsLoading(true);

  try {
    // Create FormData object
    const formDataToSend = new FormData();
    formDataToSend.append("username", formData.username);
    formDataToSend.append("password", formData.password);

    const res = await api.post("/login", formDataToSend, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    const { user, access_token } = res.data;

    Cookies.set("user", formData.username, { expires: 7 });
    Cookies.set("token", access_token, { expires: 7 });

    toast.success("Login successful!");
    navigate("/admin-dashboard");
  } catch (err) {
    if (err.response?.data?.detail) {
      const messages = err.response.data.detail.map(d => d.msg).join(", ");
      toast.error(messages);
    } else {
      toast.error("Invalid username or password");
    }
  }

  setIsLoading(false);
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-900">Welcome Back Admin</h2>
        <p className="text-gray-500 text-center mb-8">Login to continue</p>

        <form onSubmit={submit} className="space-y-6">
          {/* USERNAME */}
          <div>
            <label className="text-sm font-medium">Username</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input
                type="text"
                placeholder="Enter username"
                className={`w-full pl-10 pr-3 py-3 border rounded-lg ${errors.username ? "border-red-500" : "border-gray-300"} focus:ring-2`}
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              />
            </div>
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className={`w-full pl-10 pr-10 py-3 border rounded-lg ${errors.password ? "border-red-500" : "border-gray-300"}`}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition font-medium"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

      
      </div>
    </div>
  );
};

export default AdminLogin;
