"use client";

import { useState } from "react";

export default function ChatBox() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [board, setBoard] = useState("Punjab");
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
        body: JSON.stringify({ message: input, board }),
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
    <div className="w-full max-w-xl bg-white text-black p-5 rounded-2xl shadow-lg flex flex-col gap-4">
      <h2 className="text-center text-2xl font-bold">📚 CrackIt AI Summarizer</h2>

      <div className="flex gap-2">
        <select
          className="p-2.5 text-base rounded-md border border-gray-300"
          value={board}
          onChange={(e) => setBoard(e.target.value)}
        >
          <option value="Punjab">Punjab Board</option>
          <option value="Sindh">Sindh Board</option>
          <option value="Federal">Federal Board</option>
          <option value="All">All Boards</option>
        </select>
        <input
          type="text"
          placeholder="Enter your topic or question"
          className="flex-1 p-2.5 text-base rounded-md border border-gray-300"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          className="bg-green-700 hover:bg-green-800 text-white border-none px-3.5 py-2.5 text-base rounded-md cursor-pointer transition-colors duration-200 ease-in-out"
          onClick={handleSend}
          disabled={loading}
        >
          {loading ? "..." : "Send"}
        </button>
      </div>

      <div className="h-64 overflow-y-auto bg-gray-100 p-2.5 rounded-lg flex flex-col gap-2">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-2 px-3 rounded-xl max-w-[80%] break-words ${
              msg.role === "user" 
                ? "self-end bg-green-100" 
                : "self-start bg-gray-200"
            }`}
          >
            {msg.content.split("\n").map((line, j) => {
              line = line.trim();

              if (line.startsWith("**")) {
                return (
                  <div
                    key={j}
                    className="font-bold mt-4"
                  >
                    {line.replace(/\*\*/g, "")}
                  </div>
                );
              } else if (line.startsWith("*")) {
                return (
                  <div
                    key={j}
                    className="ml-4 mb-2"
                  >
                    {line.replace("*", "•")}
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