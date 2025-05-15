"use client";
import React, { useState, useEffect } from "react";
import { User, Award, Clock, CheckCircle, AlertCircle, TrendingUp, TrendingDown, BarChart, Book } from "lucide-react";
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
    overallAverage: 0,
    subjectPerformance: [],
    strongSubjects: [],
    weakSubjects: []
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
          <PerformanceOverview testStats={testStats} />
          <SubjectPerformance testStats={testStats} />
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
    purple: "bg-purple-50 border-purple-200",
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

// Performance Overview Component
const PerformanceOverview = ({ testStats }) => {
  const completionPercentage = testStats.totalTests > 0
    ? Math.round((testStats.attemptedTests / testStats.totalTests) * 100)
    : 0;
  
  const getScoreColor = (score) => {
    if (score >= 80) return "text-green-600";
    if (score >= 60) return "text-blue-600";
    if (score >= 40) return "text-amber-600";
    return "text-red-600";
  };

  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <BarChart className="w-6 h-6 text-purple-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">Performance Overview</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Overall Score */}
        <div>
          <h3 className="text-gray-600 font-medium mb-2">Overall Average Score</h3>
          <div className="flex items-center">
            <div className="text-4xl font-bold mr-2 flex items-center">
              <span className={getScoreColor(testStats.overallAverage)}>
                {testStats.overallAverage || 0}%
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Based on your {testStats.attemptedTests} attempted tests
          </p>
        </div>
        
        {/* Test Completion */}
        <div>
          <h3 className="text-gray-600 font-medium mb-2">Test Completion</h3>
          <div className="relative pt-1">
            <div className="flex mb-2 items-center justify-between">
              <div>
                <span className="text-xs font-semibold inline-block py-1 px-2 uppercase rounded-full text-blue-600 bg-blue-200">
                  {completionPercentage}% Complete
                </span>
              </div>
            </div>
            <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
              <div
                style={{ width: `${completionPercentage}%` }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
              ></div>
            </div>
            <p className="text-sm text-gray-500">
              You've completed {testStats.attemptedTests} out of {testStats.totalTests} tests
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Subject Performance Component
const SubjectPerformance = ({ testStats }) => {
  return (
    <div className="mt-8 bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-6">
        <Book className="w-6 h-6 text-indigo-600 mr-2" />
        <h2 className="text-xl font-bold text-gray-800">Subject Performance Analysis</h2>
      </div>
      
      {/* Strengths and Weaknesses */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Strong Subjects */}
        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            <h3 className="font-semibold text-green-800">Your Strengths</h3>
          </div>
          {testStats.strongSubjects && testStats.strongSubjects.length > 0 ? (
            <ul className="space-y-1">
              {testStats.strongSubjects.map((subject, index) => (
                <li key={index} className="text-green-700">• {subject}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm italic">
              Not enough data to determine your strongest subjects yet. Complete more tests to see your strengths.
            </p>
          )}
        </div>
        
        {/* Weak Subjects */}
        <div className="bg-red-50 rounded-lg p-4">
          <div className="flex items-center mb-3">
            <TrendingDown className="w-5 h-5 text-red-600 mr-2" />
            <h3 className="font-semibold text-red-800">Areas to Improve</h3>
          </div>
          {testStats.weakSubjects && testStats.weakSubjects.length > 0 ? (
            <ul className="space-y-1">
              {testStats.weakSubjects.map((subject, index) => (
                <li key={index} className="text-red-700">• {subject}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-600 text-sm italic">
              Not enough data to determine your weaker subjects yet. Complete more tests for a full analysis.
            </p>
          )}
        </div>
      </div>
      
      {/* Detailed Subject Performance */}
      <h3 className="font-semibold text-gray-800 mb-3">Detailed Subject Performance</h3>
      {testStats.subjectPerformance && testStats.subjectPerformance.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Average Score</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tests Attempted</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {testStats.subjectPerformance.map((subject, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{subject.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {subject.attemptedTests > 0 ? (
                      <span className={`font-medium ${Number(subject.averageScore) >= 70 ? 'text-green-600' : Number(subject.averageScore) >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                        {subject.averageScore}%
                      </span>
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    {subject.attemptedTests} of {subject.totalTests}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-blue-600 h-2.5 rounded-full" 
                        style={{ width: `${subject.completion}%` }}>
                      </div>
                    </div>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {subject.completion}% completed
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-500">
          <p>No subject data available. Complete some tests to see your performance.</p>
        </div>
      )}
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