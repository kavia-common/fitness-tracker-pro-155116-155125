import React from 'react';

/**
 * PUBLIC_INTERFACE
 * MainContainer - Scrollable main content area that hosts routed views.
 */
export default function MainContainer({ children }) {
  return (
    <main
      style={{
        minHeight: 0,
        overflow: 'auto',
        background: 'var(--bg-primary)',
      }}
      aria-label="Main Content"
    >
      <div className="container" style={{ paddingBlock: '1rem' }}>
        {children}
      </div>
    </main>
  );
}
