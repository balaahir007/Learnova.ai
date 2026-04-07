import React from 'react';
import { BookOpen, Users, Video } from 'lucide-react';

const StudySpaceLoadingSpinner = ({mode}) => {

  // Theme colors
  const colors = {
    primary: mode === 'dark' ? '#00B2A9' : '#0097B2',
    secondary: mode === 'dark' ? '#21464C' : '#00B2A9',
    bg: mode === 'dark' ? '#102226' : '#f9f9f9',
    text: mode === 'dark' ? '#E0E0E0' : '#333',
    spinnerRing: mode === 'dark' ? '#294B4E' : '#e0e0e0'
  };

  return (
    <div className={`w-full h-screen flex items-center justify-center`} style={{ background: colors.bg }}>
      <div className="text-center">
        {/* Main Spinner Container */}
        <div className="relative mb-8">
          {/* Outer Ring */}
          <div className="w-20 h-20 border-4 rounded-full animate-spin" style={{ borderColor: `${colors.spinnerRing} transparent ${colors.spinnerRing} transparent` }}>
            <div className="w-full h-full border-4 border-transparent rounded-full animate-spin" style={{ borderTopColor: colors.primary, borderRightColor: colors.secondary }}></div>
          </div>
          
          {/* Inner Pulsing Circle */}
          <div className="absolute inset-3 w-14 h-14 rounded-full flex items-center justify-center animate-pulse" style={{ background: `linear-gradient(to br, ${colors.primary}, ${colors.secondary})` }}>
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          
          {/* Floating Icons */}
          <div className="absolute -top-2 -left-2 w-6 h-6 rounded-full flex items-center justify-center animate-bounce" style={{ backgroundColor: colors.primary, animationDelay: '0s' }}>
            <Users className="w-3 h-3 text-white" />
          </div>
          
          <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center animate-bounce" style={{ backgroundColor: colors.secondary, animationDelay: '0.2s' }}>
            <Video className="w-3 h-3 text-white" />
          </div>
          
          <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full animate-bounce" style={{ background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})`, animationDelay: '0.4s' }}>
            <div className="w-2 h-2 bg-white rounded-full mx-auto mt-2"></div>
          </div>
        </div>

        {/* Loading Text */}
        <div className="space-y-2">
          <h3 className="text-xl font-semibold" style={{ color: colors.text }}>
            Loading Study Space
          </h3>
          <div className="flex items-center justify-center space-x-1">
            <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: colors.primary, animationDelay: '0s' }}></div>
            <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: colors.secondary, animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 rounded-full animate-bounce" style={{ backgroundColor: colors.primary, animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-sm mt-2" style={{ color: colors.text }}>
            Preparing your learning environment...
          </p>
        </div>

        {/* Progress Bar Animation */}
        <div className="mt-8 w-64 mx-auto">
          <div className="w-full rounded-full h-1.5" style={{ backgroundColor: colors.spinnerRing }}>
            <div className="h-1.5 rounded-full animate-pulse" style={{ width: '60%', background: `linear-gradient(to right, ${colors.primary}, ${colors.secondary})` }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySpaceLoadingSpinner;
