"use client";
import React from "react";
import AggregateCalculator from "@/app/components/aggregateCalculator/aggregateCalculator";
import Navbar from "../components/Home/Navbar";
import Footer from '../components/footer/Footer';


export default function AggregatePage() {
  return (
    <>
    <Navbar />
    <main className="bg-[#e6f4ea] min-h-screen w-full pt-16">
      <AggregateCalculator />
    </main>
    <Footer />
    </>
  );
}
