'use client';

import React, { useState, useEffect } from 'react';
import { X, Layers } from 'lucide-react';
import { CategoryItem } from '../CategoryNav';

interface CategoryFormModalProps {
  category: CategoryItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (cat: CategoryItem) => void;
}

export default function CategoryFormModal({
  category,
  isOpen,
  onClose,
  onSave,
}: CategoryFormModalProps) {
  const [name, setName] = useState('');
  const [type, setType] = useState('FOOD');
  const [order, setOrder] = useState('1');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (category) {
      setName(category.name);
      setType(category.type);
      setOrder(category.order.toString());
    } else {
      setName('');
      setType('FOOD');
      setOrder('10');
    }
    setError(null);
  }, [category, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please provide a category name.');
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      name: name.trim(),
      type: type.toUpperCase(),
      order: parseInt(order, 10) || 1,
    };

    try {
      const isEdit = Boolean(category);
      const url = isEdit ? `/api/categories/${category!.id}` : '/api/categories';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save category');
      }

      onSave(data.category);
      onClose();
    } catch (err: any) {
      setError(err.message || 'Error saving category');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '480px' }}
      >
        <div
          style={{
            padding: '20px 24px',
            borderBottom: '1px solid #EBE4DE',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
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
            {category ? 'Edit Category' : 'Create New Category'}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6B5E60',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {error && (
            <div
              style={{
                backgroundColor: '#FDECEF',
                color: '#7A1F2B',
                padding: '12px',
                borderRadius: '8px',
                fontSize: '13px',
                marginBottom: '16px',
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4A1019', marginBottom: '6px' }}>
                Category Name *
              </label>
              <input
                type="text"
                required
                id="cat-name-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Artisanal Sandwiches, Mocktails"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #D5C8C0',
                  fontSize: '14px',
                }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4A1019', marginBottom: '6px' }}>
                Category Type *
              </label>
              <select
                id="cat-type-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #D5C8C0',
                  fontSize: '14px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <option value="FOOD">FOOD (Dishes, Burgers, Pizzas, Desserts...)</option>
                <option value="DRINK">DRINK (Coffee, Teas, Cocktails, Juices...)</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4A1019', marginBottom: '6px' }}>
                Display Order Priority
              </label>
              <input
                type="number"
                id="cat-order-input"
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                placeholder="1"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #D5C8C0',
                  fontSize: '14px',
                }}
              />
              <span style={{ fontSize: '11px', color: '#8A7B76', marginTop: '4px', display: 'block' }}>
                Lower numbers appear first in the menu navigation.
              </span>
            </div>
          </div>

          <div
            style={{
              marginTop: '28px',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '12px',
              borderTop: '1px solid #EBE4DE',
              paddingTop: '18px',
            }}
          >
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
              style={{ fontSize: '13px' }}
            >
              Cancel
            </button>
            <button
              type="submit"
              id="cat-save-btn"
              disabled={saving}
              className="btn-burgundy"
              style={{ fontSize: '13px', padding: '10px 24px' }}
            >
              {saving ? 'Saving...' : category ? 'Update Category' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
