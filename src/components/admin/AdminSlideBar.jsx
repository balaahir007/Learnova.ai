import React from 'react';
import { FaTachometerAlt, FaCalendarAlt, FaBook, FaTimes, FaBookOpen, FaChalkboardTeacher, FaCertificate, FaGraduationCap } from "react-icons/fa";
import { Link, useLocation } from 'react-router-dom';
import useThemeStore from '../../zustand/themeStore';
import { MdWork } from 'react-icons/md';
import { GiRocket } from 'react-icons/gi';


const menuOptions = [
    {
        label: 'Dashboard',
        icon: <FaTachometerAlt className="w-5 h-5" />,
        path: '/admin-panel/dashboard'
    },
    {
        label: 'Session Management',
        icon: <FaCalendarAlt className="w-5 h-5" />,
        path: '/admin-panel/session-management'
    },
    {
        label: 'Courses',   // simpler & cleaner
        icon: <FaGraduationCap className="w-5 h-5" />,
        path: '/admin-panel/course'
    },
    {
        label: 'Resources',  // was duplicate, now unique
        icon: <FaBookOpen className="w-5 h-5" />,
        path: '/admin-panel/resourses'
    },
    {
        label: 'Study Spaces',
        icon: <FaChalkboardTeacher className="w-5 h-5" />,
        path: '/admin-panel/studyspace'
    },
    { label: "Jobs", icon: <MdWork className="text-xl" />, path: "/admin-panel/jobs" },
    { label: "Hackathon", icon: <GiRocket className="text-xl " />,  path: "/admin-panel/hackathon" },
    {
        label: 'Certifications',
        icon: <FaCertificate className="w-5 h-5" />,
        path: '/admin-panel/certification'
    },

    

];

const AdminSlideBar = ({ isOpen, onClose }) => {
    const { mode } = useThemeStore()
    const cardBg = mode === 'dark' ? 'bg-[#1B2E31]' : 'bg-white';
    const sectionBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-gray-50';
    const textPrimary = mode === 'dark' ? 'text-white' : 'text-gray-900';
    const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
    const borderColor = mode === 'dark' ? 'border-[#294B4E]' : 'border-gray-200';
    const bgPrimary = mode === 'dark' ? 'bg-[#0A1415]' : 'bg-gray-50';

    // Additional theme variables for sidebar
    const hoverBg = mode === 'dark' ? 'hover:bg-[#294B4E]' : 'hover:bg-primary100';
    const headerBg = mode === 'dark' ? 'bg-[#0F1E20]' : 'bg-primary100';
    const iconColor = mode === 'dark' ? 'text-gray-400' : 'text-gray-500';
    const iconHoverColor = mode === 'dark' ? 'group-hover:text-white' : 'group-hover:text-primary';

    const location = useLocation();

    return (
        <>
            {/* Desktop Sidebar */}
            <div className={`hidden md:flex fixed left-0 top-0 h-full w-64 ${cardBg} border-r ${borderColor} flex-col z-30 shadow-sm`}>
                {/* Logo/Header */}
                <div className={`p-6 border-b ${borderColor}`}>
                    <div className={`flex items-center justify-center ${headerBg} rounded-lg p-3`}>
                        <h1 className={`text-lg font-bold ${mode === 'dark' ? 'text-white' : 'text-primary'}`}>
                            Admin Panel
                        </h1>
                    </div>
                </div>

                {/* Navigation Menu */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuOptions.map(({ label, icon, path }) => {
                            const isActive = location.pathname === path ||
                                (path !== '/admin-panel/dashboard' && location.pathname.startsWith(path));

                            return (
                                <li key={label}>
                                    <Link
                                        to={path}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                            ? 'bg-primary text-white shadow-sm'
                                            : `${textPrimary} ${hoverBg} ${mode === 'dark' ? 'hover:text-white' : 'hover:text-primary'}`
                                            }`}
                                    >
                                        <span className={`transition-colors ${isActive ? 'text-white' : `${iconColor} ${iconHoverColor}`
                                            }`}>
                                            {icon}
                                        </span>
                                        <span className="font-medium text-sm">{label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>

                {/* Footer */}
                <div className={`p-4 border-t ${borderColor}`}>
                    <div className={`text-xs ${textSecondary} text-center`}>
                        <p>Admin Panel v1.0</p>
                        <p className="mt-1">© 2024 Your Company</p>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className={`md:hidden fixed left-0 top-0 h-full w-64 ${cardBg} transform transition-transform duration-300 z-50 shadow-lg ${isOpen ? 'translate-x-0' : '-translate-x-full'
                }`}>
                {/* Mobile Header with Close Button */}
                <div className={`p-4 border-b ${borderColor} flex items-center justify-between`}>
                    <div className={`flex items-center justify-center ${headerBg} rounded-lg p-2 flex-1 mr-3`}>
                        <h1 className={`text-lg font-bold ${mode === 'dark' ? 'text-white' : 'text-primary'}`}>
                            Admin Panel
                        </h1>
                    </div>
                    <button
                        onClick={onClose}
                        className={`p-2 ${textSecondary} ${mode === 'dark' ? 'hover:text-white hover:bg-[#294B4E]' : 'hover:text-gray-700 hover:bg-gray-100'} rounded-lg transition-colors`}
                    >
                        <FaTimes className="w-5 h-5" />
                    </button>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex-1 p-4">
                    <ul className="space-y-2">
                        {menuOptions.map(({ label, icon, path }) => {
                            const isActive = location.pathname === path ||
                                (path !== '/admin-panel/dashboard' && location.pathname.startsWith(path));

                            return (
                                <li key={label}>
                                    <Link
                                        to={path}
                                        onClick={onClose}
                                        className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group ${isActive
                                            ? 'bg-primary text-white shadow-sm'
                                            : `${textPrimary} ${hoverBg} ${mode === 'dark' ? 'hover:text-white' : 'hover:text-primary'}`
                                            }`}
                                    >
                                        <span className={`transition-colors ${isActive ? 'text-white' : `${iconColor} ${iconHoverColor}`
                                            }`}>
                                            {icon}
                                        </span>
                                        <span className="font-medium text-sm">{label}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                </nav>
            </div>

            {/* Overlay for mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={onClose}
                />
            )}
        </>

    );
};

export default AdminSlideBar;
