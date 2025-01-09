import React, { useState, useEffect } from 'react';
import { Clock, Brain } from 'lucide-react';
import { useStore } from '../store/useStore';
import { ReadingTest } from '../types';

const sampleTest: ReadingTest = {
  passage: `The art of reading is a fundamental skill that opens doors to knowledge, imagination, and personal growth. When we read, we engage multiple cognitive processes simultaneously. Our brains decode symbols into meaning, create mental images, and connect new information with existing knowledge. This complex process happens almost instantaneously for experienced readers, yet the depth of engagement can vary significantly based on purpose and material.`,
  questions: [
    {
      question: "What does reading engage according to the passage?",
      options: [
        "Physical abilities",
        "Multiple cognitive processes",
        "Social skills",
        "Mathematical skills"
      ],
      correctAnswer: 1
    }
  ],
  wordCount: 71
};

export function ReadingSpeedTest() {
  const [startTime, setStartTime] = useState<number | null>(null);
  const [showQuestions, setShowQuestions] = useState(false);
  const [answers, setAnswers] = useState<number[]>([]);
  const { setCalculatedWpm } = useStore();

  const handleStartReading = () => {
    setStartTime(Date.now());
  };

  const handleFinishReading = () => {
    if (startTime) {
      setShowQuestions(true);
    }
  };

  const calculateWPM = () => {
    if (startTime && answers.length > 0) {
      const timeInMinutes = (Date.now() - startTime) / 1000 / 60;
      const correctAnswers = answers.filter(
        (answer, index) => answer === sampleTest.questions[index].correctAnswer
      ).length;
      
      if (correctAnswers === sampleTest.questions.length) {
        const wpm = Math.round(sampleTest.wordCount / timeInMinutes);
        setCalculatedWpm(wpm);
      }
    }
  };

  useEffect(() => {
    if (answers.length === sampleTest.questions.length) {
      calculateWPM();
    }
  }, [answers]);

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Clock className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Reading Speed Test</h2>
      </div>

      {!showQuestions && !startTime && (
        <div className="text-center">
          <p className="mb-4">Click the button below to start the reading test.</p>
          <button
            onClick={handleStartReading}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            Start Reading
          </button>
        </div>
      )}

      {!showQuestions && startTime && (
        <div>
          <div className="prose max-w-none mb-6">
            <p className="text-gray-700 leading-relaxed">{sampleTest.passage}</p>
          </div>
          <button
            onClick={handleFinishReading}
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors"
          >
            I'm Done Reading
          </button>
        </div>
      )}

      {showQuestions && (
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <Brain className="w-6 h-6 text-purple-600" />
            <h3 className="text-xl font-semibold">Comprehension Check</h3>
          </div>
          {sampleTest.questions.map((q, index) => (
            <div key={index} className="space-y-4">
              <p className="font-medium">{q.question}</p>
              <div className="space-y-2">
                {q.options.map((option, optionIndex) => (
                  <label key={optionIndex} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={optionIndex}
                      onChange={() => {
                        const newAnswers = [...answers];
                        newAnswers[index] = optionIndex;
                        setAnswers(newAnswers);
                      }}
                      className="text-blue-600"
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}