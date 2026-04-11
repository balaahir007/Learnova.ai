import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      errorMessage: '',
      errorStack: ''
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      errorMessage: error.message || 'An unexpected error occurred',
      errorStack: error.stack || ''
    };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // You can also log the error to an error reporting service here
  }

  resetError = () => {
    this.setState({
      hasError: false,
      errorMessage: '',
      errorStack: ''
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-red-50 to-red-100 dark:from-red-900 dark:to-red-950 flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-white dark:bg-[#1B2E31] rounded-2xl shadow-2xl p-8">
            <div className="flex items-center justify-center w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/50 mx-auto mb-6">
              <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
            </div>

            <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center mb-2">
              Oops! Something Went Wrong
            </h1>

            <p className="text-gray-600 dark:text-gray-400 text-center mb-4">
              We encountered an unexpected error. Our team has been notified and we're working on a fix.
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <p className="text-sm font-mono text-red-700 dark:text-red-400 break-words">
                {this.state.errorMessage}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={this.resetError}
                className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
              <a
                href="/"
                className="flex-1 flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-900 dark:text-white font-semibold py-2.5 px-4 rounded-lg transition-colors duration-200"
              >
                <Home className="w-4 h-4" />
                Go Home
              </a>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6">
                <summary className="text-sm font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:text-gray-900 dark:hover:text-gray-100">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-3 text-xs bg-gray-100 dark:bg-gray-900 p-3 rounded overflow-auto max-h-48 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-700">
                  {this.state.errorStack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
