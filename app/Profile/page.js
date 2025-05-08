"use client";
import React, { useState, useEffect } from "react";
import { User, Award, Clock, CheckCircle, AlertCircle } from "lucide-react";
import Navbar from "../components/Profile/Navbar";
import { useRouter } from "next/navigation";

// Main Profile Page Component
const ProfilePage = () => {
  const router = useRouter();

  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [testStats, setTestStats] = useState({
    totalTests: 0,
    attemptedTests: 0,
    unattemptedTests: 0,
  });

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
        router.push('/User-Sign-In');
        localStorage.setItem("redirectAfterLogin", `/Profile`);
    }
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const response = await fetch(
          `http://localhost:5000/api/user/getUser?userId=${userId}`,
          {
            credentials: "include", // Include cookies
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUserData(data.user);

        // Fetch test statistics
        const statsResponse = await fetch(
          `http://localhost:5000/api/user/tests?userId=${userId}`,
          {
            credentials: "include",
          }
        );

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          console.log("Test Statistics:", statsData);
          setTestStats(statsData);
          console.log(testStats);
        }

        setLoading(false);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-gray-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-50 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <UserProfileHeader userData={userData} />
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <TestStatCard
              title="Total Tests"
              count={testStats.totalTests}
              icon={<Clock className="w-8 h-8 text-blue-500" />}
              color="blue"
            />
            <TestStatCard
              title="Tests Attempted"
              count={testStats.attemptedTests}
              icon={<CheckCircle className="w-8 h-8 text-green-500" />}
              color="green"
            />
            <TestStatCard
              title="Tests Unattempted"
              count={testStats.unattemptedTests}
              icon={<AlertCircle className="w-8 h-8 text-amber-500" />}
              color="amber"
            />
          </div>
          <UserDetailsCard userData={userData} />
          <SubscriptionStatus userData={userData} />
        </div>
      </div>
    </>
  );
};

// User Profile Header Component
const UserProfileHeader = ({ userData }) => {
  const { name, email } = userData;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6">
      <div className="flex-shrink-0 w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
        <User className="w-12 h-12 text-green-600" />
      </div>
      <div className="flex-grow text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">{name}</h1>
        <p className="text-gray-600 mt-1">{email}</p>
        <div className="mt-4 flex flex-wrap gap-2 justify-center sm:justify-start">
          <button className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors">
            Edit Profile
          </button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors">
            Change Password
          </button>
        </div>
      </div>
    </div>
  );
};

// Test Statistics Card Component
const TestStatCard = ({ title, count, icon, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-200",
    green: "bg-green-50 border-green-200",
    amber: "bg-amber-50 border-amber-200",
  };

  return (
    <div
      className={`${colorClasses[color]} border rounded-lg p-6 flex flex-col items-center`}
    >
      {icon}
      <h3 className="text-xl font-semibold mt-4 text-gray-800">{title}</h3>
      <p className="text-3xl font-bold mt-2">{count}</p>
    </div>
  );
};

// User Details Card Component
const UserDetailsCard = ({ userData }) => {
  const { phone, createdAt } = userData;
  const joinDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Account Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
        <div>
          <p className="text-gray-500 text-sm">Phone Number</p>
          <p className="font-medium">{phone || "Not provided"}</p>
        </div>
        <div>
          <p className="text-gray-500 text-sm">Member Since</p>
          <p className="font-medium">{joinDate}</p>
        </div>
      </div>
    </div>
  );
};

// Subscription Status Component
const SubscriptionStatus = ({ userData }) => {
  const { isPremium, subscription } = userData;

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Subscription Status
          </h2>
          <p className="mt-1 text-gray-600">
            {isPremium
              ? "You currently have a premium subscription"
              : "You are on the free plan"}
          </p>
        </div>
        <div className="flex-shrink-0">
          {isPremium ? (
            <div className="flex items-center">
              <Award className="w-6 h-6 text-amber-500 mr-2" />
              <span className="font-semibold text-amber-500">Premium</span>
            </div>
          ) : (
            <button className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-md hover:from-amber-600 hover:to-amber-700 transition-colors">
              Upgrade to Premium
            </button>
          )}
        </div>
      </div>
      {isPremium && subscription && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <p className="text-sm text-gray-500">
            Your subscription will renew on{" "}
            {new Date(subscription.renewalDate).toLocaleDateString()}
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
