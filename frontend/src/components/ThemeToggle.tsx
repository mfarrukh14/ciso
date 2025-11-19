import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ 
  className = '', 
  size = 'md' 
}) => {
  const { theme, toggleTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
  };

  const iconSizes = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6',
  };

  return (
    <button
      onClick={toggleTheme}
      className={`
        ${sizeClasses[size]}
        p-2 rounded-lg 
        bg-gray-100 dark:bg-dark-700 
        hover:bg-gray-200 dark:hover:bg-dark-600 
        transition-all duration-200 
        flex items-center justify-center
        ${className}
      `}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      {theme === 'light' ? (
        <Moon className={`${iconSizes[size]} text-gray-600 dark:text-gray-400`} />
      ) : (
        <Sun className={`${iconSizes[size]} text-gray-600 dark:text-gray-400`} />
      )}
    </button>
  );
};

export default ThemeToggle;
