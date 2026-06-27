/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { CheckCircle2, XCircle, Award, RefreshCcw, ArrowRight, BookOpen, AlertCircle } from "lucide-react";
import { QUIZ_QUESTIONS } from "../data";

export default function MathQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  const currentQuestion = QUIZ_QUESTIONS[currentIdx];

  const handleOptionSelect = (optionIdx: number) => {
    if (isAnswered) return;
    setSelectedOption(optionIdx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null || isAnswered) return;

    const correct = selectedOption === currentQuestion.correctAnswer;
    if (correct) {
      setScore((s) => s + 1);
    }
    setIsAnswered(true);
  };

  const handleNextQuestion = () => {
    setSelectedOption(null);
    setIsAnswered(false);

    if (currentIdx + 1 < QUIZ_QUESTIONS.length) {
      setCurrentIdx((idx) => idx + 1);
    } else {
      setQuizComplete(true);
    }
  };

  const handleRestartQuiz = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setQuizComplete(false);
  };

  // Celebration message based on score
  const getFeedbackMessage = () => {
    const percentage = (score / QUIZ_QUESTIONS.length) * 100;
    if (percentage === 100) return "អស្ចារ្យណាស់! អ្នកទទួលបានពិន្ទុពេញ! (Perfect Score! Excellent math skills!)";
    if (percentage >= 80) return "ល្អណាស់! អ្នកយល់ដឹងច្បាស់លាស់ពីមេរៀននេះ! (Great job! Solid understanding!)";
    if (percentage >= 50) return "ល្អបង្គួរ! សូមបន្តព្យាយាមបន្ថែមទៀត! (Decent! Keep practicing to improve!)";
    return "សូមព្យាយាមឡើងវិញ! មេរៀននេះត្រូវការការយកចិត្តទុកដាក់បន្ថែម! (Keep trying! Spend more time reviewing the handbook!)";
  };

  if (quizComplete) {
    const percentage = Math.round((score / QUIZ_QUESTIONS.length) * 100);
    return (
      <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 text-center max-w-xl mx-auto shadow-xl" id="quiz-complete-card">
        <div className="inline-flex p-4 bg-[#ff4e00]/10 rounded-full text-[#ff4e00] mb-4 border border-[#ff4e00]/20">
          <Award className="w-12 h-12" />
        </div>
        <h4 className="font-sans font-bold text-white text-xl mb-1">បញ្ចប់ការធ្វើតេស្ត! (Quiz Completed)</h4>
        <p className="font-sans text-xs text-slate-400 mb-6">{getFeedbackMessage()}</p>

        {/* Score Display */}
        <div className="bg-black/40 border border-white/10 rounded-2xl p-6 mb-6 inline-block min-w-[200px] shadow-inner">
          <div className="text-[10px] uppercase font-bold tracking-wider text-slate-400 font-sans mb-1">ពិន្ទុសរុប (Total Score)</div>
          <div className="text-4xl font-mono font-black text-[#ff8c00]">
            {score} <span className="text-slate-600 text-2xl">/</span> {QUIZ_QUESTIONS.length}
          </div>
          <div className="text-xs font-mono font-semibold text-slate-300 mt-2 bg-white/5 px-3 py-1 rounded-full border border-white/5 inline-block">
            {percentage}% ត្រឹមត្រូវ (Correct)
          </div>
        </div>

        <div className="flex gap-4 justify-center">
          <button
            onClick={handleRestartQuiz}
            className="flex items-center gap-1.5 text-xs font-sans font-semibold bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] hover:scale-[1.02] active:scale-[0.98] text-white px-5 py-2.5 rounded-xl transition shadow-md shadow-[#ff4e00]/25 cursor-pointer"
          >
            <RefreshCcw className="w-3.5 h-3.5" />
            ធ្វើតេស្តឡើងវិញ (Restart Quiz)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl max-w-2xl mx-auto" id="quiz-card">
      {/* Progress header */}
      <div className="flex justify-between items-center text-xs font-sans mb-4 text-slate-300">
        <span className="font-semibold bg-white/5 text-slate-200 px-2.5 py-1 rounded-full border border-white/5">
          សំណួរទី {currentIdx + 1} នៃ {QUIZ_QUESTIONS.length} (Question {currentIdx + 1}/{QUIZ_QUESTIONS.length})
        </span>
        <span className="font-mono text-[#ff4e00] font-bold">ពិន្ទុ៖ {score}</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-white/10 h-2 rounded-full mb-6 overflow-hidden">
        <div
          className="bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] h-full rounded-full transition-all duration-300"
          style={{ width: `${((currentIdx + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
        ></div>
      </div>

      {/* Question statement */}
      <div className="mb-6">
        <h4 className="font-sans font-bold text-white text-base leading-snug">
          {currentQuestion.question}
        </h4>
      </div>

      {/* Options */}
      <div className="space-y-2.5 mb-6">
        {currentQuestion.options.map((option, idx) => {
          let optionStyle = "border-white/10 hover:border-[#ff4e00]/30 hover:bg-white/5 text-slate-300 bg-black/25";

          if (selectedOption === idx) {
            optionStyle = "border-[#ff4e00] bg-[#ff4e00]/10 text-white font-semibold";
          }

          if (isAnswered) {
            if (idx === currentQuestion.correctAnswer) {
              optionStyle = "border-emerald-500 bg-emerald-500/10 text-emerald-300 font-semibold";
            } else if (selectedOption === idx) {
              optionStyle = "border-rose-500 bg-rose-500/10 text-rose-300";
            } else {
              optionStyle = "border-white/5 bg-transparent text-slate-500 pointer-events-none";
            }
          }

          return (
            <button
              key={idx}
              disabled={isAnswered}
              onClick={() => handleOptionSelect(idx)}
              className={`w-full text-left p-3.5 rounded-xl border text-xs font-sans transition-all flex items-center justify-between ${optionStyle}`}
            >
              <span className="leading-relaxed">{option}</span>

              {/* Status Icons */}
              {isAnswered && idx === currentQuestion.correctAnswer && (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 ml-2" />
              )}
              {isAnswered && selectedOption === idx && idx !== currentQuestion.correctAnswer && (
                <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0 ml-2" />
              )}
            </button>
          );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex justify-end gap-3 border-t border-white/10 pt-5">
        {!isAnswered ? (
          <button
            onClick={handleSubmitAnswer}
            disabled={selectedOption === null}
            className="px-5 py-2.5 rounded-xl text-xs font-sans font-semibold text-white bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] hover:scale-[1.02] active:scale-[0.98] disabled:bg-white/5 disabled:scale-100 disabled:text-slate-600 transition shadow-md shadow-[#ff4e00]/25 cursor-pointer"
          >
            ផ្ទៀងផ្ទាត់ចម្លើយ (Submit Answer)
          </button>
        ) : (
          <button
            onClick={handleNextQuestion}
            className="px-5 py-2.5 rounded-xl text-xs font-sans font-semibold text-white bg-gradient-to-r from-[#ff4e00] to-[#ff8c00] hover:scale-[1.02] active:scale-[0.98] transition shadow-md shadow-[#ff4e00]/25 flex items-center gap-1 cursor-pointer"
          >
            {currentIdx + 1 === QUIZ_QUESTIONS.length ? "មើលលទ្ធផល" : "សំណួរបន្ទាប់"}
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Explanations shown after answering */}
      {isAnswered && (
        <div className="mt-6 border border-amber-500/20 bg-amber-500/5 rounded-2xl p-4 animate-fade-in flex gap-3">
          <BookOpen className="w-5 h-5 text-[#ff8c00] flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h5 className="text-xs font-sans font-bold text-amber-400">ពន្យល់លម្អិត (Detailed Explanation)：</h5>
            <p className="text-xs font-sans text-slate-300 leading-relaxed whitespace-pre-line">
              {currentQuestion.explanation}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
