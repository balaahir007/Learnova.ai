import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { AlertCircle, RefreshCw, LogIn } from 'lucide-react';
import useAuthStore from '../../zustand/auth/useAuthStore';
import { FaPlus } from 'react-icons/fa';
import { FiClock } from 'react-icons/fi';
import useThemeStore from '../../zustand/themeStore';

const StudySpaceError = ({ error, onRetry, joinSpace, joinSpaceState }) => {
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const navigate = useNavigate();
  const { authUser, checkAuth, logout } = useAuthStore();


  console.log("joinSpaceState", joinSpaceState)
  const isAuthError = error?.errorCode === "NO_TOKEN" ||
    error?.errorCode === 'USER_NOT_FOUND' ||
    error?.errorCode === 'INVALID_TOKEN';

  const isUserNotExsist = error?.errorCode === 'USER_NOT_IN_STUDY_SPACE'

  // Give some time for token refresh before showing login prompt
  useEffect(() => {
    if (isAuthError && retryCount < 2) {
      const timer = setTimeout(() => {
        setRetryCount(prev => prev + 1);
        console.log("stdmjk jsk fd")
        checkAuth(); // Try to refresh auth
      }, 1000);

      return () => clearTimeout(timer);
    } else if (isAuthError && retryCount >= 2) {
      setShowLoginPrompt(true);
    }
  }, [isAuthError, retryCount, checkAuth]);

  const handleRetry = async () => {
    setRetryCount(0);
    setShowLoginPrompt(false);
    if (onRetry) {
      await onRetry();
    } else {
      window.location.reload();
    }
  };



  const handleGoToLogin = () => {
    logout(); // Clear any invalid auth state
    navigate('/login');
  };

  const handleStayOnPage = () => {
    setShowLoginPrompt(false);
    setRetryCount(0);
  };

  // Show login prompt for auth errors after retries
  if (isAuthError && showLoginPrompt) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full mx-4">
          <div className="text-center">
            <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-red-600" />
            </div>

            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Authentication Required
            </h3>

            <p className="text-gray-600 mb-6">
              Your session has expired or there's an authentication issue.
              Please log in again to continue.
            </p>

            <div className="space-y-3">
              <button
                onClick={handleGoToLogin}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Go to Login
              </button>

              <button
                onClick={handleRetry}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>

              <button
                onClick={handleStayOnPage}
                className="w-full px-4 py-2 text-gray-500 hover:text-gray-700 transition-colors text-sm"
              >
                Stay on this page
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Show loading during retry attempts
  if (isAuthError && retryCount > 0 && !showLoginPrompt) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }


  const { mode } = useThemeStore()
  const spinBorder = mode === 'dark' ? 'border-white' : 'border-white'
  const bgPrimary = mode === "dark" ? "bg-[#294B4E]" : "bg-white";
  const textPrimary = mode === "dark" ? "text-gray-100" : "text-gray-800";
  const textSecondary = mode === "dark" ? "text-gray-800" : "text-gray-700";
  const borderColor = mode === "dark" ? "border-gray-700" : "border-gray-300";

  let joinButtonContent;
  if (joinSpaceState?.success) {
    joinButtonContent = <>
      <FiClock className="w-4 h-4 text-yellow-300" /> Pending Admin Approval
    </>;
  } else if (joinSpaceState?.loading) {
    joinButtonContent = <span className={`border-2 ${spinBorder} border-t-transparent rounded-full h-5 w-5 animate-spin`}></span>;
  } else {
    joinButtonContent = <>
      <FaPlus className="w-4 h-4" /> Join StudySpace
    </>;
  }

  // Handle other error types
  return (
    <div className="w-full min-h-screen flex items-center justify-center bg-backGray px-4">
      <div
        className={`${bgPrimary} rounded-2xl shadow-xl p-8 max-w-md w-full border ${borderColor}`}
      >
        <div className="text-center">

          {/* Alert Icon */}
          <div className="flex items-center justify-center w-16 h-16 bg-primary100 rounded-full mx-auto mb-5 shadow-sm">
            <AlertCircle className="w-8 h-8 text-primary" />
          </div>

          {/* Error Heading */}
          <h3 className={`text-2xl font-semibold ${textPrimary} mb-3`}>
            {getErrorTitle(error?.errorCode)}
          </h3>

          {/* Error Message */}
          <p className={`text-sm leading-relaxed ${textSecondary} mb-6`}>
            {getErrorMessage(error?.errorCode)}
          </p>

          {/* API Errors */}
          {joinSpaceState?.erorr && (
            <div className="mb-4 p-3 rounded-lg bg-red-50 text-red-600 text-sm border border-red-200">
              {joinSpaceState?.erorr || "Something went wrong"}
            </div>
          )}

          <div className="space-y-3 mt-4">

            {/* Join Button (when user not exist) */}
            {isUserNotExsist ? (
              <button
                disabled={joinSpaceState?.success || joinSpaceState?.loading}
                onClick={joinSpace}
                className={`w-full flex items-center justify-center gap-2 px-4 py-3 
              rounded-lg transition-colors font-medium
              ${joinSpaceState?.success
                    ? "bg-gray-300 cursor-not-allowed text-gray-700"
                    : "bg-primary text-white hover:bg-secondary"
                  }`}
              >
                {joinButtonContent}
              </button>
            ) : (
              /* Retry Button */
              <button
                onClick={handleRetry}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary text-white rounded-lg hover:bg-secondary transition-colors font-medium"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            )}

            {/* Explore Button */}
            <button
              onClick={() => navigate('/study-space')}
              className={`w-full px-4 py-3 shadow-sm rounded-lg font-medium text-primary border ${borderColor} hover:bg-primary100 transition-colors`}
            >
              Explore Study Space
            </button>
          </div>

          {/* Debug Error Message */}
          {error?.message && (
            <div className="mt-5 p-3 bg-tertiary text-gray-600 text-xs rounded-md border">
              Error Details: {error.message}
            </div>
          )}

        </div>
      </div>
    </div>

  );
};

const getErrorTitle = (errorCode) => {
  switch (errorCode) {
    case 'STUDY_SPACE_NOT_FOUND':
      return 'Study Space Not Found';
    case 'INTERNAL_SERVER_ERROR':
      return 'Server Error';
    case 'NETWORK_ERROR':
      return 'Connection Error';
    case 'ACCESS_DENIED':
      return 'Access Denied';
    case "USER_NOT_IN_STUDY_SPACE":
      return 'You are not a member of this study space.'
    default:
      return 'Something went wrong';
  }
};

const getErrorMessage = (errorCode) => {
  switch (errorCode) {
    case 'STUDY_SPACE_NOT_FOUND':
      return 'The study space you\'re looking for doesn\'t exist or you don\'t have access to it.';
    case 'INTERNAL_SERVER_ERROR':
      return 'We\'re experiencing some technical difficulties. Please try again in a moment.';
    case 'NETWORK_ERROR':
      return 'Please check your internet connection and try again.';
    case 'ACCESS_DENIED':
      return 'You don\'t have permission to access this study space.';
    case 'USER_NOT_IN_STUDY_SPACE':
      return 'Looks like you’re not a member of this study space yet';
    default:
      return 'An unexpected error occurred. Please try refreshing the page.';
  }
};

export default StudySpaceError;