import React, { useState, useRef, useEffect } from "react";
import { Mail, ArrowLeft, RefreshCw, CheckCircle } from "lucide-react";
import useThemeStore from "../zustand/themeStore";

function OtpVerification({ verifyOtp, success, email, onBack, onResend, code, setCode }) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);



  // Format timer display
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  // Handle code input change
  const handleChange = (index, value) => {
    if (isNaN(value)) return;

    const newOtp = [...code];
    newOtp[index] = value;
    setCode(newOtp);
    setError("");

    // Auto-focus next input
    if (value !== "" && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit when all fields are filled
    if (index === 5 && value !== "") {
      const otpCode = newOtp.join("");
      handleVerify(otpCode);
    }
  };

  // Handle keydown for backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };


  useEffect(()=>{
    if(timer < 0){
      setCanResend(true);
      return;
    }
    const interval = setInterval(()=>{
      setTimer((prev) => prev -1);
    },1000)

    return () => clearInterval(interval);
  },[timer])

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (/^\d+$/.test(pastedData)) {
      const newOtp = pastedData.split("");
      setCode([...newOtp, ...Array(6 - newOtp.length).fill("")]);
      if (newOtp.length === 6) {
        handleVerify(pastedData);
      }
    }
  };

  // Verify code
  const handleVerify = async (otpCode = code.join("")) => {
    if (otpCode.length !== 6) {
      setError("Please enter all 6 digits to : ");
      return;
    }

    setIsVerifying(true);
    setError("");

    try {
      // Call the verify function passed from parent
      await verifyOtp(otpCode);
      
    } catch (err) {
      setError(err.message || "Invalid or expired code. Please try again.");
      setCode(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  // Resend code
  const handleResend = async () => {
    if (!canResend) return;

    setCode(["", "", "", "", "", ""]);
    setError("");
    setTimer(300);
    setCanResend(false);

    try {
      await onResend?.();
    } catch (err) {
      setError("Failed to resend code. Please try again.");
    }
  };





  const { mode } = useThemeStore()

  const bgPrimary = mode === 'dark' ? 'bg-[#0F1419]' : 'bg-gray-50';
  const bgSecondary = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
  const bgTertiary = mode === 'dark' ? 'bg-gray-800' : 'bg-gray-100';
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
  const cardHover = mode === 'dark' ? 'hover:bg-[#1F2937]' : 'hover:bg-gray-50';
  const inputBg = mode === 'dark' ? 'bg-[#1B2E31] border-gray-700' : 'bg-white border-gray-300';
  const accentGradient = mode === 'dark'
    ? 'from-primary  to-secondary'
    : 'from-secondary  to-primary';




  if (success) {
    return (
      <div className={`flex items-center justify-center p-8 lg:p-12 bg-backGray`}>
        <div className="w-full max-w-md text-center">

          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 
          ${mode === "dark" ? "bg-green-900" : "bg-green-100"}`}>
            <CheckCircle className={`w-10 h-10 ${mode === "dark" ? "text-green-400" : "text-green-600"}`} />
          </div>

          <h2 className={`text-2xl font-bold mb-2 ${textPrimary}`}>
            Verified Successfully!
          </h2>

          <p className={`${textSecondary}`}>
            Your email has been verified. Redirecting...
          </p>

          <div className="mt-6">
            <div
              className={`w-12 h-12 border-4 rounded-full animate-spin mx-auto 
              ${mode === "dark"
                  ? "border-green-700 border-t-green-400"
                  : "border-green-200 border-t-green-600"
                }`}
            ></div>
          </div>

        </div>
      </div>
    );
  }
  return (
    <div className={`flex items-center justify-center p-6 lg:p-12 `}>
      <div className="w-full max-w-sm md:max-w-md">

        {onBack && (
          <button
            onClick={onBack}
            className={`flex items-center gap-2 ${textSecondary} hover:${textPrimary} mb-6 transition-colors`}
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
        )}

        <div className="text-center mb-8">
          <div className={`w-16 h-16 bg-gradient-to-br ${accentGradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
            <Mail className="w-8 h-8 text-white" />
          </div>

          <h2 className={`text-3xl font-bold ${textPrimary} mb-2`}>
            Verify Your Email
          </h2>

          <p className={`${textSecondary} text-sm leading-relaxed`}>
            We've sent a 6-digit verification code to
          </p>

          <p className="text-primary font-semibold mt-1">
            {email || "your email"}
          </p>
        </div>

        <div className="mb-6">
          <label className={`block text-sm font-medium ${textPrimary} mb-3 text-center`}>
            Enter Verification Code
          </label>

          <div className="flex gap-2 justify-center" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                disabled={isVerifying}
                className={ `w-10 h-12 md:w-12 md:h-14 text-center text-2xl font-semibold 
              rounded-xl transition-all
              ${inputBg}
              ${digit ? "border-primary bg-white" : borderColor}
              focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
              ${isVerifying ? "opacity-50 cursor-not-allowed" : ""}
              ${error ? "border-red-300 bg-red-50" : ""}
            `}
              />
            ))}
          </div>

          {error && (
            <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-700 text-sm text-center flex items-center justify-center gap-2">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                {error}
              </p>
            </div>
          )}
        </div>

        <div className="mb-6 text-center">
          {timer > 0 ? (
            <div className={`flex items-center justify-center gap-2 ${textSecondary}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm">
                Code expires in{" "}
                <span className="font-semibold text-primary">{formatTime(timer)}</span>
              </span>
            </div>
          ) : (
            <p className="text-red-600 text-sm font-medium">Code expired</p>
          )}
        </div>

        <button
          onClick={() => handleVerify()}
          disabled={isVerifying || code.join("").length !== 6}
          className={`w-full bg-gradient-to-r ${accentGradient} text-white py-3.5 px-4 rounded-xl
        font-semibold transition-all duration-200 flex items-center justify-center gap-2
        disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl mb-4`}
        >
          {isVerifying ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Verifying...</span>
            </>
          ) : (
            <span>Verify Email</span>
          )}
        </button>

        <div className="text-center">
          <p className={`${textSecondary} text-sm mb-2`}>Didn't receive the code?</p>
          <button
            onClick={handleResend}
            disabled={!canResend}
            className={`inline-flex items-center gap-2 text-sm font-semibold ${canResend
                ? "text-primary hover:text-primary-dark"
                : "text-gray-400 cursor-not-allowed"
              }`}
          >
            <RefreshCw className="w-4 h-4" />
            Resend Code
          </button>
        </div>

        <div className={`mt-8 p-4 ${bgTertiary} rounded-xl border ${borderColor}`}>
          <p className={`text-xs ${textSecondary} text-center leading-relaxed`}>
            <strong className={textPrimary}>Tip:</strong> Check your spam folder if you don't see the email.
          </p>
        </div>

      </div>
    </div>

  );
}

export default OtpVerification;