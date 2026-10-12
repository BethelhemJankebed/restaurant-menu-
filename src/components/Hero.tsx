'use client';

import React from 'react';
import { ChevronDown, Sparkles, Clock, MapPin, Award } from 'lucide-react';

export default function Hero() {
  const scrollToMenu = () => {
    const el = document.getElementById('menu');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '78vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#4A1019',
        overflow: 'hidden',
        color: '#FFFFFF',
      }}
    >
      {/* Background Imagery with Burgundy Overlays */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `linear-gradient(135deg, rgba(46, 11, 16, 0.88) 0%, rgba(122, 31, 43, 0.78) 50%, rgba(46, 11, 16, 0.92) 100%), url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* Decorative Golden Ambient Accent */}
      <div
        style={{
          position: 'absolute',
          top: '-10%',
          right: '-5%',
          width: '500px',
          height: '500px',
          background: 'radial-gradient(circle, rgba(197, 160, 89, 0.15) 0%, rgba(0, 0, 0, 0) 70%)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }}
      />

      {/* Hero Content */}
      <div
        className="hero-inner-container"
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '900px',
          margin: '0 auto',
          padding: '60px 24px',
          textAlign: 'center',
        }}
      >
        {/* Prestige Tag */}
        <div
          className="hero-prestige-tag"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: 'rgba(255, 255, 255, 0.12)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.25)',
            padding: '8px 20px',
            borderRadius: '30px',
            fontSize: '13px',
            fontWeight: 500,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '28px',
            color: '#F4ECE1',
          }}
        >
          <Sparkles size={15} color="#C5A059" className="hero-tag-icon" />
          <span>Haute Cuisine &amp; Artisanal Cellar</span>
        </div>

        {/* Large Restaurant Name */}
        <h1
          className="hero-main-title"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(44px, 7vw, 76px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.5px',
            marginBottom: '18px',
            color: '#FFFFFF',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
          }}
        >
          Le Bordeaux
        </h1>

        {/* Tagline */}
        <p
          className="hero-tagline"
          style={{
            fontFamily: 'Playfair Display, serif',
            fontSize: 'clamp(20px, 3vw, 28px)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#E8D2BD',
            marginBottom: '20px',
          }}
        >
          &quot;Good food. Great moments.&quot;
        </p>

        {/* Subtext */}
        <p
          className="hero-description"
          style={{
            fontSize: 'clamp(15px, 2vw, 17px)',
            lineHeight: 1.6,
            color: 'rgba(255, 255, 255, 0.85)',
            maxWidth: '650px',
            margin: '0 auto 36px auto',
            fontWeight: 300,
          }}
        >
          Indulge in a masterfully curated digital menu featuring prime cuts, wood-fired artisan recipes, fresh morning pastries, and handcrafted botanicals.
        </p>

        {/* Action Buttons */}
        <div
          className="hero-actions-row"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '16px',
            marginBottom: '48px',
          }}
        >
          <button
            onClick={scrollToMenu}
            id="hero-view-menu-btn"
            className="hero-btn-primary"
            style={{
              backgroundColor: '#FFFFFF',
              color: '#7A1F2B',
              padding: '14px 34px',
              borderRadius: '40px',
              fontSize: '16px',
              fontWeight: 700,
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              boxShadow: '0 6px 25px rgba(0, 0, 0, 0.25)',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = '#FAF7F5';
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = '#FFFFFF';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 25px rgba(0, 0, 0, 0.25)';
            }}
          >
            <span>View Full Menu</span>
            <ChevronDown size={18} className="hero-btn-icon" />
          </button>

          <a
            href="#about"
            className="hero-btn-secondary"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
              color: '#FFFFFF',
              backdropFilter: 'blur(8px)',
              padding: '14px 28px',
              borderRadius: '40px',
              fontSize: '15px',
              fontWeight: 600,
              border: '1px solid rgba(255, 255, 255, 0.35)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              transition: 'all 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.22)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.12)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Clock size={16} className="hero-btn-icon" />
            <span>Hours &amp; Location</span>
          </a>
        </div>

        {/* Trust Badges */}
        <div
          className="hero-trust-badges"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '24px',
            fontSize: '13px',
            color: 'rgba(255, 255, 255, 0.75)',
            borderTop: '1px solid rgba(255, 255, 255, 0.15)',
            paddingTop: '24px',
          }}
        >
          <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Award size={16} color="#C5A059" className="hero-trust-icon" />
            <span>Farm-to-Table Fresh</span>
          </div>
          <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={16} color="#C5A059" className="hero-trust-icon" />
            <span>Artisanal Kitchen</span>
          </div>
          <div className="hero-trust-item" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <MapPin size={16} color="#C5A059" className="hero-trust-icon" />
            <span>Addis Ababa, Bole Medhanialem</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.hero-inner-container) {
            padding: 36px 16px 28px 16px !important;
          }
          :global(.hero-prestige-tag) {
            font-size: 10px !important;
            padding: 5px 12px !important;
            letter-spacing: 1px !important;
            margin-bottom: 12px !important;
          }
          :global(.hero-tag-icon) {
            width: 11px !important;
            height: 11px !important;
          }
          :global(.hero-main-title) {
            font-size: 28px !important;
            margin-bottom: 8px !important;
          }
          :global(.hero-tagline) {
            font-size: 14px !important;
            margin-bottom: 10px !important;
          }
          :global(.hero-description) {
            font-size: 11px !important;
            line-height: 1.5 !important;
            margin-bottom: 20px !important;
          }
          :global(.hero-actions-row) {
            gap: 10px !important;
            margin-bottom: 22px !important;
          }
          :global(.hero-btn-primary) {
            padding: 9px 18px !important;
            font-size: 12px !important;
            border-radius: 24px !important;
            gap: 6px !important;
          }
          :global(.hero-btn-secondary) {
            padding: 8px 15px !important;
            font-size: 11px !important;
            border-radius: 24px !important;
            gap: 5px !important;
          }
          :global(.hero-btn-icon) {
            width: 13px !important;
            height: 13px !important;
          }
          :global(.hero-trust-badges) {
            gap: 12px !important;
            font-size: 10px !important;
            padding-top: 14px !important;
          }
          :global(.hero-trust-item) {
            gap: 5px !important;
          }
          :global(.hero-trust-icon) {
            width: 12px !important;
            height: 12px !important;
          }
        }
      `}</style>
    </section>
  );
}
