import React from 'react';
import { Award, Star } from 'lucide-react';

const SubscriptionCard = ({ userData, className = "" }) => {
  const { isPremium, subscription } = userData;

  return (
    <div className={`bg-gray-800 rounded-lg shadow-lg p-6 ${className}`}>
      <div className="flex items-center mb-4">
        <Award className="w-5 h-5 text-green-500 mr-2" />
        <h2 className="text-xl font-bold text-white">Subscription</h2>
      </div>
      
      {isPremium ? (
        <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Star className="w-6 h-6 text-yellow-500 mr-2" />
              <span className="text-lg font-bold text-white">Premium</span>
            </div>
            <Award className="w-8 h-8 text-yellow-500" />
          </div>
          
          {subscription && (
            <div className="mt-4 pt-4 border-t border-green-700">
              <p className="text-gray-300 text-sm">
                Renewal Date
              </p>
              <p className="text-white font-medium">
                {new Date(subscription.renewalDate).toLocaleDateString()}
              </p>
            </div>
          )}
        </div>
      ) : (
        <div>
          <div className="bg-gray-700 rounded-lg p-4 mb-4">
            <p className="text-gray-300">
              You are currently on the free plan. Upgrade to premium for more features!
            </p>
          </div>
          <button className="w-full py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-md hover:from-green-700 hover:to-green-600 transition-colors flex items-center justify-center">
            <Star className="w-5 h-5 mr-2" />
            Upgrade to Premium
          </button>
        </div>
      )}
    </div>
  );
};

export default SubscriptionCard;