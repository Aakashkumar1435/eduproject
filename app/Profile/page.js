"use client";
import React, { useState, useEffect } from "react";
import { 
  User, Award, Clock, CheckCircle, AlertCircle, 
  TrendingUp, TrendingDown, BarChart, Edit3, 
  Shield, Star, Book, Upload 
} from "lucide-react";
import { useRouter } from "next/navigation";
import Navbar from "../components/Profile/Navbar";
import ProfileHeader from "../components/Profile/ProfileHeader";
import StatCards from "../components/Profile/StatCards";
import ProgressSection from "../components/Profile/ProgressSection";
import SubjectPerformance from "../components/Profile/SubjectPerformance";
import AccountDetails from "../components/Profile/AccountDetails";
import SubscriptionCard from "../components/Profile/SubscriptionCard";
import ProfileEditModal from "../components/Profile/ProfileEditModal";

const ProfilePage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [testStats, setTestStats] = useState({
    totalTests: 0,
    attemptedTests: 0,
    unattemptedTests: 0,
    overallAverage: 0,
    subjectPerformance: [],
    strongSubjects: [],
    weakSubjects: []
  });

  console.log(userData);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) {
      router.push('/User-Sign-In');
      localStorage.setItem("redirectAfterLogin", `/Profile`);
      return;
    }
    
    const fetchUserData = async () => {
      try {
        // Fetch user data
        const response = await fetch(
          `http://localhost:5000/api/user/getUser?userId=${userId}`,
          {
            credentials: "include",
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
  }, [router, refresh]);

  const openEditModal = () => setIsEditModalOpen(true);
  const closeEditModal = () => setIsEditModalOpen(false);

  const handleProfileUpdate = async (image) => {

    console.log(image);
    const userId = localStorage.getItem("userId");
    const formData = new FormData();
    formData.append('image', image);
    try {
      const response = await fetch(
        `http://localhost:5000/api/user/updateUser?userId=${userId}`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const data = await response.json();
      setUserData({...userData, avatar: data.avatar});

      closeEditModal();
      setRefresh(true);
    } catch (err) {
      console.error("Error updating profile:", err);
    }
  };

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex items-center justify-center min-h-screen bg-gray-900">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 px-4">
          <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
          <h2 className="text-2xl font-bold text-gray-100 mb-2">
            Error Loading Profile
          </h2>
          <p className="text-gray-400">{error}</p>
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
      <div className="min-h-screen bg-gray-900 pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <ProfileHeader 
            userData={userData} 
            onEditClick={openEditModal} 
          />
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <StatCards 
              testStats={testStats} 
              totalTests={testStats.totalTests}
              completedTests={testStats.attemptedTests}
            />
          </div>
{/*           
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ProgressSection 
                userData={userData} 
                testStats={testStats}
              />
              <SubjectPerformance 
                testStats={testStats} 
                className="mt-6"
              />
            </div>
            <div className="lg:col-span-1">
              <AccountDetails userData={userData} />
              <SubscriptionCard 
                userData={userData} 
                className="mt-6"
              />
            </div>
          </div> */}
        </div>
      </div>
      
      {isEditModalOpen && (
        <ProfileEditModal 
          isOpen={isEditModalOpen}
          onClose={closeEditModal}
          onSubmit={handleProfileUpdate}
          currentAvatar={userData.avatar}
        />
      )}
    </>
  );
};

export default ProfilePage;