import { Award, CheckCircle, XCircle } from "lucide-react";
import React, { useState } from "react";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface MentorQuizProps {
  onQuizComplete: (passed: boolean, score: number) => void;
  onBack: () => void;
}

const MentorQuiz: React.FC<MentorQuizProps> = ({ onQuizComplete, onBack }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const questions: Question[] = [
    {
      id: 1,
      question: "What is the purpose of React's useEffect hook?",
      options: [
        "To manage component state",
        "To handle side effects in functional components",
        "To create custom hooks",
        "To optimize component rendering",
      ],
      correctAnswer: 1,
      explanation:
        "useEffect is used to handle side effects like API calls, subscriptions, and DOM manipulation in functional components.",
    },
    {
      id: 2,
      question: "Which CSS property is used to create a flexbox container?",
      options: [
        "display: block",
        "display: flex",
        "flex-direction: row",
        "justify-content: center",
      ],
      correctAnswer: 1,
      explanation:
        "display: flex creates a flex container, enabling flexbox layout for its children.",
    },
    {
      id: 3,
      question: "What does the 'key' prop do in React lists?",
      options: [
        "It styles the list items",
        "It helps React identify which items have changed",
        "It sorts the list items",
        "It validates the list data",
      ],
      correctAnswer: 1,
      explanation:
        "The 'key' prop helps React identify which items have changed, are added, or are removed for efficient re-rendering.",
    },
    {
      id: 4,
      question:
        "Which JavaScript method is used to add elements to the end of an array?",
      options: ["unshift()", "push()", "splice()", "concat()"],
      correctAnswer: 1,
      explanation:
        "push() adds one or more elements to the end of an array and returns the new length.",
    },
    {
      id: 5,
      question: "What is the difference between '==' and '===' in JavaScript?",
      options: [
        "No difference, they work the same",
        "== checks type and value, === checks only value",
        "== checks only value, === checks type and value",
        "=== is used for objects, == for primitives",
      ],
      correctAnswer: 2,
      explanation:
        "== performs type coercion and compares values, while === compares both type and value without coercion.",
    },
    {
      id: 6,
      question: "Which CSS unit is relative to the viewport width?",
      options: ["px", "em", "vw", "rem"],
      correctAnswer: 2,
      explanation:
        "vw (viewport width) is relative to 1% of the viewport's width.",
    },
    {
      id: 7,
      question: "What is the purpose of React's useState hook?",
      options: [
        "To handle component lifecycle",
        "To manage local component state",
        "To connect to external APIs",
        "To optimize performance",
      ],
      correctAnswer: 1,
      explanation:
        "useState allows functional components to have local state management.",
    },
    {
      id: 8,
      question:
        "Which HTML5 semantic element should be used for the main content area?",
      options: ["<div>", "<section>", "<main>", "<article>"],
      correctAnswer: 2,
      explanation:
        "<main> represents the main content area of a document, excluding headers, footers, and sidebars.",
    },
    {
      id: 9,
      question: "What does 'event.preventDefault()' do in JavaScript?",
      options: [
        "Stops event bubbling",
        "Prevents the default browser action",
        "Removes event listeners",
        "Cancels all events",
      ],
      correctAnswer: 1,
      explanation:
        "preventDefault() prevents the default action that belongs to the event from occurring.",
    },
    {
      id: 10,
      question: "Which CSS property is used to make text bold?",
      options: [
        "text-weight: bold",
        "font-weight: bold",
        "font-style: bold",
        "text-style: bold",
      ],
      correctAnswer: 1,
      explanation:
        "font-weight: bold is the correct CSS property to make text bold.",
    },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = answerIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateScore();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });
    const finalScore = (correctAnswers / questions.length) * 100;
    setScore(finalScore);
    setShowResults(true);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  const handleFinish = () => {
    const passed = score >= 60;
    onQuizComplete(passed, score);
  };

  if (showResults) {
    const passed = score >= 60;
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full bg-white rounded-xl shadow-md p-6 text-center">
          <div
            className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 ${
              passed ? "bg-green-100" : "bg-red-100"
            }`}
          >
            {passed ? (
              <Award className="h-6 w-6 text-green-600" />
            ) : (
              <XCircle className="h-6 w-6 text-red-600" />
            )}
          </div>

          <h2
            className={`text-2xl font-bold mb-2 ${
              passed ? "text-green-600" : "text-red-600"
            }`}
          >
            {passed ? "Congratulations! 🎉" : "Quiz Not Passed 😔"}
          </h2>

          <div className="text-sm text-gray-600 mb-4">
            You scored {score.toFixed(0)}% ({Math.round(score / 10)} out of 10
            correct)
          </div>

          {passed ? (
            <>
              <p className="text-gray-700 text-sm mb-4">
                You've qualified as a mentor on Skill Bridge!
              </p>
              <button
                onClick={handleFinish}
                className="w-full py-2 bg-green-600 text-white rounded-md hover:bg-green-700 text-sm font-medium"
              >
                Complete Registration
              </button>
            </>
          ) : (
            <>
              <p className="text-gray-700 text-sm mb-4">
                You need at least 60% to qualify. You can try again!
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleRetry}
                  className="flex-1 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm"
                >
                  Retake Quiz
                </button>
                <button
                  onClick={onBack}
                  className="flex-1 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 text-sm"
                >
                  Back to Signup
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 pt-32">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">
              Mentor Eligibility Quiz
            </h1>
            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
              Question {currentQuestion + 1} of {questions.length}
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${((currentQuestion + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
          <p className="text-gray-600 mt-4">
            Answer all questions to test your frontend development knowledge.
            You need 60% or higher to qualify as a mentor.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            {questions[currentQuestion].question}
          </h2>
          <div className="space-y-4 mb-8">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(index)}
                className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-200 ${
                  selectedAnswers[currentQuestion] === index
                    ? "border-blue-500 bg-blue-50 text-blue-900"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                      selectedAnswers[currentQuestion] === index
                        ? "border-blue-500 bg-blue-500"
                        : "border-gray-300"
                    }`}
                  >
                    {selectedAnswers[currentQuestion] === index && (
                      <CheckCircle className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className="font-medium">{option}</span>
                </div>
              </button>
            ))}
          </div>

          <div className="flex justify-between">
            <button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Previous
            </button>

            <div className="flex space-x-4">
              <button
                onClick={onBack}
                className="px-6 py-3 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Back to Signup
              </button>

              <button
                onClick={handleNext}
                disabled={selectedAnswers[currentQuestion] === undefined}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {currentQuestion === questions.length - 1
                  ? "Finish Quiz"
                  : "Next"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MentorQuiz;
