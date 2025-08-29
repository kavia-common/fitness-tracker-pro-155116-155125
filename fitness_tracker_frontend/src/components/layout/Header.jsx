import React from 'react';
import { Link } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Header - Top navigation bar for the app shell.
 * Props:
 * - theme: 'light' | 'dark' current theme string
 * - onToggleTheme: () => void handler to toggle theme
 */
export default function Header({ theme = 'light', onToggleTheme = () => {} }) {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        background: 'var(--bg-elevated)',
        borderBottom: '1px solid var(--border-color)',
        padding: '0.75rem 1rem',
      }}
      aria-label="Application Header"
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Link to="/dashboard" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <span
              aria-hidden
              style={{
                width: 28,
                height: 28,
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'var(--color-primary)',
                color: '#fff',
                borderRadius: 8,
                fontWeight: 800,
              }}
            >
              FT
            </span>
            <strong style={{ color: 'var(--text-primary)' }}>Fitness Tracker</strong>
          </Link>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Link to="/login" className="btn btn--secondary" style={{ textDecoration: 'none' }}>
            Log in
          </Link>
          <Link to="/register" className="btn" style={{ textDecoration: 'none' }}>
            Sign up
          </Link>
          <button
            type="button"
            className="btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            style={{ whiteSpace: 'nowrap' }}
          >
            {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
          </button>
        </div>
      </div>
    </header>
  );
}
