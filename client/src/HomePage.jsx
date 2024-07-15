import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-orange-50">
      <nav className="p-4 bg-gray-800">
        <div className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-16">
            <div className="flex items-center justify-center flex-1 sm:items-stretch sm:justify-start">
              <div className="hidden sm:block sm:ml-6">
                <div className="flex space-x-4">
                  <Link
                    to="/"
                    className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Home
                  </Link>
                  <Link
                    to="/trending-fashion"
                    className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Trending Fashion
                  </Link>
                  <Link
                    to="/realtime-sentiment-analysis"
                    className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Real-Time Sentiment Analysis
                  </Link>
                  <Link
                    to="/color-freq"
                    className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Color Frequency
                  </Link>
                  <Link
                    to="/word-cloud"
                    className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Word Cloud
                  </Link>
                  <Link
                    to="/sentiment-analysis"
                    className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Sentiment Analysis
                  </Link>
                  <Link
                    to="/forecast"
                    className="px-3 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
                  >
                    Forecast
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <main className="px-2 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="sm:px-0">
          <h1 className="mt-8 text-4xl font-bold text-center">Analysis site!</h1>
          <p className="mt-4 text-lg text-center">Explore different sections using the navigation above.</p>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
