import { useState } from 'react';

const Quiz = ({ questions }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswer = (optionIndex) => {
    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setUserAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    return userAnswers.reduce((score, answer, index) => {
      return answer === questions[index].answer ? score + 1 : score;
    }, 0);
  };

  if (showResult) {
    const score = calculateScore();
    return (
      <div className="p-4 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Quiz Result</h2>
        <p className="text-lg">You scored {score} out of {questions.length}</p>
        <button
          onClick={() => {
            setCurrentQuestionIndex(0);
            setUserAnswers([]);
            setShowResult(false);
          }}
          className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
        >
          Restart Quiz
        </button>
      </div>
    );
  }

  return (
    <div className="p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">{currentQuestion.q}</h2>
      <div className="space-y-2">
        {currentQuestion.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleAnswer(index)}
            className="w-full text-left p-2 bg-gray-100 rounded hover:bg-gray-200"
          >
            {option}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Quiz;
