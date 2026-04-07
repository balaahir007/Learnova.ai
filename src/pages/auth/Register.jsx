import React, { useState, useEffect } from "react";
import useAuthStore from "../../zustand/auth/useAuthStore";
import useThemeStore from "../../zustand/themeStore";
import { useLocation, useNavigate } from "react-router-dom";
import { validateRegisterForm } from "../../utils/validation/authFormValidation";
import OtpVerification from '../../components/OtpVerification';
import axiosInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    userType: "user", // student, teacher, recruiter
  });
  const [success, setSuccess] = useState(false);
  const [validationErrorMessage, setValidationErrorMessage] = useState({});
  const [openOtp, setOpenOtp] = useState(false);
  const [sendOtpLoading, setSendOtpLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { registerState, register } = useAuthStore();
  const { mode } = useThemeStore();
  const navigate = useNavigate();
  const location = useLocation();
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  // Theme variables
  const bgPrimary = mode === 'dark' ? 'bg-[#0F1419]' : 'bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50';
  const bgSecondary = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const textTertiary = mode === 'dark' ? 'text-gray-500' : 'text-gray-500';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const inputBg = mode === 'dark' ? 'bg-gray-800' : 'bg-gray-50';
  const inputBorder = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const accentGradient = 'from-primary to-secondary';
  const sidebarGradient = mode === 'dark' ? 'from-gray-800 via-gray-900 to-gray-800' : 'from-primary via-secondary to-primary/80';
  const errorBg = mode === 'dark' ? 'bg-red-900/30' : 'bg-red-50';
  const errorBorder = mode === 'dark' ? 'border-red-800' : 'border-red-200';
  const errorText = mode === 'dark' ? 'text-red-400' : 'text-red-700';
  const hoverBorder = mode === 'dark' ? 'hover:border-gray-600' : 'hover:border-gray-300';
  const selectedBg = mode === 'dark' ? 'bg-primary/30' : 'bg-indigo-50';
  const iconText = mode === 'dark' ? 'text-gray-500' : 'text-gray-500';
  const passwordToggle = mode === 'dark' ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600';

  const userTypes = [
    {
      value: "user",
      label: "Student",
      description: "Learn and grow",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253z" />
        </svg>
      )
    },
    {
      value: "teacher",
      label: "Teacher",
      description: "Teach and inspire",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      value: "recruiter",
      label: "Recruiter",
      description: "Find top talent",
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    }
  ];

  const handleResendOtp = async () => {
    setSendOtpLoading(true);
    try {
      await axiosInstance.post('/auth/verify/send-code', {
        identifier: formData.email,
        type: 'signup',
        channel: 'email'
      });
      toast.success("OTP sent successfully");
    } catch (error) {
      toast.error("Failed to resend OTP");
    } finally {
      setSendOtpLoading(false);
    }
  };

  

  const handleSendOtp = async (e) => {
    e.preventDefault();
    const validationError = validateRegisterForm(formData);
    console.log("user Data", validationError);
    setValidationErrorMessage(validationError);
    if (Object.keys(validationError).length > 0) return;

    setSendOtpLoading(true);
    try {
      await axiosInstance.post('/auth/verify/send-code', {
        identifier: formData.email,
        type: 'signup',
        channel: 'email'
      });
      setOpenOtp(true);
      toast.success("OTP sent successfully");
    } catch (error) {
      setValidationErrorMessage((prev) => ({
        ...prev,
        failureReason: error.response?.data?.message || error.message || "Failed to send OTP, try again"
      }));
      toast.error("Failed to send OTP");
    } finally {
      setSendOtpLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      const otpCode = code.join("");

      console.log("Verifying OTP Code:", otpCode);
      if (otpCode.length !== 6) {
        // toast.error("Please enter complete 6-digit code");
        return;
      }

      console.log("Verifying with:", {
        identifier: formData.email,
        code: otpCode
      });

      const res = await axiosInstance.post("/auth/verify/check-code", {
        identifier: formData.email,
        channel: 'email',
        type: 'signup',
        code: otpCode
      });

      if (res.data) {
        const user = await register(formData);

        console.log("Registered User:", user);
        if (user) {
          if (user?.role === "user") navigate("/learnhub");
          else if (user?.role === "teacher") navigate("/teacher/dashboard");
          else if (user?.role === "recruiter") navigate("/recruiter/dashboard");
          else navigate("/");

        }
      }
    } catch (err) {
      console.error("OTP Verification Error:", err);
      const errorMessage = err.response?.data?.message || err.message || "OTP verification failed";
      toast.error(errorMessage);
      setCode(["", "", "", "", "", ""]);
      throw err;
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (validationErrorMessage[name]) {
      setValidationErrorMessage((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleUserTypeChange = (type) => {
    setFormData((prev) => ({
      ...prev,
      userType: type,
    }));
  };

  useEffect(() => {
    if (registerState?.success && !registerState?.isLoading && !registerState.failureReason) {
      navigate("/");
    }
  }, [registerState, navigate]);

  return (
    <div className={`min-h-[600px]   bg-backGray flex items-center justify-center p-2`}>

      <div className={` rounded-3xl shadow-2xl mb-4 mt-1  overflow-hidden max-w-6xl w-full grid lg:grid-cols-2 md:max-h-[800px]`}>
        {/* Left Side - Hero Section */}
        <div className={`hidden lg:flex relative ${bgSecondary} border-r-1 ${borderColor} p-8 items-center justify-center overflow-hidden`}>
          <div className="absolute inset-0 opacity-10"></div>

          <div className="relative z-10 text-center w-full">
            <div className="mb-6">
              <div className="w-16 h-16   rounded-2xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                </svg>
              </div>

              <h1 className={`text-4xl font-bold ${textPrimary} mb-4 leading-tight`}>
                Join the<br />Learnova.ai Community
              </h1>

              <p className={`${textSecondary} text-base max-w-md mx-auto leading-relaxed`}>
                Start your journey with us and unlock endless possibilities
              </p>
            </div>

            <div className="mt-10 space-y-2 max-w-sm mx-auto">
              {[
                "Free to get started",
                "Connect & collaborate",
                "Track your progress",
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-3 p-3 rounded-xl 
                 bg-white/10 backdrop-blur-sm border border-white/20
                  transition-all duration-200"
                >
                  <div
                    className="w-7 h-7 rounded-lg flex items-center justify-center 
                   bg-gradient-to-br from-primary to-secondary shadow-md"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>

                  <p className={`font-medium ${textSecondary} text-base`}>
                    {item}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Right Side - Form */}
        {openOtp ? (
          <OtpVerification
            verifyOtp={verifyOtp}
            code={code}
            setCode={setCode}
            email={formData.email}
            onBack={() => setOpenOtp(false)}
            onResend={handleResendOtp}
            isLoading={sendOtpLoading}
          />
        ) : (
          <div className={`flex items-center justify-center p-4 lg:p-8 ${bgSecondary}`}>
            <div className="w-full max-w-md">
              <div className="lg:hidden text-center mb-4">
                <div className={`w-16 h-16 bg-gradient-to-br ${accentGradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                </div>
              </div>

              <div className="text-center mb-6">
                <h2 className={`text-3xl font-bold ${textPrimary} mb-2`}>Create Account</h2>
                <p className={`${textSecondary}`}>Join thousands of learners worldwide</p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-4">
                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-3`}>
                    Register as
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {userTypes.map((type) => (
                      <button
                        key={type.value}
                        type="button"
                        onClick={() => handleUserTypeChange(type.value)}
                        className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${formData.userType === type.value
                          ? `border-primary ${selectedBg} text-primary`
                          : `${borderColor} ${bgSecondary} ${textSecondary} ${hoverBorder}`
                          }`}
                      >
                        <div className={`mb-2 ${formData.userType === type.value ? 'text-primary' : iconText}`}>
                          {type.icon}
                        </div>
                        <span className="text-xs font-medium text-center">{type.label}</span>
                      </button>
                    ))}
                  </div>
                  <p className={`text-xs ${textTertiary} mt-2 text-center`}>
                    {userTypes.find(t => t.value === formData.userType)?.description || userTypes[0].description}
                  </p>
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Username
                  </label>
                  <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Choose a username"
                    className={`w-full px-4 py-3 ${inputBg} border ${validationErrorMessage.username ? 'border-red-500' : inputBorder
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${textPrimary}`}
                  />
                  {validationErrorMessage.username && (
                    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {validationErrorMessage.username}
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    className={`w-full px-4 py-3 ${inputBg} border ${validationErrorMessage.email ? 'border-red-500' : inputBorder
                      } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${textPrimary}`}
                  />
                  {validationErrorMessage.email && (
                    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {validationErrorMessage.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className={`block text-sm font-medium ${textPrimary} mb-2`}>
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="Create a strong password"
                      className={`w-full px-4 py-3 ${inputBg} border ${validationErrorMessage.password ? 'border-red-500' : inputBorder
                        } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${textPrimary}`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className={`absolute inset-y-0 right-0 pr-3 flex items-center ${passwordToggle}`}
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
                  <p className={`text-xs ${textTertiary} mt-1.5`}>Must be at least 8 characters</p>
                  {validationErrorMessage.password && (
                    <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {validationErrorMessage.password}
                    </p>
                  )}
                </div>

                {(registerState?.failureReason || validationErrorMessage.failureReason) && (
                  <div className={`p-4 ${errorBg} border ${errorBorder} rounded-xl`}>
                    <p className={`${errorText} text-sm flex items-center gap-2`}>
                      <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      {registerState.failureReason || validationErrorMessage.failureReason}
                    </p>
                  </div>
                )}

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="mt-1 w-4 h-4 text-primary bg-gray-50 border-gray-300 rounded focus:ring-2 focus:ring-primary"
                  />
                  <label htmlFor="terms" className={`text-sm ${textSecondary} leading-relaxed`}>
                    I agree to the{" "}
                    <a href="/terms" className="text-primary hover:text-secondary font-medium">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="/privacy" className="text-primary hover:text-secondary font-medium">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={sendOtpLoading}
                  className={`w-full bg-gradient-to-r ${accentGradient} text-white py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl`}
                >
                  {sendOtpLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Sending OTP...</span>
                    </>
                  ) : (
                    <span>Create Account</span>
                  )}
                </button>

                <div className="text-center pt-4">
                  <p className={`${textSecondary} text-sm`}>
                    Already have an account?{" "}
                    <a href="/login" className="text-primary hover:text-secondary font-semibold">
                      Sign in
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterForm;