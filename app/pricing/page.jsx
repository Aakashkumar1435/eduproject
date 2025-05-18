import React from "react";
import PricingPage from "@/app/components/pricing/pricingPage/PricingPage";
import FAQ from "@/app/components/pricing/FAQ/FAQ";
import OtherCourses from "@/app/components/pricing/OtherCourses/OtherCourses";
import HowToJoin from "@/app/components/pricing/HowToJoin/HowToJoin";
import Navbar from "../components/Home/Navbar";
import Footer from '../components/footer/Footer';

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="bg-[#e6f4ea] min-h-screen w-full pt-16">
        <section className="max-w-7xl mx-auto px-4 py-10">
          <PricingPage />
        </section>

        <section className="max-w-7xl mx-auto px-4 py-10">
          <FAQ />
        </section>

        <section className="max-w-7xl mx-auto px-4 py-10">
          <OtherCourses />
        </section>

        <section className="max-w-7xl mx-auto px-4 py-10">
          <HowToJoin />
        </section>
      </main>
      <Footer />
    </>
  );
}
