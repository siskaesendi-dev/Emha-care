import React from 'react';

interface EmhaCareLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'full' | 'icon' | 'horizontal';
  className?: string;
}

export const EmhaCareLogo: React.FC<EmhaCareLogoProps> = ({
  size = 'md',
  variant = 'horizontal',
  className = '',
}) => {
  const getIconSize = () => {
    switch (size) {
      case 'sm': return 'w-8 h-8';
      case 'lg': return 'w-16 h-16';
      case 'xl': return 'w-24 h-24 sm:w-28 sm:h-28';
      case 'md':
      default: return 'w-11 h-11';
    }
  };

  const EmblemIcon = (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${getIconSize()} shrink-0 transition-transform`}
    >
      <defs>
        {/* Soft circle gradient */}
        <radialGradient id="ringGrad" cx="50%" cy="50%" r="50%">
          <stop offset="70%" stopColor="#E2EEF8" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#CBDDF0" stopOpacity="0.4" />
        </radialGradient>
        {/* Shield Outer Gradient */}
        <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563EB" />
          <stop offset="45%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        {/* Shield Inner Gradient */}
        <linearGradient id="shieldInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="60%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        {/* Green Crescent Glow */}
        <linearGradient id="crescentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
        {/* Skin Tone */}
        <linearGradient id="skinTone" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        {/* Hijab Tone */}
        <linearGradient id="hijabGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="100%" stopColor="#172554" />
        </linearGradient>
      </defs>

      {/* Outer subtle circular ring */}
      <circle cx="120" cy="120" r="112" stroke="#BFDBFE" strokeWidth="4" fill="#F8FAFC" fillOpacity="0.5" />
      <circle cx="120" cy="120" r="102" stroke="#E2E8F0" strokeWidth="1.5" strokeDasharray="4 4" />

      {/* Main Protective Shield Outline */}
      <path
        d="M120 28 C155 28 190 38 190 68 C190 135 155 178 120 198 C85 178 50 135 50 68 C50 38 85 28 120 28 Z"
        fill="url(#shieldGrad)"
        stroke="#1E40AF"
        strokeWidth="4"
        strokeLinejoin="round"
      />

      {/* Shield Inner Light Fill */}
      <path
        d="M120 38 C148 38 176 46 176 72 C176 128 148 165 120 182 C92 165 64 128 64 72 C64 46 92 38 120 38 Z"
        fill="url(#shieldInnerGrad)"
        opacity="0.95"
      />

      {/* Top Islamic Crescent Moon and Star */}
      <g transform="translate(120, 36) scale(0.72)">
        {/* Crescent */}
        <path
          d="M0 -14 A14 14 0 1 0 14 0 A11 11 0 1 1 0 -14 Z"
          fill="url(#crescentGrad)"
          transform="translate(-6, 0)"
        />
        {/* Star */}
        <path
          d="M 6 -3 L 8 -9 L 10 -3 L 16 -3 L 11 1 L 13 7 L 8 3 L 3 7 L 5 1 L 0 -3 Z"
          fill="#34D399"
        />
      </g>

      {/* Characters Group (3 Protected Children embracing) */}
      <g transform="translate(0, 10)">
        {/* Boy Left - Head */}
        <circle cx="94" cy="98" r="14" fill="url(#skinTone)" />
        {/* Boy Left - Hair */}
        <path d="M82 95 C82 85 92 84 96 84 C104 84 108 88 108 94 C104 90 98 90 90 92 Z" fill="#1E293B" />
        {/* Boy Left - Smiling Eyes & Mouth */}
        <path d="M88 97 Q91 95 94 97" stroke="#1E293B" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M96 97 Q99 95 102 97" stroke="#1E293B" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M92 103 Q95 107 98 103" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Boy Right - Head */}
        <circle cx="146" cy="98" r="14" fill="url(#skinTone)" />
        {/* Boy Right - Hair */}
        <path d="M132 94 C132 88 136 84 144 84 C148 84 158 85 158 95 C150 92 144 90 140 94 Z" fill="#1E293B" />
        {/* Boy Right - Smiling Eyes & Mouth */}
        <path d="M138 97 Q141 95 144 97" stroke="#1E293B" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M146 97 Q149 95 152 97" stroke="#1E293B" strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <path d="M142 103 Q145 107 148 103" stroke="#1E293B" strokeWidth="1.5" strokeLinecap="round" fill="none" />

        {/* Center Girl in Hijab */}
        {/* Hijab Base */}
        <path
          d="M120 86 C108 86 103 98 103 114 C103 128 111 136 120 136 C129 136 137 128 137 114 C137 98 132 86 120 86 Z"
          fill="url(#hijabGrad)"
        />
        {/* Girl Face */}
        <circle cx="120" cy="111" r="11" fill="url(#skinTone)" />
        {/* Girl Smile */}
        <path d="M115 109 Q117 107 119 109" stroke="#1E293B" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M121 109 Q123 107 125 109" stroke="#1E293B" strokeWidth="1.4" strokeLinecap="round" fill="none" />
        <path d="M117 115 Q120 118 123 115" stroke="#1E293B" strokeWidth="1.4" strokeLinecap="round" fill="none" />

        {/* Embracing Arms & Hands forming a protective bond */}
        <path
          d="M74 122 C74 150 102 166 120 166 C138 166 166 150 166 122 C160 134 148 145 136 148 C128 150 112 150 104 148 C92 145 80 134 74 122 Z"
          fill="#1E40AF"
        />
        {/* Connected Hands Heart Motif */}
        <path
          d="M120 146 C116 142 112 144 112 148 C112 153 120 158 120 158 C120 158 128 153 128 148 C128 144 124 142 120 146 Z"
          fill="#FDE047"
        />
      </g>
    </svg>
  );

  if (variant === 'icon') {
    return (
      <div className={`inline-flex items-center justify-center ${className}`}>
        {EmblemIcon}
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`flex flex-col items-center text-center select-none ${className}`}>
        {EmblemIcon}
        <div className="mt-3 space-y-0.5">
          <div className="flex items-center justify-center gap-1">
            <span className="font-extrabold text-2xl sm:text-3xl tracking-tight text-[#173860] font-sans">
              EMHA CARE
            </span>
          </div>
          <p className="text-[11px] sm:text-xs font-bold tracking-[0.18em] text-[#2563EB] uppercase">
            Madrasah Aman & Peduli
          </p>
        </div>
      </div>
    );
  }

  // Horizontal variant (default)
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {EmblemIcon}
      <div>
        <div className="flex items-center gap-1.5">
          <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#173860] font-sans">
            EMHA CARE
          </span>
        </div>
        <p className="text-[10px] sm:text-[11px] font-bold tracking-wider text-[#2563EB] uppercase">
          Madrasah Aman & Peduli
        </p>
      </div>
    </div>
  );
};
