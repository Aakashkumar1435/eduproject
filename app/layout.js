'use client';

import { SessionProvider } from "next-auth/react";
import { UserProvider } from "./context/UserContext";
import "./globals.css";

const metadata = {
  title: "MDCAT Prep",
  description: "Prepare for MDCAT efficiently",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>
          <UserProvider>
            {children}
          </UserProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
