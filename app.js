import React, { useState } from "react";
import "./styles.css";

const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "What is 2 + 2?",
    options: ["3", "4", "5", "22"],
    answer: "4",
  },
  {
    question: "What color is the sky?",
    options: ["Green", "Blue", "Red", "Yellow"],
    answer: "Blue",
  },
];

function App() {
  const [username, setUsername] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleLogin = () => {
    if (username.trim()) setIsLoggedIn(true);
  };

  const handleAnswer = (option) => {
    setSelectedOption(option);
    const isCorrect = option === questions[currentQuestionIndex].answer;
    if (isCorrect) setScore(score + 1);
    setTimeout(() => {
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setSelectedOption(null);
      } else {
        setShowResult(true);
      }
    }, 1000);
  };

  const playAgain = () => {
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
  };

  const backToLogin = () => {
    setIsLoggedIn(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedOption(null);
    setShowResult(false);
    setUsername("");
  };

  return (
    <div className="app-container">
      {!isLoggedIn ? (
        <div className="login-form">
          <h2>🎯 Welcome to the Quiz Game!</h2>
          <input
            type="text"
            placeholder="Enter your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleLogin}>Start Quiz</button>
        </div>
      ) : (
        <div className="quiz-container">
          {showResult ? (
            <div className="result">
              <h2>Quiz Complete 🎉</h2>
              <p>
                {username}, your score: {score} / {questions.length}
              </p>
              <button onClick={playAgain}>Play Again</button>
            </div>
          ) : (
            <>
              <h2>Question {currentQuestionIndex + 1}</h2>
              <p>{questions[currentQuestionIndex].question}</p>
              <div className="options">
                {questions[currentQuestionIndex].options.map((option) => {
                  let className = "option-btn";
                  if (selectedOption) {
                    if (option === questions[currentQuestionIndex].answer) {
                      className += " correct";
                    } else if (option === selectedOption) {
                      className += " wrong";
                    }
                  }
                  return (
                    <button
                      key={option}
                      className={className}
                      onClick={() => handleAnswer(option)}
                      disabled={!!selectedOption}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
              <div className="bottom-actions">
                <button className="back-button" onClick={backToLogin}>
                  <span className="arrow">←</span> Back to Login
                </button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
