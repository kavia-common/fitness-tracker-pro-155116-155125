import React from 'react';
import { NavLink } from 'react-router-dom';

/**
 * PUBLIC_INTERFACE
 * Sidebar - Left navigation rail for the dashboard-centric layout.
 */
export default function Sidebar() {
  const linkBase = {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    padding: '0.6rem 0.8rem',
    borderRadius: '10px',
    color: 'var(--text-secondary)',
    textDecoration: 'none',
    fontWeight: 600,
  };

  return (
    <aside
      style={{
        borderRight: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
        padding: '1rem',
        minHeight: 0,
      }}
      aria-label="Sidebar Navigation"
    >
      <nav style={{ display: 'grid', gap: '0.25rem' }}>
        <NavLink
          to="/dashboard"
          style={({ isActive }) => ({
            ...linkBase,
            background: isActive ? 'var(--bg-elevated)' : 'transparent',
            color: isActive ? 'var(--text-primary)' : linkBase.color,
            border: isActive ? '1px solid var(--border-color)' : '1px solid transparent',
          })}
          end
        >
          🏠 Dashboard
        </NavLink>
        <NavLink
          to="/workouts"
          style={({ isActive }) => ({
            ...linkBase,
            background: isActive ? 'var(--bg-elevated)' : 'transparent',
            color: isActive ? 'var(--text-primary)' : linkBase.color,
            border: isActive ? '1px solid var(--border-color)' : '1px solid transparent',
          })}
        >
          🏋️ Workouts
        </NavLink>
        <NavLink
          to="/goals"
          style={({ isActive }) => ({
            ...linkBase,
            background: isActive ? 'var(--bg-elevated)' : 'transparent',
            color: isActive ? 'var(--text-primary)' : linkBase.color,
            border: isActive ? '1px solid var(--border-color)' : '1px solid transparent',
          })}
        >
          🎯 Goals
        </NavLink>
        <NavLink
          to="/progress"
          style={({ isActive }) => ({
            ...linkBase,
            background: isActive ? 'var(--bg-elevated)' : 'transparent',
            color: isActive ? 'var(--text-primary)' : linkBase.color,
            border: isActive ? '1px solid var(--border-color)' : '1px solid transparent',
          })}
        >
          📈 Progress
        </NavLink>
      </nav>
    </aside>
  );
}
