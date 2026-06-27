/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import {
  BookOpen,
  Compass,
  MessageSquare,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Award,
  BookMarked,
  Layers,
  Calculator,
  Brain,
  Sparkles,
  Search,
  BookOpenCheck
} from "lucide-react";
import { TOPICS } from "./data";
import { Topic } from "./types";
import { CHAPTERS, Chapter } from "./data/chapters";
import MathRenderer from "./components/MathRenderer";
import TrigCircle from "./components/TrigCircle";
import ComplexExplorer from "./components/ComplexExplorer";
import LimitExplorer from "./components/LimitExplorer";
import {
  ContinuityExplorer,
  DerivativeExplorer,
  IndefiniteIntegralExplorer,
  DefiniteIntegralExplorer,
  DiffEq1Explorer,
  DiffEq2Explorer,
  ProbabilityExplorer,
  CurveSketchingExplorer,
  VectorsSpaceExplorer,
  ConicsExplorer
} from "./components/ChapterPlaygrounds";
import AITutor from "./components/AITutor";
import MathQuiz from "./components/MathQuiz";

export default function App() {
  const [activeTopicId, setActiveTopicId] = useState<string>("complex-review");
  const [activeTab, setActiveTab] = useState<"handbook" | "playground" | "ai-tutor">("handbook");
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");

  // Accordion states for the 12 chapters
  const [expandedChapterIds, setExpandedChapterIds] = useState<string[]>(["complex", "limit"]);

  const toggleChapter = (chapterId: string) => {
    if (expandedChapterIds.includes(chapterId)) {
      setExpandedChapterIds(expandedChapterIds.filter((id) => id !== chapterId));
    } else {
      setExpandedChapterIds([...expandedChapterIds, chapterId]);
    }
  };

  const activeTopic = TOPICS.find((t) => t.id === activeTopicId) || TOPICS[0];

  // Adjust sidebar state on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1024) {
        setIsSidebarOpen(false);
      } else {
        setIsSidebarOpen(true);
      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const selectTopic = (id: string) => {
    setActiveTopicId(id);
    setShowQuiz(false);
    // Keep active tab, but if it was quiz, change to handbook
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  const handleShowQuiz = () => {
    setShowQuiz(true);
    if (window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  };

  // Filter topics based on search query
  // (We now filter topics dynamically per-chapter in the sidebar loop)

  return (
    <div className="h-[100dvh] w-full bg-[#0a0502] text-slate-100 flex flex-col font-sans relative overflow-hidden" id="app-root">
      {/* Atmospheric Background Gradients */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-[#3a1510] opacity-35 blur-[120px]"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[70%] rounded-full bg-[#ff4e00] opacity-10 blur-[140px]"></div>
        <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full bg-[#1a202c] opacity-25 blur-[100px]"></div>
      </div>

      {/* Top Navbar */}
      <header className="bg-black/40 backdrop-blur-md border-b border-white/10 sticky top-0 z-40 px-4 py-3 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 rounded-lg hover:bg-white/10 text-slate-300 transition lg:hidden"
            id="toggle-sidebar-btn"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-tr from-[#ff4e00] to-[#ff8c00] p-2 rounded-xl text-white shadow-md">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h1 className="font-sans font-bold text-white text-sm md:text-base leading-tight">
                គណិតវិទ្យាថ្នាក់ទី១២ (Grade 12 Math Handbook)
              </h1>
              <p className="text-[10px] text-slate-400 font-sans hidden sm:block">
                សៀវភៅមេរៀន និងរូបមន្តរូបរាងមិនកំណត់ ជាមួយការរៀនអន្តរកម្ម
              </p>
            </div>
          </div>
        </div>

        {/* Action Header Items */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleShowQuiz}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-sans font-semibold transition ${
              showQuiz
                ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white shadow-lg shadow-[#ff4e00]/25"
                : "bg-white/5 text-slate-300 hover:bg-white/10 border border-white/10"
            }`}
          >
            <Award className="w-4 h-4" />
            <span>តេស្តវាស់សមត្ថភាព (Knowledge Quiz)</span>
          </button>
        </div>
      </header>

      {/* Main Body container */}
      <div className="flex-1 flex overflow-hidden relative z-10">
        {/* Mobile Sidebar Overlay */}
        {isSidebarOpen && (
          <div
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden transition-opacity"
          />
        )}

        {/* Bookmarks Sidebar (left side) */}
        <aside
          className={`bg-black/30 backdrop-blur-md border-r border-white/10 w-72 flex-shrink-0 flex flex-col fixed lg:static inset-y-0 left-0 z-30 transition-transform duration-300 transform ${
            isSidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0 lg:w-0 lg:overflow-hidden lg:border-r-0"
          }`}
          id="bookmarks-sidebar"
        >
          {/* Search bar inside sidebar */}
          <div className="p-4 border-b border-white/10 flex-shrink-0">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="ស្វែងរកមេរៀន... (Search...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder-white/30 focus:outline-none focus:border-[#ff4e00]/50 transition"
              />
            </div>
          </div>

          {/* Collapsible Bookmarks Content */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
            <div className="flex items-center gap-1.5 text-white/40 font-bold uppercase tracking-wider text-[10px] mb-2 px-1">
              <BookMarked className="w-3.5 h-3.5 text-[#ff4e00]" />
              <span>បញ្ជីមេរៀន (Book Chapters)</span>
            </div>

            {CHAPTERS.map((ch) => {
              const filteredTopics = TOPICS.filter(
                (t) =>
                  t.category === ch.id &&
                  (t.titleKh.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    t.title.toLowerCase().includes(searchQuery.toLowerCase()))
              );

              // If searching, hide chapters with no matching topics
              if (searchQuery && filteredTopics.length === 0) {
                return null;
              }

              const isExpanded = expandedChapterIds.includes(ch.id);

              return (
                <div key={ch.id} className="space-y-1">
                  <button
                    onClick={() => toggleChapter(ch.id)}
                    className="w-full flex items-center justify-between p-2 rounded-lg hover:bg-white/5 text-slate-200 text-xs font-bold transition text-left"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-md bg-[#ff4e00]/10 text-[#ff4e00] flex items-center justify-center font-bold text-[10px]">
                        {ch.num}
                      </span>
                      <span>{ch.titleKh}</span>
                    </div>
                    {isExpanded ? <ChevronDown className="w-3.5 h-3.5 text-slate-400" /> : <ChevronRight className="w-3.5 h-3.5 text-slate-400" />}
                  </button>

                  {isExpanded && (
                    <div className="pl-7 space-y-1 border-l border-white/10 ml-4">
                      {filteredTopics.length > 0 ? (
                        filteredTopics.map((t) => (
                          <button
                            key={t.id}
                            onClick={() => selectTopic(t.id)}
                            className={`w-full text-left p-1.5 rounded-md text-[11px] font-sans transition flex items-center justify-between ${
                              activeTopicId === t.id && !showQuiz
                                ? "bg-gradient-to-r from-[#ff4e00]/20 to-transparent text-white border-l-2 border-[#ff4e00] font-semibold"
                                : "text-slate-400 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            <span className="truncate">{t.titleKh}</span>
                          </button>
                        ))
                      ) : (
                        <span className="text-[10px] text-slate-500 italic block p-1">រកមិនឃើញមេរៀនទេ</span>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Knowledge Test Shortcut inside sidebar */}
          <div className="p-4 border-t border-white/10 flex-shrink-0 bg-transparent space-y-3">
            <button
              onClick={handleShowQuiz}
              className={`w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-sans font-bold transition ${
                showQuiz
                  ? "bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] text-white shadow-lg shadow-[#ff4e00]/25"
                  : "bg-white/5 hover:bg-white/10 text-white border border-white/10"
              }`}
            >
              <BookOpenCheck className="w-4 h-4 text-orange-400" />
              <span>សាកល្បងសមត្ថភាព (Take Quiz)</span>
            </button>

            {/* Mobile/Sidebar Creator Info */}
            <div className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-2 text-left" id="creator-sidebar-card">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-[#ff4e00]/10 border border-[#ff4e00]/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-[9px] text-[#ff8c00] font-black">គ្រូ</span>
                </div>
                <div>
                  <p className="text-[8px] text-slate-500 uppercase font-sans font-bold leading-none">ស្ថាបនិក និងរៀបចំដោយ</p>
                  <p className="text-[11px] font-bold text-slate-200 mt-0.5">លោកគ្រូ ឆយ សុវ៉ាន់ណេត</p>
                </div>
              </div>
              <div className="text-[10px] text-slate-400 space-y-1 pl-1 border-l border-white/10">
                <p>• ឯកទេស៖ <span className="text-slate-300">គណិតវិទ្យា</span></p>
                <p>• ទូរស័ព្ទ៖ <span className="font-mono text-[#ff8c00] font-semibold">០១៦ ៥៦៧ ៤៣៧</span></p>
                <p className="text-[9.5px] leading-tight text-slate-400">• <span className="text-slate-300">វិទ្យាល័យ ព្រះនរោត្តមសីហមុនី</span></p>
              </div>
            </div>
          </div>
        </aside>

        {/* Content Viewer (right side) */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6 relative z-10 flex flex-col" id="main-content-panel">
          {showQuiz ? (
            /* Quiz Mode rendering */
            <div className="max-w-3xl mx-auto py-4">
              <div className="text-center mb-6">
                <h3 className="font-sans font-bold text-white text-xl md:text-2xl">
                  ប្រព័ន្ធតេស្តសមត្ថភាព គណិតវិទ្យាថ្នាក់ទី១២
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  សំណួរពហុជ្រើសរើសគ្របដណ្តប់លើ ចំនួនកុំផ្លិច រូបមន្តត្រីកោណមាត្រ និងលីមីតនៃអនុគមន៍
                </p>
              </div>
              <MathQuiz />
            </div>
          ) : (
            /* Topic Reader Mode rendering */
            <div className="max-w-4xl mx-auto flex-1 flex flex-col space-y-6 w-full">
              {/* Topic Title Header card */}
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  {(() => {
                    const ch = CHAPTERS.find((c) => c.id === activeTopic.category);
                    return (
                      <span className="text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full border bg-[#ff4e00]/10 text-[#ff4e00] border-[#ff4e00]/20">
                        មេរៀនទី {ch ? ch.num : "X"}៖ {ch ? ch.titleKh : activeTopic.category}
                      </span>
                    );
                  })()}
                  <h2 className="font-sans font-black text-white text-xl mt-2 leading-tight">
                    {activeTopic.titleKh}
                  </h2>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">
                    {activeTopic.title}
                  </p>
                </div>

                {/* Reader / Playground / AI Tutor Tabs */}
                <div className="flex bg-black/30 p-1 rounded-xl border border-white/10 flex-shrink-0 self-start md:self-auto">
                  <button
                    onClick={() => setActiveTab("handbook")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition ${
                      activeTab === "handbook"
                        ? "bg-[#ff4e00] text-white shadow-md shadow-[#ff4e00]/25"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>សៀវភៅមេរៀន</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("playground")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition ${
                      activeTab === "playground"
                        ? "bg-[#ff4e00] text-white shadow-md shadow-[#ff4e00]/25"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Compass className="w-3.5 h-3.5" />
                    <span>ឧបករណ៍អន្តរកម្ម</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("ai-tutor")}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition ${
                      activeTab === "ai-tutor"
                        ? "bg-[#ff4e00] text-white shadow-md shadow-[#ff4e00]/25"
                        : "text-slate-400 hover:text-white"
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>សួរគ្រូ AI</span>
                  </button>
                </div>
              </div>

              {/* Display View based on active tab */}
              <div className="transition-all duration-200 flex-1 flex flex-col">
                {activeTab === "handbook" && (
                  /* 1. Handbook Reader */
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main content markdown */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-sm lg:col-span-2 text-slate-100">
                      <MathRenderer content={activeTopic.contentMarkdown} />
                    </div>

                    {/* Sidebar quick formula reference card */}
                    <div className="space-y-4">
                      <div className="bg-gradient-to-br from-[#1c0b05] to-[#0a0502] text-white rounded-2xl p-5 shadow-lg border border-white/10">
                        <h4 className="font-sans font-bold text-xs uppercase tracking-wider text-[#ff8c00] flex items-center gap-1.5 mb-3">
                          <Calculator className="w-4 h-4 text-[#ff4e00]" />
                          រូបមន្តគន្លឹះ (Quick Formula)
                        </h4>
                        <div className="space-y-3.5">
                          {activeTopic.formulas.map((form, idx) => (
                            <div key={idx} className="border-b border-white/5 last:border-b-0 pb-3 last:pb-0">
                              <div className="text-[11px] font-sans font-bold text-slate-300">{form.label}</div>
                              <div className="font-mono text-xs font-bold text-[#ff8c00] bg-black/40 px-2.5 py-1.5 rounded-lg mt-1 border border-white/10 flex justify-center text-center">
                                {form.formula}
                              </div>
                              <div className="text-[10px] text-slate-400 font-sans mt-1 leading-snug">{form.explanation}</div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Interactive preview box promoting playground */}
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-5 text-center backdrop-blur-sm">
                        <Compass className="w-8 h-8 text-[#ff4e00] mx-auto mb-2" />
                        <h5 className="font-sans font-bold text-white text-xs">តើអ្នកចង់សាកល្បងរូបមន្តទេ?</h5>
                        <p className="font-sans text-[11px] text-slate-300 mt-1 mb-3 leading-relaxed">
                          យើងមានប្រព័ន្ធពិសោធន៍រូបមន្តគណិតវិទ្យា និងរង្វង់ត្រីកោណមាត្រអន្តរកម្មយ៉ាងទំនើប!
                        </p>
                        <button
                          onClick={() => setActiveTab("playground")}
                          className="w-full bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] hover:scale-[1.02] active:scale-[0.98] text-white text-[11px] font-sans font-semibold py-2 rounded-xl transition shadow-lg shadow-[#ff4e00]/25"
                        >
                          សាកល្បងឧបករណ៍អន្តរកម្ម (Open Playground)
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "playground" && (
                  /* 2. Interactive playground */
                  <div className="space-y-6 animate-fade-in">
                    {/* Display respective tool based on current selection */}
                    {activeTopic.id === "complex-review" ? (
                      <TrigCircle />
                    ) : activeTopic.category === "complex" ? (
                      <ComplexExplorer />
                    ) : activeTopic.category === "limit" ? (
                      <LimitExplorer />
                    ) : activeTopic.category === "continuity" ? (
                      <ContinuityExplorer />
                    ) : activeTopic.category === "derivative" ? (
                      <DerivativeExplorer />
                    ) : activeTopic.category === "indefinite-integral" ? (
                      <IndefiniteIntegralExplorer />
                    ) : activeTopic.category === "definite-integral" ? (
                      <DefiniteIntegralExplorer />
                    ) : activeTopic.category === "diff-eq-1" ? (
                      <DiffEq1Explorer />
                    ) : activeTopic.category === "diff-eq-2" ? (
                      <DiffEq2Explorer />
                    ) : activeTopic.category === "probability" ? (
                      <ProbabilityExplorer />
                    ) : activeTopic.category === "curve-sketching" ? (
                      <CurveSketchingExplorer />
                    ) : activeTopic.category === "vectors-space" ? (
                      <VectorsSpaceExplorer />
                    ) : activeTopic.category === "conics" ? (
                      <ConicsExplorer />
                    ) : (
                      <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center backdrop-blur-sm max-w-xl mx-auto py-8">
                        <Compass className="w-12 h-12 text-[#ff4e00] mx-auto mb-4" />
                        <h4 className="font-sans font-bold text-white text-base">ឧបករណ៍គណនារូបមន្តទូទៅ (General Explorer Tools)</h4>
                        <p className="font-sans text-xs text-slate-300 mt-2 mb-6 leading-relaxed">
                          មេរៀនបច្ចុប្បន្នប្រើប្រាស់ការគណនាកន្សោមរូបមន្ត។ អ្នកអាចជ្រើសរើសប្រើប្រាស់ឧបករណ៍ពិសោធន៍ និងម៉ាស៉ីនគណនាណាមួយខាងក្រោមដើម្បីជំនួយដល់ការសិក្សា៖
                        </p>
                        <div className="flex flex-col sm:flex-row gap-3 justify-center">
                          <button
                            onClick={() => {
                              setActiveTopicId("complex-review");
                              setActiveTab("playground");
                            }}
                            className="bg-white/5 border border-white/10 hover:border-[#ff4e00]/30 hover:bg-white/10 text-white font-sans text-xs font-semibold py-2 px-4 rounded-xl transition"
                          >
                            រង្វង់ត្រីកោណមាត្រ
                          </button>
                          <button
                            onClick={() => {
                              setActiveTopicId("complex-concept");
                              setActiveTab("playground");
                            }}
                            className="bg-white/5 border border-white/10 hover:border-[#ff4e00]/30 hover:bg-white/10 text-white font-sans text-xs font-semibold py-2 px-4 rounded-xl transition"
                          >
                            គណនាចំនួនកុំផ្លិច
                          </button>
                          <button
                            onClick={() => {
                              setActiveTopicId("limit-trigonometric");
                              setActiveTab("playground");
                            }}
                            className="bg-white/5 border border-white/10 hover:border-[#ff4e00]/30 hover:bg-white/10 text-white font-sans text-xs font-semibold py-2 px-4 rounded-xl transition"
                          >
                            ពិសោធន៍លីមីត
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Offer other playgrounds */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-[#ff4e00]/30 transition-all">
                        <div>
                          <Layers className="w-5 h-5 text-pink-500 mb-1.5" />
                          <h6 className="font-sans font-bold text-white text-xs">រង្វង់ត្រីកោណមាត្រ</h6>
                          <p className="font-sans text-[10px] text-slate-400 mt-0.5 leading-snug">
                            រៀនពីទំនាក់ទំនងមុំបំពេញ មុំបន្ថែម មុំផ្ទុយ និងស៉ីនុស កូស៉ីនុស។
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTopicId("complex-review");
                            setActiveTab("playground");
                          }}
                          className="mt-3 text-[10px] font-sans font-bold text-[#ff4e00] hover:text-[#ff8c00] text-left transition"
                        >
                          បើកដំណើរការ →
                        </button>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-[#ff4e00]/30 transition-all">
                        <div>
                          <Calculator className="w-5 h-5 text-blue-400 mb-1.5" />
                          <h6 className="font-sans font-bold text-white text-xs">ម៉ាស៉ីនគណនាចំនួនកុំផ្លិច</h6>
                          <p className="font-sans text-[10px] text-slate-400 mt-0.5 leading-snug">
                            វិភាគម៉ូឌុល អាគុយម៉ង់ កុំផ្លិចឆ្លាស់ និងទម្រង់ប៉ូលែរបស់ $a+bi$។
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTopicId("complex-concept");
                            setActiveTab("playground");
                          }}
                          className="mt-3 text-[10px] font-sans font-bold text-[#ff4e00] hover:text-[#ff8c00] text-left transition"
                        >
                          បើកដំណើរការ →
                        </button>
                      </div>

                      <div className="bg-white/5 border border-white/10 rounded-xl p-4 flex flex-col justify-between hover:border-[#ff4e00]/30 transition-all">
                        <div>
                          <Compass className="w-5 h-5 text-emerald-400 mb-1.5" />
                          <h6 className="font-sans font-bold text-white text-xs">ពិសោធន៍លីមីតវិលជុំ</h6>
                          <p className="font-sans text-[10px] text-slate-400 mt-0.5 leading-snug">
                            សង្កេតការខិតជិតរបស់ x ទៅកាន់ 0 ពីឆ្វេង និងស្តាំលើកន្សោមមិនកំណត់។
                          </p>
                        </div>
                        <button
                          onClick={() => {
                            setActiveTopicId("limit-trigonometric");
                            setActiveTab("playground");
                          }}
                          className="mt-3 text-[10px] font-sans font-bold text-[#ff4e00] hover:text-[#ff8c00] text-left transition"
                        >
                          បើកដំណើរការ →
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === "ai-tutor" && (
                  /* 3. AI tutor chat session focused on selected topic */
                  <div className="max-w-2xl w-full mx-auto py-2 animate-fade-in flex-1 flex flex-col min-h-[500px]">
                    <AITutor
                      currentTopicTitle={activeTopic.titleKh}
                      currentTopicId={activeTopic.id}
                    />
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
