// MathProblem.js
import React from 'react';

const MathProblem = ({ problem, choice, onSelectAnswer }) => {
  return (
    <div>
      <p>{problem.question}</p>
      <ul>
        {problem.choices.map((choice, index) => (
          <li key={index}>
            <label>
              <input
                type="radio"
                name="answer"
                value={choice}
                onChange={() => onSelectAnswer(choice, problem.correctAnswer)}
              />
              {choice}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MathProblem;
