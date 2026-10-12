'use client';

import React, { useState } from 'react';
import { Lock, Mail, UtensilsCrossed, ArrowRight, ShieldCheck } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: (user: any) => void;
}

export default function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [email, setEmail] = useState('admin@restaurant.com');
  const [password, setPassword] = useState('admin123');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      onSuccess(data.user);
    } catch (err: any) {
      setError(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '460px',
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          padding: '40px 32px',
          boxShadow: '0 20px 60px rgba(74, 16, 25, 0.08)',
          border: '1px solid #EBE4DE',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              backgroundColor: '#7A1F2B',
              color: '#FFFFFF',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 20px rgba(122, 31, 43, 0.3)',
              marginBottom: '16px',
            }}
          >
            <UtensilsCrossed size={26} />
          </div>
          <h2
            style={{
              fontFamily: 'Playfair Display, serif',
              fontSize: '28px',
              fontWeight: 700,
              color: '#4A1019',
              marginBottom: '6px',
            }}
          >
            Admin Sign In
          </h2>
          <p style={{ fontSize: '14px', color: '#6B5E60' }}>
            Authorized access for restaurant management &amp; staff only.
          </p>
        </div>

        {error && (
          <div
            style={{
              backgroundColor: '#FDECEF',
              color: '#7A1F2B',
              border: '1px solid #F0D4D7',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '13px',
              marginBottom: '20px',
              fontWeight: 500,
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <label
              htmlFor="login-email"
              style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4A1019', marginBottom: '6px' }}
            >
              Email Address
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '14px', color: '#7A1F2B' }}>
                <Mail size={18} />
              </div>
              <input
                id="login-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@restaurant.com"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid #EBE4DE',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#FAF7F5',
                }}
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="login-password"
              style={{ display: 'block', fontSize: '13px', fontWeight: 600, color: '#4A1019', marginBottom: '6px' }}
            >
              Password
            </label>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <div style={{ position: 'absolute', left: '14px', color: '#7A1F2B' }}>
                <Lock size={18} />
              </div>
              <input
                id="login-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '12px',
                  border: '1px solid #EBE4DE',
                  fontSize: '14px',
                  outline: 'none',
                  backgroundColor: '#FAF7F5',
                }}
              />
            </div>
          </div>

          {/* Quick Demo Credentials Helper */}
          <div
            style={{
              backgroundColor: '#FAF7F5',
              border: '1px dashed #D5C8C0',
              borderRadius: '12px',
              padding: '10px 14px',
              fontSize: '12px',
              color: '#6B5E60',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span>
              Demo: <strong>admin@restaurant.com</strong> / <strong>admin123</strong>
            </span>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@restaurant.com');
                setPassword('admin123');
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#7A1F2B',
                fontWeight: 700,
                cursor: 'pointer',
                fontSize: '12px',
              }}
            >
              Fill Demo
            </button>
          </div>

          <button
            type="submit"
            id="admin-login-submit"
            disabled={loading}
            className="btn-burgundy"
            style={{
              width: '100%',
              padding: '14px',
              borderRadius: '14px',
              fontSize: '15px',
              marginTop: '8px',
            }}
          >
            {loading ? (
              <span>Signing in...</span>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Sign In</span>
                <ArrowRight size={16} />
              </>
            )}
          </button>

          <p
            style={{
              textAlign: 'center',
              fontSize: '12px',
              color: '#8A7B76',
              margin: '6px 0 0 0',
            }}
          >
            Administrative access only. Public registration is disabled.
          </p>
        </form>
      </div>
    </div>
  );
}
