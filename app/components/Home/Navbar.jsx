"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, User } from "lucide-react";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Check if user is authenticated on component mount and when cookies change
  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(false);
      const userId = localStorage.getItem("userId");
      if (userId) {
        setIsAuthenticated(true);
      }
    };

    // Initial check
    checkAuth();

    // Event listener for cookie changes
    window.addEventListener('storage', checkAuth);
    
    // Also check periodically (as a fallback)
    const intervalId = setInterval(checkAuth, 2000);


    // Cleanup
    return () => {
      clearInterval(intervalId);
      window.removeEventListener('storage', checkAuth);
    };
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Navigation links array to keep things DRY
  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/pricing", label: "Pricing" },
    { href: "/Mdcat", label: "Dashboard" },
    { href: "/feedback", label: "Feedback" },
  ];

  // Render auth buttons
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

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-gray-900 shadow-lg py-2" : "bg-gray-900 py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-green-600 bg-clip-text text-transparent">
                CrackIt
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-white hover:text-green-400 font-medium transition-colors relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-green-400 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}

            {/* Authentication Buttons */}
            {renderAuthButtons()}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-white hover:text-green-400 focus:outline-none"
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
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-800 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="block px-3 py-2 text-white hover:bg-gray-700 hover:text-green-400 rounded-md relative group"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="flex items-center justify-between">
                <span>{link.label}</span>
                <span className="h-0.5 bg-green-400 w-0 transition-all duration-300 group-hover:w-1/2 absolute bottom-1"></span>
              </div>
            </Link>
          ))}

          {/* Mobile Authentication Button */}
          <div className="mt-4 px-3">
            {isAuthenticated ? (
              <Link
                href="/Profile"
                className="flex items-center justify-center w-full px-3 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                <User className="w-4 h-4 mr-2" />
                Profile
              </Link>
            ) : (
              <Link
                href="/User-Sign-In"
                className="block text-center w-full px-3 py-2 text-white bg-green-600 hover:bg-green-700 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
