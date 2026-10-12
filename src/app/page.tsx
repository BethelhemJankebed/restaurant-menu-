'use client';

import React, { useState, useEffect, useMemo, useRef } from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CategoryNav, { CategoryItem } from '../components/CategoryNav';
import MenuItemCard, { MenuItemData } from '../components/MenuItemCard';
import FoodDetailModal from '../components/FoodDetailModal';
import AboutSection from '../components/AboutSection';
import Footer from '../components/Footer';
import LogoLoader from '../components/LogoLoader';
import { Search, X, AlertTriangle, RefreshCw, Sparkles, Filter } from 'lucide-react';
import { FALLBACK_CATEGORIES, FALLBACK_MENU_ITEMS } from '@/lib/fallbackData';

export default function HomePage() {
  const [categories, setCategories] = useState<CategoryItem[]>(FALLBACK_CATEGORIES as any);
  const [menuItems, setMenuItems] = useState<MenuItemData[]>(FALLBACK_MENU_ITEMS as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Filters state
  const [selectedCategoryId, setSelectedCategoryId] = useState('all');
  const [activeType, setActiveType] = useState('all'); // 'all' | 'food' | 'drink'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState<MenuItemData | null>(null);

  const searchInputRef = useRef<HTMLInputElement>(null);

  // Fetch categories and menu items
  const fetchData = async () => {
    try {
      setError(null);

      const [catRes, itemsRes] = await Promise.all([
        fetch('/api/categories').catch(() => null),
        fetch('/api/menu-items').catch(() => null),
      ]);

      if (catRes && catRes.ok) {
        const catData = await catRes.json();
        if (catData.categories && catData.categories.length > 0) {
          setCategories(catData.categories);
        }
      }

      if (itemsRes && itemsRes.ok) {
        const itemsData = await itemsRes.json();
        if (itemsData.items && itemsData.items.length > 0) {
          setMenuItems(itemsData.items);
        }
      }
    } catch (err: any) {
      console.warn('Network issue fetching live menu; showing resilient fallback dataset:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Filtered menu items calculation
  const filteredItems = useMemo(() => {
    return menuItems.filter((item) => {
      // 1. Search Query Filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesIngredients = item.ingredients?.toLowerCase().includes(query);
        const matchesCategory = item.category?.name.toLowerCase().includes(query);

        if (!matchesName && !matchesDesc && !matchesIngredients && !matchesCategory) {
          return false;
        }
      }

      // 2. Type Filter (FOOD vs DRINK)
      if (activeType !== 'all') {
        const itemType = item.category?.type?.toLowerCase();
        if (itemType !== activeType.toLowerCase()) {
          return false;
        }
      }

      // 3. Category Filter
      if (selectedCategoryId !== 'all') {
        if (item.categoryId !== selectedCategoryId) {
          return false;
        }
      }

      return true;
    });
  }, [menuItems, searchQuery, activeType, selectedCategoryId]);

  const handleFocusSearch = () => {
    const el = document.getElementById('menu');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 400);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', backgroundColor: '#FAF7F5' }}>
      {/* 360 Logo Loader for initial page load */}
      <LogoLoader />

      {/* Sticky Header */}
      <Header onSearchClick={handleFocusSearch} searchQuery={searchQuery} />

      {/* Hero Section */}
      <Hero />

      {/* Menu Section */}
      <main id="menu" className="main-menu-container" style={{ padding: '60px 24px', maxWidth: '1280px', margin: '0 auto', width: '100%' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div
            className="menu-header-badge"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              color: '#7A1F2B',
              fontSize: '12px',
              fontWeight: 700,
              letterSpacing: '2px',
              textTransform: 'uppercase',
              marginBottom: '10px',
            }}
          >
            <Sparkles size={14} color="#C5A059" />
            <span>Discover Culinary Excellence</span>
          </div>
          <h2
            className="menu-header-title"
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: 'clamp(32px, 4vw, 44px)',
              fontWeight: 700,
              color: '#4A1019',
              lineHeight: 1.2,
            }}
          >
            Our Seasonal Menu
          </h2>
          <p
            className="menu-header-desc"
            style={{
              fontSize: '15px',
              color: '#6B5E60',
              marginTop: '8px',
              maxWidth: '560px',
              margin: '8px auto 0 auto',
            }}
          >
            Handcrafted culinary creations prepared with artisanal precision and prime ingredients.
          </p>
        </div>

        {/* Live Search Bar */}
        <div
          className="menu-search-wrapper"
          style={{
            maxWidth: '680px',
            margin: '0 auto 32px auto',
            position: 'relative',
          }}
        >
          <div
            className="menu-search-box"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#FFFFFF',
              borderRadius: '50px',
              border: '1.5px solid #E5DDD5',
              boxShadow: '0 4px 20px rgba(74, 16, 25, 0.05)',
              transition: 'border-color 0.2s',
            }}
          >
            <div className="menu-search-icon" style={{ paddingLeft: '20px', color: '#7A1F2B', display: 'flex' }}>
              <Search size={20} />
            </div>

            <input
              ref={searchInputRef}
              type="text"
              id="menu-search-input"
              className="menu-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes, burgers, pasta, desserts, cocktails..."
              style={{
                width: '100%',
                padding: '16px 14px',
                border: 'none',
                outline: 'none',
                fontSize: '15px',
                backgroundColor: 'transparent',
                color: '#1F191A',
                fontFamily: 'inherit',
              }}
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                id="clear-search-btn"
                className="menu-clear-btn"
                aria-label="Clear search"
                style={{
                  background: 'none',
                  border: 'none',
                  padding: '8px 16px',
                  cursor: 'pointer',
                  color: '#8A7B76',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <X size={18} />
              </button>
            )}
          </div>

          {/* Active Search Status Pill */}
          {searchQuery && (
            <div
              className="menu-search-status"
              style={{
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '13px',
                color: '#6B5E60',
                padding: '0 12px',
              }}
            >
              <span>
                Found <strong>{filteredItems.length}</strong> result{filteredItems.length === 1 ? '' : 's'} for &ldquo;{searchQuery}&rdquo;
              </span>
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#7A1F2B',
                  fontWeight: 600,
                  cursor: 'pointer',
                  fontSize: '12px',
                  textDecoration: 'underline',
                }}
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* Dynamic Category Navigation */}
        <CategoryNav
          categories={categories}
          selectedCategoryId={selectedCategoryId}
          onSelectCategory={(id) => setSelectedCategoryId(id)}
          activeType={activeType}
          onChangeType={(t) => setActiveType(t)}
        />

        {/* Loading State Skeleton */}
        {loading && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  border: '1px solid #EBE4DE',
                  overflow: 'hidden',
                  height: '360px',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div className="skeleton" style={{ height: '200px', width: '100%' }} />
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div className="skeleton" style={{ height: '22px', width: '70%' }} />
                  <div className="skeleton" style={{ height: '14px', width: '90%' }} />
                  <div className="skeleton" style={{ height: '14px', width: '50%' }} />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #F0D4D7',
              padding: '48px 24px',
              textAlign: 'center',
              maxWidth: '560px',
              margin: '40px auto',
              boxShadow: '0 8px 30px rgba(0,0,0,0.05)',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#FDECEF',
                color: '#7A1F2B',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <AlertTriangle size={28} />
            </div>
            <h3
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '22px',
                fontWeight: 700,
                color: '#4A1019',
                marginBottom: '8px',
              }}
            >
              Unable to Load Menu
            </h3>
            <p style={{ fontSize: '14px', color: '#6B5E60', marginBottom: '24px' }}>
              {error}
            </p>
            <button onClick={fetchData} className="btn-burgundy" id="retry-menu-btn">
              <RefreshCw size={16} />
              <span>Retry Loading</span>
            </button>
          </div>
        )}

        {/* Empty Search Results */}
        {!loading && !error && filteredItems.length === 0 && searchQuery && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #EBE4DE',
              padding: '60px 24px',
              textAlign: 'center',
              maxWidth: '520px',
              margin: '40px auto',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#FAF7F5',
                color: '#7A1F2B',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <Search size={26} />
            </div>
            <h3
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '22px',
                fontWeight: 700,
                color: '#4A1019',
                marginBottom: '8px',
              }}
            >
              No dishes found matching your search.
            </h3>
            <p style={{ fontSize: '14px', color: '#6B5E60', marginBottom: '20px' }}>
              We couldn&apos;t find anything matching &ldquo;{searchQuery}&rdquo;. Try searching for burger, pasta, salmon, wine, or dessert.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategoryId('all');
                setActiveType('all');
              }}
              className="btn-burgundy"
            >
              View Full Menu
            </button>
          </div>
        )}

        {/* Empty Category (No items in category) */}
        {!loading && !error && filteredItems.length === 0 && !searchQuery && (
          <div
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: '20px',
              border: '1px solid #EBE4DE',
              padding: '60px 24px',
              textAlign: 'center',
              maxWidth: '520px',
              margin: '40px auto',
            }}
          >
            <div
              style={{
                width: '56px',
                height: '56px',
                borderRadius: '50%',
                backgroundColor: '#FAF7F5',
                color: '#7A1F2B',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '16px',
              }}
            >
              <Filter size={26} />
            </div>
            <h3
              style={{
                fontFamily: 'Playfair Display, serif',
                fontSize: '22px',
                fontWeight: 700,
                color: '#4A1019',
                marginBottom: '8px',
              }}
            >
              There&apos;s nothing on the menu yet.
            </h3>
            <p style={{ fontSize: '14px', color: '#6B5E60', marginBottom: '20px' }}>
              Check back shortly as our kitchen updates this section with seasonal delicacies.
            </p>
            <button
              onClick={() => {
                setSelectedCategoryId('all');
                setActiveType('all');
              }}
              className="btn-burgundy"
            >
              Show All Dishes
            </button>
          </div>
        )}

        {/* Menu Items Grid */}
        {!loading && !error && filteredItems.length > 0 && (
          <div
            id="menu-grid"
            className="menu-items-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
              gap: '24px',
            }}
          >
            {filteredItems.map((item) => (
              <MenuItemCard
                key={item.id}
                item={item}
                onClick={(clicked) => setSelectedItem(clicked)}
              />
            ))}
          </div>
        )}
      </main>

      {/* Food Detail Modal */}
      <FoodDetailModal item={selectedItem} onClose={() => setSelectedItem(null)} />

      {/* About & Hours Section */}
      <AboutSection />

      {/* Footer */}
      <Footer />

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.main-menu-container) {
            padding: 24px 14px 36px 14px !important;
          }
          :global(.menu-header-badge) {
            font-size: 10px !important;
            letter-spacing: 1.2px !important;
            margin-bottom: 6px !important;
          }
          :global(.menu-header-badge svg) {
            width: 11px !important;
            height: 11px !important;
          }
          :global(.menu-header-title) {
            font-size: 22px !important;
          }
          :global(.menu-header-desc) {
            font-size: 12px !important;
            margin-top: 4px !important;
            line-height: 1.4 !important;
          }
          :global(.menu-search-wrapper) {
            margin-bottom: 18px !important;
          }
          :global(.menu-search-box) {
            border-radius: 30px !important;
          }
          :global(.menu-search-box .menu-search-icon) {
            padding-left: 14px !important;
          }
          :global(.menu-search-box .menu-search-icon svg) {
            width: 15px !important;
            height: 15px !important;
          }
          :global(.menu-search-input) {
            padding: 10px 10px !important;
            font-size: 12px !important;
          }
          :global(.menu-clear-btn) {
            padding: 6px 12px !important;
          }
          :global(.menu-clear-btn svg) {
            width: 14px !important;
            height: 14px !important;
          }
          :global(.menu-search-status) {
            font-size: 11px !important;
            padding: 0 8px !important;
          }
          :global(.menu-items-grid) {
            grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)) !important;
            gap: 12px !important;
          }
        }
        @media (max-width: 480px) {
          :global(.menu-items-grid) {
            grid-template-columns: 1fr !important;
            gap: 12px !important;
          }
        }
      `}</style>
    </div>
  );
}
