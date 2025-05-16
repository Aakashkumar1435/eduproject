import React from 'react';
import { Shield, Clock } from 'lucide-react';

const AccountDetails = ({ userData }) => {
  const { phone, createdAt } = userData;
  const joinDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex items-center mb-4">
        <Shield className="w-5 h-5 text-green-500 mr-2" />
        <h2 className="text-xl font-bold text-white">Account Details</h2>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
            <Shield className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Phone Number</p>
            <p className="text-white font-medium">{phone || "Not provided"}</p>
          </div>
        </div>
        
        <div className="flex items-start">
          <div className="flex-shrink-0 w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center mr-3">
            <Clock className="w-5 h-5 text-green-500" />
          </div>
          <div>
            <p className="text-gray-400 text-sm">Member Since</p>
            <p className="text-white font-medium">{joinDate}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;