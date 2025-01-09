export interface Book {
  id: string;
  title: string;
  author: string;
  cover: string;
  wordCount: number;
  summary: string;
  genre: string[];
  rating: number;
  amazonLink: string;
  audibleLink: string;
}

export interface ReadingPreferences {
  wpm: number;
  daysToComplete: number;
  hoursPerDay: number;
}

export interface ReadingTest {
  passage: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: number;
  }[];
  wordCount: number;
}