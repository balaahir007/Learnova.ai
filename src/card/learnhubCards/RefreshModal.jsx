import React from 'react';
import { AlertCircle, X } from 'lucide-react';

const RefreshModal = ({ onClose, onConfirm, message, mode = 'dark' }) => {
  // Theme classes
  const textPrimary = mode === 'dark' ? 'text-gray-100' : 'text-gray-900';
  const textSecondary = mode === 'dark' ? 'text-gray-400' : 'text-gray-600';
  const textTertiary = mode === 'dark' ? 'text-gray-500' : 'text-gray-500';
const bgPrimary = mode === 'dark' ? 'bg-[#102226]' : 'bg-white';
  const bgSecondary = mode === 'dark' ? 'bg-gray-700' : 'bg-gray-50';
  const borderColor = mode === 'dark' ? 'border-gray-700' : 'border-gray-100';
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999] p-4">
      <div className={`rounded-xl shadow-xl max-w-sm w-full transform transition-all duration-200 scale-100 ${bgPrimary}`}>
        {/* Header */}
        <div className={`flex items-center justify-between p-4 border-b ${borderColor}`}>
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-8 h-8 bg-amber-100 rounded-full">
              <AlertCircle className="w-4 h-4 text-amber-600" />
            </div>
            <h3 className={`text-lg font-semibold ${textPrimary}`}>Confirm</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors duration-200"
          >
            <X className="w-4 h-4 text-gray-400" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          <p className={`text-sm ${textSecondary}`}>
            {message}
          </p>
        </div>

        {/* Footer */}
        <div className={`flex items-center justify-end gap-2 p-4 ${bgPrimary} rounded-b-xl  ${borderColor}`}>
          <button 
            onClick={onClose} 
            className={`px-4 py-2 ${textPrimary}  bg border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 font-medium text-sm`}
          >
            Cancel
          </button>
          <button 
            onClick={onConfirm} 
            className="px-4 py-2 bg-gradient-to-r from-[#0097B2] to-[#00B2A9] text-white rounded-lg hover:shadow-md transition-all duration-200 font-medium text-sm"
          >
            Yes, Leave
          </button>
        </div>
      </div>
    </div>
  );
};

export default RefreshModal;
