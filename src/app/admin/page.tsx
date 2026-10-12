'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  UtensilsCrossed,
  LayoutDashboard,
  Utensils,
  Layers,
  LogOut,
  ExternalLink,
  Plus,
  Search,
  Edit2,
  Trash2,
  CheckCircle2,
  XCircle,
  Sparkles,
  ArrowUp,
  ArrowDown,
  Shield,
} from 'lucide-react';
import AdminLogin from '../../components/admin/AdminLogin';
import AdminStats from '../../components/admin/AdminStats';
import MenuItemFormModal from '../../components/admin/MenuItemFormModal';
import CategoryFormModal from '../../components/admin/CategoryFormModal';
import DeleteConfirmModal from '../../components/admin/DeleteConfirmModal';
import { MenuItemData } from '../../components/MenuItemCard';
import { CategoryItem } from '../../components/CategoryNav';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Active view tab
  const [activeTab, setActiveTab] = useState<'stats' | 'items' | 'categories'>('stats');

  // Data states
  const [statsData, setStatsData] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<MenuItemData[]>([]);
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [loadingData, setLoadingData] = useState(false);

  // Filters for items tab
  const [itemSearch, setItemSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals state
  const [itemModalOpen, setItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItemData | null>(null);

  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CategoryItem | null>(null);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<{
    type: 'item' | 'category';
    id: string;
    name: string;
    warning?: string;
  } | null>(null);
  const [deleting, setDeleting] = useState(false);

  // Toast message
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3500);
  };

  // Check auth
  const checkAuth = async () => {
    try {
      setCheckingAuth(true);
      const res = await fetch('/api/auth/me');
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setCheckingAuth(false);
    }
  };

  // Load all admin data
  const loadAdminData = async () => {
    try {
      setLoadingData(true);
      const [statsRes, itemsRes, catsRes] = await Promise.all([
        fetch('/api/admin/stats'),
        fetch('/api/menu-items'),
        fetch('/api/categories'),
      ]);

      if (statsRes.ok) {
        const d = await statsRes.json();
        setStatsData(d);
      }
      if (itemsRes.ok) {
        const d = await itemsRes.json();
        setMenuItems(d.items || []);
      }
      if (catsRes.ok) {
        const d = await catsRes.json();
        setCategories(d.categories || []);
      }
    } catch (err) {
      console.error('Error loading admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user) {
      loadAdminData();
    }
  }, [user]);

  // Handle Logout
  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      setUser(null);
      showToast('Logged out successfully');
    } catch (e) {
      console.error(e);
    }
  };

  // Toggle Item Availability directly
  const handleToggleAvailability = async (item: MenuItemData) => {
    try {
      const res = await fetch(`/api/menu-items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ available: !item.available }),
      });
      if (res.ok) {
        setMenuItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, available: !i.available } : i))
        );
        showToast(`Updated status to ${!item.available ? 'Available' : 'Unavailable'}`);
        // Refresh stats
        fetch('/api/admin/stats')
          .then((r) => r.json())
          .then((d) => setStatsData(d));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Toggle Featured directly
  const handleToggleFeatured = async (item: MenuItemData) => {
    try {
      const res = await fetch(`/api/menu-items/${item.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ featured: !item.featured }),
      });
      if (res.ok) {
        setMenuItems((prev) =>
          prev.map((i) => (i.id === item.id ? { ...i, featured: !i.featured } : i))
        );
        showToast(
          !item.featured ? 'Marked as Popular / Featured' : 'Removed from Featured'
        );
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Open delete confirm
  const promptDeleteItem = (item: MenuItemData) => {
    setDeleteTarget({
      type: 'item',
      id: item.id,
      name: item.name,
      warning: 'This dish will be permanently deleted from the database.',
    });
    setDeleteModalOpen(true);
  };

  const promptDeleteCategory = (cat: CategoryItem) => {
    const itemCount = cat._count?.menuItems || 0;
    setDeleteTarget({
      type: 'category',
      id: cat.id,
      name: cat.name,
      warning:
        itemCount > 0
          ? `WARNING: This category contains ${itemCount} menu item(s). Deleting it will also delete all associated items!`
          : undefined,
    });
    setDeleteModalOpen(true);
  };

  // Execute delete
  const executeDelete = async () => {
    if (!deleteTarget) return;
    setDeleting(true);

    try {
      if (deleteTarget.type === 'item') {
        const res = await fetch(`/api/menu-items/${deleteTarget.id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setMenuItems((prev) => prev.filter((i) => i.id !== deleteTarget.id));
          showToast(`Deleted "${deleteTarget.name}"`);
        }
      } else {
        const res = await fetch(`/api/categories/${deleteTarget.id}?force=true`, {
          method: 'DELETE',
        });
        if (res.ok) {
          setCategories((prev) => prev.filter((c) => c.id !== deleteTarget.id));
          showToast(`Deleted category "${deleteTarget.name}"`);
        }
      }
      setDeleteModalOpen(false);
      setDeleteTarget(null);
      loadAdminData();
    } catch (err) {
      console.error(err);
      showToast('Failed to delete item.');
    } finally {
      setDeleting(false);
    }
  };

  // Move Category Up / Down
  const handleMoveCategory = async (index: number, direction: 'up' | 'down') => {
    const newCats = [...categories];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newCats.length) return;

    const temp = newCats[index];
    newCats[index] = newCats[targetIdx];
    newCats[targetIdx] = temp;

    setCategories(newCats);

    try {
      await fetch('/api/categories/reorder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderedIds: newCats.map((c) => c.id) }),
      });
      showToast('Category order updated');
    } catch (err) {
      console.error(err);
    }
  };

  // Filtered Items for Management Table
  const filteredTableItems = menuItems.filter((i) => {
    if (itemSearch.trim()) {
      const q = itemSearch.toLowerCase().trim();
      const match =
        i.name.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        i.category?.name.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (categoryFilter !== 'all' && i.categoryId !== categoryFilter) return false;
    if (statusFilter === 'available' && !i.available) return false;
    if (statusFilter === 'unavailable' && i.available) return false;
    return true;
  });

  if (checkingAuth) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: '#7A1F2B', fontWeight: 600 }}>Verifying credentials...</p>
      </div>
    );
  }

  if (!user) {
    return <AdminLogin onSuccess={(loggedUser) => setUser(loggedUser)} />;
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#FAF7F5', display: 'flex', flexDirection: 'column' }}>
      {/* Top Admin Navbar */}
      <nav
        style={{
          backgroundColor: '#4A1019',
          color: '#FFFFFF',
          padding: '16px 24px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.15)',
        }}
      >
        <div
          style={{
            maxWidth: '1360px',
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {/* Logo Brand */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '38px',
                height: '38px',
                borderRadius: '50%',
                backgroundColor: '#7A1F2B',
                border: '1.5px solid #C5A059',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UtensilsCrossed size={18} color="#FFFFFF" />
            </div>
            <div>
              <h1
                style={{
                  fontFamily: 'Playfair Display, serif',
                  fontSize: '20px',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                  lineHeight: 1.1,
                }}
              >
                Le Bordeaux
              </h1>
              <span
                style={{
                  fontSize: '11px',
                  letterSpacing: '1.5px',
                  textTransform: 'uppercase',
                  color: '#C5A059',
                  fontWeight: 600,
                }}
              >
                Administration Dashboard
              </span>
            </div>
          </div>

          {/* User profile & actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <span
              style={{
                fontSize: '13px',
                backgroundColor: 'rgba(255, 255, 255, 0.12)',
                padding: '6px 14px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <Shield size={14} color="#C5A059" />
              <span>{user.name}</span>
            </span>

            <Link
              href="/"
              target="_blank"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: 'transparent',
                color: '#FFFFFF',
                border: '1px solid rgba(255, 255, 255, 0.35)',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              <span>View Public Menu</span>
              <ExternalLink size={13} />
            </Link>

            <button
              onClick={handleLogout}
              id="admin-logout-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                backgroundColor: '#7A1F2B',
                color: '#FFFFFF',
                border: 'none',
                padding: '6px 14px',
                borderRadius: '20px',
                fontSize: '13px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              <LogOut size={14} />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Main Container */}
      <div style={{ maxWidth: '1360px', margin: '0 auto', padding: '32px 24px', width: '100%', flex: 1 }}>
        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '12px',
            borderBottom: '2px solid #EBE4DE',
            paddingBottom: '16px',
            marginBottom: '32px',
            overflowX: 'auto',
          }}
        >
          <button
            onClick={() => setActiveTab('stats')}
            id="tab-overview"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: '30px',
              border: 'none',
              fontSize: '14px',
              fontWeight: activeTab === 'stats' ? 700 : 500,
              backgroundColor: activeTab === 'stats' ? '#7A1F2B' : '#FFFFFF',
              color: activeTab === 'stats' ? '#FFFFFF' : '#4A1019',
              boxShadow: activeTab === 'stats' ? '0 4px 14px rgba(122, 31, 43, 0.25)' : 'none',
              cursor: 'pointer',
            }}
          >
            <LayoutDashboard size={16} />
            <span>Overview &amp; Statistics</span>
          </button>

          <button
            onClick={() => setActiveTab('items')}
            id="tab-items"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: '30px',
              border: 'none',
              fontSize: '14px',
              fontWeight: activeTab === 'items' ? 700 : 500,
              backgroundColor: activeTab === 'items' ? '#7A1F2B' : '#FFFFFF',
              color: activeTab === 'items' ? '#FFFFFF' : '#4A1019',
              boxShadow: activeTab === 'items' ? '0 4px 14px rgba(122, 31, 43, 0.25)' : 'none',
              cursor: 'pointer',
            }}
          >
            <Utensils size={16} />
            <span>Menu Items ({menuItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            id="tab-categories"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 22px',
              borderRadius: '30px',
              border: 'none',
              fontSize: '14px',
              fontWeight: activeTab === 'categories' ? 700 : 500,
              backgroundColor: activeTab === 'categories' ? '#7A1F2B' : '#FFFFFF',
              color: activeTab === 'categories' ? '#FFFFFF' : '#4A1019',
              boxShadow: activeTab === 'categories' ? '0 4px 14px rgba(122, 31, 43, 0.25)' : 'none',
              cursor: 'pointer',
            }}
          >
            <Layers size={16} />
            <span>Categories ({categories.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW & STATS */}
        {activeTab === 'stats' && statsData && (
          <AdminStats
            stats={statsData.stats}
            recentItems={statsData.recentItems}
            onAddNewItem={() => {
              setEditingItem(null);
              setItemModalOpen(true);
            }}
            onAddNewCategory={() => {
              setEditingCategory(null);
              setCategoryModalOpen(true);
            }}
            onEditItem={(item) => {
              setEditingItem(item);
              setItemModalOpen(true);
            }}
          />
        )}

        {/* TAB 2: MENU ITEMS MANAGEMENT */}
        {activeTab === 'items' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Header & Controls */}
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
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#2E0B10',
                  }}
                >
                  Menu Items Management
                </h2>
                <p style={{ fontSize: '13px', color: '#6B5E60' }}>
                  Add, update, search dishes, and toggle live availability.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingItem(null);
                  setItemModalOpen(true);
                }}
                id="btn-add-food-item"
                className="btn-burgundy"
                style={{ padding: '10px 22px', fontSize: '14px' }}
              >
                <Plus size={16} />
                <span>Add Food / Drink</span>
              </button>
            </div>

            {/* Filter Bar */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                padding: '16px 20px',
                border: '1px solid #EBE4DE',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '14px',
                alignItems: 'center',
              }}
            >
              {/* Search */}
              <div
                style={{
                  position: 'relative',
                  flex: '1 1 240px',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
                <div style={{ position: 'absolute', left: '12px', color: '#7A1F2B' }}>
                  <Search size={16} />
                </div>
                <input
                  type="text"
                  placeholder="Filter dishes by name or ingredient..."
                  value={itemSearch}
                  onChange={(e) => setItemSearch(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '8px 12px 8px 36px',
                    borderRadius: '8px',
                    border: '1px solid #D5C8C0',
                    fontSize: '13px',
                  }}
                />
              </div>

              {/* Category Filter */}
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #D5C8C0',
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <option value="all">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                style={{
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #D5C8C0',
                  fontSize: '13px',
                  backgroundColor: '#FFFFFF',
                }}
              >
                <option value="all">All Statuses</option>
                <option value="available">Available Only</option>
                <option value="unavailable">Unavailable Only</option>
              </select>
            </div>

            {/* Items Table */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #EBE4DE',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(74, 16, 25, 0.04)',
              }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                  <thead>
                    <tr style={{ backgroundColor: '#FAF7F5', borderBottom: '1.5px solid #EBE4DE', color: '#4A1019' }}>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Item</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Category</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Price</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Status</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700 }}>Popular</th>
                      <th style={{ padding: '14px 18px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredTableItems.length === 0 ? (
                      <tr>
                        <td colSpan={6} style={{ padding: '40px', textAlign: 'center', color: '#8A7B76' }}>
                          No dishes found matching your filters.
                        </td>
                      </tr>
                    ) : (
                      filteredTableItems.map((item) => (
                        <tr
                          key={item.id}
                          style={{
                            borderBottom: '1px solid #F3ECE8',
                            transition: 'background-color 0.15s',
                          }}
                        >
                          {/* Item Info */}
                          <td style={{ padding: '12px 18px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                              <img
                                src={item.imageUrl}
                                alt={item.name}
                                style={{
                                  width: '44px',
                                  height: '44px',
                                  borderRadius: '8px',
                                  objectFit: 'cover',
                                }}
                              />
                              <div>
                                <span style={{ fontWeight: 600, color: '#2E0B10', display: 'block' }}>
                                  {item.name}
                                </span>
                                <span
                                  style={{
                                    fontSize: '11px',
                                    color: '#8A7B76',
                                    maxWidth: '280px',
                                    display: 'block',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                  }}
                                >
                                  {item.description}
                                </span>
                              </div>
                            </div>
                          </td>

                          {/* Category */}
                          <td style={{ padding: '12px 18px', color: '#4A1019', fontWeight: 500 }}>
                            {item.category?.name || 'Unassigned'}
                          </td>

                          {/* Price */}
                          <td style={{ padding: '12px 18px', fontWeight: 700, color: '#7A1F2B' }}>
                            {item.price.toLocaleString()} ETB
                          </td>

                          {/* Availability Toggle */}
                          <td style={{ padding: '12px 18px' }}>
                            <button
                              onClick={() => handleToggleAvailability(item)}
                              id={`toggle-avail-${item.id}`}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                padding: '4px 10px',
                                borderRadius: '20px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: 600,
                                backgroundColor: item.available ? '#E8F5E9' : '#FFEBEE',
                                color: item.available ? '#2E7D32' : '#C62828',
                              }}
                            >
                              {item.available ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
                              <span>{item.available ? 'In Stock' : 'Out of Stock'}</span>
                            </button>
                          </td>

                          {/* Popular Toggle */}
                          <td style={{ padding: '12px 18px' }}>
                            <button
                              onClick={() => handleToggleFeatured(item)}
                              id={`toggle-featured-${item.id}`}
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '4px',
                                padding: '4px 10px',
                                borderRadius: '20px',
                                border: 'none',
                                cursor: 'pointer',
                                fontSize: '12px',
                                fontWeight: 600,
                                backgroundColor: item.featured ? '#FFF8E1' : '#F3ECE8',
                                color: item.featured ? '#B78103' : '#8A7B76',
                              }}
                            >
                              <Sparkles size={12} />
                              <span>{item.featured ? 'Yes' : 'No'}</span>
                            </button>
                          </td>

                          {/* Actions */}
                          <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                            <div style={{ display: 'inline-flex', gap: '8px' }}>
                              <button
                                onClick={() => {
                                  setEditingItem(item);
                                  setItemModalOpen(true);
                                }}
                                id={`edit-item-${item.id}`}
                                title="Edit item"
                                style={{
                                  backgroundColor: '#FAF7F5',
                                  border: '1px solid #D5C8C0',
                                  padding: '6px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  color: '#4A1019',
                                }}
                              >
                                <Edit2 size={14} />
                              </button>

                              <button
                                onClick={() => promptDeleteItem(item)}
                                id={`delete-item-${item.id}`}
                                title="Delete item"
                                style={{
                                  backgroundColor: '#FFEBEE',
                                  border: '1px solid #FFCDD2',
                                  padding: '6px',
                                  borderRadius: '6px',
                                  cursor: 'pointer',
                                  color: '#C62828',
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: CATEGORY MANAGEMENT */}
        {activeTab === 'categories' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
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
                    fontSize: '24px',
                    fontWeight: 700,
                    color: '#2E0B10',
                  }}
                >
                  Category Management
                </h2>
                <p style={{ fontSize: '13px', color: '#6B5E60' }}>
                  Manage food and drink categories, reorder tabs, and control types.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingCategory(null);
                  setCategoryModalOpen(true);
                }}
                id="btn-add-category"
                className="btn-burgundy"
                style={{ padding: '10px 22px', fontSize: '14px' }}
              >
                <Plus size={16} />
                <span>Add Category</span>
              </button>
            </div>

            {/* Categories Table */}
            <div
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #EBE4DE',
                overflow: 'hidden',
                boxShadow: '0 4px 16px rgba(74, 16, 25, 0.04)',
              }}
            >
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '13px' }}>
                <thead>
                  <tr style={{ backgroundColor: '#FAF7F5', borderBottom: '1.5px solid #EBE4DE', color: '#4A1019' }}>
                    <th style={{ padding: '14px 20px', fontWeight: 700 }}>Order</th>
                    <th style={{ padding: '14px 20px', fontWeight: 700 }}>Category Name</th>
                    <th style={{ padding: '14px 20px', fontWeight: 700 }}>Type</th>
                    <th style={{ padding: '14px 20px', fontWeight: 700 }}>Dishes Count</th>
                    <th style={{ padding: '14px 20px', fontWeight: 700, textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((cat, idx) => (
                    <tr key={cat.id} style={{ borderBottom: '1px solid #F3ECE8' }}>
                      {/* Reorder Buttons */}
                      <td style={{ padding: '14px 20px' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <span style={{ fontWeight: 700, color: '#7A1F2B', width: '22px' }}>
                            {idx + 1}
                          </span>
                          <button
                            disabled={idx === 0}
                            onClick={() => handleMoveCategory(idx, 'up')}
                            style={{
                              background: 'none',
                              border: '1px solid #EBE4DE',
                              borderRadius: '4px',
                              padding: '2px',
                              cursor: idx === 0 ? 'not-allowed' : 'pointer',
                              color: idx === 0 ? '#C5BDB7' : '#4A1019',
                            }}
                          >
                            <ArrowUp size={13} />
                          </button>
                          <button
                            disabled={idx === categories.length - 1}
                            onClick={() => handleMoveCategory(idx, 'down')}
                            style={{
                              background: 'none',
                              border: '1px solid #EBE4DE',
                              borderRadius: '4px',
                              padding: '2px',
                              cursor: idx === categories.length - 1 ? 'not-allowed' : 'pointer',
                              color: idx === categories.length - 1 ? '#C5BDB7' : '#4A1019',
                            }}
                          >
                            <ArrowDown size={13} />
                          </button>
                        </div>
                      </td>

                      {/* Name */}
                      <td style={{ padding: '14px 20px', fontWeight: 600, color: '#2E0B10' }}>
                        {cat.name}
                      </td>

                      {/* Type */}
                      <td style={{ padding: '14px 20px' }}>
                        <span
                          style={{
                            padding: '4px 10px',
                            borderRadius: '12px',
                            fontSize: '11px',
                            fontWeight: 700,
                            backgroundColor: cat.type === 'FOOD' ? '#FDECEF' : '#E0F2FE',
                            color: cat.type === 'FOOD' ? '#7A1F2B' : '#0369A1',
                          }}
                        >
                          {cat.type}
                        </span>
                      </td>

                      {/* Count */}
                      <td style={{ padding: '14px 20px', color: '#6B5E60' }}>
                        <strong>{cat._count?.menuItems || 0}</strong> item(s)
                      </td>

                      {/* Actions */}
                      <td style={{ padding: '14px 20px', textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '8px' }}>
                          <button
                            onClick={() => {
                              setEditingCategory(cat);
                              setCategoryModalOpen(true);
                            }}
                            id={`edit-cat-${cat.id}`}
                            style={{
                              backgroundColor: '#FAF7F5',
                              border: '1px solid #D5C8C0',
                              padding: '6px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              color: '#4A1019',
                            }}
                          >
                            <Edit2 size={14} />
                          </button>

                          <button
                            onClick={() => promptDeleteCategory(cat)}
                            id={`delete-cat-${cat.id}`}
                            style={{
                              backgroundColor: '#FFEBEE',
                              border: '1px solid #FFCDD2',
                              padding: '6px',
                              borderRadius: '6px',
                              cursor: 'pointer',
                              color: '#C62828',
                            }}
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Modals */}
      <MenuItemFormModal
        item={editingItem}
        categories={categories}
        isOpen={itemModalOpen}
        onClose={() => setItemModalOpen(false)}
        onSave={(saved) => {
          showToast(`Saved "${saved.name}" successfully`);
          loadAdminData();
        }}
      />

      <CategoryFormModal
        category={editingCategory}
        isOpen={categoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
        onSave={(saved) => {
          showToast(`Category "${saved.name}" saved`);
          loadAdminData();
        }}
      />

      <DeleteConfirmModal
        isOpen={deleteModalOpen}
        title={deleteTarget?.type === 'item' ? 'Delete Menu Item?' : 'Delete Category?'}
        message={`Are you sure you want to permanently delete "${deleteTarget?.name}"?`}
        warningDetails={deleteTarget?.warning}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={executeDelete}
        loading={deleting}
      />

      {/* Floating Toast Notification */}
      {toast && (
        <div className="toast-container">
          <div className="toast">
            <CheckCircle2 size={18} color="#C5A059" />
            <span>{toast}</span>
          </div>
        </div>
      )}
    </div>
  );
}
