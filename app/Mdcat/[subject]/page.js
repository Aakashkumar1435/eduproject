"use client"

import React, { useState } from 'react';
import { Navbar } from '../../components/Mdcat/Navbar';
import { HeroSection } from '../../components/Mdcat/HeroSection';
import { FeaturesGrid } from '../../components/Mdcat/FeatureSection';
import FooterSection from '../../components/Mdcat/FooterSection';

function MdcatPage() {

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      {/* Hero Banner */}
      <HeroSection />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto p-4 sm:p-6 -mt-6">
        {/* Feature Cards */}
        <FeaturesGrid />
      </div>

      {/* Footer */}
      <FooterSection />
    </div>
  );
}

export default MdcatPage;