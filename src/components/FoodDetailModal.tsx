'use client';

import React, { useEffect } from 'react';
import { X, Sparkles, CheckCircle2, AlertCircle } from 'lucide-react';
import { MenuItemData } from './MenuItemCard';

interface FoodDetailModalProps {
  item: MenuItemData | null;
  onClose: () => void;
}

export default function FoodDetailModal({ item, onClose }: FoodDetailModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (item) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  // Split ingredients by comma
  const ingredientsList = item.ingredients
    ? item.ingredients.split(',').map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <div
      className="modal-overlay"
      onClick={onClose}
      id="food-detail-modal-overlay"
    >
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        id="food-detail-modal"
      >
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          aria-label="Close modal"
          id="modal-close-btn"
          className="modal-close-icon-btn"
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            zIndex: 20,
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            backgroundColor: 'rgba(255, 255, 255, 0.92)',
            backdropFilter: 'blur(8px)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#4A1019',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.2)',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#7A1F2B';
            e.currentTarget.style.color = '#FFFFFF';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.92)';
            e.currentTarget.style.color = '#4A1019';
          }}
        >
          <X size={20} className="modal-close-icon" />
        </button>

        {/* Large Food Image */}
        <div
          className="modal-image-box"
          style={{
            position: 'relative',
            width: '100%',
            height: '320px',
            backgroundColor: '#F3ECE8',
            overflow: 'hidden',
          }}
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />

          {/* Badges Overlay */}
          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              display: 'flex',
              gap: '8px',
              flexWrap: 'wrap',
            }}
          >
            {item.category?.name && (
              <span
                style={{
                  backgroundColor: '#7A1F2B',
                  color: '#FFFFFF',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 600,
                  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                {item.category.name}
              </span>
            )}

            {item.featured && (
              <span
                style={{
                  backgroundColor: '#C5A059',
                  color: '#2E0B10',
                  padding: '5px 14px',
                  borderRadius: '20px',
                  fontSize: '12px',
                  fontWeight: 700,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.3)',
                }}
              >
                <Sparkles size={13} />
                <span>Chef&apos;s Recommendation</span>
              </span>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="modal-inner-body" style={{ padding: '28px 24px' }}>
          {/* Header Row: Title & Price */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '16px',
              marginBottom: '16px',
            }}
          >
            <h2
              className="modal-dish-title"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '24px',
                fontWeight: 700,
                color: '#2E0B10',
                lineHeight: 1.25,
              }}
            >
              {item.name}
            </h2>

            <div style={{ textAlign: 'right', flexShrink: 0 }}>
              <span
                className="modal-dish-price"
                style={{
                  fontSize: '22px',
                  fontWeight: 700,
                  color: '#7A1F2B',
                  display: 'block',
                }}
              >
                {item.price.toLocaleString()} ETB
              </span>
              <span className="modal-vat-text" style={{ fontSize: '11px', color: '#887B75' }}>
                VAT Included
              </span>
            </div>
          </div>

          {/* Availability Indicator */}
          <div
            className="modal-dish-availability"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '20px',
              fontSize: '13px',
              fontWeight: 600,
              color: item.available ? '#2E7D32' : '#C62828',
            }}
          >
            {item.available ? (
              <>
                <CheckCircle2 size={16} className="modal-avail-icon" />
                <span>Available for order</span>
              </>
            ) : (
              <>
                <AlertCircle size={16} className="modal-avail-icon" />
                <span>Currently out of stock</span>
              </>
            )}
          </div>

          {/* Full Description */}
          <div style={{ marginBottom: '24px' }}>
            <h4
              className="modal-section-heading"
              style={{
                fontSize: '13px',
                textTransform: 'uppercase',
                letterSpacing: '1px',
                color: '#7A1F2B',
                fontWeight: 700,
                marginBottom: '6px',
              }}
            >
              Description
            </h4>
            <p
              className="modal-dish-desc"
              style={{
                fontSize: '15px',
                lineHeight: 1.6,
                color: '#4B3F40',
              }}
            >
              {item.description}
            </p>
          </div>

          {/* Ingredients / Composition Section */}
          {ingredientsList.length > 0 && (
            <div style={{ marginBottom: '28px' }}>
              <h4
                className="modal-section-heading"
                style={{
                  fontSize: '13px',
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  color: '#7A1F2B',
                  fontWeight: 700,
                  marginBottom: '10px',
                }}
              >
                Key Ingredients &amp; Flavor Profile
              </h4>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {ingredientsList.map((ing, idx) => (
                  <span
                    key={idx}
                    className="modal-ingredient-chip"
                    style={{
                      backgroundColor: '#FAF7F5',
                      border: '1px solid #EBE4DE',
                      padding: '6px 14px',
                      borderRadius: '20px',
                      fontSize: '13px',
                      color: '#4A1019',
                      fontWeight: 500,
                    }}
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Action Row */}
          <div
            className="modal-footer-row"
            style={{
              borderTop: '1px solid #EBE4DE',
              paddingTop: '20px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '12px',
            }}
          >
            <span className="modal-order-hint" style={{ fontSize: '13px', color: '#6B5E60' }}>
              Table-side digital ordering available
            </span>
            <button
              onClick={onClose}
              className="btn-burgundy modal-back-btn"
              style={{ padding: '10px 24px', fontSize: '14px' }}
            >
              Back to Menu
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.modal-close-icon-btn) {
            top: 10px !important;
            right: 10px !important;
            width: 30px !important;
            height: 30px !important;
          }
          :global(.modal-close-icon) {
            width: 15px !important;
            height: 15px !important;
          }
          :global(.modal-image-box) {
            height: 190px !important;
          }
          :global(.modal-inner-body) {
            padding: 16px 14px 20px 14px !important;
          }
          :global(.modal-dish-title) {
            font-size: 17px !important;
            line-height: 1.25 !important;
          }
          :global(.modal-dish-price) {
            font-size: 15px !important;
          }
          :global(.modal-vat-text) {
            font-size: 9px !important;
          }
          :global(.modal-dish-availability) {
            font-size: 11px !important;
            gap: 4px !important;
            margin-bottom: 12px !important;
          }
          :global(.modal-avail-icon) {
            width: 13px !important;
            height: 13px !important;
          }
          :global(.modal-section-heading) {
            font-size: 10px !important;
            margin-bottom: 4px !important;
          }
          :global(.modal-dish-desc) {
            font-size: 12px !important;
            line-height: 1.45 !important;
          }
          :global(.modal-ingredient-chip) {
            font-size: 10px !important;
            padding: 4px 10px !important;
          }
          :global(.modal-footer-row) {
            padding-top: 12px !important;
          }
          :global(.modal-order-hint) {
            font-size: 10px !important;
          }
          :global(.modal-back-btn) {
            padding: 7px 16px !important;
            font-size: 11px !important;
          }
        }
      `}</style>
    </div>
  );
}
