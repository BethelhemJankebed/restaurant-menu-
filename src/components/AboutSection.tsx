'use client';

import React from 'react';
import { Clock, MapPin, Phone, Mail, Award, Wine } from 'lucide-react';

export default function AboutSection() {
  return (
    <section
      id="about"
      className="about-section"
      style={{
        padding: '90px 24px',
        backgroundColor: '#FFFFFF',
        borderTop: '1px solid #EBE4DE',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        <div
          className="about-grid-container"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '48px',
            alignItems: 'center',
          }}
        >
          {/* Left: Culinary Philosophy */}
          <div>
            <div
              className="about-tag"
              style={{
                display: 'inline-block',
                color: '#7A1F2B',
                fontWeight: 700,
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '12px',
              }}
            >
              Our Heritage &amp; Craft
            </div>

            <h2
              className="about-title"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: 'clamp(32px, 4vw, 42px)',
                fontWeight: 700,
                color: '#4A1019',
                lineHeight: 1.2,
                marginBottom: '20px',
              }}
            >
              Where culinary passion meets timeless hospitality.
            </h2>

            <p
              className="about-desc"
              style={{
                fontSize: '16px',
                lineHeight: 1.7,
                color: '#574A4C',
                marginBottom: '24px',
              }}
            >
              At <strong>Le Bordeaux</strong>, every dish is an homage to fine culinary tradition, prepared with hand-selected local produce and imported delicacies. From slow-simmered reductions to artisan stone-baked pizzas and velvety single-origin coffees, we invite you to savor moments that linger.
            </p>

            <div
              className="about-highlights-grid"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '20px',
                marginTop: '32px',
              }}
            >
              <div
                className="about-highlight-card"
                style={{
                  backgroundColor: '#FAF7F5',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1px solid #EBE4DE',
                }}
              >
                <div className="about-highlight-icon" style={{ color: '#7A1F2B', marginBottom: '8px' }}>
                  <Award size={24} />
                </div>
                <h4 className="about-highlight-title" style={{ fontSize: '16px', fontWeight: 700, color: '#2E0B10', marginBottom: '4px' }}>
                  Artisanal Kitchen
                </h4>
                <p className="about-highlight-desc" style={{ fontSize: '13px', color: '#6B5E60', lineHeight: 1.4 }}>
                  Made from scratch daily using pristine organic ingredients.
                </p>
              </div>

              <div
                className="about-highlight-card"
                style={{
                  backgroundColor: '#FAF7F5',
                  padding: '20px',
                  borderRadius: '16px',
                  border: '1px solid #EBE4DE',
                }}
              >
                <div className="about-highlight-icon" style={{ color: '#7A1F2B', marginBottom: '8px' }}>
                  <Wine size={24} />
                </div>
                <h4 className="about-highlight-title" style={{ fontSize: '16px', fontWeight: 700, color: '#2E0B10', marginBottom: '4px' }}>
                  Sommelier Pairing
                </h4>
                <p className="about-highlight-desc" style={{ fontSize: '13px', color: '#6B5E60', lineHeight: 1.4 }}>
                  Curated mocktails, craft sodas, and regional wines.
                </p>
              </div>
            </div>
          </div>

          {/* Right: Info Card & Hours */}
          <div
            id="contact"
            className="about-contact-card"
            style={{
              backgroundColor: '#4A1019',
              color: '#FFFFFF',
              borderRadius: '24px',
              padding: '40px',
              boxShadow: '0 20px 50px rgba(74, 16, 25, 0.25)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Ambient gold glow */}
            <div
              style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '180px',
                height: '180px',
                borderRadius: '50%',
                background: 'radial-gradient(circle, rgba(197, 160, 89, 0.2) 0%, transparent 70%)',
              }}
            />

            <h3
              className="about-contact-title"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '26px',
                fontWeight: 700,
                color: '#FFFFFF',
                marginBottom: '24px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
                paddingBottom: '16px',
              }}
            >
              Visit &amp; Reservations
            </h3>

            <div className="about-contact-list" style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <Clock size={20} color="#C5A059" className="about-info-icon" style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <h5 className="about-info-heading" style={{ fontSize: '14px', fontWeight: 700, color: '#F3ECE8', marginBottom: '4px' }}>
                    Service Hours
                  </h5>
                  <p className="about-info-text" style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5 }}>
                    Monday – Friday: 7:30 AM – 11:00 PM<br />
                    Saturday – Sunday: 8:00 AM – 11:30 PM
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <MapPin size={20} color="#C5A059" className="about-info-icon" style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <h5 className="about-info-heading" style={{ fontSize: '14px', fontWeight: 700, color: '#F3ECE8', marginBottom: '4px' }}>
                    Location
                  </h5>
                  <p className="about-info-text" style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)', lineHeight: 1.5 }}>
                    Bole Medhanialem Avenue, Suite 104<br />
                    Addis Ababa, Ethiopia
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <Phone size={20} color="#C5A059" className="about-info-icon" style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <h5 className="about-info-heading" style={{ fontSize: '14px', fontWeight: 700, color: '#F3ECE8', marginBottom: '4px' }}>
                    Direct Telephone
                  </h5>
                  <p className="about-info-text" style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    +251 11 662 4890 / +251 91 123 4567
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px' }}>
                <Mail size={20} color="#C5A059" className="about-info-icon" style={{ marginTop: '3px', flexShrink: 0 }} />
                <div>
                  <h5 className="about-info-heading" style={{ fontSize: '14px', fontWeight: 700, color: '#F3ECE8', marginBottom: '4px' }}>
                    Inquiries &amp; Events
                  </h5>
                  <p className="about-info-text" style={{ fontSize: '13px', color: 'rgba(255, 255, 255, 0.8)' }}>
                    hospitality@lebordeaux.et
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.about-section) {
            padding: 40px 16px !important;
          }
          :global(.about-grid-container) {
            gap: 24px !important;
          }
          :global(.about-tag) {
            font-size: 10px !important;
            letter-spacing: 1.2px !important;
            margin-bottom: 6px !important;
          }
          :global(.about-title) {
            font-size: 20px !important;
            margin-bottom: 12px !important;
          }
          :global(.about-desc) {
            font-size: 12px !important;
            line-height: 1.5 !important;
            margin-bottom: 16px !important;
          }
          :global(.about-highlights-grid) {
            gap: 10px !important;
            margin-top: 16px !important;
          }
          :global(.about-highlight-card) {
            padding: 12px !important;
            border-radius: 12px !important;
          }
          :global(.about-highlight-icon svg) {
            width: 16px !important;
            height: 16px !important;
            margin-bottom: 4px !important;
          }
          :global(.about-highlight-title) {
            font-size: 12px !important;
            margin-bottom: 2px !important;
          }
          :global(.about-highlight-desc) {
            font-size: 10px !important;
            line-height: 1.35 !important;
          }
          :global(.about-contact-card) {
            padding: 20px 16px !important;
            border-radius: 16px !important;
          }
          :global(.about-contact-title) {
            font-size: 18px !important;
            margin-bottom: 16px !important;
            padding-bottom: 10px !important;
          }
          :global(.about-contact-list) {
            gap: 14px !important;
          }
          :global(.about-info-icon) {
            width: 15px !important;
            height: 15px !important;
          }
          :global(.about-info-heading) {
            font-size: 12px !important;
            margin-bottom: 2px !important;
          }
          :global(.about-info-text) {
            font-size: 11px !important;
            line-height: 1.4 !important;
          }
        }
      `}</style>
    </section>
  );
}
