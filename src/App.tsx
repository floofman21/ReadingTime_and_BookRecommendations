import React from 'react';
import { BookOpen } from 'lucide-react';
import { ReadingSpeedTest } from './components/ReadingSpeedTest';
import { ReadingPreferences } from './components/ReadingPreferences';
import { BookList } from './components/BookList';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">Reading Time Calculator</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 space-y-8">
        <ReadingSpeedTest />
        <ReadingPreferences />
        <BookList />
      </main>

      <footer className="bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <p className="text-center text-gray-600">
            © {new Date().getFullYear()} Reading Time Calculator. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;