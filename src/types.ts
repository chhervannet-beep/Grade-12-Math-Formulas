/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Topic {
  id: string;
  title: string;
  titleKh: string;
  category: string;
  contentMarkdown: string;
  formulas: { label: string; formula: string; explanation: string }[];
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "model" | "system";
  content: string;
  timestamp: Date;
}

export interface BackendDocument {
  id: string;
  name: string;
  type: "note" | "file";
  fileType: string;
  size: number;
  content: string; // Markdown text or Base64/Raw file string
  createdAt: string;
}
