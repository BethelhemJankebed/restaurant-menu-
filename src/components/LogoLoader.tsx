'use client';

import React, { useEffect, useState } from 'react';

interface LogoLoaderProps {
  onComplete?: () => void;
}

export default function LogoLoader({ onComplete }: LogoLoaderProps) {
  const [visible, setVisible] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    // Check if user already saw loader this session to avoid annoyance
    const hasSeen = sessionStorage.getItem('has_seen_restaurant_loader');
    if (hasSeen) {
      setVisible(false);
      onComplete?.();
      return;
    }

    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setVisible(false);
        sessionStorage.setItem('has_seen_restaurant_loader', 'true');
        onComplete?.();
      }, 500); // 500ms fade transition
    }, 1500); // 1.5s 360 degree spin

    return () => clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        backgroundColor: '#FAF7F5',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: fading ? 0 : 1,
        transform: fading ? 'scale(1.04)' : 'scale(1)',
        transition: 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
        pointerEvents: fading ? 'none' : 'auto',
      }}
    >
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {/* Outer Rotating Ring */}
        <div
          className="loader-logo-ring"
          style={{
            width: '110px',
            height: '110px',
            borderRadius: '50%',
            border: '2px dashed #7A1F2B',
            position: 'absolute',
          }}
        />

        {/* Center Luxury Emblem */}
        <div
          style={{
            width: '84px',
            height: '84px',
            borderRadius: '50%',
            backgroundColor: '#7A1F2B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 30px rgba(122, 31, 43, 0.35)',
            position: 'relative',
            zIndex: 2,
          }}
        >
          <svg
            width="44"
            height="44"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M8 22h8" />
            <path d="M12 11v11" />
            <path d="M17 5c0 3.866-2.239 6-5 6s-5-2.134-5-6a5 5 0 0 1 10 0Z" />
            <circle cx="12" cy="5" r="1.5" fill="#C5A059" stroke="none" />
          </svg>
        </div>
      </div>

      <div style={{ marginTop: '24px', textAlign: 'center' }}>
        <h2
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: '26px',
            fontWeight: 700,
            letterSpacing: '2px',
            color: '#4A1019',
            marginBottom: '4px',
            textTransform: 'uppercase',
          }}
        >
          Le Bordeaux
        </h2>
        <p
          style={{
            fontSize: '12px',
            letterSpacing: '3px',
            color: '#7A1F2B',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Fine Dining &amp; Cuisine
        </p>
      </div>
    </div>
  );
}
