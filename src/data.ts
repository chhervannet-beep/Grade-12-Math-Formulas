import { Topic, QuizQuestion } from "./types";
import { COMPLEX_TOPICS } from "./data/chapter1_complex";
import { LIMIT_TOPICS } from "./data/chapter2_limits";
import { CONTINUITY_DERIVATIVE_TOPICS } from "./data/chapter3_continuity_derivatives";
import { INTEGRAL_DIFF_TOPICS } from "./data/chapter4_integrals_diff";
import { PROB_VECTORS_CONICS_TOPICS } from "./data/chapter5_prob_vectors_conics";
import { CURVE_SKETCHING_TOPICS } from "./data/chapter6_curve_sketching";
import { EXPAN_QUIZ_QUESTIONS } from "./data/quiz_questions";

export const TOPICS: Topic[] = [
  ...COMPLEX_TOPICS,
  ...LIMIT_TOPICS,
  ...CONTINUITY_DERIVATIVE_TOPICS,
  ...INTEGRAL_DIFF_TOPICS,
  ...PROB_VECTORS_CONICS_TOPICS,
  ...CURVE_SKETCHING_TOPICS
];

export const QUIZ_QUESTIONS: QuizQuestion[] = EXPAN_QUIZ_QUESTIONS;
