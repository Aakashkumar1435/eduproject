"use client";
import React, { useState } from "react";
import { Mail, User, Lock, Eye, EyeOff, LogIn } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

function SignInForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState({ email: "", password: "" });
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const router = useRouter();

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
            else if (!/^\S+@\S+\.\S+$/.test(value)) errorMessage = "Invalid email format";
        } else if (name === "password") {
            if (!value) errorMessage = "Password is required";
            else if (value.length < 6) errorMessage = "Password must be at least 6 characters";
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        Object.keys(formData).forEach((key) => validateInput(key, formData[key]));

        // Check for errors
        if (Object.values(errors).some((error) => error)) {
            return;
        }

        setLoading(true);
        setServerError("");

        try {
            // Send login request to backend
            const response = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            // Handle errors
            if (!response.ok) {
                throw new Error(data.message || "Login failed");
            }

            // Redirect to Home page on successful login
            router.push("/Home");
        } catch (error) {
            setServerError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto">
            {/* Email Input */}
            <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-green-600 bg-green-50 text-green-800 focus-within:ring-2 focus-within:ring-green-500 transition-all w-full">
                <Mail className="h-6 w-6 text-green-600" />
                <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="grow outline-none bg-transparent placeholder-green-600 text-green-800 text-lg" 
                    placeholder="Email"
                />
            </label>
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}

            {/* Password Input */}
            <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-purple-600 bg-purple-50 text-purple-800 focus-within:ring-2 focus-within:ring-purple-500 transition-all w-full relative">
                <Lock className="h-6 w-6 text-purple-600" />
                <input 
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="grow outline-none bg-transparent placeholder-purple-600 text-purple-800 text-lg" 
                    placeholder="Password"
                />
                <button type="button" onClick={togglePasswordVisibility} className="absolute right-4">
                    {passwordVisible ? <EyeOff className="h-6 w-6 text-purple-600" /> : <Eye className="h-6 w-6 text-purple-600" />}
                </button>
            </label>
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}

            {/* Server Error */}
            {serverError && <p className="text-red-500 text-sm text-center">{serverError}</p>}

            {/* Sign In Button */}
            <button 
                type="submit"
                className="bg-green-600 text-white py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 hover:bg-green-700 transition"
                disabled={loading}
            >
                {loading ? "Logging in..." : (
                    <>
                        <LogIn className="h-5 w-5" />
                        Sign In
                    </>
                )}
            </button>

            {/* OR Divider */}
            <div className="flex items-center gap-3 w-full">
                <div className="border-t border-gray-400 flex-grow"></div>
                <span className="text-gray-500 text-sm">OR</span>
                <div className="border-t border-gray-400 flex-grow"></div>
            </div>

            {/* Continue with Google Button */}
            <button 
                type="button" 
                className="bg-white text-gray-700 border border-gray-400 py-3 rounded-lg text-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-600 transition hover:text-white">
                <FcGoogle className="h-6 w-6"/>
                Continue with Google
            </button>

            {/* Forgot Password Link */}
            <div className="text-center mt-3">
                <button 
                    type="button" 
                    onClick={() => router.push("/UserAuth/User-Reset-Password")} 
                    className="text-blue-600 hover:underline">
                    Forgot Password?
                </button>
            </div>

            {/* Signup Link */}
            <div className="text-center text-gray-600">
                Don't have an account? 
                <button 
                    type="button" 
                    onClick={() => router.push("/User-Sign-Up")} 
                    className="text-blue-600 font-semibold ml-1 hover:underline">
                    Sign up
                </button>
            </div>

            {/* Terms & Privacy Policy */}
            <p className="text-center text-gray-500 text-sm mt-3">
                By logging in, you agree to our  
                <span className="text-blue-600 cursor-pointer hover:underline"> Terms of Use</span> and 
                <span className="text-blue-600 cursor-pointer hover:underline"> Privacy Policy</span>.
            </p>
        </form>
    );
}

export default SignInForm;