import React from 'react';
import { Book as BookIcon, Clock, Tag } from 'lucide-react';
import { useStore } from '../store/useStore';
import { Book } from '../types';

// Sample book data - In a real app, this would come from an API
const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    cover: 'https://images.unsplash.com/photo-1544947950-fa07a98d237f?auto=format&fit=crop&q=80&w=400',
    wordCount: 47094,
    summary: 'A tale of wealth, love, and ambition in 1920s America, following the mysterious millionaire Jay Gatsby and his obsession with Daisy Buchanan.',
    genre: ['Classic', 'Literary Fiction'],
    rating: 4.5,
    amazonLink: 'https://amazon.com',
    audibleLink: 'https://audible.com'
  },
  {
    id: '2',
    title: 'Atomic Habits',
    author: 'James Clear',
    cover: 'https://images.unsplash.com/photo-1589829085413-56de8ae18c73?auto=format&fit=crop&q=80&w=400',
    wordCount: 67000,
    summary: 'A practical guide to building good habits and breaking bad ones, using proven scientific principles and real-world examples.',
    genre: ['Self-Help', 'Psychology'],
    rating: 4.8,
    amazonLink: 'https://amazon.com',
    audibleLink: 'https://audible.com'
  }
];

export function BookList() {
  const { readingPreferences } = useStore();
  
  const calculateReadingTime = (wordCount: number) => {
    const totalMinutes = wordCount / readingPreferences.wpm;
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours}h ${minutes}m`;
  };

  const maxWordCount = readingPreferences.wpm * readingPreferences.hoursPerDay * 60 * readingPreferences.daysToComplete;
  const recommendedBooks = sampleBooks.filter(book => book.wordCount <= maxWordCount);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <BookIcon className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Recommended Books</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {recommendedBooks.map((book) => (
          <div key={book.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">{book.title}</h3>
              <p className="text-gray-600 mb-4">by {book.author}</p>
              
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                <Clock className="w-4 h-4" />
                <span>{calculateReadingTime(book.wordCount)} reading time</span>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {book.genre.map((g) => (
                  <span
                    key={g}
                    className="flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                  >
                    <Tag className="w-3 h-3" />
                    {g}
                  </span>
                ))}
              </div>

              <p className="text-gray-700 mb-6">{book.summary}</p>

              <div className="flex gap-4">
                <a
                  href={book.amazonLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-blue-600 text-white text-center px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Buy on Amazon
                </a>
                <a
                  href={book.audibleLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-orange-600 text-white text-center px-4 py-2 rounded-lg hover:bg-orange-700 transition-colors"
                >
                  Listen on Audible
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}