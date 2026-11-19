import { useState } from "react";
import { Check, RotateCcw, X } from "lucide-react";
import { Placeholder } from "./Placeholder";
import { cx } from "../utils/cx";
import type { QuizQuestion } from "../types/content";

/**
 * Optional, fully data-driven quiz. No questions are included in the default
 * archive. Feedback uses words and icons, never colour alone.
 */
export function Quiz({ questions }: { questions: QuizQuestion[] }) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const answeredCount = Object.keys(answers).length;
  const correctCount = questions.filter(
    (question) => answers[question.id] === question.answerIndex,
  ).length;

  const reset = () => setAnswers({});

  return (
    <div className="quiz">
      <ol className="quiz-list">
        {questions.map((question, questionIndex) => {
          const answer = answers[question.id];
          const isAnswered = answer !== undefined;
          const isCorrect = answer === question.answerIndex;
          const answerText =
            question.options[question.answerIndex] || "the correct option";

          return (
            <li className="quiz-question" key={question.id}>
              <div className="quiz-question__head">
                <span className="quiz-question__number">
                  Q{String(questionIndex + 1).padStart(2, "0")}
                </span>
                <h3 id={`quiz-${question.id}`}>
                  {question.question ? (
                    question.question
                  ) : (
                    <Placeholder>Add a quiz question</Placeholder>
                  )}
                </h3>
              </div>
              <div
                className="quiz-options"
                role="group"
                aria-labelledby={`quiz-${question.id}`}
              >
                {question.options.map((option, optionIndex) => {
                  const showCorrect = isAnswered && optionIndex === question.answerIndex;
                  const showWrong = isAnswered && optionIndex === answer && !isCorrect;
                  return (
                    <button
                      key={`${question.id}-${optionIndex}`}
                      type="button"
                      className={cx(
                        "quiz-option",
                        showCorrect && "is-correct",
                        showWrong && "is-wrong",
                      )}
                      onClick={() =>
                        setAnswers((current) => ({
                          ...current,
                          [question.id]: optionIndex,
                        }))
                      }
                      disabled={isAnswered}
                    >
                      <span className="quiz-option__letter" aria-hidden="true">
                        {String.fromCharCode(65 + optionIndex)}
                      </span>
                      <span className="quiz-option__text">
                        {option ? option : <Placeholder>Add an option</Placeholder>}
                      </span>
                      {showCorrect ? (
                        <span className="quiz-option__result">
                          <Check size={15} strokeWidth={2} aria-hidden="true" />
                          <span className="sr-only">Correct answer</span>
                        </span>
                      ) : null}
                      {showWrong ? (
                        <span className="quiz-option__result">
                          <X size={15} strokeWidth={2} aria-hidden="true" />
                          <span className="sr-only">Your answer, incorrect</span>
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
              <p className="quiz-feedback" aria-live="polite">
                {isAnswered
                  ? isCorrect
                    ? "Correct."
                    : `Not quite. The correct answer is “${answerText}”.`
                  : ""}
              </p>
              {isAnswered && question.explanation ? (
                <p className="quiz-explanation">{question.explanation}</p>
              ) : null}
            </li>
          );
        })}
      </ol>

      <div className="quiz-foot">
        <p aria-live="polite">
          {answeredCount === questions.length
            ? `You scored ${correctCount} out of ${questions.length}.`
            : `${answeredCount} of ${questions.length} answered.`}
        </p>
        {answeredCount > 0 ? (
          <button type="button" className="text-button" onClick={reset}>
            <RotateCcw size={14} strokeWidth={1.7} aria-hidden="true" />
            Reset quiz
          </button>
        ) : null}
      </div>
    </div>
  );
}
