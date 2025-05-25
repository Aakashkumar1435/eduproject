"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  BookOpen,
  User,
  Compass,
  Search,
  Star,
  BarChart,
  Bell,
  BookOpenText ,
  Calendar
} from "lucide-react";
import { useParams } from "next/navigation";

export const HomeNavbar = () => {
  const [userId, setUserId] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notifications, setNotifications] = useState(3); // Example notification count
  const params = useParams();
  const subject = params.subject;

  // Check for userId in localStorage on component mount
  useEffect(() => {
    const getUserData = () => {
      try {
        const userId = localStorage.getItem("userId");
        if (userId) {
          setUserId(userId);
        }
      } catch (error) {
        console.error("Error retrieving user data:", error);
      }
    };

    getUserData();
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gray-900 text-white shadow-lg sticky top-0 z-50 border-b border-green-600">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Text */}
          <div className="flex-shrink-0">
            <Link href="/Home" className="text-2xl font-bold">
              <span className="text-white">crack</span>
              <span className="text-green-400">It</span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:block">
            <div className="flex space-x-6">
              <Link
                href="/Home"
                className="flex items-center px-3 py-2 text-white hover:text-green-400 hover:border-b-2 hover:border-green-400 transition duration-300"
              >
                <Home className="mr-2" size={18} />
                <span>Home</span>
              </Link>
              <Link
                href="/chat"
                className="flex items-center px-3 py-2 text-white hover:text-green-400 hover:border-b-2 hover:border-green-400 transition duration-300"
              >
                <BookOpen className="mr-2" size={18} />
                <span>AI Summarizer</span>
              </Link>
              <Link
                href="/leaderboard"
                className="flex items-center px-3 py-2 text-white hover:text-green-400 hover:border-b-2 hover:border-green-400 transition duration-300"
              >
                <BookOpenText className="mr-2" size={18} />
                <span>Leaderboard</span>
              </Link>
            </div>
          </div>

          {/* Search and Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            
            
            {/* User Profile or Login */}
            {userId ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={`/Profile`}
                  className="flex items-center px-3 py-2 text-white hover:text-green-400 transition duration-300"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border border-green-400">
                    <User className="text-green-400" size={18} />
                  </div>
                </Link>
              </div>
            ) : (
              <Link
                href="/User-Sign-In"
                className="px-4 py-2 rounded-md bg-transparent border border-green-500 text-green-400 hover:bg-green-500 hover:text-gray-900 transition duration-300"
              >
                Log in
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-green-400 focus:outline-none transition duration-300"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? "block" : "hidden"} md:hidden pb-3`}>
          <div className="flex flex-col space-y-2 mt-2">
            <Link
              href="/Home"
              className="flex items-center px-3 py-2 text-white hover:text-green-400 hover:border-l-2 hover:border-green-400 transition duration-300"
              onClick={toggleMenu}
            >
              <Home className="mr-2" size={18} />
              <span>Home</span>
            </Link>
            <Link
              href="/chat"
              className="flex items-center px-3 py-2 text-white hover:text-green-400 hover:border-l-2 hover:border-green-400 transition duration-300"
              onClick={toggleMenu}
            >
              <BookOpen className="mr-2" size={18} />
              <span>AI Summarizer</span>
            </Link>
            <Link
              href="/leaderboard"
              className="flex items-center px-3 py-2 text-white hover:text-green-400 hover:border-l-2 hover:border-green-400 transition duration-300"
              onClick={toggleMenu}
            >
              <BookOpenText  className="mr-2" size={18} />
              <span>Leaderboard</span>
            </Link>

            {/* Mobile auth buttons */}
            <div className="pt-2 border-t border-gray-700">
              {userId ? (
                <Link
                  href={`/Profile`}
                  className="flex items-center px-3 py-2 text-white hover:text-green-400 hover:border-l-2 hover:border-green-400 transition duration-300"
                  onClick={toggleMenu}
                >
                  <User className="mr-2" size={18} />
                  <span>Profile</span>
                </Link>
              ) : (
                <Link
                  href="/User-Sign-In"
                  className="flex items-center px-3 py-2 text-white hover:text-green-400 hover:border-l-2 hover:border-green-400 transition duration-300"
                  onClick={toggleMenu}
                >
                  <User className="mr-2" size={18} />
                  <span>Log in</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};