"use client";
import React, { useState } from "react";
import { Mail, User, Lock, Phone, Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import { useRouter } from "next/navigation";

function SignUpForm() {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [formData, setFormData] = useState({ email: "", username: "", phone: "", password: "", confirmPassword: "" });
    const [errors, setErrors] = useState({ email: "", username: "", phone: "", password: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);
    const [serverError, setServerError] = useState("");
    const router = useRouter();

    // Toggle Password Visibility
    const togglePasswordVisibility = () => setPasswordVisible(!passwordVisible);
    const toggleConfirmPasswordVisibility = () => setConfirmPasswordVisible(!confirmPasswordVisible);

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
        } else if (name === "username") {
            if (!value) errorMessage = "Username is required";
            else if (value.length < 3) errorMessage = "Username must be at least 3 characters";
        } else if (name === "phone") {
            if (!value) errorMessage = "Phone number is required";
            else if (!/^\d{10,15}$/.test(value)) errorMessage = "Invalid phone number format";
        } else if (name === "password") {
            if (!value) errorMessage = "Password is required";
            else if (value.length < 6) errorMessage = "Password must be at least 6 characters";
        } else if (name === "confirmPassword") {
            if (!value) errorMessage = "Please confirm your password";
            else if (value !== formData.password) errorMessage = "Passwords do not match";
        }
        setErrors((prevErrors) => ({ ...prevErrors, [name]: errorMessage }));
    };

    // Handle Form Submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        Object.keys(formData).forEach((key) => validateInput(key, formData[key]));

        if (Object.values(errors).some((error) => error)) return;

        setLoading(true);
        setServerError("");

        try {
            const response = await fetch("http://localhost:5000/api/auth/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || "Signup failed");

            // Redirect to Home page after successful signup
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

            {/* Username Input */}
            <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-blue-600 bg-blue-50 text-blue-800 focus-within:ring-2 focus-within:ring-blue-500 transition-all w-full">
                <User className="h-6 w-6 text-blue-600" />
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    className="grow outline-none bg-transparent placeholder-blue-600 text-blue-800 text-lg"
                    placeholder="Username"
                />
            </label>
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}

            {/* Phone Input */}
            <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-yellow-600 bg-yellow-50 text-yellow-800 focus-within:ring-2 focus-within:ring-yellow-500 transition-all w-full">
                <Phone className="h-6 w-6 text-yellow-600" />
                <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="grow outline-none bg-transparent placeholder-yellow-600 text-yellow-800 text-lg"
                    placeholder="Phone Number"
                />
            </label>
            {errors.phone && <p className="text-red-500 text-sm">{errors.phone}</p>}

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

            {/* Confirm Password Input */}
            <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-purple-600 bg-purple-50 text-purple-800 focus-within:ring-2 focus-within:ring-purple-500 transition-all w-full relative">
                <Lock className="h-6 w-6 text-purple-600" />
                <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="grow outline-none bg-transparent placeholder-purple-600 text-purple-800 text-lg"
                    placeholder="Confirm Password"
                />
                <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-4">
                    {confirmPasswordVisible ? <EyeOff className="h-6 w-6 text-purple-600" /> : <Eye className="h-6 w-6 text-purple-600" />}
                </button>
            </label>
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}

            {/* Display Server Errors */}
            {serverError && <p className="text-red-600 text-center">{serverError}</p>}

            {/* Sign Up Button */}
            <button type="submit" className="bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
                {loading ? "Signing Up..." : "Sign Up"}
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
                <FcGoogle className="h-6 w-6" />
                Continue with Google
            </button>

            {/* Signup Link */}
            <div className="text-center text-gray-600">
                Already have an account?
                <button
                    type="button"
                    onClick={() => router.push("/User-Sign-In")}
                    className="text-blue-600 font-semibold ml-1 hover:underline">
                    Sign In
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

export default SignUpForm;
