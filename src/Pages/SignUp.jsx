import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../Services/axios";
import toast from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm: "",
    agree: false,
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};

    if (!formData.username) e.username = "Username is required";

    if (!formData.email) e.email = "Email is required";

    if (!formData.password) e.password = "Password is required";
    else if (formData.password.length < 8)
      e.password = "Password must be at least 8 characters";
   else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/.test(formData.password))
  e.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";


    if (!formData.confirm) e.confirm = "Confirm password";
    else if (formData.confirm !== formData.password)
      e.confirm = "Passwords do not match";

    if (!formData.agree)
      e.agree = "You must agree to the Terms & Privacy Policy";

    setErrors(e);
    return Object.keys(e).length === 0;
  };


  const submit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);

    try {
      await api.post("/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      toast.success("Account created successfully!");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error creating account");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-900">
          Create Account
        </h2>
        <p className="text-gray-500 text-center mb-8">Join to access all tools</p>

        <form onSubmit={submit} className="space-y-6">
          {/* USERNAME */}
          <div>
            <label className="text-sm font-medium">Username</label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input
                type="text"
                className={`w-full pl-10 pr-3 py-3 border rounded-lg ${
                  errors.username ? "border-red-500" : "border-gray-300"
                } focus:ring-2`}
                placeholder="Enter username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-sm">{errors.username}</p>
            )}
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input
                type="email"
                className={`w-full pl-10 pr-3 py-3 border rounded-lg ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } focus:ring-2`}
                placeholder="Enter email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          {/* PASSWORD */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input
                type={showPassword ? "text" : "password"}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg ${
                  errors.password ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Enter password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>

          {/* CONFIRM PASSWORD */}
          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5" />
              <input
                type={showConfirm ? "text" : "password"}
                className={`w-full pl-10 pr-10 py-3 border rounded-lg ${
                  errors.confirm ? "border-red-500" : "border-gray-300"
                }`}
                placeholder="Confirm password"
                value={formData.confirm}
                onChange={(e) =>
                  setFormData({ ...formData, confirm: e.target.value })
                }
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              >
                {showConfirm ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.confirm && (
              <p className="text-red-500 text-sm">{errors.confirm}</p>
            )}
          </div>

          {/* AGREE */}
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.agree}
              onChange={(e) =>
                setFormData({ ...formData, agree: e.target.checked })
              }
              className="w-4 h-4 text-blue-600 rounded border-gray-300"
            />
            <span className="text-gray-600 text-sm">
              I agree to the Terms & Privacy Policy
            </span>
          </div>
          {errors.agree && <p className="text-red-500 text-sm">{errors.agree}</p>}

          {/* SUBMIT */}
          <button
            type="submit"
            className="w-full py-3 bg-black text-white rounded-lg hover:bg-gray-900 transition font-medium"
            disabled={isLoading}
          >
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-6">
          Already have an account?{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-black font-semibold ml-1 underline"
          >
            Sign In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
