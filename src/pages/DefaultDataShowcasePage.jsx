import React, { useState } from 'react';
import DefaultJobsDisplay from '../components/DefaultJobsDisplay';
import DefaultHackathonsDisplay from '../components/DefaultHackathonsDisplay';
import useThemeStore from '../zustand/themeStore';

const DefaultDataShowcasePage = () => {
  const { mode } = useThemeStore();
  const [activeTab, setActiveTab] = useState('jobs');

  const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const tabActiveBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-blue-100';

  return (
    <div className={`${bgPrimary} min-h-screen`}>
      {/* Navigation Tabs */}
      <div className={`border-b ${borderColor} sticky top-0 z-10 bg-opacity-95 backdrop-blur`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex gap-8">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`py-4 px-2 font-semibold transition-all border-b-2 ${
                activeTab === 'jobs'
                  ? 'border-blue-500 text-blue-500'
                  : `border-transparent ${textSecondary} hover:${textPrimary}`
              }`}
            >
              Jobs ({5})
            </button>
            <button
              onClick={() => setActiveTab('hackathons')}
              className={`py-4 px-2 font-semibold transition-all border-b-2 ${
                activeTab === 'hackathons'
                  ? 'border-cyan-500 text-cyan-500'
                  : `border-transparent ${textSecondary} hover:${textPrimary}`
              }`}
            >
              Hackathons ({6})
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'jobs' && <DefaultJobsDisplay />}
        {activeTab === 'hackathons' && <DefaultHackathonsDisplay />}
      </div>
    </div>
  );
};

export default DefaultDataShowcasePage;
