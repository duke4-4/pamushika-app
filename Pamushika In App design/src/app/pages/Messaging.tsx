import { useState } from "react";
import { ArrowLeft, Send, Phone, Video, MoreVertical, MessageCircle } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";

interface MessagingProps {
  onBack: () => void;
  vendorName?: string;
  vendorId?: string;
}

export default function Messaging({ onBack, vendorName = "Green Market Fresh", vendorId }: MessagingProps) {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      id: "1",
      text: "Hello! Do you have fresh tomatoes available?",
      sender: "user",
      time: "10:30 AM",
    },
    {
      id: "2",
      text: "Yes! Just harvested this morning. How many kg do you need?",
      sender: "vendor",
      time: "10:32 AM",
    },
    {
      id: "3",
      text: "I need 5kg. Can you deliver today?",
      sender: "user",
      time: "10:33 AM",
    },
    {
      id: "4",
      text: "Sure! I can deliver within 2 hours. Total will be $12.50",
      sender: "vendor",
      time: "10:35 AM",
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage = {
      id: Date.now().toString(),
      text: message,
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages([...messages, newMessage]);
    setMessage("");
  };

  const handleWhatsApp = () => {
    // Open WhatsApp with vendor number
    window.open(`https://wa.me/263777123456?text=Hi, I'm interested in your fresh produce`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white z-10 px-4 py-4 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            <button onClick={onBack} className="p-2 -ml-2 active:scale-95 transition-transform">
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold">
              {vendorName.charAt(0)}
            </div>
            <div className="flex-1">
              <h2 className="font-bold text-gray-900">{vendorName}</h2>
              <p className="text-xs text-green-600">Online</p>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleWhatsApp}
              className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center active:scale-95 transition-transform"
            >
              <MessageCircle className="w-5 h-5 text-green-600" />
            </button>
            <button className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center active:scale-95 transition-transform">
              <Phone className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-2xl px-4 py-3 ${
                msg.sender === "user"
                  ? "bg-green-600 text-white rounded-br-sm"
                  : "bg-white text-gray-900 rounded-bl-sm shadow-sm"
              }`}
            >
              <p className="text-sm">{msg.text}</p>
              <p
                className={`text-xs mt-1 ${
                  msg.sender === "user" ? "text-green-100" : "text-gray-500"
                }`}
              >
                {msg.time}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="sticky bottom-0 bg-white border-t px-4 py-3">
        <div className="flex gap-2">
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="Type a message..."
            className="flex-1 h-12 rounded-full"
          />
          <button
            onClick={handleSend}
            className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center active:scale-95 transition-transform"
          >
            <Send className="w-5 h-5 text-white" />
          </button>
        </div>

        <p className="text-xs text-center text-gray-500 mt-2">
          Or continue via{" "}
          <button onClick={handleWhatsApp} className="text-green-600 font-medium">
            WhatsApp
          </button>
        </p>
      </div>
    </div>
  );
}
