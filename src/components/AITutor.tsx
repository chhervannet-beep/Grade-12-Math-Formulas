/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw } from "lucide-react";
import { ChatMessage } from "../types";
import MathRenderer from "./MathRenderer";

interface AITutorProps {
  currentTopicTitle: string;
  currentTopicId: string;
}

const PRESET_PROMPTS = [
  { text: "តើចំនួនកុំផ្លិចឆ្លាស់គឺជាអ្វី?", label: "កុំផ្លិចឆ្លាស់" },
  { text: "សុំពន្យល់ពីរូបមន្តលីមីត lim (sin x)/x = 1", label: "លីមីតត្រីកោណមាត្រ" },
  { text: "តើធ្វើដូចម្តេចដើម្បីរកម៉ូឌុល និងអាគុយម៉ង់?", label: "ម៉ូឌុល & អាគុយម៉ង់" },
  { text: "តើវិធាន L'Hôpital ប្រើប្រាស់នៅពេលណា?", label: "វិធាន L'Hôpital" }
];

export default function AITutor({ currentTopicTitle, currentTopicId }: AITutorProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "model",
      content: "ជំរាបសួរ! ខ្ញុំជាគ្រូជំនួយការគណិតវិទ្យា AI របស់អ្នក។ ខ្ញុំអាចជួយពន្យល់ពីរូបមន្ត ដំណោះស្រាយលំហាត់ និងទ្រឹស្តីបទផ្សេងៗអំពី **ចំនួនកុំផ្លិច (Complex Numbers)** និង **លីមីត (Limits)** ថ្នាក់ទី១២ តាមសៀវភៅក្រសួង។ តើអ្នកមានចម្ងល់ត្រង់ណាដែរ?",
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom of chat
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isLoading) return;

    setErrorMsg(null);
    const userMsg: ChatMessage = {
      id: Math.random().toString(),
      role: "user",
      content: text,
      timestamp: new Date()
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Keep only last 8 messages for history to avoid heavy payloads
      const chatHistory = messages.slice(-8).map((m) => ({
        role: m.role,
        content: m.content
      }));

      const response = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: text,
          topic: currentTopicTitle,
          history: chatHistory
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to fetch response");
      }

      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        role: "model",
        content: data.text || "ខ្ញុំសុំទោស ខ្ញុំមិនអាចស្វែងរកចម្លើយបានទេ។ (Sorry, I couldn't find an answer.)",
        timestamp: new Date()
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error: any) {
      console.error("AI chat error:", error);
      setErrorMsg(error.message || "មានបញ្ហាតភ្ជាប់ទៅកាន់ម៉ាស៊ីនបម្រើ AI។ (Connection issue to the AI server.)");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "welcome",
        role: "model",
        content: `ជំរាបសួរម្តងទៀត! ខ្ញុំបានកំណត់ការជជែកឡើងវិញហើយ។ ឥឡូវយើងកំពុងសិក្សាអំពីប្រធានបទ៖ **${currentTopicTitle}**។ តើមានរូបមន្ត ឬលំហាត់ណាដែលអ្នកចង់សួរខ្ញុំទេ?`,
        timestamp: new Date()
      }
    ]);
    setErrorMsg(null);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl h-[460px] flex flex-col" id="ai-tutor-container">
      {/* Header bar */}
      <div className="bg-black/20 px-4 py-3 border-b border-white/10 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="bg-[#ff4e00]/10 p-1.5 rounded-lg border border-[#ff4e00]/20">
            <Sparkles className="w-4 h-4 text-[#ff4e00] animate-pulse" />
          </div>
          <div>
            <h4 className="text-xs font-sans font-bold text-white tracking-wide">
              គ្រូជំនួយគណិតវិទ្យា AI (Khmer Math AI Tutor)
            </h4>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff4e00] animate-ping"></span>
              <span className="text-[9px] text-slate-400 font-mono">Gemini 2.5 Flash | Active</span>
            </div>
          </div>
        </div>

        <button
          onClick={handleClearHistory}
          className="text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-white/10"
          title="Clear Chat History"
        >
          <RefreshCw className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Message history */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
            <div key={m.id} className={`flex gap-2.5 ${isUser ? "justify-end" : "justify-start"}`}>
              {/* Bot Avatar */}
              {!isUser && (
                <div className="w-7 h-7 rounded-lg bg-[#ff4e00]/10 border border-[#ff4e00]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-[#ff4e00]" />
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`max-w-[82%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed font-sans ${
                  isUser
                    ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white rounded-tr-none shadow-md whitespace-pre-wrap"
                    : "bg-black/40 text-slate-200 border border-white/10 rounded-tl-none"
                }`}
              >
                {isUser ? m.content : <MathRenderer content={m.content} />}
              </div>

              {/* User Avatar */}
              {isUser && (
                <div className="w-7 h-7 rounded-lg bg-pink-900/30 border border-pink-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <User className="w-4 h-4 text-pink-300" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-2.5 justify-start">
            <div className="w-7 h-7 rounded-lg bg-[#ff4e00]/10 border border-[#ff4e00]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
              <Bot className="w-4 h-4 text-[#ff4e00]" />
            </div>
            <div className="bg-black/40 border border-white/10 rounded-xl rounded-tl-none px-3.5 py-2.5 text-xs text-slate-400 flex items-center gap-2">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4e00] animate-bounce" style={{ animationDelay: "0ms" }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4e00] animate-bounce" style={{ animationDelay: "150ms" }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#ff4e00] animate-bounce" style={{ animationDelay: "300ms" }}></span>
              </div>
              <span className="font-sans italic">កំពុងគិត... (Tutor is thinking)</span>
            </div>
          </div>
        )}

        {/* Error Message */}
        {errorMsg && (
          <div className="bg-rose-950/40 border border-rose-900/60 text-rose-200 rounded-xl p-3 text-xs font-sans flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="font-semibold">កំហុសក្នុងការតភ្ជាប់ (Connection Error)</p>
              <p className="text-[10px] text-rose-300 leading-snug">{errorMsg}</p>
              <p className="text-[9px] text-slate-400 leading-snug pt-1">
                សូមប្រាកដថាអ្នកបានបន្ថែម <strong>GEMINI_API_KEY</strong> នៅក្នុងផ្ទាំង <strong>Settings &gt; Secrets</strong> នៃកម្មវិធី AI Studio។
              </p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Preset suggestions (only show if no loading and just welcome message) */}
      {messages.length === 1 && !isLoading && (
        <div className="px-4 pb-2 pt-1 flex flex-wrap gap-1.5 bg-transparent border-t border-white/5 py-1.5">
          {PRESET_PROMPTS.map((p, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(p.text)}
              className="text-[10px] font-sans bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg transition"
            >
              {p.label}
            </button>
          ))}
        </div>
      )}

      {/* Input container */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage(inputValue);
        }}
        className="p-3 bg-black/40 border-t border-white/10 flex gap-2"
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="សួរសំណួរគណិតវិទ្យាទីនេះ... (Ask a math question...)"
          className="flex-1 bg-black/50 border border-white/10 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-[#ff4e00]/50 transition"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          className="bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] hover:scale-[1.02] active:scale-[0.98] disabled:bg-white/5 disabled:scale-100 disabled:text-slate-600 text-white p-2.5 rounded-xl transition flex items-center justify-center flex-shrink-0 shadow-md shadow-[#ff4e00]/10"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </form>
    </div>
  );
}
