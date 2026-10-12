'use client';

import React, { useRef } from 'react';
import { Utensils, Wine, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

export interface CategoryItem {
  id: string;
  name: string;
  type: string;
  order: number;
  _count?: {
    menuItems: number;
  };
}

interface CategoryNavProps {
  categories: CategoryItem[];
  selectedCategoryId: string;
  onSelectCategory: (id: string) => void;
  activeType: string;
  onChangeType: (type: string) => void;
}

export default function CategoryNav({
  categories,
  selectedCategoryId,
  onSelectCategory,
  activeType,
  onChangeType,
}: CategoryNavProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -220 : 220;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Filter categories by activeType if not 'all'
  const visibleCategories = categories.filter((c) => {
    if (activeType === 'all') return true;
    return c.type === activeType.toUpperCase();
  });

  return (
    <div className="category-nav-wrapper" style={{ marginBottom: '32px' }}>
      {/* Type Toggle: All vs Food vs Drinks */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          marginBottom: '20px',
        }}
      >
        <div
          className="category-type-toggle-bar"
          style={{
            display: 'inline-flex',
            backgroundColor: '#EDE7E1',
            padding: '4px',
            borderRadius: '40px',
            border: '1px solid #DFD5CC',
          }}
        >
          <button
            onClick={() => {
              onChangeType('all');
              onSelectCategory('all');
            }}
            id="filter-type-all"
            className="category-type-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '30px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeType === 'all' ? 700 : 500,
              backgroundColor: activeType === 'all' ? '#7A1F2B' : 'transparent',
              color: activeType === 'all' ? '#FFFFFF' : '#4A1019',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
            }}
          >
            <Sparkles size={14} className="category-type-icon" />
            <span>Complete Menu</span>
          </button>

          <button
            onClick={() => {
              onChangeType('food');
              onSelectCategory('all');
            }}
            id="filter-type-food"
            className="category-type-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '30px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeType === 'food' ? 700 : 500,
              backgroundColor: activeType === 'food' ? '#7A1F2B' : 'transparent',
              color: activeType === 'food' ? '#FFFFFF' : '#4A1019',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
            }}
          >
            <Utensils size={14} className="category-type-icon" />
            <span>Food Selection</span>
          </button>

          <button
            onClick={() => {
              onChangeType('drink');
              onSelectCategory('all');
            }}
            id="filter-type-drinks"
            className="category-type-btn"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 18px',
              borderRadius: '30px',
              border: 'none',
              fontSize: '13px',
              fontWeight: activeType === 'drink' ? 700 : 500,
              backgroundColor: activeType === 'drink' ? '#7A1F2B' : 'transparent',
              color: activeType === 'drink' ? '#FFFFFF' : '#4A1019',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)',
            }}
          >
            <Wine size={14} className="category-type-icon" />
            <span>Beverages &amp; Bar</span>
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Category Bar */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Left Arrow Button for Desktop */}
        <button
          onClick={() => scroll('left')}
          aria-label="Scroll categories left"
          style={{
            position: 'absolute',
            left: '0',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '1px solid #EBE4DE',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#7A1F2B',
          }}
          className="category-scroll-btn-left"
        >
          <ChevronLeft size={20} />
        </button>

        {/* Scrollable Container */}
        <div
          ref={scrollRef}
          className="no-scrollbar category-pills-row"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            overflowX: 'auto',
            padding: '8px 44px',
            scrollBehavior: 'smooth',
            width: '100%',
          }}
        >
          {/* "ALL" Category Tab */}
          <button
            onClick={() => onSelectCategory('all')}
            id="category-pill-all"
            className="category-pill-btn"
            style={{
              whiteSpace: 'nowrap',
              padding: '10px 22px',
              borderRadius: '30px',
              fontSize: '14px',
              fontWeight: selectedCategoryId === 'all' ? 700 : 500,
              backgroundColor: selectedCategoryId === 'all' ? '#7A1F2B' : '#FFFFFF',
              color: selectedCategoryId === 'all' ? '#FFFFFF' : '#4A1019',
              border: selectedCategoryId === 'all' ? '1.5px solid #7A1F2B' : '1px solid #EBE4DE',
              boxShadow: selectedCategoryId === 'all' ? '0 4px 14px rgba(122, 31, 43, 0.25)' : 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              flexShrink: 0,
            }}
          >
            All Items
          </button>

          {visibleCategories.map((cat) => {
            const isActive = selectedCategoryId === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                id={`category-pill-${cat.id}`}
                className="category-pill-btn"
                style={{
                  whiteSpace: 'nowrap',
                  padding: '10px 20px',
                  borderRadius: '30px',
                  fontSize: '14px',
                  fontWeight: isActive ? 700 : 500,
                  backgroundColor: isActive ? '#7A1F2B' : '#FFFFFF',
                  color: isActive ? '#FFFFFF' : '#4A1019',
                  border: isActive ? '1.5px solid #7A1F2B' : '1px solid #EBE4DE',
                  boxShadow: isActive ? '0 4px 14px rgba(122, 31, 43, 0.25)' : 'none',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  flexShrink: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <span>{cat.name}</span>
                {cat._count?.menuItems !== undefined && (
                  <span
                    className="category-count-badge"
                    style={{
                      fontSize: '11px',
                      padding: '2px 7px',
                      borderRadius: '12px',
                      backgroundColor: isActive ? 'rgba(255, 255, 255, 0.25)' : '#F3ECE8',
                      color: isActive ? '#FFFFFF' : '#7A1F2B',
                      fontWeight: 600,
                    }}
                  >
                    {cat._count.menuItems}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Right Arrow Button for Desktop */}
        <button
          onClick={() => scroll('right')}
          aria-label="Scroll categories right"
          style={{
            position: 'absolute',
            right: '0',
            zIndex: 10,
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            backgroundColor: '#FFFFFF',
            border: '1px solid #EBE4DE',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#7A1F2B',
          }}
          className="category-scroll-btn-right"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .category-scroll-btn-left,
          .category-scroll-btn-right {
            display: none !important;
          }
          :global(.category-nav-wrapper) {
            margin-bottom: 20px !important;
          }
          :global(.category-type-toggle-bar) {
            padding: 3px !important;
          }
          :global(.category-type-btn) {
            padding: 5px 10px !important;
            font-size: 11px !important;
            gap: 4px !important;
          }
          :global(.category-type-icon) {
            width: 11px !important;
            height: 11px !important;
          }
          :global(.category-pills-row) {
            padding: 4px 12px !important;
            gap: 6px !important;
          }
          :global(.category-pill-btn) {
            padding: 6px 13px !important;
            font-size: 11px !important;
            border-radius: 20px !important;
            gap: 4px !important;
          }
          :global(.category-count-badge) {
            font-size: 9px !important;
            padding: 1px 5px !important;
          }
        }
      `}</style>
    </div>
  );
}
