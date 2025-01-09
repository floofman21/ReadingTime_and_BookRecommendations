import React from 'react';
import { Settings } from 'lucide-react';
import { useStore } from '../store/useStore';

export function ReadingPreferences() {
  const { readingPreferences, setReadingPreferences, calculatedWpm } = useStore();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const parsedValue = value === '' ? 0 : parseInt(value, 10);
    setReadingPreferences({
      ...readingPreferences,
      [name]: parsedValue,
    });
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Settings className="w-6 h-6 text-blue-600" />
        <h2 className="text-2xl font-bold">Reading Preferences</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Reading Speed (words per minute)
          </label>
          <input
            type="number"
            name="wpm"
            value={calculatedWpm || readingPreferences.wpm || ''}
            onChange={handleChange}
            disabled={!!calculatedWpm}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {calculatedWpm && (
            <p className="text-sm text-gray-600 mt-1">
              Based on your reading test results
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Days to Complete
          </label>
          <input
            type="number"
            name="daysToComplete"
            value={readingPreferences.daysToComplete || ''}
            onChange={handleChange}
            min="1"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Hours per Day
          </label>
          <input
            type="number"
            name="hoursPerDay"
            value={readingPreferences.hoursPerDay || ''}
            onChange={handleChange}
            min="0.5"
            max="24"
            step="0.5"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}