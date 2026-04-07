import React, { useState, useEffect } from "react";
import useAuthStore from "../../zustand/auth/useAuthStore";
import useThemeStore from "../../zustand/themeStore";
import { useLocation, useNavigate } from "react-router-dom";
import { validateLoginForm } from "../../utils/validation/authFormValidation";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, loginStatus, authUser } = useAuthStore();
  const { mode } = useThemeStore();
  const location = useLocation();
  const navigate = useNavigate();

  const navigateToPage = location.state?.from?.pathname || '/learnhub';
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const bgPrimary = mode === 'dark' ? 'bg-[#0F1419]' : 'bg-gray-50';
  const bgSecondary = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const bgTertiary = mode === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textTertiary = mode === 'dark' ? 'text-gray-500' : 'text-gray-500';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const inputBorder = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const errorBg = mode === 'dark' ? 'bg-red-900/30' : 'bg-red-50';
  const iconColor = mode === "dark" ? "text-gray-500" : "text-gray-400";
  const iconHover = mode === "dark" ? "hover:text-gray-300" : "hover:text-gray-600";
  const cardHover = mode === 'dark' ? 'hover:bg-[#1F2937]' : 'hover:bg-gray-50';
  const inputBg = mode === 'dark' ? 'bg-[#1B2E31] border-gray-700' : 'bg-white border-gray-300';
  const accentGradient = mode === 'dark'
    ? 'from-primary  to-secondary'
    : 'from-secondary  to-primary';

  const errorBorder = mode === 'dark' ? 'border-red-800' : 'border-red-200';
  const errorText = mode === 'dark' ? 'text-red-400' : 'text-red-700';
  const hoverBorder = mode === 'dark' ? 'hover:border-gray-600' : 'hover:border-gray-300';
  const selectedBg = mode === 'dark' ? 'bg-primary/30' : 'bg-indigo-50';
  const iconText = mode === 'dark' ? 'text-gray-500' : 'text-gray-500';
  const handleChange = (e) => {
    const { value, name } = e.target; 
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (validationErrors[name]) {
      setValidationErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  useEffect(() => {
    if (loginStatus?.success && authUser) {
      if (authUser.role === "teacher") {
        navigate("/teacher/dashboard", { replace: true });
      } else if (authUser.role === "recruiter") {
        navigate("/recruiter/dashboard", { replace: true });
      } else {
        navigate("/learnhub", { replace: true });
      }
    }
  }, [loginStatus, authUser, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateLoginForm(formData);
    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;
    const user = login(formData);
    if (loginStatus?.success && !loginStatus?.isLoading && !loginStatus?.failureReason && user) {
      if (user.role === "user") navigate("/learnhub");
      else if (user.role === "teacher") navigate("/teacher-dashboard");
      else if (user.role === "recruiter") navigate("/recruiter/dashboard");
      else navigate("/");
    }
  };

  return (
    <div className={`min-h-screen ${bgPrimary} flex items-center justify-center p-4`}>
      <div className={`${bgSecondary} rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid lg:grid-cols-2 min-h-[600px]`}>

        {/* Left Panel - Image Section */}
        <div className={`hidden lg:flex relative ${textPrimary} border-r ${borderColor} p-12 items-center justify-center overflow-hidden`}>
          {/* Background Pattern */}
          {/* <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div> */}

          {/* Content */}
          <div className="relative z-10 text-center  ">
            <div className="mb-8">
              <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253z" />
                </svg>
              </div>
              <h1 className={`text-4xl font-bold ${textPrimary} mb-4 leading-tight`}>
                Welcome to <br /> Learnova.ai
              </h1>


              <p className={`${textSecondary} text-lg max-w-md mx-auto leading-relaxed`}>
                Your unified platform for learning, teaching, and recruitment
              </p>
            </div>

            {/* Feature Cards */}
            <div className="grid grid-cols-3 gap-4 mt-12 max-w-lg mx-auto">
              <div className="bg-backGray shadow-md backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className={`w-12 h-12   ${textPrimary} border-1 ${borderColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <svg className={`w-6 h-6 ${textPrimary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className={` text-sm font-medium ${textPrimary} `}>Students</p>
              </div>

              <div className="bg-backGray backdrop-blur-sm shadow-md rounded-2xl p-4 border border-white/20">
                <div className={`w-12 h-12   ${textPrimary} border-1 ${borderColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <svg className={`w-6 h-6 ${textPrimary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className={` text-sm font-medium ${textPrimary} `}>Recruiters</p>
              </div>

              <div className="bg-backGray backdrop-blur-sm shadow-md rounded-2xl p-4 border border-white/20">
                <div className={`w-12 h-12   ${textPrimary} border-1 ${borderColor} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                  <svg className={`w-6 h-6 ${textPrimary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <p className={` text-sm font-medium ${textPrimary} `}>Teachers</p>
              </div>
            </div>

            {/* Placeholder for custom image */}
            <div className="mt-12 text-white/70 text-sm">
              {/* Replace this div with your custom image:
                  <img src="/path-to-your-image.png" alt="LearnHub" className="mx-auto max-w-md" />
              */}
            </div>
          </div>
        </div>

        {/* Right Panel - Login Form */}
        <div className={`flex items-center justify-center p-8 lg:p-12 ${bgSecondary}`}>
          <div className="w-full max-w-md">

            {/* Logo for Mobile */}
            <div className="lg:hidden text-center mb-8">
              <div className={`w-16 h-16 bg-gradient-to-br ${accentGradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253z" />
                </svg>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h2 className={`text-3xl font-bold ${textPrimary} mb-2`}>Sign In</h2>
              <p className={textSecondary}>Access your Learnova.ai account</p>

            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Email Field */}
              <div>
                <label className={`block text-sm font-medium ${textTertiary} mb-2`}>
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 ${inputBg} border ${validationErrors.email ? 'border-red-500' : inputBorder
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${textPrimary}`}
                  />
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <svg className={`h-5 w-5 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                    </svg>
                  </div>
                </div>
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Password Field */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className={`block text-sm font-medium ${textTertiary}`}>
                    Password
                  </label>
                  <a href="/forgot-password" className="text-sm text-primary hover:text-secondary font-medium">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 ${inputBg} border ${validationErrors.password ? 'border-red-500' : inputBorder
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${textPrimary}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className={`absolute inset-y-0 right-0 pr-3 flex items-center ${iconColor} ${iconHover}`}
                  >
                    {showPassword ? (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                    )}
                  </button>
                </div>
                {validationErrors.password && (
                  <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {validationErrors.password}
                  </p>
                )}
              </div>

              {/* Login Error */}
              {loginStatus?.failureReason && (
                <div className={`p-4 ${errorBg} border ${errorBorder} rounded-xl`}>
                  <p className={`${errorText} text-sm flex items-center gap-2`}>
                    <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    {loginStatus.failureReason}
                  </p>
                </div>
              )}

              {/* Remember Me */}
              {/* <div className="flex items-center">
                <input
                  type="checkbox"
                  id="remember"
                  className="w-4 h-4 text-primary bg-gray-50 border-gray-300 rounded focus:ring-2 focus:ring-primary"
                />
                <label htmlFor="remember" className={`ml-2 text-sm ${textTertiary}`}>
                  Keep me signed in
                </label>
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loginStatus?.isLoading}
                className={`w-full bg-gradient-to-r ${accentGradient} hover:opacity-90 cursor-pointer text-white py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl`}
              >
                {loginStatus?.isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>

              {/* Register Link */}
              <div className="text-center pt-4">
                <p className={`${textSecondary} text-sm`}>
                  New to Learnova.ai?{" "}
                  <a href="/register" className="text-primary hover:text-secondary font-semibold">
                    Create an account
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;