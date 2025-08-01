import React from 'react';

interface PharmacyLogoProps {
  className?: string;
}

const PharmacyLogo: React.FC<PharmacyLogoProps> = ({ className = "h-6 w-6" }) => {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      {/* Pharmacy Cross - Traditional green cross symbol */}
      <rect x="9" y="3" width="6" height="18" rx="1" />
      <rect x="3" y="9" width="18" height="6" rx="1" />
      
      {/* Inner highlight for depth */}
      <rect x="10" y="4" width="4" height="16" rx="0.5" fill="rgba(255,255,255,0.2)" />
      <rect x="4" y="10" width="16" height="4" rx="0.5" fill="rgba(255,255,255,0.2)" />
    </svg>
  );
};

export default PharmacyLogo;