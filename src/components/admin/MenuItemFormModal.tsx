'use client';

import React, { useState, useEffect } from 'react';
import { X, Upload, Sparkles, Check, Image as ImageIcon } from 'lucide-react';
import { MenuItemData } from '../MenuItemCard';
import { CategoryItem } from '../CategoryNav';

interface MenuItemFormModalProps {
  item: MenuItemData | null; // null means ADD mode, item means EDIT mode
  categories: CategoryItem[];
  isOpen: boolean;
  onClose: () => void;
  onSave: (savedItem: MenuItemData) => void;
}

export default function MenuItemFormModal({
  item,
  categories,
  isOpen,
  onClose,
  onSave,
}: MenuItemFormModalProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [ingredients, setIngredients] = useState('');
  const [available, setAvailable] = useState(true);
  const [featured, setFeatured] = useState(false);

  const [uploading, setUploading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (item) {
      setName(item.name);
      setDescription(item.description);
      setPrice(item.price.toString());
      setCategoryId(item.categoryId);
      setImageUrl(item.imageUrl);
      setIngredients(item.ingredients || '');
      setAvailable(item.available);
      setFeatured(item.featured);
    } else {
      setName('');
      setDescription('');
      setPrice('');
      setCategoryId(categories[0]?.id || '');
      setImageUrl('https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80');
      setIngredients('');
      setAvailable(true);
      setFeatured(false);
    }
    setError(null);
  }, [item, categories, isOpen]);

  if (!isOpen) return null;

  // Handle local file upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to upload image');
      }

      setImageUrl(data.url);
    } catch (err: any) {
      setError(err.message || 'Image upload error');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !price || !categoryId) {
      setError('Please fill in dish name, price, and select a category.');
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      name: name.trim(),
      description: description.trim(),
      price: parseFloat(price),
      categoryId,
      imageUrl: imageUrl.trim(),
      ingredients: ingredients.trim(),
      available,
      featured,
    };

    try {
      const isEdit = Boolean(item);
      const url = isEdit ? `/api/menu-items/${item!.id}` : '/api/menu-items';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to save menu item');
      }

      onSave(data.item);
      onClose();
    } catch (err: any) {
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '640px' }}
      >
        {/* Header */}
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
              fontSize: '22px',
              fontWeight: 700,
              color: '#2E0B10',
            }}
          >
            {item ? 'Edit Menu Item' : 'Add New Food / Drink'}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#6B5E60',
              padding: '4px',
            }}
          >
            <X size={20} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} style={{ padding: '24px' }}>
          {error && (
            <div
              style={{
                backgroundColor: '#FDECEF',
                color: '#7A1F2B',
                padding: '12px 16px',
                borderRadius: '10px',
                fontSize: '13px',
                marginBottom: '20px',
              }}
            >
              {error}
            </div>
          )}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
            {/* Name & Price */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 140px', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4A1019', marginBottom: '6px' }}>
                  Item Name *
                </label>
                <input
                  type="text"
                  required
                  id="item-name-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Burgundy Truffle Burger"
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
                  Price (ETB) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  id="item-price-input"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="450"
                  style={{
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '10px',
                    border: '1px solid #D5C8C0',
                    fontSize: '14px',
                  }}
                />
              </div>
            </div>

            {/* Category Dropdown */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4A1019', marginBottom: '6px' }}>
                Menu Category *
              </label>
              <select
                id="item-category-select"
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                required
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #D5C8C0',
                  fontSize: '14px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.type})
                  </option>
                ))}
              </select>
            </div>

            {/* Description */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4A1019', marginBottom: '6px' }}>
                Description
              </label>
              <textarea
                id="item-desc-input"
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Delicious description of ingredients, preparation, and presentation..."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #D5C8C0',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                }}
              />
            </div>

            {/* Ingredients */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4A1019', marginBottom: '6px' }}>
                Ingredients (comma separated)
              </label>
              <input
                type="text"
                id="item-ingredients-input"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
                placeholder="Angus beef, Brioche bun, Truffle aioli, Cheddar"
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid #D5C8C0',
                  fontSize: '14px',
                }}
              />
            </div>

            {/* Image Preview & Upload */}
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4A1019', marginBottom: '6px' }}>
                Food Image &amp; Preview
              </label>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '10px' }}>
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="Preview"
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '12px',
                      objectFit: 'cover',
                      border: '1px solid #EBE4DE',
                    }}
                  />
                ) : (
                  <div
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '12px',
                      backgroundColor: '#FAF7F5',
                      border: '1px dashed #D5C8C0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#8A7B76',
                    }}
                  >
                    <ImageIcon size={24} />
                  </div>
                )}

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <label
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      backgroundColor: '#FAF7F5',
                      border: '1px solid #D5C8C0',
                      cursor: 'pointer',
                      fontSize: '13px',
                      fontWeight: 600,
                      color: '#7A1F2B',
                      width: 'fit-content',
                    }}
                  >
                    <Upload size={16} />
                    <span>{uploading ? 'Uploading...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                  </label>

                  <input
                    type="url"
                    id="item-image-url-input"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Or enter image URL (e.g. Unsplash)"
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D5C8C0',
                      fontSize: '12px',
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Toggles: Available & Featured */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '14px',
                padding: '14px',
                backgroundColor: '#FAF7F5',
                borderRadius: '12px',
                border: '1px solid #EBE4DE',
              }}
            >
              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  id="item-available-checkbox"
                  checked={available}
                  onChange={(e) => setAvailable(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#7A1F2B' }}
                />
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#2E0B10', display: 'block' }}>
                    Available
                  </span>
                  <span style={{ fontSize: '11px', color: '#6B5E60' }}>
                    Customer can order
                  </span>
                </div>
              </label>

              <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  id="item-featured-checkbox"
                  checked={featured}
                  onChange={(e) => setFeatured(e.target.checked)}
                  style={{ width: '18px', height: '18px', accentColor: '#7A1F2B' }}
                />
                <div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: '#2E0B10', display: 'block' }}>
                    Popular / Special
                  </span>
                  <span style={{ fontSize: '11px', color: '#6B5E60' }}>
                    Show &ldquo;Popular&rdquo; badge
                  </span>
                </div>
              </label>
            </div>
          </div>

          {/* Footer Actions */}
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
              id="item-save-btn"
              disabled={saving || uploading}
              className="btn-burgundy"
              style={{ fontSize: '13px', padding: '10px 24px' }}
            >
              {saving ? 'Saving to Database...' : item ? 'Update Item' : 'Add Item'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
