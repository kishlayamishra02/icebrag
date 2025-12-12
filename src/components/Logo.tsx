import React from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
}

export function Logo({ size = 'lg' }: LogoProps) {
  const sizeClasses = {
    sm: 'text-2xl',
    md: 'text-4xl',
    lg: 'text-6xl',
  };

  return (
    <div 
      className={`${sizeClasses[size]} tracking-tighter select-none font-extrabold`}
      style={{ fontFamily: "'Syne', sans-serif" }}
    >
      {/* ICE in Black */}
      <span style={{ color: '#000000' }}>ICE</span>
      {/* BRAG in Accent Pink */}
      <span style={{ color: '#FF4081' }}>BRAG</span>
      {/* Optional: Add the period if you want it to match the image exactly */}
      <span style={{ color: '#000000' }}>.</span>
    </div>
  );
}