"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, User, BookOpen, Award, Bell, LogOut } from "lucide-react";
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
      confirmButtonColor: '#10b981',
      cancelButtonColor: '#ef4444',
      confirmButtonText: 'Yes, logout!',
      background: '#1f2937',
      color: '#e5e7eb'
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
            background: '#1f2937',
            color: '#e5e7eb'
          });
  
          // Delay the redirect slightly so user sees the success alert
          setTimeout(() => {
            window.location.href = '/User-Sign-In';
          }, 1500);
        } catch (error) {
          console.error('Logout error:', error);
          Swal.fire({
            title: 'Error',
            text: 'Something went wrong during logout.',
            icon: 'error',
            background: '#1f2937',
            color: '#e5e7eb'
          });
        }
      }
    });
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-gray-900 border-b border-green-500/40 backdrop-blur-md py-2" 
          : "bg-gray-900/95 py-3"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center group">
              <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent relative">
                CrackIt
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-300 ease-out"></span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/Home">
              Home
            </NavLink>
            <NavLink href="/Mdcat">
              <BookOpen className="w-4 h-4 mr-1.5" />
              Practice Tests
            </NavLink>
            <NavLink href="/leaderboard">
              <Award className="w-4 h-4 mr-1.5" />
              Leaderboard
            </NavLink>

            {/* User Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center text-gray-300 hover:text-green-400 font-medium transition-colors group">
                <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-2 group-hover:bg-green-500/30 transition-all duration-300">
                  <User className="w-4 h-4 text-green-400" />
                </div>
                <span className="group-hover:text-green-400 transition-colors duration-300">Profile</span>
                <ChevronDown className="ml-1.5 w-4 h-4 group-hover:text-green-400 transition-transform duration-300 group-hover:rotate-180" />
              </button>
              <div className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-lg shadow-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 transform translate-y-2 group-hover:translate-y-0 border border-green-500/20">
                <Link
                  href='/Profile'
                  className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-green-400 transition-colors"
                >
                  <User className="w-4 h-4 mr-3" />
                  My Profile
                </Link>
                <Link
                  href="/notifications"
                  className="flex items-center px-4 py-2.5 text-sm text-gray-300 hover:bg-gray-700/50 hover:text-green-400 transition-colors"
                >
                  <Bell className="w-4 h-4 mr-3" />
                  Notifications
                </Link>
                <hr className="my-1 border-gray-700" />
                <button
                  onClick={handleLogout}
                  className="w-full text-left flex items-center px-4 py-2.5 text-sm text-red-400 hover:bg-gray-700/50 hover:text-red-300 transition-colors"
                >
                  <LogOut className="w-4 h-4 mr-3" />
                  Logout
                </button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-green-400 focus:outline-none transition-colors"
              aria-label="Toggle menu"
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
      <div 
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? "max-h-96 opacity-100 visible" 
            : "max-h-0 opacity-0 invisible overflow-hidden"
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1.5 bg-gray-800 border-t border-green-500/20 shadow-lg">
          <MobileNavLink href="/Home">
            Home
          </MobileNavLink>
          <MobileNavLink href="/Mdcat/Tests">
            <BookOpen className="w-4 h-4 mr-3" />
            Practice Tests
          </MobileNavLink>
          <MobileNavLink href="/leaderboard">
            <Award className="w-4 h-4 mr-3" />
            Leaderboard
          </MobileNavLink>

          {/* Mobile User Menu */}
          <div className="pt-2 mt-3 border-t border-gray-700">
            <MobileNavLink href='/Profile'>
              <User className="w-4 h-4 mr-3" />
              My Profile
            </MobileNavLink>
            <MobileNavLink href="/notifications">
              <Bell className="w-4 h-4 mr-3" />
              Notifications
            </MobileNavLink>
            <button
              onClick={handleLogout}
              className="w-full text-left flex items-center px-3 py-2.5 text-red-400 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <LogOut className="w-4 h-4 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// Desktop Navigation Link with animated underline effect
const NavLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="relative text-gray-300 hover:text-green-400 font-medium transition-colors duration-300 flex items-center group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-400 to-emerald-500 group-hover:w-full transition-all duration-300 ease-out"></span>
    </Link>
  );
};

// Mobile Navigation Link
const MobileNavLink = ({ href, children }) => {
  return (
    <Link
      href={href}
      className="flex items-center px-3 py-2.5 text-gray-300 hover:text-green-400 hover:bg-gray-700 rounded-lg transition-all duration-200"
    >
      {children}
    </Link>
  );
};

export default Navbar;