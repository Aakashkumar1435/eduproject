"use client";
import React, { useState } from "react";
import { Mail, Lock, Eye, EyeOff, LogIn, AlertCircle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "sonner";
import { useUser } from "../../../context/UserContext";

function SignInForm() {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const { setUserId } = useUser();

  // Toggle Password Visibility
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateInput(e.target.name, e.target.value);
  };

  // Validation Function
  const validateInput = (name, value) => {
    let errorMessage = "";
    if (name === "email") {
      if (!value) errorMessage = "Email is required";
      else if (!/^\S+@\S+\.\S+$/.test(value))
        errorMessage = "Invalid email format";
    } else if (name === "password") {
      if (!value) errorMessage = "Password is required";
      else if (value.length < 6)
        errorMessage = "Password must be at least 6 characters";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    return !errorMessage;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const isEmailValid = validateInput("email", formData.email);
    const isPasswordValid = validateInput("password", formData.password);

    // Check for errors
    if (!isEmailValid || !isPasswordValid) {
      toast.error("Please correct the errors in the form", {
        description: "Make sure all fields are filled correctly",
      });
      return;
    }

    setLoading(true);

    try {
      toast.loading("Signing you in...");

      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include", // ✅ This is required to allow cookies to be saved
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      setUserId(data.user.id);
      localStorage.setItem("userId", data.user.id); // ✅ Store in localStorage
      localStorage.setItem("isLoggedIn", "true");

      toast.dismiss();
      toast.success("Sign in successful!", {
        description: "Welcome back!",
      });

      setTimeout(() => {

        const redirectPath = localStorage.getItem("redirectAfterLogin");
        if(redirectPath) {
          localStorage.removeItem("redirectAfterLogin");
          router.push(redirectPath);
        } else {
          router.push('/Profile');
        }
      }, 100);
    } catch (error) {
      toast.dismiss();
      toast.error("Sign in failed", {
        description: error.message || "Please check your credentials",
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign In
  const handleGoogleSignIn = () => {
    toast.loading("Connecting to Google...");
    signIn("google", { callbackUrl: "/Mdcat" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 flex items-center justify-center p-4">
      <Toaster position="top-center" richColors />

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left side - Brand & Hero */}
        <div className="bg-gradient-to-br from-green-600 to-emerald-700 p-8 text-white md:w-5/12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-white rounded-full p-2">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <h1 className="text-3xl font-bold">CrackIt</h1>
            </div>

            <h2 className="text-2xl font-semibold mb-4">Welcome Back!</h2>
            <p className="text-green-100 mb-8">
              Access your personalized study plan, practice tests, and track
              your progress on your journey to success.
            </p>
          </div>

          <div className="bg-green-700/30 p-4 rounded-lg">
            <p className="italic text-green-50 text-sm">
              "CrackIt helped me achieve a top score in my MDCAT exam. The
              practice tests were crucial to my success!"
            </p>
            <p className="text-green-200 font-semibold mt-2">
              — Sarah Ahmad, Medical Student
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="p-8 md:w-7/12">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Sign In to CrackIt
            </h2>
            <p className="text-gray-600 mt-1">
              Enter your credentials to access your account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Email Address
              </label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all w-full">
                <Mail className="h-5 w-5 text-green-600" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="grow outline-none bg-transparent placeholder-gray-400 text-gray-800"
                  placeholder="name@example.com"
                />
              </div>
              {errors.email && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700 block">
                Password
              </label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all w-full relative">
                <Lock className="h-5 w-5 text-green-600" />
                <input
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="grow outline-none bg-transparent placeholder-gray-400 text-gray-800"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="text-gray-500 hover:text-green-600 transition-colors"
                  aria-label={
                    passwordVisible ? "Hide password" : "Show password"
                  }
                >
                  {passwordVisible ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.password}
                </p>
              )}
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                onClick={() => router.push("/User-Reset-Password")}
                className="text-green-600 text-sm hover:text-green-800 hover:underline transition-colors"
              >
                Forgot your password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white py-3.5 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-sm disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Signing In...
                </span>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Sign In
                </>
              )}
            </button>

            {/* OR Divider */}
            <div className="flex items-center gap-3 w-full my-2">
              <div className="border-t border-gray-300 flex-grow"></div>
              <span className="text-gray-500 text-sm">OR</span>
              <div className="border-t border-gray-300 flex-grow"></div>
            </div>

            {/* Continue with Google Button */}
            <button
              type="button"
              onClick={handleGoogleSignIn}
              className="bg-white text-gray-700 border border-gray-300 py-3 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FcGoogle className="h-6 w-6" />
              Continue with Google
            </button>

            {/* Signup Link */}
            <div className="text-center text-gray-600 mt-6">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/User-Sign-Up")}
                className="text-green-600 font-medium hover:text-green-800 hover:underline transition-colors"
              >
                Create an account
              </button>
            </div>

            {/* Terms & Privacy Policy */}
            <p className="text-center text-gray-500 text-sm mt-4">
              By logging in, you agree to our{" "}
              <button className="text-green-600 hover:underline">
                Terms of Use
              </button>{" "}
              and{" "}
              <button className="text-green-600 hover:underline">
                Privacy Policy
              </button>
              .
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignInForm;
