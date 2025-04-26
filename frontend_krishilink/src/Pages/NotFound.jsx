import React from 'react';
import { Link } from 'react-router-dom';
import { Plane as Plant, Home } from 'lucide-react';

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full text-center">
        <div className="bg-white rounded-2xl p-8 md:p-12 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <Plant className="absolute top-4 left-4 w-12 h-12" />
            <Plant className="absolute bottom-4 right-4 w-12 h-12" />
          </div>
          
          {/* Main Content */}
          <div className="relative z-10">
            <Plant className="w-24 h-24 mx-auto text-green-600 mb-6" />
            <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">Page Not Found</h2>
            <p className="text-gray-600 mb-8 max-w-md mx-auto">
              Looks like this crop hasn't sprouted yet! The page you're looking for doesn't exist or has been moved to a different field.
            </p>
            
            {/* Action Button */}
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 text-base font-medium text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              <Home className="w-5 h-5 mr-2 text-white" />
              <span className="text-white">Return Home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NotFound;