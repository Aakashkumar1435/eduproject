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
import { useParams } from "next/navigation";

export const Navbar = () => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <nav className="bg-gray-900 text-white shadow-lg border-b border-green-700">
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
                className="flex items-center px-3 py-2 text-white hover:text-green-400 relative group transition-all duration-200"
              >
                <Home className="mr-2" size={18} />
                <span>Home</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
              <Link
                href="/chat"
                className="flex items-center px-3 py-2 text-white hover:text-green-400 relative group transition-all duration-200"
              >
                <Home className="mr-2" size={18} />
                <span>AI Summarizer</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
              <Link
                href={`/Mdcat/${subject}/VideoLectures`}
                className="flex items-center px-3 py-2 text-white hover:text-green-400 relative group transition-all duration-200"
              >
                <Video className="mr-2" size={18} />
                <span>Video Lectures</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
              <Link
                href={`/Mdcat/${subject}/Notes`}
                className="flex items-center px-3 py-2 text-white hover:text-green-400 relative group transition-all duration-200"
              >
                <BookOpen className="mr-2" size={18} />
                <span>Notes</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
              <Link
                href={`/Mdcat/${subject}/Tests`}
                className="flex items-center px-3 py-2 text-white hover:text-green-400 relative group transition-all duration-200"
              >
                <FileText className="mr-2" size={18} />
                <span>Tests</span>
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-green-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200"></span>
              </Link>
            </div>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {userId ? (
              <div className="flex items-center space-x-4">
                <Link
                  href={`/Profile`}
                  className="flex items-center px-3 py-2 text-white hover:text-green-400 transition-colors duration-200"
                >
                  <div className="w-8 h-8 flex items-center justify-center rounded-full border border-green-500">
                    <User className="text-white" size={18} />
                  </div>
                </Link>
              </div>
            ) : (
              <Link
                href="/User-Sign-In"
                className="px-4 py-2 rounded-md bg-transparent border border-green-500 text-white hover:bg-gray-800 hover:text-green-400 transition-all duration-200"
              >
                Log in
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-green-400 focus:outline-none"
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
              className="flex items-center px-3 py-2 text-white hover:text-green-400 hover:bg-gray-800 rounded-md transition-all duration-200 border-l-2 border-transparent hover:border-green-500"
            >
              <Home className="mr-2" size={18} />
              <span>Home</span>
            </Link>
            <Link
              href="/Mdcat/VideoLectures"
              className="flex items-center px-3 py-2 text-white hover:text-green-400 hover:bg-gray-800 rounded-md transition-all duration-200 border-l-2 border-transparent hover:border-green-500"
            >
              <Video className="mr-2" size={18} />
              <span>Video Lectures</span>
            </Link>
            <Link
              href="/Mdcat/Notes"
              className="flex items-center px-3 py-2 text-white hover:text-green-400 hover:bg-gray-800 rounded-md transition-all duration-200 border-l-2 border-transparent hover:border-green-500"
            >
              <BookOpen className="mr-2" size={18} />
              <span>Notes</span>
            </Link>
            <Link
              href="/tests"
              className="flex items-center px-3 py-2 text-white hover:text-green-400 hover:bg-gray-800 rounded-md transition-all duration-200 border-l-2 border-transparent hover:border-green-500"
            >
              <FileText className="mr-2" size={18} />
              <span>Tests</span>
            </Link>

            {/* Mobile auth buttons */}
            <div className="pt-2 border-t border-gray-700">
              {userId ? (
                <>
                  <Link
                    href={`/Profile`}
                    className="flex items-center px-3 py-2 text-white hover:text-green-400 hover:bg-gray-800 rounded-md transition-all duration-200 border-l-2 border-transparent hover:border-green-500"
                  >
                    <User className="mr-2" size={18} />
                    <span>Profile</span>
                  </Link>
                </>
              ) : (
                <Link
                  href="/User-Sign-In"
                  className="flex items-center px-3 py-2 text-white hover:text-green-400 hover:bg-gray-800 rounded-md transition-all duration-200 border-l-2 border-transparent hover:border-green-500"
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