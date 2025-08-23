import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";

export default function ChatUI() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "👋 Xin chào! Mình có thể giúp gì cho bạn hôm nay?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { role: "user", content: input }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:8080/api/gemini/generate",
        {
          prompt: input,
        }
      );

      const botReply = res.data?.output || "Không có phản hồi từ server.";
      setMessages([...newMessages, { role: "assistant", content: botReply }]);
    } catch (error) {
      console.log(error);
      setMessages([
        ...newMessages,
        { role: "assistant", content: "❌ Lỗi khi gọi API." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white">
      {/* Header */}
      <div className="bg-gray-800 shadow p-4 text-lg font-bold flex items-center gap-2 border-b border-gray-700">
        💬 ChatBot Gemini API
      </div>

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-2 ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.role === "assistant" && (
              <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
                G
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-2 text-sm shadow-lg ${
                msg.role === "user"
                  ? "bg-blue-600 text-white rounded-2xl rounded-br-none"
                  : "bg-gray-700 text-white rounded-2xl rounded-bl-none"
              }`}
            >
              {msg.content}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                U
              </div>
            )}
          </div>
        ))}
        {loading && (
          <div className="flex items-center gap-2 text-gray-400 italic">
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white font-bold">
              G
            </div>
            Đang phản hồi...
          </div>
        )}
        <div ref={chatEndRef} />
      </div>

      {/* Input */}
      <div className="bg-gray-800 p-3 flex items-center gap-2 border-t border-gray-700">
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          className="flex-1 bg-gray-700 text-white border border-gray-600 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600 disabled:opacity-50"
        >
          <PaperAirplaneIcon className="w-5 h-5 rotate-90" />
        </button>
      </div>
    </div>
  );
}
