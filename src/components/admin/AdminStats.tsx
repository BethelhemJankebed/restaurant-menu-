'use client';

import React from 'react';
import { Utensils, Layers, CheckCircle2, XCircle, Sparkles, Plus, Eye } from 'lucide-react';
import Link from 'next/link';
import { MenuItemData } from '../MenuItemCard';

interface AdminStatsProps {
  stats: {
    totalItems: number;
    totalCategories: number;
    availableItems: number;
    unavailableItems: number;
    featuredItems: number;
  };
  recentItems: MenuItemData[];
  onAddNewItem: () => void;
  onAddNewCategory: () => void;
  onEditItem: (item: MenuItemData) => void;
}

export default function AdminStats({
  stats,
  recentItems,
  onAddNewItem,
  onAddNewCategory,
  onEditItem,
}: AdminStatsProps) {
  const statCards = [
    {
      label: 'MENU ITEMS',
      value: stats.totalItems,
      icon: Utensils,
      color: '#7A1F2B',
      bgColor: '#FDECEF',
    },
    {
      label: 'CATEGORIES',
      value: stats.totalCategories,
      icon: Layers,
      color: '#4A1019',
      bgColor: '#F3ECE8',
    },
    {
      label: 'AVAILABLE',
      value: stats.availableItems,
      icon: CheckCircle2,
      color: '#2E7D32',
      bgColor: '#E8F5E9',
    },
    {
      label: 'UNAVAILABLE',
      value: stats.unavailableItems,
      icon: XCircle,
      color: '#C62828',
      bgColor: '#FFEBEE',
    },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* Top Action Header */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px',
        }}
      >
        <div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '26px',
              fontWeight: 700,
              color: '#2E0B10',
            }}
          >
            Dashboard Overview
          </h2>
          <p style={{ fontSize: '14px', color: '#6B5E60' }}>
            Real-time live metrics and recently added restaurant dishes.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button
            onClick={onAddNewCategory}
            id="admin-add-category-quick"
            className="btn-secondary"
            style={{ fontSize: '13px', padding: '10px 18px' }}
          >
            <Plus size={16} />
            <span>Add Category</span>
          </button>

          <button
            onClick={onAddNewItem}
            id="admin-add-item-quick"
            className="btn-burgundy"
            style={{ fontSize: '13px', padding: '10px 20px' }}
          >
            <Plus size={16} />
            <span>Add Menu Item</span>
          </button>
        </div>
      </div>

      {/* 4 Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '20px',
        }}
      >
        {statCards.map((c) => {
          const Icon = c.icon;
          return (
            <div
              key={c.label}
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '18px',
                border: '1px solid #EBE4DE',
                padding: '24px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                boxShadow: '0 4px 16px rgba(74, 16, 25, 0.04)',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    letterSpacing: '1px',
                    color: '#8A7B76',
                    display: 'block',
                    marginBottom: '6px',
                  }}
                >
                  {c.label}
                </span>
                <span
                  style={{
                    fontFamily: 'Playfair Display, serif',
                    fontSize: '36px',
                    fontWeight: 700,
                    color: '#2E0B10',
                    lineHeight: 1,
                  }}
                >
                  {c.value}
                </span>
              </div>

              <div
                style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  backgroundColor: c.bgColor,
                  color: c.color,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Icon size={24} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Recently Added Dishes List */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '20px',
          border: '1px solid #EBE4DE',
          padding: '28px',
          boxShadow: '0 4px 16px rgba(74, 16, 25, 0.04)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '20px',
            borderBottom: '1px solid #F3ECE8',
            paddingBottom: '14px',
          }}
        >
          <h3
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '20px',
              fontWeight: 700,
              color: '#2E0B10',
            }}
          >
            Recently Added Dishes &amp; Drinks
          </h3>
          <span style={{ fontSize: '13px', color: '#7A1F2B', fontWeight: 600 }}>
            Latest 5 entries
          </span>
        </div>

        {recentItems.length === 0 ? (
          <p style={{ fontSize: '14px', color: '#8A7B76' }}>No menu items added yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {recentItems.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '12px 16px',
                  borderRadius: '14px',
                  backgroundColor: '#FAF7F5',
                  border: '1px solid #F0EAE6',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      objectFit: 'cover',
                      flexShrink: 0,
                    }}
                  />
                  <div style={{ minWidth: 0 }}>
                    <h4
                      style={{
                        fontSize: '15px',
                        fontWeight: 600,
                        color: '#2E0B10',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {item.name}
                    </h4>
                    <span style={{ fontSize: '12px', color: '#6B5E60' }}>
                      {item.category?.name || 'Item'} •{' '}
                      <strong style={{ color: '#7A1F2B' }}>{item.price} ETB</strong>
                    </span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <span
                    style={{
                      fontSize: '11px',
                      fontWeight: 600,
                      padding: '4px 10px',
                      borderRadius: '20px',
                      backgroundColor: item.available ? '#E8F5E9' : '#FFEBEE',
                      color: item.available ? '#2E7D32' : '#C62828',
                    }}
                  >
                    {item.available ? 'Available' : 'Unavailable'}
                  </span>

                  <button
                    onClick={() => onEditItem(item)}
                    style={{
                      background: 'none',
                      border: '1px solid #D5C8C0',
                      borderRadius: '8px',
                      padding: '6px 12px',
                      fontSize: '12px',
                      fontWeight: 600,
                      color: '#4A1019',
                      cursor: 'pointer',
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
