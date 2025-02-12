import React, { useEffect, useState } from "react";
import { Mail, ArrowRight } from "lucide-react";
import { TextField } from "@mui/material";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    document.body.style.backgroundColor = "#dcfce7";
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    console.log("Reset password requested for:", email);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col justify-center items-center lg:flex-row gap-8">
          {/* Left Side - Info */}
          {/* <div className="lg:w-1/2 space-y-6 rounded-2xl">
            <div className="text-center lg:text-left bg-white rounded-xl p-8 shadow-md">
              <div className="flex justify-center lg:justify-start mb-4">
                <div className="relative">
                  <div className="absolute -inset-1 rounded-full bg-green-100 blur"></div>
                  <Tractor className="relative h-20 w-20 text-green-600" />
                </div>
              </div>
              <h1 className="text-5xl font-bold text-gray-900 mb-4">
                Password Recovery
              </h1>
              <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                Don't worry, we'll help you regain access to your Krishi Link account
              </p>
            </div>
          </div> */}

          {/* Right Side - Form */}
          <div className="lg:w-1/2">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              {!isSubmitted ? (
                <>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900">
                      Reset Your Password
                    </h2>
                    <p className="mt-2 text-gray-600">
                      Enter your email to receive password reset instructions
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <TextField
                      required
                      label="Email Address"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      sx={{ width: "100%" }}
                    />

                    <button
                      type="submit"
                      className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-colors duration-200"
                    >
                      Send Reset Link
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-8">
                  <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                    <Mail className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Check Your Email
                  </h3>
                  <p className="text-gray-600 mb-6">
                    We've sent password reset instructions to:
                    <br />
                    <span className="font-medium text-gray-800">{email}</span>
                  </p>
                  <p className="text-sm text-gray-500">
                    Didn't receive the email? Check your spam folder or
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-green-600 hover:text-green-500 font-medium ml-1"
                    >
                      try again
                    </button>
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                to={'/signin'}
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign in here
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;