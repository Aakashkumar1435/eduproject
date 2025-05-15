"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, User, BookOpen, Award, Bell } from "lucide-react";
import Swal from "sweetalert2";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState("");

  // Get user data from localStorage on component mount
  useEffect(() => {
    // Scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Handle logout
  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to logout?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout!',
    }).then((result) => {
      if (result.isConfirmed) {
        try {
          // Remove user data from localStorage
          localStorage.removeItem('userId');
  
          // Show success message and redirect
          Swal.fire({
            title: 'Logged Out!',
            text: 'You have been successfully logged out.',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
  
          // Delay the redirect slightly so user sees the success alert
          setTimeout(() => {
            window.location.href = '/User-Sign-In';
          }, 1500);
        } catch (error) {
          console.error('Logout error:', error);
          Swal.fire('Error', 'Something went wrong during logout.', 'error');
        }
      }
    });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-white shadow-md py-2"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                CrackIt
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/Home"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/Mdcat"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors flex items-center"
            >
              <BookOpen className="w-4 h-4 mr-1" />
              Practice Tests
            </Link>
            <Link
              href="/leaderboard"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors flex items-center"
            >
              <Award className="w-4 h-4 mr-1" />
              Leaderboard
            </Link>

            {/* User Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-700 hover:text-green-600 font-medium transition-colors">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center mr-2">
                  <User className="w-4 h-4 text-green-600" />
                </div>
                <ChevronDown className="ml-1 w-4 h-4" />
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                <Link
                  href='/Profile'
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  <User className="w-4 h-4 mr-2" />
                  My Profile
                </Link>
                <Link
                  href="/notifications"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-green-50 hover:text-green-600"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                </Link>
                <hr className="my-1 border-gray-100" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-700 hover:text-green-600 focus:outline-none"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMenuOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-white shadow-lg">
          <Link
            href="/Home"
            className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
          >
            Home
          </Link>
          <Link
            href="/Mdcat/Tests"
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
          >
            <BookOpen className="w-4 h-4 mr-2" />
            Practice Tests
          </Link>
          <Link
            href="/leaderboard"
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
          >
            <Award className="w-4 h-4 mr-2" />
            Leaderboard
          </Link>

          {/* Mobile User Menu */}
          <Link
            href='/Profile'
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
          >
            <User className="w-4 h-4 mr-2" />
            My Profile
          </Link>
          <Link
            href="/notifications"
            className="flex items-center px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </Link>
          <button
            onClick={handleLogout}
            className="w-full text-left flex items-center px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;