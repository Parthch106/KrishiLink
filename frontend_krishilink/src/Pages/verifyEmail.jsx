import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { XCircle, Loader2, CheckCircle } from "lucide-react";
// import { BACKEND_BASE_URL } from "../../config/config";
import axios from "axios";

function VerifyEmail() {
  const [verificationStatus, setVerificationStatus] = useState("loading");
  const [message, setMessage] = useState("Verifying your email address...");

  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const emailVerificationToken = params.get("token");

  useEffect(() => {
    document.title = "Verify Email - Krishi Link";
    if (!emailVerificationToken) {
      setVerificationStatus("error");
      setMessage(
        "Failed to verify email. The verification link may have expired or is invalid."
      );
      return;
    }

    // Create an AbortController to cancel the request if needed
    const controller = new AbortController();
    const signal = controller.signal;

    const verifyEmail = async () => {
      try {
        const url = `http://localhost:8080/auth/verifyEmail?token=${encodeURIComponent(
          emailVerificationToken
        )}`;
        const response = await axios.get(url, { signal });
        if (response.status === 200) {
          setVerificationStatus("success");
          setMessage("Email verification successful. You can now log in.");
          console.log(response);
        }
      } catch (error) {
        setVerificationStatus("error");
        // setMessage('Failed to verify email. The verification link may have expired or is invalid. Please request a new verification link.');
        // setMessage(error.response.data.message);
        if (error.response) {
          setMessage(error.response.data.message || "Failed to verify email.");
        } else {
          setMessage("An unexpected error occurred.");
        }
      }
    };

    setTimeout(() => {
      verifyEmail();
    }, 3000);

    // Cleanup: Cancel the request on component unmount
    return () => controller.abort();
  }, [emailVerificationToken]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-xl border border-gray-300 p-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Email Verification
          </h1>
          <div className="flex justify-center my-8">
            {verificationStatus === "loading" && (
              <Loader2 className="w-16 h-16 text-green-500 animate-spin" />
            )}
            {verificationStatus === "error" && (
              <XCircle className="w-16 h-16 text-red-500" />
            )}
            {verificationStatus === "success" && (
              <CheckCircle className="w-16 h-16 text-green-500" />
            )}
          </div>
          <p className="text-gray-600 mb-6">{message}</p>

          {verificationStatus === "error" && (
            <div className="space-y-4">
              <Link
                to="/login"
                className="inline-block w-full px-6 py-3 text-center text-white font-medium bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
              >
                Back to Login
              </Link>
            </div>
          )}

          {verificationStatus === "success" && (
            <div className="space-y-4">
              <a
                href="/login"
                className="inline-block w-full px-6 py-3 text-center text-white font-medium bg-green-600 hover:bg-green-700 rounded-lg transition-colors duration-200"
              >
                Continue to Login
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default VerifyEmail;