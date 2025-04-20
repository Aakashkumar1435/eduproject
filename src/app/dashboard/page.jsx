"use client";
import { useState } from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import DashboardHeader from "@/components/dashboardheader/DashboardHeader";
import DashboardContent from "@/components/dashboardcontent/DashboardContent"; // 👈 Import it

export default function DashboardPage() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <DashboardHeader onMenuClick={() => setSidebarOpen(true)} />
      <Sidebar isOpen={isSidebarOpen} onClose={() => setSidebarOpen(false)} />
      <DashboardContent /> 
    </>
  );
}
