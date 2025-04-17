"use client";
import React, { useState } from "react";
import { Mail } from "lucide-react";

function ResetPasswordForm() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const handleChange = (e) => {
        setEmail(e.target.value);
    };


    return (
        <div className="flex flex-col items-center justify-center w-full max-w-md mx-auto p-6">
            {/* Heading */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Reset Password</h2>

            {/* Email Input */}
            <form className="w-full flex flex-col gap-4">
                <label className="flex items-center gap-3 px-4 py-3 rounded-lg border border-blue-600 bg-blue-50 text-blue-800 focus-within:ring-2 focus-within:ring-blue-500 transition-all w-full">
                    <Mail className="h-6 w-6 text-blue-600" />
                    <input
                        type="email"
                        name="email"
                        value={email}
                        onChange={handleChange}
                        className="grow outline-none bg-transparent placeholder-blue-600 text-blue-800 text-lg"
                        placeholder="Enter your email"
                        required
                    />
                </label>

                {/* Error Message */}
                {error && <p className="text-red-500 text-sm">{error}</p>}

                {/* Success Message */}
                {success && <p className="text-green-500 text-sm">{success}</p>}

                {/* Send OTP Button */}
                <button
                    type="submit"
                    disabled={loading}
                    className="bg-green-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-green-700 transition">
                    {loading ? "Sending OTP..." : "Send OTP"}
                </button>
            </form>
        </div>
    );
}

export default ResetPasswordForm;