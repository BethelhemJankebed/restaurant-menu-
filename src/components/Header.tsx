'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Menu as MenuIcon, X, UtensilsCrossed, Shield } from 'lucide-react';

interface HeaderProps {
  onSearchClick: () => void;
  searchQuery: string;
}

export default function Header({ onSearchClick, searchQuery }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 900,
          backgroundColor: scrolled ? 'rgba(255, 255, 255, 0.96)' : '#FFFFFF',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          boxShadow: scrolled ? '0 4px 20px rgba(74, 16, 25, 0.06)' : 'none',
          borderBottom: '1px solid #EBE4DE',
          transition: 'all 0.3s ease',
        }}
      >
        <div
          style={{
            maxWidth: '1280px',
            margin: '0 auto',
            padding: '14px 24px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {/* Brand Logo */}
          <Link
            href="/"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              textDecoration: 'none',
              color: 'inherit',
            }}
          >
            <div
              className="header-logo-icon"
              style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                backgroundColor: '#7A1F2B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                boxShadow: '0 4px 12px rgba(122, 31, 43, 0.25)',
                flexShrink: 0,
              }}
            >
              <UtensilsCrossed size={20} className="header-utensils-icon" />
            </div>
            <div>
              <span
                className="header-logo-title"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  color: '#4A1019',
                  display: 'block',
                  lineHeight: '1.1',
                }}
              >
                Le Bordeaux
              </span>
              <span
                className="header-logo-subtitle"
                style={{
                  fontSize: '10px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  color: '#7A1F2B',
                  fontWeight: 600,
                  display: 'block',
                }}
              >
                Artisanal Dining
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '32px',
            }}
            className="desktop-nav"
          >
            <a
              href="#menu"
              style={{
                color: '#1F191A',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '15px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#7A1F2B')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1F191A')}
            >
              Menu
            </a>
            <a
              href="#about"
              style={{
                color: '#1F191A',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '15px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#7A1F2B')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1F191A')}
            >
              About &amp; Story
            </a>
            <a
              href="#contact"
              style={{
                color: '#1F191A',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '15px',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#7A1F2B')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#1F191A')}
            >
              Hours &amp; Location
            </a>
          </nav>

          {/* Action buttons */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <button
              onClick={onSearchClick}
              aria-label="Search menu"
              id="header-search-btn"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '8px 14px',
                borderRadius: '30px',
                border: '1px solid #EBE4DE',
                backgroundColor: '#FAF7F5',
                color: '#6B5E60',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: 500,
                transition: 'var(--transition-smooth)',
              }}
            >
              <Search size={16} color="#7A1F2B" />
              <span className="search-text-label">
                {searchQuery ? `"${searchQuery}"` : 'Search menu...'}
              </span>
            </button>

            <Link
              href="/admin"
              id="header-admin-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                borderRadius: '30px',
                border: '1px solid #7A1F2B',
                backgroundColor: 'transparent',
                color: '#7A1F2B',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'var(--transition-smooth)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#7A1F2B';
                e.currentTarget.style.color = '#FFFFFF';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = '#7A1F2B';
              }}
            >
              <Shield size={14} />
              <span className="admin-text-label">Sign In</span>
            </Link>

            {/* Mobile Hamburger toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              id="header-mobile-toggle"
              style={{
                display: 'none',
                padding: '8px',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: '#4A1019',
              }}
              className="mobile-hamburger"
            >
              {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 899,
            backgroundColor: 'rgba(30, 8, 12, 0.4)',
            backdropFilter: 'blur(4px)',
          }}
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            style={{
              position: 'absolute',
              top: '70px',
              left: 0,
              right: 0,
              backgroundColor: '#FFFFFF',
              borderBottom: '2px solid #7A1F2B',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.15)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#1F191A',
                textDecoration: 'none',
                padding: '6px 0',
                borderBottom: '1px solid #FAF7F5',
              }}
            >
              Browse Menu
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#1F191A',
                textDecoration: 'none',
                padding: '6px 0',
                borderBottom: '1px solid #FAF7F5',
              }}
            >
              About &amp; Story
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: '#1F191A',
                textDecoration: 'none',
                padding: '6px 0',
                borderBottom: '1px solid #FAF7F5',
              }}
            >
              Hours &amp; Location
            </a>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                backgroundColor: '#7A1F2B',
                color: '#FFFFFF',
                padding: '9px',
                borderRadius: '24px',
                fontWeight: 600,
                fontSize: '12px',
                textDecoration: 'none',
              }}
            >
              <Shield size={14} />
              Sign In
            </Link>
          </div>
        </div>
      )}

      <style jsx>{`
        @media (min-width: 768px) {
          .desktop-nav {
            display: flex !important;
          }
        }
        @media (max-width: 767px) {
          .mobile-hamburger {
            display: flex !important;
            align-items: center;
            justify-content: center;
            padding: 4px !important;
          }
          .search-text-label {
            display: none !important;
          }
          :global(.header-logo-icon) {
            width: 32px !important;
            height: 32px !important;
          }
          :global(.header-utensils-icon) {
            width: 15px !important;
            height: 15px !important;
          }
          :global(.header-logo-title) {
            font-size: 16px !important;
          }
          :global(.header-logo-subtitle) {
            font-size: 8px !important;
            letter-spacing: 1.2px !important;
          }
          :global(#header-search-btn) {
            padding: 6px 10px !important;
          }
          :global(#header-search-btn svg) {
            width: 14px !important;
            height: 14px !important;
          }
          :global(#header-admin-btn) {
            padding: 5px 11px !important;
            font-size: 11px !important;
            gap: 4px !important;
          }
          :global(#header-admin-btn svg) {
            width: 12px !important;
            height: 12px !important;
          }
          :global(#header-mobile-toggle svg) {
            width: 18px !important;
            height: 18px !important;
          }
        }
      `}</style>
    </>
  );
}
