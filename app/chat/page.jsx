"use client";
import ChatBox from "@/app/components/chat/ChatBox";
import Navbar from "../components/Home/Navbar";
import Footer from '../components/footer/Footer';

export default function ChatPage() {
  return (
    <>
      <Navbar />
      <div className="min-h-screen w-full bg-[#f4faed] flex flex-col justify-between pt-20 px-4 overflow-x-hidden">
        <div className="flex justify-center items-start flex-grow">
          <ChatBox />
        </div>
        <Footer />
      </div>
    </>
  );
}
