'use client';

import React from 'react';
import { AlertTriangle, Trash2 } from 'lucide-react';

interface DeleteConfirmModalProps {
  isOpen: boolean;
  title: string;
  message: string;
  warningDetails?: string;
  onClose: () => void;
  onConfirm: () => void;
  loading?: boolean;
}

export default function DeleteConfirmModal({
  isOpen,
  title,
  message,
  warningDetails,
  onClose,
  onConfirm,
  loading = false,
}: DeleteConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose} id="delete-confirm-overlay">
      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
        style={{ maxWidth: '440px', padding: '32px 24px', textAlign: 'center' }}
      >
        <div
          style={{
            width: '56px',
            height: '56px',
            borderRadius: '50%',
            backgroundColor: '#FFEBEE',
            color: '#C62828',
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
            color: '#2E0B10',
            marginBottom: '10px',
          }}
        >
          {title}
        </h3>

        <p style={{ fontSize: '14px', color: '#6B5E60', lineHeight: 1.5, marginBottom: '20px' }}>
          {message}
        </p>

        {warningDetails && (
          <div
            style={{
              backgroundColor: '#FAF7F5',
              border: '1px solid #EBE4DE',
              borderRadius: '8px',
              padding: '10px 14px',
              fontSize: '12px',
              color: '#8A7B76',
              marginBottom: '24px',
              textAlign: 'left',
            }}
          >
            {warningDetails}
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
          <button
            onClick={onClose}
            disabled={loading}
            className="btn-secondary"
            id="cancel-delete-btn"
            style={{ flex: 1, padding: '12px' }}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            disabled={loading}
            id="confirm-delete-btn"
            style={{
              flex: 1,
              backgroundColor: '#C62828',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px',
              borderRadius: '30px',
              fontWeight: 600,
              fontSize: '14px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
            }}
          >
            <Trash2 size={16} />
            <span>{loading ? 'Deleting...' : 'Delete'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
