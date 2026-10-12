'use client';

import React from 'react';
import { Sparkles, Eye } from 'lucide-react';

export interface MenuItemData {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  ingredients: string;
  available: boolean;
  featured: boolean;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    type: string;
  };
}

interface MenuItemCardProps {
  item: MenuItemData;
  onClick: (item: MenuItemData) => void;
}

export default function MenuItemCard({ item, onClick }: MenuItemCardProps) {
  return (
    <article
      onClick={() => onClick(item)}
      id={`menu-card-${item.id}`}
      className="menu-card"
      style={{
        cursor: 'pointer',
        position: 'relative',
        height: '100%',
        backgroundColor: '#FFFFFF',
      }}
    >
      {/* Image Container with aspect ratio 16:11 */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          paddingTop: '66%',
          overflow: 'hidden',
          backgroundColor: '#F3ECE8',
        }}
      >
        <img
          src={item.imageUrl}
          alt={item.name}
          loading="lazy"
          className="img-zoom"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: item.available ? 'none' : 'grayscale(80%) opacity(0.85)',
          }}
          onError={(e) => {
            // fallback placeholder if image broken
            (e.target as HTMLImageElement).src =
              'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80';
          }}
        />

        {/* Featured / Popular Badge */}
        {item.featured && (
          <div
            className="card-badge-popular"
            style={{
              position: 'absolute',
              top: '12px',
              left: '12px',
              zIndex: 3,
              backgroundColor: '#7A1F2B',
              color: '#FFFFFF',
              padding: '5px 12px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              letterSpacing: '0.5px',
              textTransform: 'uppercase',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              boxShadow: '0 4px 10px rgba(74, 16, 25, 0.4)',
            }}
          >
            <Sparkles size={12} color="#FFD700" className="card-badge-icon" />
            <span>Popular</span>
          </div>
        )}

        {/* Category Pill on Image */}
        {item.category?.name && (
          <div
            className="card-badge-category"
            style={{
              position: 'absolute',
              bottom: '10px',
              left: '12px',
              zIndex: 3,
              backgroundColor: 'rgba(30, 8, 12, 0.75)',
              backdropFilter: 'blur(4px)',
              color: '#FFFFFF',
              padding: '4px 10px',
              borderRadius: '12px',
              fontSize: '11px',
              fontWeight: 600,
            }}
          >
            {item.category.name}
          </div>
        )}

        {/* Availability Status Badge */}
        {!item.available && (
          <div
            className="card-badge-soldout"
            style={{
              position: 'absolute',
              top: '12px',
              right: '12px',
              zIndex: 3,
              backgroundColor: '#2E0B10',
              color: '#FFBABA',
              border: '1px solid #FF8080',
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '11px',
              fontWeight: 700,
              textTransform: 'uppercase',
            }}
          >
            Sold Out
          </div>
        )}

        {/* Hover Quick View Overlay */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundColor: 'rgba(122, 31, 43, 0.18)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: 0,
            transition: 'opacity 0.25s ease',
          }}
          className="card-quick-view-overlay"
        >
          <span
            style={{
              backgroundColor: '#FFFFFF',
              color: '#7A1F2B',
              padding: '8px 16px',
              borderRadius: '20px',
              fontSize: '12px',
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              boxShadow: '0 4px 15px rgba(0,0,0,0.15)',
            }}
          >
            <Eye size={14} /> Quick View
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div
        className="card-content-body"
        style={{
          padding: '18px 20px',
          display: 'flex',
          flexDirection: 'column',
          flexGrow: 1,
          justifyContent: 'space-between',
        }}
      >
        <div>
          {/* Title & Price Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: '12px',
              marginBottom: '8px',
            }}
          >
            <h3
              className="card-dish-title"
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '18px',
                fontWeight: 700,
                color: '#2E0B10',
                lineHeight: 1.3,
              }}
            >
              {item.name}
            </h3>

            <span
              className="card-dish-price"
              style={{
                fontSize: '16px',
                fontWeight: 700,
                color: '#7A1F2B',
                whiteSpace: 'nowrap',
              }}
            >
              {item.price.toLocaleString()} ETB
            </span>
          </div>

          {/* Description */}
          <p
            className="card-dish-desc"
            style={{
              fontSize: '13px',
              lineHeight: 1.5,
              color: '#6B5E60',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              marginBottom: '14px',
            }}
          >
            {item.description}
          </p>
        </div>

        {/* Footer info: ingredients preview */}
        {item.ingredients && (
          <div
            className="card-dish-notes"
            style={{
              fontSize: '11px',
              color: '#9C8E85',
              borderTop: '1px solid #F5EFEB',
              paddingTop: '10px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            <strong style={{ color: '#6B5E60' }}>Notes:</strong> {item.ingredients}
          </div>
        )}
      </div>

      <style jsx>{`
        .menu-card:hover .card-quick-view-overlay {
          opacity: 1 !important;
        }
        @media (max-width: 768px) {
          :global(.card-badge-popular) {
            top: 8px !important;
            left: 8px !important;
            padding: 3px 8px !important;
            font-size: 9px !important;
            gap: 3px !important;
          }
          :global(.card-badge-icon) {
            width: 10px !important;
            height: 10px !important;
          }
          :global(.card-badge-category) {
            bottom: 6px !important;
            left: 8px !important;
            padding: 2px 7px !important;
            font-size: 9px !important;
          }
          :global(.card-badge-soldout) {
            top: 8px !important;
            right: 8px !important;
            padding: 2px 7px !important;
            font-size: 9px !important;
          }
          :global(.card-content-body) {
            padding: 12px 14px !important;
          }
          :global(.card-dish-title) {
            font-size: 14px !important;
            line-height: 1.25 !important;
          }
          :global(.card-dish-price) {
            font-size: 13px !important;
          }
          :global(.card-dish-desc) {
            font-size: 11px !important;
            line-height: 1.4 !important;
            margin-bottom: 8px !important;
          }
          :global(.card-dish-notes) {
            font-size: 10px !important;
            padding-top: 6px !important;
          }
        }
      `}</style>
    </article>
  );
}
