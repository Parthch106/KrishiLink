import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Lock } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
// import { useAuth } from "../context/AuthContext";
// import { BACKEND_BASE_URL } from "../../config/config";
import SnackBarMUI from "../components/SnackBarMUI";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");

  const [snackBarProperties, setSnackBarProperties] = useState({ open: false });

//   const { isAuthenticated, isLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const passwordResetToken = params.get("token");

  useEffect(() => {
    document.title = "Reset Password";
  });

  const handleSnackbarClose = () => {
    setSnackBarProperties((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else if (password.length < 8) {
      setError("Password must be at least 8 characters");
    } else {
      try {
        const response = await axios.post(
          `http://localhost:8080/auth/resetpassword`,
          { token: encodeURIComponent(passwordResetToken), password },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (response.status === 200) {
          setSnackBarProperties({
            open: true,
            autoHideDuration: 3000,
            variant: "solid",
            color: "success",
            message: "Password reset successful",
          });
          setTimeout(() => {
            navigate("/login");
          }, 2000);
        }
      } catch (error) {
        setSnackBarProperties({
          open: true,
          autoHideDuration: 3000,
          variant: "solid",
          color: "danger",
          message: error.response.data.message,
        });
      }
    }
  };

//   if (isLoading) {
//     return <div>Loading...</div>;
//   } else if (isAuthenticated) {
//     navigate("/");
//   }
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
          Reset Your Password
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Please enter your new password below
        </p>

        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors pl-11"
                  placeholder="Enter your new password"
                  required
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors pl-11"
                  placeholder="Confirm your new password"
                  required
                />
                <Lock className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>
          {error && <div className="text-red-500 text-sm mb-4">{error}</div>}

          <button
            type="submit"
            className="w-full cursor-pointer bg-green-500 text-white py-3 px-4 rounded-lg hover:bg-green-600 transition-colors font-medium flex items-center justify-center"
          >
            Reset Password
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            to={"/login"}
            className="text-green-500 hover:text-green-600 font-medium"
          >
            Sign in here
          </Link>
        </p>
      </div>
      {snackBarProperties.open && (
        <SnackBarMUI {...snackBarProperties} onClose={handleSnackbarClose} />
      )}
    </div>
  );
}

export default ResetPassword;