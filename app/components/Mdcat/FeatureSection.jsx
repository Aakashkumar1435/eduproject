"use client";

import React from "react";
import { useRouter, useParams } from "next/navigation";
import { Video, FileText, Users } from "lucide-react";

export const FeaturesGrid = () => {
  const router = useRouter();
  const params = useParams();
  const subject = params.subject;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Video Lectures */}
      <div
        onClick={() => router.push(`/Mdcat/${subject}/VideoLectures`)}
        className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-200 cursor-pointer border-b-4 border-green-500 hover:shadow-green-900/50 hover:shadow-xl"
      >
        <div className="bg-gradient-to-br from-green-500 to-green-700 p-4 rounded-full shadow-md mb-4">
          <Video className="text-white w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">
            Video Lectures
          </h2>
          <p className="text-green-400">Seekhein har concept asaani say</p>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-900 text-green-400">
              24/7 Access
            </span>
          </div>
        </div>
      </div>

      {/* Tests */}
      <div
        onClick={() => router.push(`/Mdcat/${subject}/Tests`)}
        className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-200 cursor-pointer border-b-4 border-green-600 hover:shadow-green-900/50 hover:shadow-xl"
      >
        <div className="bg-gradient-to-br from-green-600 to-green-800 p-4 rounded-full shadow-md mb-4">
          <FileText className="text-white w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">Tests</h2>
          <p className="text-green-400">Jitnay marzi tests practice karein</p>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-900 text-green-400">
              Unlimited Practice
            </span>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div
        onClick={() => router.push(`/Mdcat/${subject}/Notes`)}
        className="bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-200 cursor-pointer border-b-4 border-green-500 hover:shadow-green-900/50 hover:shadow-xl"
      >
        <div className="bg-gradient-to-br from-green-400 to-green-600 p-4 rounded-full shadow-md mb-4">
          <Users className="text-white w-8 h-8" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-white mb-2">
            Notes
          </h2>
          <p className="text-green-400">Teachers say engage karein live</p>
          <div className="mt-4 pt-4 border-t border-gray-700">
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gray-900 text-green-400">
              Interactive Learning
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturesGrid;