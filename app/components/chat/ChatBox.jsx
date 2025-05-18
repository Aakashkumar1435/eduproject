"use client";

import { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [board, setBoard] = useState("Punjab");
  const [book, setBook] = useState("Physics");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input, board, book }),
      });

      const data = await res.json();
      const botMessage = {
        role: "bot",
        content: data.response || "No answer received.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", content: "Error connecting to server." },
      ]);
      console.error("Frontend fetch error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="w-[95%] max-w-[900px] h-[72vh] mx-auto bg-white rounded-2xl shadow-lg flex flex-col gap-4 overflow-hidden">
      {/* Header */}
      <div
        className="px-6 py-4 flex items-center rounded-t-2xl text-lg font-bold text-white"
        style={{ backgroundColor: "#2e7d32" }}
      >
        <div className="bg-white text-[#2e7d32] rounded-md px-2 py-1 mr-3 font-bold">
          Cl
        </div>
        CrackIt Knowledge Explorer
      </div>

      {/* Input Row */}
      <div className="flex gap-2 px-5 flex-wrap">
        {/* Board Dropdown */}
        <select
          value={board}
          onChange={(e) => setBoard(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="Punjab">Punjab Board</option>
          <option value="Sindh">Sindh Board</option>
          <option value="Federal">Federal Board</option>
          <option value="All">All Boards</option>
        </select>

        {/* Book Dropdown */}
        <select
          value={book}
          onChange={(e) => setBook(e.target.value)}
          className="px-3 py-2 border border-gray-300 rounded-md text-sm"
        >
          <option value="Physics">Physics</option>
          <option value="Chemistry">Chemistry</option>
          <option value="Biology">Biology</option>
          <option value="All">All Subjects</option>
        </select>

        {/* Input */}
        <input
          type="text"
          placeholder="Enter your topic or question"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-4 py-2.5 border border-gray-300 rounded-md text-base"
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={loading}
          className="bg-[#2e7d32] text-white px-4 py-2 rounded-md text-sm hover:bg-[#246327]"
        >
          {loading ? "..." : "Send"}
        </button>
      </div>

      {/* Chat Box */}
      <div className="flex-1 overflow-y-auto px-5 py-3 bg-[#f4f4f4] rounded-lg mx-5 mb-5">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`px-4 py-2 rounded-2xl text-black max-w-fit mb-2 whitespace-pre-wrap break-words ${
              msg.role === "user"
                ? "ml-auto bg-[#d4f7d4]"
                : "mr-auto bg-[#eeeeee]"
            }`}
          >
            {msg.content.split("\n").map((line, j) => {
              line = line.trim();
              if (line.startsWith("**")) {
                return (
                  <div key={j} className="font-bold mt-3">
                    {line.replace(/\*\*/g, "")}
                  </div>
                );
              } else if (line.startsWith("*")) {
                return (
                  <div key={j} className="ml-4 mb-1">
                    • {line.replace("*", "")}
                  </div>
                );
              } else {
                return <div key={j}>{line}</div>;
              }
            })}
          </div>
        ))}
      </div>
    </div>
  );
}
