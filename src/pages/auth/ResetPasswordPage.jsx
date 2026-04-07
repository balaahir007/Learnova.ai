import React, { useState } from 'react'
import useThemeStore from '../../zustand/themeStore';
import { useLocation, useSearchParams } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { extractErrorMessage } from '../../utils/errorHandler';
import { showError } from '../../utils/toast';
import useAuthStore from '../../zustand/auth/useAuthStore';

const ResetPasswordPage = () => {
    const [formData, setFormData] = useState({
        newPassword: "",
        confirmPassword: "",
    });

    // const location = useLocation()

    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const email = searchParams.get("email");
    const redirect = searchParams.get("redirect");


    const [validationErrors, setValidationErrors] = useState({});
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [resetSuccess, setResetSuccess] = useState(false);
    const { mode } = useThemeStore(); // Toggle between 'light' and 'dark'

    const bgPrimary = mode === 'dark' ? 'bg-[#0F1419]' : 'bg-gray-50';
    const bgSecondary = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
    const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
    const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const textTertiary = mode === 'dark' ? 'text-gray-500' : 'text-gray-500';
    const inputBorder = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
    const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-200';
    const errorBg = mode === 'dark' ? 'bg-red-900/30' : 'bg-red-50';
    const errorBorder = mode === 'dark' ? 'border-red-800' : 'border-red-200';
    const iconColor = mode === "dark" ? "text-gray-500" : "text-gray-400";
    const iconHover = mode === "dark" ? "hover:text-gray-300" : "hover:text-gray-600";
    const inputBg = mode === 'dark' ? 'bg-[#1B2E31] border-gray-700' : 'bg-white border-gray-300';
    const accentGradient = mode === 'dark'
        ? 'from-primary to-secondary'
        : 'from-secondary to-primary';
    const successBg = mode === 'dark' ? 'bg-green-900/30' : 'bg-green-50';
    const successBorder = mode === 'dark' ? 'border-green-800' : 'border-green-200';
    const successText = mode === 'dark' ? 'text-green-400' : 'text-green-700';


    const { authUser } = useAuthStore()
    const handleChange = (e) => {

        const { value, name } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value
        }))

        if (validationErrors[name]) {
            setValidationErrors((prev) => ({
                ...prev,
                [name]: ''
            }))
        }
    }

    const validateForm = () => {
        const errors = {};

        if (!formData.newPassword) {
            errors.newPassword = "Password is required";
        } else if (formData.newPassword.length < 8) {
            errors.newPassword = "Password must be at least 8 characters";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword)) {
            errors.newPassword = "Password must contain uppercase, lowercase, and number";
        }

        if (!formData.confirmPassword) {
            errors.confirmPassword = "Please confirm your password";
        } else if (formData.newPassword !== formData.confirmPassword) {
            errors.confirmPassword = "Passwords do not match";
        }

        return errors;
    };


    const handleSubmit = async (e) => {

        e.preventDefault();
        try {


            const errors = validateForm();
            setValidationErrors(errors);

            if (Object.keys(errors).length > 0) return;


            setIsLoading(true);

            await axiosInstance.post("/auth/verify/check-code", {
                identifier: authUser?.email || 'user@gmail.com',
                channel: 'email',
                type: 'password_reset',
                token: token
            });
        } catch (error) {
            let msg;
            msg = extractErrorMessage(error)
            console.log("msg" , msg)
            showError(msg, mode)
        } finally {
            setIsLoading(false);
        }

    };



    return (
        <div className={`min-h-screen bg-backGray shadow-md  flex items-center justify-center p-4`}>
            <div className={`${bgSecondary} rounded-3xl shadow-2xl overflow-hidden max-w-6xl w-full grid lg:grid-cols-2 min-h-[600px]`}>

                <div className={`hidden lg:flex relative ${textPrimary} border-r ${borderColor} p-12 items-center justify-center overflow-hidden`}>
                    <div className="relative z-10 text-center">
                        <div className="mb-8">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <h1 className={`text-4xl font-bold ${textPrimary} mb-4 leading-tight`}>
                                Reset Your <br /> Password
                            </h1>
                            <p className={`${textSecondary} text-lg max-w-md mx-auto leading-relaxed`}>
                                Create a new secure password for your Learnova.ai account
                            </p>
                        </div>

                        {/* Security Tips */}
                        <div className="space-y-3 mt-12 max-w-md mx-auto">
                            <div className="bg-backGray backdrop-blur-sm shadow-md rounded-xl p-4 border border-white/20 text-left">
                                <div className="flex items-start gap-3">
                                    <div className={`w-8 h-8 ${textPrimary} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className={`text-sm font-medium ${textPrimary}`}>Use 8+ characters</p>
                                        <p className={`text-xs ${textSecondary} mt-1`}>Mix of letters, numbers & symbols</p>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-backGray backdrop-blur-sm shadow-md rounded-xl p-4 border border-white/20 text-left">
                                <div className="flex items-start gap-3">
                                    <div className={`w-8 h-8 ${textPrimary} rounded-lg flex items-center justify-center flex-shrink-0`}>
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p className={`text-sm font-medium ${textPrimary}`}>Keep it unique</p>
                                        <p className={`text-xs ${textSecondary} mt-1`}>Don't reuse old passwords</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`flex items-center justify-center p-8 lg:p-12 ${bgSecondary}`}>
                    <div className="w-full max-w-md">

                        {/* Logo for Mobile */}
                        <div className="lg:hidden text-center mb-8">
                            <div className={`w-16 h-16 bg-gradient-to-br ${accentGradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                        </div>

                        {/* Header */}
                        <div className="text-center mb-8">
                            <h2 className={`text-3xl font-bold ${textPrimary} mb-2`}>Create New Password</h2>
                            <p className={textSecondary}>Enter a strong password to secure your account</p>
                        </div>

                        {resetSuccess ? (
                            // Success Message
                            <div className="space-y-6">
                                <div className={`p-6 ${successBg} border ${successBorder} rounded-2xl text-center`}>
                                    <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <h3 className={`text-xl font-semibold ${successText} mb-2`}>Password Reset Successfully!</h3>
                                    <p className={`${textSecondary} text-sm`}>
                                        Your password has been changed.
                                    </p>
                                </div>

                                <a
                                    href={`${redirect}`}
                                    className={`block w-full bg-gradient-to-r ${accentGradient} hover:opacity-90 text-white py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 text-center shadow-lg hover:shadow-xl`}
                                >
                                    Back
                                </a>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-5">

                                {/* New Password Field */}
                                <div>
                                    <label className={`block text-sm font-medium ${textTertiary} mb-2`}>
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showNewPassword ? "text" : "password"}
                                            name="newPassword"
                                            value={formData.newPassword}
                                            onChange={handleChange}
                                            placeholder="Enter new password"
                                            className={`w-full px-4 py-3 ${inputBg} border ${validationErrors.newPassword ? 'border-red-500' : inputBorder
                                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${textPrimary}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowNewPassword(!showNewPassword)}
                                            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${iconColor} ${iconHover}`}
                                        >
                                            {showNewPassword ? (
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
                                    {validationErrors.newPassword && (
                                        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            {validationErrors.newPassword}
                                        </p>
                                    )}
                                </div>

                                {/* Confirm Password Field */}
                                <div>
                                    <label className={`block text-sm font-medium ${textTertiary} mb-2`}>
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleChange}
                                            placeholder="Confirm new password"
                                            className={`w-full px-4 py-3 ${inputBg} border ${validationErrors.confirmPassword ? 'border-red-500' : inputBorder
                                                } rounded-xl focus:outline-none focus:ring-2 focus:ring-primary ${textPrimary}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className={`absolute inset-y-0 right-0 pr-3 flex items-center ${iconColor} ${iconHover}`}
                                        >
                                            {showConfirmPassword ? (
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
                                    {validationErrors.confirmPassword && (
                                        <p className="text-red-500 text-sm mt-1.5 flex items-center gap-1">
                                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                            </svg>
                                            {validationErrors.confirmPassword}
                                        </p>
                                    )}
                                </div>

                                {/* Password Strength Indicator */}
                                {formData.newPassword && (
                                    <div className={`p-3 ${bgPrimary} rounded-xl border ${borderColor}`}>
                                        <p className={`text-xs font-medium ${textTertiary} mb-2`}>Password strength:</p>
                                        <div className="flex gap-1">
                                            <div className={`h-1.5 flex-1 rounded-full ${formData.newPassword.length >= 8 ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                                            <div className={`h-1.5 flex-1 rounded-full ${formData.newPassword.length >= 8 && /(?=.*[A-Z])/.test(formData.newPassword) ? 'bg-yellow-500' : 'bg-gray-300'}`}></div>
                                            <div className={`h-1.5 flex-1 rounded-full ${formData.newPassword.length >= 8 && /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.newPassword) ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                                        </div>
                                    </div>
                                )}

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    disabled={isLoading}
                                    className={`w-full bg-gradient-to-r ${accentGradient} hover:opacity-90 cursor-pointer text-white py-3.5 px-4 rounded-xl font-semibold transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl`}
                                >
                                    {isLoading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span>Resetting Password...</span>
                                        </>
                                    ) : (
                                        <>
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span>Reset Password</span>
                                        </>
                                    )}
                                </button>

                                {/* Back to Login Link */}
                                <div className="text-center pt-4">
                                    <a href={`${redirect}`} className={`${textSecondary} text-sm hover:text-primary transition-colors flex items-center justify-center gap-2`}>
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                        </svg>
                                        Back
                                    </a>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ResetPasswordPage
