"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Home,
  Monitor,
  Video,
  FileText,
  BookOpen,
  User,
  LogOut,
} from "lucide-react";

export const Navbar = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);

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
    <nav className="bg-emerald-700 text-white shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo Text */}
          <div className="flex-shrink-0">
            <Link href="/Home" className="text-2xl font-bold">
              <span className="text-white">crack</span>
              <span className="text-emerald-300">It</span>
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <div className="hidden md:block">
            <div className="flex space-x-6">
              <Link
                href="/Home"
                className="flex items-center px-3 py-2 text-white hover:bg-emerald-600 rounded-md transition"
              >
                <Home className="mr-2" size={18} />
                <span>Home</span>
              </Link>
              <Link
                href="/Mdcat/VideoLectures"
                className="flex items-center px-3 py-2 text-white hover:bg-emerald-600 rounded-md transition"
              >
                <Video className="mr-2" size={18} />
                <span>Video Lectures</span>
              </Link>
              <Link
                href="/Mdcat/Notes"
                className="flex items-center px-3 py-2 text-white hover:bg-emerald-600 rounded-md transition"
              >
                <BookOpen className="mr-2" size={18} />
                <span>Notes</span>
              </Link>
              <Link
                href="/Mdcat/Tests"
                className="flex items-center px-3 py-2 text-white hover:bg-emerald-600 rounded-md transition"
              >
                <FileText className="mr-2" size={18} />
                <span>Tests</span>
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {userId ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={`/Profile`}
                  className="flex items-center px-3 py-2 text-white hover:bg-emerald-600 rounded-md transition"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border border-white">
                    <User className="text-white" size={18} />
                  </div>
                </Link>
              </div>
            ) : (
              <Link
                href="/User-Sign-In"
                className="px-4 py-2 rounded-md bg-transparent border border-white text-white hover:bg-emerald-600 transition"
              >
                Log in
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-emerald-300 focus:outline-none"
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
              className="flex items-center px-3 py-2 text-white hover:bg-emerald-600 rounded-md transition"
            >
              <Home className="mr-2" size={18} />
              <span>Home</span>
            </Link>
            <Link
              href="/Mdcat/VideoLectures"
              className="flex items-center px-3 py-2 text-white hover:bg-emerald-600 rounded-md transition"
            >
              <Video className="mr-2" size={18} />
              <span>Video Lectures</span>
            </Link>
            <Link
              href="/Mdcat/Notes"
              className="flex items-center px-3 py-2 text-white hover:bg-emerald-600 rounded-md transition"
            >
              <BookOpen className="mr-2" size={18} />
              <span>Notes</span>
            </Link>
            <Link
              href="/tests"
              className="flex items-center px-3 py-2 text-white hover:bg-emerald-600 rounded-md transition"
            >
              <FileText className="mr-2" size={18} />
              <span>Tests</span>
            </Link>

            {/* Mobile auth buttons */}
            <div className="pt-2 border-t border-emerald-600">
              {userId ? (
                <>
                  <Link
                    href={`/Profile`}
                    className="flex items-center px-3 py-2 text-white hover:bg-emerald-600 rounded-md transition"
                  >
                    <User className="mr-2" size={18} />
                    <span>Profile</span>
                  </Link>
                </>
              ) : (
                <Link
                  href="/User-Sign-In"
                  className="flex items-center px-3 py-2 text-white hover:bg-emerald-600 rounded-md transition"
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
