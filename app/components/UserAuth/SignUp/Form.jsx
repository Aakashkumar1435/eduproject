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
  ArrowRight,
  Check,
  Sparkles,
} from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Toaster, toast } from "sonner";
import { useUser } from "@/app/context/UserContext";
import axios from "axios";

function SignUpForm() {
  const { setUserId } = useUser();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    name: "", // Added for the User model
  });
  const [errors, setErrors] = useState({
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    name: "", // Added for the User model
  });
  const [loading, setLoading] = useState(false);
  const [emailValidating, setEmailValidating] = useState(false);
  const [step, setStep] = useState(1); // For multi-step form
  const router = useRouter();

  // Toggle Password Visibility
  const togglePasswordVisibility = () =>
    setPasswordVisibility(!passwordVisible);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordVisible(!confirmPasswordVisible);

  // Handle Input Change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    validateInput(e.target.name, e.target.value);
  };

  // Email validation with Abstract API
  const checkEmailWithAbstractAPI = async (email) => {
    // Skip API call for empty email or obviously invalid format
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      return false;
    }

    setEmailValidating(true);

    try {
      const apiKey = "b6e987e9c048482f921dc90b3adaa2bc";
      const response = await axios.get(
        "https://emailvalidation.abstractapi.com/v1/",
        {
          params: {
            api_key: apiKey,
            email: email,
          },
        }
      );

      const data = response.data;
      // Check both format validity and SMTP validity
      const isValid = data.is_valid_format.value && data.is_smtp_valid.value;
      return isValid;
    } catch (error) {
      console.error("Email API validation error:", error);
      // In case of API failure, we allow the email to pass validation
      // but log the error for debugging
      return true;
    } finally {
      setEmailValidating(false);
    }
  };
  
  const validateInput = async (name, value) => {
    let errorMessage = "";

    if (name === "email") {
      if (!value) {
        errorMessage = "Email is required";
      } else {
        const isValidFormat = /^\S+@\S+\.\S+$/.test(value);
        if (!isValidFormat) {
          errorMessage = "Invalid email format";
        } else {
          // Update UI immediately for valid format
          setErrors((prevErrors) => ({ ...prevErrors, [name]: "" }));

          // API validation happens here
          setEmailValidating(true);
          try {
            const isValid = await checkEmailWithAbstractAPI(value);
            if (!isValid) {
              errorMessage = "Email appears to be invalid or unreachable";
              setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: errorMessage,
              }));
            }
          } catch (err) {
            console.error("Email validation error:", err);
            // Don't set error message on API failure, let the form proceed
          } finally {
            setEmailValidating(false);
          }
        }
      }
    } else if (name === "name") {
      if (!value) errorMessage = "Full name is required";
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
    const emailValid = await validateInput("email", formData.email);
    const nameValid = await validateInput("name", formData.name);
    const phoneValid = await validateInput("phone", formData.phone);
    const passwordValid = await validateInput("password", formData.password);
    const confirmPasswordValid = await validateInput(
      "confirmPassword",
      formData.confirmPassword
    );

    // Check for errors
    if (
      !emailValid ||
      !nameValid ||
      !phoneValid ||
      !passwordValid ||
      !confirmPasswordValid ||
      emailValidating
    ) {
      toast.error("Please correct the errors in the form", {
        description: "Make sure all fields are filled correctly",
      });
      return;
    }

    setLoading(true);

    // Prepare data according to model
    const userData = {
      email: formData.email,
      name: formData.name,
      phone: formData.phone,
      password: formData.password,
      // Default values from model will be set on the server
    };

    try {
      toast.loading("Creating your account...");

      // Send signup request to backend
      const response = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
        credentials: "include", // For cookie handling
      });

      const data = await response.json();

      // Check for error in the response
      if (!response.ok) {
        throw new Error(data.message || data.error || "Sign up failed");
      }

      setUserId(data.user.id);

      // Show success toast
      toast.dismiss();
      toast.success("Account created successfully!", {
        description: "Welcome to CrackIt!",
      });

      // Redirect after a short delay
      setTimeout(() => {
        // Check for redirect path
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

  // Move to next step
  const handleNextStep = async () => {
    // Validate email field specifically with API check
    const isEmailValid = await validateInput("email", formData.email);
    const isNameValid = await validateInput("name", formData.name);

    // Don't proceed if email is being validated
    if (emailValidating) {
      toast.info("Please wait while we validate your email");
      return;
    }

    if (isEmailValid && isNameValid) {
      setStep(2);
    } else {
      toast.error("Please fill in all required fields correctly");
    }
  };

  // Go back to previous step
  const handlePrevStep = () => {
    setStep(1);
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <Toaster position="top-center" richColors />

      <div className="bg-gray-800 rounded-2xl shadow-xl overflow-hidden w-full max-w-4xl flex flex-col md:flex-row">
        {/* Left side - Brand & Hero */}
        <div className="bg-gradient-to-br from-green-600 to-green-900 p-8 text-white md:w-5/12 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="bg-gray-900 rounded-full p-2">
                <svg
                  className="h-8 w-8 text-green-500"
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

          {/* Features list */}
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-2">
              <div className="bg-green-800 rounded-full p-1 mt-0.5">
                <Check size={14} className="text-green-200" />
              </div>
              <p className="text-green-100 text-sm">
                Track your progress with detailed analytics
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-green-800 rounded-full p-1 mt-0.5">
                <Check size={14} className="text-green-200" />
              </div>
              <p className="text-green-100 text-sm">
                Compete with peers on the leaderboard
              </p>
            </div>
            <div className="flex items-start gap-2">
              <div className="bg-green-800 rounded-full p-1 mt-0.5">
                <Check size={14} className="text-green-200" />
              </div>
              <p className="text-green-100 text-sm">
                Earn points and level up as you learn
              </p>
            </div>
          </div>

          <div className="bg-green-700/30 p-4 rounded-lg border border-green-600/30">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles size={16} className="text-green-300" />
              <p className="text-green-200 font-semibold text-sm">
                USER SPOTLIGHT
              </p>
            </div>
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
        <div className="p-6 md:p-8 md:w-7/12 bg-gray-800 text-white">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-bold text-white">
              Create Your Account
            </h2>
            <p className="text-gray-400 mt-1">
              {step === 1 ? "Step 1: Basic Information" : "Step 2: Security"}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {step === 1 ? (
              <>
                {/* Name Input */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 block">
                    Full Name
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all w-full">
                    <User className="h-5 w-5 text-green-500" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="grow outline-none bg-transparent placeholder-gray-500 text-white"
                      placeholder="Your full name"
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Input */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 block">
                    Email Address
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all w-full">
                    <Mail className="h-5 w-5 text-green-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="grow outline-none bg-transparent placeholder-gray-500 text-white"
                      placeholder="name@example.com"
                    />
                    {emailValidating && (
                      <svg
                        className="animate-spin h-5 w-5 text-green-500"
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
                    )}
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.email}
                    </p>
                  )}
                  {emailValidating && (
                    <p className="text-blue-400 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      Verifying email...
                    </p>
                  )}
                </div>
                {/* Continue Button */}
                <button
                  type="button"
                  onClick={handleNextStep}
                  disabled={emailValidating}
                  className="bg-green-600 text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-md mt-4 disabled:bg-green-800 disabled:opacity-70"
                >
                  {emailValidating ? (
                    <>
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
                      Validating Email...
                    </>
                  ) : (
                    <>
                      Continue
                      <ArrowRight className="h-5 w-5" />
                    </>
                  )}
                </button>
              </>
            ) : (
              <>
                {/* Phone Input */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 block">
                    Phone Number
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all w-full">
                    <Phone className="h-5 w-5 text-green-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="grow outline-none bg-transparent placeholder-gray-500 text-white"
                      placeholder="Your phone number"
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Password Input */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 block">
                    Password
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all w-full relative">
                    <Lock className="h-5 w-5 text-green-500" />
                    <input
                      type={passwordVisible ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="grow outline-none bg-transparent placeholder-gray-500 text-white"
                      placeholder="Create a strong password"
                    />
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="text-gray-400 hover:text-green-500 transition-colors"
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
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm Password Input */}
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-300 block">
                    Confirm Password
                  </label>
                  <div className="flex items-center gap-3 px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 focus-within:ring-2 focus-within:ring-green-500 focus-within:border-green-500 transition-all w-full relative">
                    <Lock className="h-5 w-5 text-green-500" />
                    <input
                      type={confirmPasswordVisible ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="grow outline-none bg-transparent placeholder-gray-500 text-white"
                      placeholder="Re-enter your password"
                    />
                    <button
                      type="button"
                      onClick={toggleConfirmPasswordVisibility}
                      className="text-gray-400 hover:text-green-500 transition-colors"
                      aria-label={
                        confirmPasswordVisible
                          ? "Hide password"
                          : "Show password"
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
                    <p className="text-red-400 text-sm flex items-center gap-1">
                      <AlertCircle className="h-4 w-4" />
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Back and Submit Buttons */}
                <div className="grid grid-cols-2 gap-3 mt-4">
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-600 transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition-colors shadow-md disabled:opacity-70 disabled:cursor-not-allowed"
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
                        Processing...
                      </span>
                    ) : (
                      <>
                        <UserPlus className="h-5 w-5" />
                        Sign Up
                      </>
                    )}
                  </button>
                </div>
              </>
            )}

            {/* Social Sign Up Option - Only show on first step */}
            {step === 1 && (
              <>
                {/* OR Divider */}
                <div className="flex items-center gap-3 w-full my-4">
                  <div className="border-t border-gray-700 flex-grow"></div>
                  <span className="text-gray-500 text-sm">OR</span>
                  <div className="border-t border-gray-700 flex-grow"></div>
                </div>

                {/* Continue with Google Button */}
                <button
                  type="button"
                  onClick={handleGoogleSignUp}
                  className="bg-gray-700 text-white border border-gray-600 py-3 rounded-lg font-medium flex items-center justify-center gap-3 hover:bg-gray-600 transition-colors shadow-md"
                >
                  <FcGoogle className="h-6 w-6" />
                  Continue with Google
                </button>
              </>
            )}

            {/* Sign In Link - Always Show */}
            <div className="text-center text-gray-400 mt-4">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => router.push("/User-Sign-In")}
                className="text-green-400 font-medium hover:text-green-300 hover:underline transition-colors"
              >
                Sign in
              </button>
            </div>

            {/* Terms & Privacy Policy */}
            <p className="text-center text-gray-500 text-xs mt-2">
              By creating an account, you agree to our{" "}
              <button className="text-green-400 hover:underline">
                Terms of Use
              </button>{" "}
              and{" "}
              <button className="text-green-400 hover:underline">
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
