/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Sparkles, AlertCircle, RefreshCw, History, X, MessageSquare, Trash2 } from "lucide-react";
import { ChatMessage } from "../types";
import MathRenderer from "./MathRenderer";

interface AITutorProps {
  currentTopicTitle: string;
  currentTopicId: string;
}

interface ChatSession {
  id: string;
  topicTitle: string;
  date: string;
  messages: ChatMessage[];
}

const PRESET_PROMPTS = [
  { text: "តើចំនួនកុំផ្លិចឆ្លាស់គឺជាអ្វី?", label: "កុំផ្លិចឆ្លាស់" },
  { text: "សុំពន្យល់ពីរូបមន្តលីមីត lim (sin x)/x = 1", label: "លីមីតត្រីកោណមាត្រ" },
  { text: "តើធ្វើដូចម្តេចដើម្បីរកម៉ូឌុល និងអាគុយម៉ង់?", label: "ម៉ូឌុល & អាគុយម៉ង់" },
  { text: "តើវិធាន L'Hôpital ប្រើប្រាស់នៅពេលណា?", label: "វិធាន L'Hôpital" }
];

export default function AITutor({ currentTopicTitle, currentTopicId }: AITutorProps) {
  const [chatSessions, setChatSessions] = useState<ChatSession[]>(() => {
    const saved = localStorage.getItem("ai_tutor_history");
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse chat history on init", e);
      }
    }
    return [];
  });

  const [currentSessionId, setCurrentSessionId] = useState<string>(() => {
    const saved = localStorage.getItem("ai_tutor_history");
    if (saved) {
      try {
        const sessions: ChatSession[] = JSON.parse(saved);
        const matchingSession = sessions.find(s => s.topicTitle === currentTopicTitle);
        if (matchingSession) {
          return matchingSession.id;
        }
      } catch (e) {
        console.error("Failed to get current session ID on init", e);
      }
    }
    return Date.now().toString();
  });

  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const saved = localStorage.getItem("ai_tutor_history");
    if (saved) {
      try {
        const sessions: ChatSession[] = JSON.parse(saved);
        const matchingSession = sessions.find(s => s.topicTitle === currentTopicTitle);
        if (matchingSession) {
          return matchingSession.messages.map(m => ({
            ...m,
            timestamp: new Date(m.timestamp)
          }));
        }
      } catch (e) {
        console.error("Failed to revive messages on init", e);
      }
    }
    return [
      {
        id: "welcome",
        role: "model",
        content: `ជំរាបសួរ! ខ្ញុំជាគ្រូជំនួយការគណិតវិទ្យា AI របស់អ្នក។ ខ្ញុំអាចជួយពន្យល់ពីរូបមន្ត ដំណោះស្រាយលំហាត់ និងទ្រឹស្តីបទផ្សេងៗអំពី **${currentTopicTitle}** ថ្នាក់ទី១២ តាមសៀវភៅក្រសួង។ តើអ្នកមានចម្ងល់ត្រង់ណាដែរ?`,
        timestamp: new Date()
      }
    ];
  });

  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [showHistory, setShowHistory] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const isFirstMount = useRef(true);

  // Handle topic change
  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }

    const saved = localStorage.getItem("ai_tutor_history");
    let sessionsList: ChatSession[] = chatSessions;
    if (saved) {
      try {
        sessionsList = JSON.parse(saved);
        setChatSessions(sessionsList);
      } catch (e) {
        console.error(e);
      }
    }

    const matchingSession = sessionsList.find(s => s.topicTitle === currentTopicTitle);
    if (matchingSession) {
      const revivedMessages = matchingSession.messages.map(m => ({
        ...m,
        timestamp: new Date(m.timestamp)
      }));
      setMessages(revivedMessages);
      setCurrentSessionId(matchingSession.id);
    } else {
      setMessages([
        {
          id: "welcome",
          role: "model",
          content: `ជំរាបសួរ! ខ្ញុំជាគ្រូជំនួយការគណិតវិទ្យា AI របស់អ្នក។ ខ្ញុំអាចជួយពន្យល់ពីរូបមន្ត ដំណោះស្រាយលំហាត់ និងទ្រឹស្តីបទផ្សេងៗអំពី **${currentTopicTitle}** ថ្នាក់ទី១២ តាមសៀវភៅក្រសួង។ តើអ្នកមានចម្ងល់ត្រង់ណាដែរ?`,
          timestamp: new Date()
        }
      ]);
      setCurrentSessionId(Date.now().toString());
    }
  }, [currentTopicId, currentTopicTitle]);

  // Autosave current session
  useEffect(() => {
    if (messages.length > 1) {
      setChatSessions(prev => {
        const existingSessionIndex = prev.findIndex(s => s.id === currentSessionId);
        let updated: ChatSession[];
        
        if (existingSessionIndex >= 0) {
          updated = [...prev];
          updated[existingSessionIndex] = {
            ...updated[existingSessionIndex],
            messages: messages,
            date: new Date().toISOString()
          };
        } else {
          updated = [
            {
              id: currentSessionId,
              topicTitle: currentTopicTitle,
              date: new Date().toISOString(),
              messages: messages
            },
            ...prev
          ];
        }
        
        localStorage.setItem("ai_tutor_history", JSON.stringify(updated));
        return updated;
      });
    }
  }, [messages, currentSessionId, currentTopicTitle]);

  const loadSession = (session: ChatSession) => {
    // Revive dates
    const revivedMessages = session.messages.map(m => ({
      ...m,
      timestamp: new Date(m.timestamp)
    }));
    setMessages(revivedMessages);
    setCurrentSessionId(session.id);
    setShowHistory(false);
  };

  const deleteSession = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const updated = chatSessions.filter(s => s.id !== id);
    setChatSessions(updated);
    localStorage.setItem("ai_tutor_history", JSON.stringify(updated));

    // If the active session is deleted, start fresh
    if (currentSessionId === id) {
      setMessages([
        {
          id: "welcome",
          role: "model",
          content: `ជំរាបសួរ! ខ្ញុំជាគ្រូជំនួយការគណិតវិទ្យា AI របស់អ្នក។ ខ្ញុំអាចជួយពន្យល់ពីរូបមន្ត ដំណោះស្រាយលំហាត់ និងទ្រឹស្តីបទផ្សេងៗអំពី **${currentTopicTitle}** ថ្នាក់ទី១២ តាមសៀវភៅក្រសួង។ តើអ្នកមានចម្ងល់ត្រង់ណាដែរ?`,
          timestamp: new Date()
        }
      ]);
      setCurrentSessionId(Date.now().toString());
    }
  };

  // Auto scroll to bottom of chat
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        top: scrollContainerRef.current.scrollHeight,
        behavior: "smooth"
      });
    }
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
    setCurrentSessionId(Date.now().toString());
    setErrorMsg(null);
  };

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl overflow-hidden shadow-xl flex-1 w-full flex flex-col relative" id="ai-tutor-container">
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

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowHistory(true)}
            className="text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-white/10"
            title="View Chat History"
          >
            <History className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleClearHistory}
            className="text-slate-400 hover:text-white transition p-1.5 rounded-lg hover:bg-white/10"
            title="Clear Chat & Start New"
          >
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* History Overlay Panel */}
      {showHistory && (
        <div className="absolute inset-x-0 bottom-0 top-[60px] bg-[#0a0502]/95 backdrop-blur-xl z-20 flex flex-col border-t border-white/5 animate-fade-in">
          <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
            <h3 className="font-sans font-bold text-sm text-slate-200 flex items-center gap-2">
              <History className="w-4 h-4 text-[#ff4e00]" />
              ប្រវត្តិជជែក (Chat History)
            </h3>
            <button 
              onClick={() => setShowHistory(false)}
              className="p-1.5 hover:bg-white/10 rounded-lg text-slate-400 hover:text-white transition"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 space-y-2 scrollbar-thin">
            {chatSessions.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-slate-500 space-y-3">
                <MessageSquare className="w-8 h-8 opacity-20" />
                <p className="text-xs font-sans">មិនមានប្រវត្តិជជែកពីមុនទេ</p>
              </div>
            ) : (
              chatSessions.map((session) => (
                <div 
                  key={session.id}
                  className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl p-3 transition cursor-pointer flex flex-col gap-2 group"
                  onClick={() => loadSession(session)}
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-bold text-slate-200 line-clamp-1">{session.topicTitle}</p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {new Date(session.date).toLocaleDateString('km-KH')} - {session.messages.length} សារ
                      </p>
                    </div>
                    <button
                      onClick={(e) => deleteSession(session.id, e)}
                      className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition opacity-0 group-hover:opacity-100"
                      title="លុបចោល (Delete)"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <p className="text-[10px] text-slate-400 line-clamp-2 italic border-l-2 border-white/10 pl-2">
                    "{session.messages.length > 1 ? session.messages[1].content : "No query"}"
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      )}

      {/* Message history */}
      <div 
        ref={scrollContainerRef}
        className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin"
      >
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
                សូមប្រាកដថាអ្នកបានបន្ថែម <strong>GEMINI_API_KEY</strong> នៅក្នុងផ្ទាំង <strong>Settings &gt; Secrets</strong> នៃកម្មវិធី AI Studio។ បើលោកអ្នកបាន Deploy ទៅកាន់ <strong>Vercel</strong> សូមចូលទៅកាន់ <strong>Settings &gt; Environment Variables</strong> ក្នុង Vercel ដើម្បីបន្ថែម API Key នេះ ហើយ <strong>Redeploy</strong> ម្តងទៀត។
              </p>
            </div>
          </div>
        )}
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
