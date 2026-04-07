import React, { useState } from 'react';
import { MapPin, Briefcase, DollarSign, Calendar, Eye, Heart, Share2 } from 'lucide-react';
import { MOCK_JOBS } from '../constants/defaultData';
import useThemeStore from '../zustand/themeStore';

const DefaultJobsDisplay = () => {
  const { mode } = useThemeStore();
  const [savedJobs, setSavedJobs] = useState({});
  const [selectedJob, setSelectedJob] = useState(MOCK_JOBS[0]);

  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-gray-50';
  const hoverBg = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gray-50';
  const tagBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-100';

  const toggleSaveJob = (jobId) => {
    setSavedJobs((prev) => ({
      ...prev,
      [jobId]: !prev[jobId],
    }));
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const daysUntilDeadline = (deadline) => {
    const days = Math.ceil(
      (new Date(deadline) - new Date()) / (1000 * 60 * 60 * 24)
    );
    return days > 0 ? `${days} days left` : 'Expired';
  };

  return (
    <div className={`${bgPrimary} min-h-screen p-4 md:p-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold ${textPrimary} mb-2`}>
            Featured Jobs
          </h1>
          <p className={`text-lg ${textSecondary}`}>
            Explore {MOCK_JOBS.length} amazing opportunities
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Jobs List */}
          <div className="lg:col-span-1">
            <div className="space-y-4 max-h-[600px] overflow-y-auto">
              {MOCK_JOBS.map((job) => (
                <div
                  key={job.id}
                  onClick={() => setSelectedJob(job)}
                  className={`${cardBg} border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedJob?.id === job.id
                      ? mode === 'dark'
                        ? 'border-[#00B2A9] shadow-lg'
                        : 'border-blue-500 shadow-lg'
                      : borderColor
                  } ${hoverBg}`}
                >
                  <h3 className={`font-semibold ${textPrimary} mb-1 truncate`}>
                    {job.title}
                  </h3>
                  <p className={`text-sm ${textSecondary} mb-2 truncate`}>
                    {job.company}
                  </p>
                  <div className="flex items-center gap-1 mb-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span className={`text-xs ${textSecondary}`}>
                      {job.location}
                    </span>
                  </div>
                  <p className={`text-sm font-semibold text-emerald-500 mb-2`}>
                    {job.salary}
                  </p>
                  <div className="flex gap-1 flex-wrap">
                    {job.tags?.slice(0, 2).map((tag, idx) => (
                      <span
                        key={idx}
                        className={`text-xs px-2 py-1 rounded ${tagBg} ${textSecondary}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Details */}
          <div className="lg:col-span-2">
            {selectedJob && (
              <div className={`${cardBg} border ${borderColor} rounded-xl p-6`}>
                {/* Header */}
                <div className="mb-6 border-b border-opacity-10 pb-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className={`text-3xl font-bold ${textPrimary} mb-2`}>
                        {selectedJob.title}
                      </h2>
                      <p className={`text-lg ${textSecondary}`}>
                        {selectedJob.company}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => toggleSaveJob(selectedJob.id)}
                        className={`p-3 rounded-lg transition-all ${
                          savedJobs[selectedJob.id]
                            ? 'bg-red-500/20 text-red-500'
                            : `${hoverBg} ${textSecondary}`
                        }`}
                      >
                        <Heart
                          className="w-5 h-5"
                          fill={savedJobs[selectedJob.id] ? 'currentColor' : 'none'}
                        />
                      </button>
                      <button className={`p-3 rounded-lg ${hoverBg} ${textSecondary}`}>
                        <Share2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {/* Key Info */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div>
                      <p className={`text-sm ${textSecondary} mb-1`}>Location</p>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4 text-blue-500" />
                        <p className={`font-semibold ${textPrimary}`}>
                          {selectedJob.location}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm ${textSecondary} mb-1`}>Salary</p>
                      <div className="flex items-center gap-1">
                        <DollarSign className="w-4 h-4 text-emerald-500" />
                        <p className={`font-semibold ${textPrimary}`}>
                          {selectedJob.salary}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm ${textSecondary} mb-1`}>Type</p>
                      <div className="flex items-center gap-1">
                        <Briefcase className="w-4 h-4 text-purple-500" />
                        <p className={`font-semibold ${textPrimary}`}>
                          {selectedJob.jobType}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p className={`text-sm ${textSecondary} mb-1`}>Deadline</p>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4 text-orange-500" />
                        <p className={`font-semibold ${textPrimary}`}>
                          {daysUntilDeadline(selectedJob.deadline)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <div className="mb-6">
                  <h3 className={`text-xl font-semibold ${textPrimary} mb-2`}>
                    About the Role
                  </h3>
                  <p className={`${textSecondary} leading-relaxed`}>
                    {selectedJob.description}
                  </p>
                </div>

                {/* Requirements */}
                <div className="mb-6">
                  <h3 className={`text-xl font-semibold ${textPrimary} mb-3`}>
                    Requirements
                  </h3>
                  <ul className={`space-y-2`}>
                    {selectedJob.requirements.map((req, idx) => (
                      <li key={idx} className={`flex gap-2 ${textSecondary}`}>
                        <span className="text-emerald-500 font-bold">✓</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Responsibilities */}
                {selectedJob.responsibilities && (
                  <div className="mb-6">
                    <h3 className={`text-xl font-semibold ${textPrimary} mb-3`}>
                      Responsibilities
                    </h3>
                    <ul className={`space-y-2`}>
                      {selectedJob.responsibilities.map((resp, idx) => (
                        <li key={idx} className={`flex gap-2 ${textSecondary}`}>
                          <span className="text-blue-500 font-bold">→</span>
                          <span>{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tags */}
                <div className="mb-6">
                  <h3 className={`text-xl font-semibold ${textPrimary} mb-3`}>
                    Skills
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedJob.tags?.map((tag, idx) => (
                      <span
                        key={idx}
                        className={`px-4 py-2 rounded-full text-sm font-medium ${tagBg} ${textSecondary}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* CTA Button */}
                <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-lg transition-colors">
                  Apply Now
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultJobsDisplay;
