import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Award, ArrowRight } from 'lucide-react';
import { playMeasureSound } from './audioHelper';

const QUIZ_QUESTIONS = [
  {
    id: 1,
    question: "When measuring an object with a ruler, where should your eye be positioned?",
    options: [
      { id: 'A', text: "Slanted from the left (Position A)" },
      { id: 'B', text: "Directly vertically above the point being measured (Position B)", correct: true },
      { id: 'C', text: "Slanted from the right (Position C)" },
      { id: 'D', text: "From below the table" }
    ],
    explanation: "Viewing from Position B (directly above) prevents parallax error and gives the true accurate reading."
  },
  {
    id: 2,
    question: "If a scale's zero mark is broken, a student starts at 1.0 cm and the other end reads 10.4 cm. What is the true length?",
    options: [
      { id: 'A', text: "10.4 cm" },
      { id: 'B', text: "11.4 cm" },
      { id: 'C', text: "9.4 cm (10.4 cm − 1.0 cm)", correct: true },
      { id: 'D', text: "1.0 cm" }
    ],
    explanation: "When starting at a non-zero mark, subtract the starting reading: 10.4 cm − 1.0 cm = 9.4 cm."
  },
  {
    id: 3,
    question: "Which of the following is the CORRECT way to write a length measurement?",
    options: [
      { id: 'A', text: "15 cms" },
      { id: 'B', text: "15 cm (space between number and lowercase unit without 's')", correct: true },
      { id: 'C', text: "15cm." },
      { id: 'D', text: "15 CM" }
    ],
    explanation: "SI units are written in lowercase ('cm'), never pluralized with 's', and always have a space after the number."
  },
  {
    id: 4,
    question: "Which instrument is best suited to measure the round girth (circumference) of a tree trunk?",
    options: [
      { id: 'A', text: "A rigid wooden 1-metre rod" },
      { id: 'B', text: "A 15-cm plastic ruler" },
      { id: 'C', text: "A flexible measuring tape (like a tailor's tape)", correct: true },
      { id: 'D', text: "A handspan only" }
    ],
    explanation: "Curved and round surfaces require a flexible ribbon tape that can wrap seamlessly around the perimeter."
  }
];

export default function CorrectMeasurementQuiz({ onCompleteQuiz }) {
  const [userAnswers, setUserAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelect = (qId, optId) => {
    if (submitted) return;
    playMeasureSound('click');
    setUserAnswers(prev => ({ ...prev, [qId]: optId }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      const correctOpt = q.options.find(o => o.correct);
      if (userAnswers[q.id] === correctOpt.id) score++;
    });
    return score;
  };

  const handleSubmit = () => {
    playMeasureSound('correct');
    setSubmitted(true);
    if (onCompleteQuiz) onCompleteQuiz();
  };

  const handleReset = () => {
    playMeasureSound('click');
    setUserAnswers({});
    setSubmitted(false);
  };

  const score = calculateScore();
  const allAnswered = Object.keys(userAnswers).length === QUIZ_QUESTIONS.length;

  return (
    <div className="correct-quiz-component">
      <div className="quiz-header-card">
        <div className="quiz-title-line">
          <HelpCircle size={20} color="#D97706" />
          <h4 className="quiz-heading">Quick Check: Correct Measurement Rules</h4>
        </div>
        <span className="quiz-badge">4 Easy Questions</span>
      </div>

      <div className="quiz-cards-grid">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const selected = userAnswers[q.id];
          const isCorrect = submitted && q.options.find(o => o.correct)?.id === selected;

          return (
            <div key={q.id} className="quiz-card-box">
              <div className="card-q-title">
                <span className="q-index">Q{idx + 1}</span>
                <span className="q-prompt">{q.question}</span>
              </div>

              <div className="card-options-col">
                {q.options.map((opt) => {
                  const isSelected = selected === opt.id;
                  let optClass = '';
                  if (submitted) {
                    if (opt.correct) optClass = 'correct';
                    else if (isSelected) optClass = 'wrong';
                  } else if (isSelected) {
                    optClass = 'selected';
                  }

                  return (
                    <button
                      key={opt.id}
                      onClick={() => handleSelect(q.id, opt.id)}
                      disabled={submitted}
                      className={`card-opt-btn ${optClass}`}
                    >
                      <span className="opt-letter">{opt.id}</span>
                      <span className="opt-text">{opt.text}</span>
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div className={`card-feedback-bar ${isCorrect ? 'positive' : 'remedial'}`}>
                  <strong>{isCorrect ? '✓ Correct:' : '✗ Note:'}</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="quiz-bottom-actions">
        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!allAnswered}
            className="quiz-submit-cta"
          >
            <span>Check Answers ({Object.keys(userAnswers).length}/{QUIZ_QUESTIONS.length})</span>
            <ArrowRight size={16} />
          </button>
        ) : (
          <div className="quiz-score-row">
            <div className="score-badge">
              <Award size={20} color="#D97706" />
              <span>Score: <strong>{score} / {QUIZ_QUESTIONS.length}</strong></span>
            </div>
            <button onClick={handleReset} className="retry-btn">
              <RotateCcw size={15} />
              <span>Retry</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
