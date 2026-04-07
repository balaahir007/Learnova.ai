import React from 'react';

const Logo = ({ size = 'md', href = '/', showText = true }) => {
  const sizeClasses = {
    sm: 'h-5 w-5',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-10 w-10',
  };

  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  return (
    <a
      href={href}
      className="flex items-center gap-1 hover:opacity-80 transition-all duration-200"
    >
      {/* Logo Image */}
      <img
        src="/HeaderLogo.png"
        alt="logo"
        className={`${sizeClasses[size]} object-contain`}
      />

      {/* Logo Text */}
        <div className="flex flex-col leading-tight">
          <span
            className={`${textSizes[size]} font-bold bg-gradient-to-r from-[#0097B2] to-[#00B2A9] bg-clip-text text-transparent`}
          >
            Learnova.ai
          </span>
        </div>
    </a>
  );
};

export default Logo;