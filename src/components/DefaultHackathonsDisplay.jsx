import React, { useState } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  Trophy,
  Clock,
  Tag,
  Heart,
  Share2,
  ExternalLink,
  Star,
} from 'lucide-react';
import { MOCK_HACKATHONS } from '../constants/defaultData';
import useThemeStore from '../zustand/themeStore';

const DefaultHackathonsDisplay = () => {
  const { mode } = useThemeStore();
  const [selectedHackathon, setSelectedHackathon] = useState(MOCK_HACKATHONS[0]);
  const [savedHackathons, setSavedHackathons] = useState({});

  const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
  const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-gray-50';
  const hoverBg = mode === 'dark' ? 'hover:bg-[#0F1E20]' : 'hover:bg-gray-50';
  const tagBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-100';
  const sectionBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';

  const toggleSaveHackathon = (hackId) => {
    setSavedHackathons((prev) => ({
      ...prev,
      [hackId]: !prev[hackId],
    }));
  };

  const getStatusColor = (status) => {
    const colors = {
      Open: 'bg-emerald-500/20 text-emerald-500 border-emerald-500/30',
      Upcoming: 'bg-blue-500/20 text-blue-500 border-blue-500/30',
      Closed: 'bg-red-500/20 text-red-500 border-red-500/30',
      Ongoing: 'bg-purple-500/20 text-purple-500 border-purple-500/30',
    };
    return colors[status] || colors.Upcoming;
  };

  const getDifficultyColor = (difficulty) => {
    const colors = {
      Beginner: 'text-green-500',
      Intermediate: 'text-yellow-500',
      Advanced: 'text-red-500',
    };
    return colors[difficulty] || colors.Intermediate;
  };

  const getDaysLeft = (endDate) => {
    const days = Math.ceil((new Date(endDate) - new Date()) / (1000 * 60 * 60 * 24));
    if (days < 0) return 'Ended';
    if (days === 0) return 'Ends today';
    if (days === 1) return 'Ends tomorrow';
    return `${days} days left`;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className={`${bgPrimary} min-h-screen p-4 md:p-8`}>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-4xl font-bold ${textPrimary} mb-2`}>
            Featured Hackathons
          </h1>
          <p className={`text-lg ${textSecondary}`}>
            Showcase your skills in {MOCK_HACKATHONS.length} exciting hackathons
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Hackathons List */}
          <div className="lg:col-span-1">
            <div className="space-y-3 max-h-[650px] overflow-y-auto">
              {MOCK_HACKATHONS.map((hack) => (
                <div
                  key={hack.id}
                  onClick={() => setSelectedHackathon(hack)}
                  className={`${cardBg} border-2 rounded-lg overflow-hidden cursor-pointer transition-all ${
                    selectedHackathon?.id === hack.id
                      ? mode === 'dark'
                        ? 'border-[#00B2A9] shadow-lg'
                        : 'border-cyan-500 shadow-lg'
                      : borderColor
                  } ${hoverBg}`}
                >
                  {/* Image */}
                  <div className="h-28 bg-gradient-to-br from-cyan-500 to-blue-600 overflow-hidden relative">
                    <img
                      src={hack.image}
                      alt={hack.title}
                      className="w-full h-full object-cover opacity-70"
                    />
                    {(hack.featured || hack.trending) && (
                      <div className="absolute top-2 right-2">
                        {hack.featured && (
                          <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        )}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-3">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`font-semibold ${textPrimary} line-clamp-1 flex-1`}>
                        {hack.title}
                      </h3>
                      <span
                        className={`text-xs px-2 py-1 rounded-full border ${getStatusColor(
                          hack.status
                        )} ml-2 whitespace-nowrap`}
                      >
                        {hack.status}
                      </span>
                    </div>
                    <p className={`text-xs ${textSecondary} mb-2 line-clamp-1`}>
                      {hack.organizer}
                    </p>
                    <div className="flex items-center gap-1 text-xs mb-2">
                      <Clock className="w-3 h-3 text-orange-500" />
                      <span className={textSecondary}>{getDaysLeft(hack.endDate)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-3 h-3 text-blue-500" />
                      <span className={`text-xs ${textSecondary}`}>
                        {hack.participants}/{hack.maxParticipants}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Hackathon Details */}
          <div className="lg:col-span-2">
            {selectedHackathon && (
              <div className={`${cardBg} border ${borderColor} rounded-xl overflow-hidden`}>
                {/* Banner */}
                <div className="h-48 bg-gradient-to-r from-cyan-500 to-blue-600 relative overflow-hidden">
                  <img
                    src={selectedHackathon.bannerImage}
                    alt={selectedHackathon.title}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  {selectedHackathon.featured && (
                    <div className="absolute top-4 left-4 flex items-center gap-1 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      <Star className="w-4 h-4 fill-current" />
                      Featured
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Header */}
                  <div className="mb-6 border-b border-opacity-10 pb-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h2 className={`text-3xl font-bold ${textPrimary} mb-2`}>
                          {selectedHackathon.title}
                        </h2>
                        <p className={`text-lg ${textSecondary}`}>
                          by {selectedHackathon.organizer}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => toggleSaveHackathon(selectedHackathon.id)}
                          className={`p-3 rounded-lg transition-all ${
                            savedHackathons[selectedHackathon.id]
                              ? 'bg-red-500/20 text-red-500'
                              : `${hoverBg} ${textSecondary}`
                          }`}
                        >
                          <Heart
                            className="w-5 h-5"
                            fill={
                              savedHackathons[selectedHackathon.id]
                                ? 'currentColor'
                                : 'none'
                            }
                          />
                        </button>
                        <button className={`p-3 rounded-lg ${hoverBg} ${textSecondary}`}>
                          <Share2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>

                    {/* Key Info Grid */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                      <div>
                        <p className={`text-sm ${textSecondary} mb-1`}>Type</p>
                        <p className={`font-semibold ${textPrimary}`}>{selectedHackathon.type}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${textSecondary} mb-1`}>Duration</p>
                        <p className={`font-semibold ${textPrimary}`}>{selectedHackathon.duration}</p>
                      </div>
                      <div>
                        <p className={`text-sm ${textSecondary} mb-1`}>Difficulty</p>
                        <p className={`font-semibold ${getDifficultyColor(selectedHackathon.difficulty)}`}>
                          {selectedHackathon.difficulty}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${textSecondary} mb-1`}>Location</p>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4 text-blue-500" />
                          <p className={`font-semibold ${textPrimary}`}>
                            {selectedHackathon.location}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className={`text-sm ${textSecondary} mb-1`}>Prize Pool</p>
                        <div className="flex items-center gap-1">
                          <Trophy className="w-4 h-4 text-yellow-500" />
                          <p className={`font-semibold ${textPrimary}`}>
                            {selectedHackathon.prizePool}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p className={`text-sm ${textSecondary} mb-1`}>Participants</p>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4 text-purple-500" />
                          <p className={`font-semibold ${textPrimary}`}>
                            {selectedHackathon.participants}/{selectedHackathon.maxParticipants}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="mb-6">
                    <h3 className={`text-xl font-semibold ${textPrimary} mb-2`}>
                      About
                    </h3>
                    <p className={`${textSecondary} leading-relaxed`}>
                      {selectedHackathon.longDescription}
                    </p>
                  </div>

                  {/* Important Dates */}
                  <div className={`${sectionBg} rounded-lg p-4 mb-6`}>
                    <h3 className={`text-lg font-semibold ${textPrimary} mb-3`}>
                      Important Dates
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className={`text-sm ${textSecondary} mb-1`}>Registration Ends</p>
                        <p className={`font-semibold ${textPrimary}`}>
                          {formatDate(selectedHackathon.registrationDeadline)}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${textSecondary} mb-1`}>Event Starts</p>
                        <p className={`font-semibold ${textPrimary}`}>
                          {formatDate(selectedHackathon.startDate)}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${textSecondary} mb-1`}>Event Ends</p>
                        <p className={`font-semibold ${textPrimary}`}>
                          {formatDate(selectedHackathon.endDate)}
                        </p>
                      </div>
                      <div>
                        <p className={`text-sm ${textSecondary} mb-1`}>Time Remaining</p>
                        <p className={`font-semibold text-emerald-500`}>
                          {getDaysLeft(selectedHackathon.endDate)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Themes & Tags */}
                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold ${textPrimary} mb-3`}>
                      Themes
                    </h3>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {selectedHackathon.themes.map((theme, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-sm font-medium ${tagBg} ${textSecondary}`}
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <h3 className={`text-lg font-semibold ${textPrimary} mb-3`}>
                      Technologies
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedHackathon.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className={`px-3 py-1 rounded-full text-sm font-medium border ${borderColor} ${textSecondary}`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <button className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2">
                      Register Now
                      <ExternalLink className="w-4 h-4" />
                    </button>
                    <a
                      href={selectedHackathon.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`${cardBg} border ${borderColor} text-center font-semibold py-3 rounded-lg hover:shadow-md transition-all flex items-center justify-center gap-2 ${textPrimary}`}
                    >
                      Learn More
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DefaultHackathonsDisplay;
