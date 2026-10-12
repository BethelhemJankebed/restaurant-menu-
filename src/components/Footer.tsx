'use client';

import React from 'react';
import Link from 'next/link';
import { UtensilsCrossed, Shield } from 'lucide-react';

export default function Footer() {
  return (
    <footer
      className="footer-container"
      style={{
        backgroundColor: '#2E0B10',
        color: '#FFFFFF',
        borderTop: '3px solid #7A1F2B',
        padding: '60px 24px 30px 24px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        <div
          className="footer-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '40px',
            marginBottom: '48px',
          }}
        >
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div
                className="footer-logo-icon"
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '50%',
                  backgroundColor: '#7A1F2B',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#FFFFFF',
                }}
              >
                <UtensilsCrossed size={18} className="footer-utensils-icon" />
              </div>
              <span
                className="footer-brand-title"
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#FFFFFF',
                  letterSpacing: '0.5px',
                }}
              >
                Le Bordeaux
              </span>
            </div>

            <p
              className="footer-brand-desc"
              style={{
                fontSize: '14px',
                lineHeight: 1.6,
                color: 'rgba(255, 255, 255, 0.7)',
                marginBottom: '20px',
              }}
            >
              A signature dining sanctuary celebrating fine culinary craftsmanship, premium ingredients, and warm hospitality.
            </p>

            <div className="footer-social-row" style={{ display: 'flex', gap: '12px' }}>
              {['Instagram', 'Facebook', 'TripAdvisor'].map((social) => (
                <span
                  key={social}
                  className="footer-social-tag"
                  style={{
                    fontSize: '12px',
                    color: '#C5A059',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    border: '1px solid rgba(197, 160, 89, 0.3)',
                    cursor: 'pointer',
                  }}
                >
                  {social}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4
              className="footer-heading"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '18px',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              Navigation
            </h4>
            <ul className="footer-nav-list" style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li>
                <a href="#menu" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '14px' }}>
                  Full Menu
                </a>
              </li>
              <li>
                <a href="#about" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '14px' }}>
                  Culinary Philosophy
                </a>
              </li>
              <li>
                <a href="#contact" style={{ color: 'rgba(255, 255, 255, 0.75)', textDecoration: 'none', fontSize: '14px' }}>
                  Reservations &amp; Hours
                </a>
              </li>
              <li>
                <Link
                  href="/admin"
                  style={{
                    color: '#C5A059',
                    textDecoration: 'none',
                    fontSize: '14px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                  }}
                >
                  <Shield size={13} />
                  <span>Sign In</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4
              className="footer-heading"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '18px',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              Dining Hours
            </h4>
            <p className="footer-body-text" style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.75)' }}>
              <strong>Breakfast:</strong> 7:30 AM – 11:30 AM<br />
              <strong>Lunch &amp; Afternoon:</strong> 12:00 PM – 4:30 PM<br />
              <strong>Dinner &amp; Cellar:</strong> 5:00 PM – 11:30 PM<br />
              <em>Open 7 Days a Week</em>
            </p>
          </div>

          {/* Contact Details */}
          <div>
            <h4
              className="footer-heading"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '18px',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '16px',
              }}
            >
              Contact &amp; Location
            </h4>
            <p className="footer-body-text" style={{ fontSize: '13px', lineHeight: 1.6, color: 'rgba(255, 255, 255, 0.75)' }}>
              Bole Medhanialem Avenue<br />
              Addis Ababa, Ethiopia<br />
              Tel: +251 11 662 4890<br />
              Email: hospitality@lebordeaux.et
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="footer-bottom-bar"
          style={{
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            paddingTop: '24px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            fontSize: '12px',
            color: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <p>© {new Date().getFullYear()} Le Bordeaux Restaurant. All rights reserved.</p>
          <p>Handcrafted with burgundy elegance &amp; pride.</p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.footer-container) {
            padding: 36px 16px 20px 16px !important;
          }
          :global(.footer-grid) {
            gap: 22px !important;
            margin-bottom: 24px !important;
          }
          :global(.footer-logo-icon) {
            width: 30px !important;
            height: 30px !important;
          }
          :global(.footer-utensils-icon) {
            width: 14px !important;
            height: 14px !important;
          }
          :global(.footer-brand-title) {
            font-size: 17px !important;
          }
          :global(.footer-brand-desc) {
            font-size: 11px !important;
            line-height: 1.45 !important;
            margin-bottom: 12px !important;
          }
          :global(.footer-social-row) {
            gap: 8px !important;
          }
          :global(.footer-social-tag) {
            font-size: 10px !important;
            padding: 4px 10px !important;
          }
          :global(.footer-heading) {
            font-size: 14px !important;
            margin-bottom: 8px !important;
          }
          :global(.footer-nav-list) {
            gap: 6px !important;
          }
          :global(.footer-nav-list a) {
            font-size: 11px !important;
          }
          :global(.footer-body-text) {
            font-size: 11px !important;
            line-height: 1.45 !important;
          }
          :global(.footer-bottom-bar) {
            font-size: 10px !important;
            padding-top: 14px !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
          }
        }
      `}</style>
    </footer>
  );
}
