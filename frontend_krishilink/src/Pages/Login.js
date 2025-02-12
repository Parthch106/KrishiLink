import React, { useState } from "react";
import { FaEnvelope, FaLock } from "react-icons/fa";
import { Tractor } from "lucide-react";
import { TextField } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { handleError, handleSuccess } from "../utils";

function Login() {
  const [loginInfo, setLoginInfo] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    const copyLoginInfo = { ...loginInfo };
    copyLoginInfo[name] = value;
    setLoginInfo(copyLoginInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("email and password are required");
    }
    try {
      const url = `http://localhost:8080/auth/login`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const result = await response.json();
      const { success, message, jwtToken, name, error } = result;
      if (success) {
        handleSuccess(message);
        localStorage.setItem("token", jwtToken);
        localStorage.setItem("loggedInUser", name);
        setTimeout(() => {
          navigate("/home");
        }, 1000);
      } else if (error) {
        const details = error?.details[0].message;
        handleError(details);
      } else if (!success) {
        handleError(message);
      }
      console.log(result);
    } catch (err) {
      handleError(err);
    }
  };

  return (
    // <div className='login-container'>
    // <div className='container'>
    //     <form onSubmit={handleLogin}>
    //         <div>
    //             <h1 className='h1'>Login</h1>
    //             <label htmlFor='email'>Email</label>
    //             <div className='email'>
    //             <div><input
    //                 onChange={handleChange}
    //                 type='email'
    //                 name='email'
    //                 placeholder='Enter your email...'
    //                 value={loginInfo.email}
    //             /></div>
    //             <div><FaEnvelope className='icon1'/></div>
    //             </div>
    //         </div>
    //         <div>
    //             <label htmlFor='password'>Password</label>
    //             <input
    //                 onChange={handleChange}
    //                 type='password'
    //                 name='password'
    //                 placeholder='Enter your password...'
    //                 value={loginInfo.password}
    //             /><FaLock className='icon2'/>
    //         </div>
    //         <button className='button1' type='submit'>Login</button>
    //         <span>Does't have an account ?
    //             <Link to="/signup">Signup</Link>
    //         </span>
    //     </form>
    //     <ToastContainer />
    //     </div>
    // </div>

    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Side - Website Info */}
          <div className="lg:w-1/2 space-y-6 rounded-2xl">
            <div className="text-center lg:text-left bg-white rounded-xl p-8 py-16 shadow-md">
              <div className="flex justify-center lg:justify-start mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-green-100 blur"></div>
                  <Tractor className="relative h-20 w-20 text-green-600" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Welcome Back
              </h1>
              <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                Continue your journey towards sustainable farming with Krishi
                Link
              </p>
              <p className="text-gray-500">
                Access your dashboard to manage your farm, connect with other
                farmers, and track your progress.
              </p>
            </div>
          </div>

          {/* Right Side - Sign In Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Sign In to Krishi Link
                </h2>
                <p className="mt-2 text-gray-600">
                  Access your farming dashboard
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-6">
                <div className="space-y-6">
                  <TextField
                    required
                    label="Email"
                    name="email"
                    type="email"
                    value={loginInfo.email}
                    onChange={handleChange}
                    sx={{ width: "100%" }}
                  />

                  <TextField
                    required
                    label="Password"
                    name="password"
                    type="password"
                    value={loginInfo.password}
                    onChange={handleChange}
                    sx={{ width: "100%" }}
                  />

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label
                        htmlFor="remember-me"
                        className="ml-2 block text-sm text-gray-900"
                      >
                        Remember me
                      </label>
                    </div>

                    <div className="text-sm">
                      <Link
                        to={"/forgotpassword"}
                        className="font-medium text-green-600 hover:text-green-500"
                      >
                        Forgot your password?
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                  >
                    Sign In
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-8 text-center text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to={"/signup"}
                className="font-medium text-green-600 hover:text-green-500"
              >
                Register here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
