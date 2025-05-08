"use client";
import React, { useState } from "react";
import {
  Mail,
  User,
  Lock,
  Phone,
  Eye,
  EyeOff,
  UserPlus,
  AlertCircle,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signIn, signOut } from "next-auth/react";
import { Toaster, toast } from "sonner";
import { useUser } from "@/app/context/UserContext";

function SignUpForm() {
  const { setUserId } = useUser();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Toggle Password Visibility
  const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

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
    } else if (name === "username") {
      if (!value) errorMessage = "Username is required";
      else if (value.length < 3)
        errorMessage = "Username must be at least 3 characters";
    } else if (name === "phone") {
      if (!value) errorMessage = "Phone number is required";
      else if (!/^\d{10,15}$/.test(value))
        errorMessage = "Invalid phone number format";
    } else if (name === "password") {
      if (!value) errorMessage = "Password is required";
      else if (value.length < 6)
        errorMessage = "Password must be at least 6 characters";
    } else if (name === "confirmPassword") {
      if (!value) errorMessage = "Please confirm your password";
      else if (value !== formData.password)
        errorMessage = "Passwords do not match";
    }
    setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    return !errorMessage;
  };

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const isEmailValid = validateInput("email", formData.email);
    const isUsernameValid = validateInput("username", formData.username);
    const isPhoneValid = validateInput("phone", formData.phone);
    const isPasswordValid = validateInput("password", formData.password);
    const isConfirmPasswordValid = validateInput(
      "confirmPassword",
      formData.confirmPassword
    );

    // Check for errors
    if (
      !isEmailValid ||
      !isUsernameValid ||
      !isPhoneValid ||
      !isPasswordValid ||
      !isConfirmPasswordValid
    ) {
      toast.error("Please correct the errors in the form", {
        description: "Make sure all fields are filled correctly",
      });
      return;
    }

    setLoading(true);

    try {
      toast.loading("Creating your account...");

      // Send signup request to backend
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
        credentials: "include", // 🔥 This enables cookie handling
      });

      const data = await response.json();

      // Check for error in the response
      if (!response.ok) {
        console.error("Error response from backend:", data); // Log to see what the error looks like
        throw new Error(data.message || data.error || "Sign up failed");
      }
      console.log("We have received the cookie yahoooo", document.cookie);
      setUserId(data.user.id);
      // Show success toast
      toast.dismiss();
      toast.success("Account created successfully!", {
        description: "Welcome to CrackIt!",
      });

      // Redirect after a short delay to allow the toast to be seen
      setTimeout(() => {
        // after successful signup
        const redirectPath = localStorage.getItem("redirectAfterLogin");

        if (redirectPath) {
          localStorage.removeItem("redirectAfterLogin");
          router.push(redirectPath);
        } else {
          // Default route after login
          router.push("/Mdcat");
        }
      }, 100);
    } catch (error) {
      toast.dismiss();
      toast.error("Sign up failed", {
        description:
          error.message || "Please try again with different credentials",
        icon: <AlertCircle className="h-5 w-5 text-red-500" />,
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle Google Sign Up
  const handleGoogleSignUp = async () => {
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

            <h2 className="text-2xl font-semibold mb-4">Join CrackIt Today!</h2>
            <p className="text-green-100 mb-8">
              Create an account to access premium study materials, track your
              progress, and crack your exams with confidence.
            </p>
          </div>

          <div className="bg-green-700/30 p-4 rounded-lg">
            <p className="italic text-green-50 text-sm">
              "I studied with CrackIt for just 3 months and improved my score by
              35%. The detailed analytics helped me focus on my weak areas."
            </p>
            <p className="text-green-200 font-semibold mt-2">
              — Ali Khan, Top Scorer
            </p>
          </div>
        </div>

        {/* Right side - Form */}
        <div className="p-6 md:p-8 md:w-7/12">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Create Your Account
            </h2>
            <p className="text-gray-600 mt-1">
              Fill in your details to get started
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Email Input */}
            <div className="space-y-1">
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

            {/* Username Input */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">
                Username
              </label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all w-full">
                <User className="h-5 w-5 text-green-600" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="grow outline-none bg-transparent placeholder-gray-400 text-gray-800"
                  placeholder="Choose a username"
                />
              </div>
              {errors.username && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.username}
                </p>
              )}
            </div>

            {/* Phone Input */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">
                Phone Number
              </label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all w-full">
                <Phone className="h-5 w-5 text-green-600" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="grow outline-none bg-transparent placeholder-gray-400 text-gray-800"
                  placeholder="Your phone number"
                />
              </div>
              {errors.phone && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-1">
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
                  placeholder="Create a strong password"
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

            {/* Confirm Password Input */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700 block">
                Confirm Password
              </label>
              <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-300 bg-white focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all w-full relative">
                <Lock className="h-5 w-5 text-green-600" />
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="grow outline-none bg-transparent placeholder-gray-400 text-gray-800"
                  placeholder="Re-enter your password"
                />
                <button
                  type="button"
                  onClick={toggleConfirmPasswordVisibility}
                  className="text-gray-500 hover:text-green-600 transition-colors"
                  aria-label={
                    confirmPasswordVisible ? "Hide password" : "Show password"
                  }
                >
                  {confirmPasswordVisible ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-600 text-sm flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-sm mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
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
                  Creating Account...
                </span>
              ) : (
                <>
                  <UserPlus className="h-5 w-5" />
                  Create Account
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
              onClick={handleGoogleSignUp}
              className="bg-white text-gray-700 border border-gray-300 py-3 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <FcGoogle className="h-6 w-6" />
              Continue with Google
            </button>

            {/* Sign In Link */}
            <div className="text-center text-gray-600 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/User-Sign-In")}
                className="text-green-600 font-medium hover:text-green-800 hover:underline transition-colors"
              >
                Sign in
              </button>
            </div>

            {/* Terms & Privacy Policy */}
            <p className="text-center text-gray-500 text-xs mt-2">
              By creating an account, you agree to our{" "}
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

export default SignUpForm;
