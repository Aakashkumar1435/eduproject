"use client";
import React, { useState } from "react";
import { Mail, AlertCircle, ArrowLeft, Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "sonner";

function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const validateEmail = (email) => {
    if (!email) return "Email is required";
    if (!/^\S+@\S+\.\S+$/.test(email)) return "Invalid email format";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const emailError = validateEmail(email);
    if (emailError) {
      toast.error("Invalid email", {
        description: emailError,
      });
      return;
    }

    setLoading(true);

    try {
      toast.loading("Sending password reset instructions...");
      
      // Simulate API request (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.dismiss();
      toast.success("Reset instructions sent!", {
        description: "Please check your email inbox",
        icon: <Check className="h-5 w-5 text-green-500" />,
      });
      
      setEmailSent(true);
    } catch (error) {
      toast.dismiss();
      toast.error("Failed to send reset instructions", {
        description: "Please try again later",
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <Toaster position="top-center" richColors />
      
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-md">
        {/* Header */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-6 text-white">
          <div className="flex items-center gap-2 mb-6">
            <div className="bg-white rounded-full p-2">
              <svg className="h-6 w-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h1 className="text-2xl font-bold">CrackIt</h1>
          </div>
          
          <h2 className="text-xl font-semibold mb-3">Reset Your Password</h2>
          <p className="text-green-100">
            Enter your email address and we'll send you instructions to reset your password.
          </p>
        </div>

        {/* Form Content */}
        <div className="p-6">
          {!emailSent ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 block">Email Address</label>
                <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all w-full">
                  <Mail className="h-5 w-5 text-green-600" />
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={handleChange}
                    className="grow outline-none bg-transparent placeholder-gray-400 text-gray-800"
                    placeholder="Enter your registered email"
                    required
                  />
                </div>
                <p className="text-sm text-gray-500">
                  We'll send a verification code to this email
                </p>
              </div>

              {/* Send OTP Button */}
              <button
                type="submit"
                disabled={loading}
                className="bg-green-600 text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-sm mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Reset Instructions"
                )}
              </button>
            </form>
          ) : (
            <div className="flex flex-col items-center text-center py-4">
              <div className="bg-green-100 p-4 rounded-full mb-4">
                <Check className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Check Your Email</h3>
              <p className="text-gray-600 mb-6">
                We've sent password reset instructions to:
                <span className="block font-medium text-gray-800 mt-1">{email}</span>
              </p>
              <p className="text-sm text-gray-500 mb-6">
                If you don't see the email, check your spam folder or request another email.
              </p>
              <button
                onClick={() => setEmailSent(false)}
                className="text-green-600 font-medium hover:text-green-800 hover:underline transition-colors"
              >
                Use a different email address
              </button>
            </div>
          )}
          
          {/* Back to Login */}
          <div className="text-center mt-6">
            <button
              type="button"
              onClick={() => router.push("/User-Sign-In")}
              className="inline-flex items-center text-green-600 font-medium hover:text-green-800 hover:underline transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back to Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ResetPasswordForm;