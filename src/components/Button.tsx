import React, { useState } from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'neon-yellow' | 'neon-cyan' | 'neon-pink';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export function Button({ 
  children, 
  onClick, 
  variant = 'primary', 
  size = 'md',
  disabled = false,
  className = '' 
}: ButtonProps) {
  const [isPressed, setIsPressed] = useState(false);

  const baseClasses = 'brutalist-border transition-all duration-100 disabled:opacity-50 disabled:cursor-not-allowed uppercase tracking-wider';
  
  const variantClasses = {
    primary: 'bg-white text-black hover:bg-gray-50',
    secondary: 'bg-transparent text-black hover:bg-white',
    'neon-yellow': 'bg-[var(--neon-yellow)] text-black hover:bg-opacity-90',
    'neon-cyan': 'bg-[var(--neon-cyan)] text-black hover:bg-opacity-90',
    'neon-pink': 'bg-[var(--hot-pink)] text-white hover:bg-opacity-90',
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);
  const handleMouseLeave = () => setIsPressed(false);

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleMouseDown}
      onTouchEnd={handleMouseUp}
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${isPressed ? 'button-pressed' : ''} ${className}`}
    >
      {children}
    </button>
  );
}