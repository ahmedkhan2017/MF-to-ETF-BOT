import React, { useState } from "react";
import { Send, Bot, User } from "lucide-react";

interface Message {
  type: "bot" | "user";
  content: string;
}

function App() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      type: "bot",
      content:
        "Hello! I can help you find ETF alternatives for your mutual funds. Please enter a mutual fund ticker symbol.",
    },
  ]);

  const fetchETFAlternatives = async (ticker: string) => {
    const apiUrl = `https://fc4c-34-125-43-73.ngrok-free.app/compare/${ticker}`;

    try {
      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "ngrok-skip-browser-warning": "true",
        },
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { type: "bot", content: `❌ Error: ${data.error}` },
        ]);
        return;
      }

      if (data.length === 0) {
        setMessages((prev) => [
          ...prev,
          { type: "bot", content: `No ETF alternatives found for ${ticker}.` },
        ]);
        return;
      }

      // Extract main ticker price
      const mainTickerPrice = data[0]?.Price ? `$${data[0].Price.toFixed(2)}` : "N/A";

      // Sorting ETF list alphabetically by name
      const sortedData = data.sort((a: any, b: any) => a.ETF.localeCompare(b.ETF));

      // Formatting ETF alternatives in a structured way
      let etfList = `**${ticker}: ${mainTickerPrice}**\n\nHere are some ETF alternatives:\n\n`;
      etfList += `| Name  | Price  | Sentiment |\n`;
      etfList += `|-------|--------|------------|\n`;

      sortedData.forEach((etf: any) => {
        etfList += `| ${etf.ETF} | 💲${etf.Price.toFixed(2)} | ${etf.Sentiment} |\n`;
      });

      setMessages((prev) => [...prev, { type: "bot", content: etfList }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { type: "bot", content: "⚠️ Failed to fetch data. Try again later." },
      ]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { type: "user", content: input }]);
    fetchETFAlternatives(input.trim().toUpperCase());
    setInput("");
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-4 py-4 shadow-sm">
        <div className="max-w-4xl mx-auto flex items-center gap-2">
          <Bot className="w-8 h-8 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">MF to ETF BOT</h1>
        </div>
      </header>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`flex gap-4 ${
                message.type === "user" ? "justify-end" : "justify-start"
              }`}
            >
              {message.type === "bot" && (
                <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center flex-shrink-0">
                  <Bot className="w-5 h-5 text-white" />
                </div>
              )}
              <div
                className={`rounded-lg px-4 py-3 max-w-[80%] whitespace-pre-line ${
                  message.type === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white shadow-sm border border-gray-200"
                }`}
              >
                {message.content}
              </div>
              {message.type === "user" && (
                <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center flex-shrink-0">
                  <User className="w-5 h-5 text-white" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Input Form */}
      <div className="border-t border-gray-200 bg-white px-4 py-4">
        <form onSubmit={handleSubmit} className="max-w-4xl mx-auto">
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter a mutual fund ticker..."
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-blue-600 text-white rounded-lg px-6 py-2 flex items-center gap-2 hover:bg-blue-700 transition-colors"
            >
              <span>Send</span>
              <Send className="w-4 h-4" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default App;
