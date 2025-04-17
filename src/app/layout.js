"use client";

import { usePathname } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar/Navbar";
import { Footer } from "@/components/footer/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const pathname = usePathname();

  const hideNavbarRoutes = [
    "/UserAuth/User-Sign-in",
    "/UserAuth/User-Sign-Up",
    "/UserAuth/User-Reset-password",
  ];
  

  const shouldHideNavbar = hideNavbarRoutes.includes(pathname);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="min-h-screen flex flex-col">
          {!shouldHideNavbar && <Navbar />}
          <main className="flex-1 pt-20">
            {children}
          </main>
          {!shouldHideNavbar && <Footer />}
        </div>
      </body>
    </html>
  );
}
