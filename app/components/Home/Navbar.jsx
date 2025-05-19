"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userId, setUserId] = useState(null);

  // Check if user is authenticated on component mount and when cookies change
  useEffect(() => {
    const checkAuth = () => {
        setIsAuthenticated(false);
      const userId = localStorage.getItem("userId");
      if(userId){
        setIsAuthenticated(true);
      }
    };

    // Initial check
    checkAuth();

    // Event listener for cookie changes
    window.addEventListener('storage', checkAuth);
    
    // Also check periodically (as a fallback)
    const intervalId = setInterval(checkAuth, 2000);

    // Scroll event listener
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Rest of your navbar code...

  // This is the updated section for the profile link
  const renderAuthButtons = () => {
    if (isAuthenticated) {
      return (
        <Link
          href="/Profile"
          className="flex items-center text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-medium transition-colors"
        >
          <User className="w-4 h-4 mr-2" />
          Profile
        </Link>
      );
    } else {
      return (
        <Link
          href="/User-Sign-In"
          className="text-white bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md font-medium transition-colors"
        >
          Login
        </Link>
      );
    }
  };

  // Replace the existing auth button section in your navbar with:
  // {renderAuthButtons()}
  
  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white shadow-md py-2" : "bg-transparent py-4"
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
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              About
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Pricing
            </Link>
            <Link
              href="/Mdcat"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Dashboard
            </Link>
            <Link
              href="/feedback"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              feedback
            </Link>
            <Link
              href="/aggregateCalculator"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Aggregate Calculator
            </Link>
            <Link
              href="/contact"
              className="text-gray-700 hover:text-green-600 font-medium transition-colors"
            >
              Contact
            </Link>

            {/* Authentication Buttons */}
            {renderAuthButtons()}
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
            href="/"
            className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
          >
            Home
          </Link>
          <Link
            href="/about"
            className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
          >
            About
          </Link>
          <Link
            href="/courses"
            className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
          >
            Courses
          </Link>
          <Link
            href="/contact"
            className="block px-3 py-2 text-gray-700 hover:bg-green-50 hover:text-green-600 rounded-md"
          >
            Contact
          </Link>

          {/* Mobile Authentication Button - Updated */}
          {isAuthenticated ? (
            <Link
              href="/Profile"
              className="flex items-center px-3 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              <User className="w-4 h-4 mr-2" />
              Profile
            </Link>
          ) : (
            <Link
              href="/User-Sign-In"
              className="block px-3 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;