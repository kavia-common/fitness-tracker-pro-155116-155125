import React from 'react';

/**
 * PUBLIC_INTERFACE
 * GoalsSummary - Displays active goals with progress and due date.
 * Props:
 *  - items: Array<{ id, title, progress:number, target:number, unit:string, due:string(YYYY-MM-DD), status:'on-track'|'at-risk'|'off-track' }>
 */
export default function GoalsSummary({ items = [] }) {
  return (
    <section className="card" aria-label="Goals Summary">
      <h2 style={{ marginBottom: 0 }}>Active Goals</h2>
      <p className="text-muted" style={{ marginTop: 4 }}>Stay focused on what matters this week</p>

      <div style={{ display: 'grid', gap: '0.75rem', marginTop: '0.75rem' }}>
        {items.length === 0 ? (
          <p className="text-muted">No active goals. Create your first goal to get started.</p>
        ) : (
          items.map((g) => {
            const pct = Math.max(0, Math.min(100, Math.round((g.progress / (g.target || 1)) * 100)));
            return (
              <article
                key={g.id}
                style={{
                  display: 'grid',
                  gap: '0.5rem',
                  padding: '0.6rem 0.75rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  background: 'var(--bg-primary)',
                }}
                aria-label={`${g.title} progress ${pct}%`}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                  <strong style={{ color: 'var(--text-primary)' }}>{g.title}</strong>
                  <span className="badge" style={{ background: statusBg(g.status), color: statusColor(g.status), borderColor: 'transparent' }}>
                    {statusLabel(g.status)}
                  </span>
                </div>

                <div className="text-muted" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                  <span>
                    {g.progress} / {g.target} {g.unit}
                  </span>
                  <span>Due {safeFormatDate(g.due)}</span>
                </div>

                <Progress value={pct} />
              </article>
            );
          })
        )}
      </div>
    </section>
  );
}

function Progress({ value = 0 }) {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
      style={{
        width: '100%',
        height: 10,
        background: 'var(--bg-secondary)',
        borderRadius: 999,
        overflow: 'hidden',
        border: '1px solid var(--border-color)',
      }}
    >
      <div
        style={{
          width: `${value}%`,
          height: '100%',
          background: 'linear-gradient(90deg, var(--color-primary), var(--color-accent))',
        }}
      />
    </div>
  );
}

function statusLabel(status) {
  switch (status) {
    case 'on-track':
      return 'On track';
    case 'at-risk':
      return 'At risk';
    case 'off-track':
      return 'Off track';
    default:
      return 'Status';
  }
}

function statusBg(status) {
  switch (status) {
    case 'on-track':
      return 'color-mix(in oklab, var(--color-secondary) 15%, transparent)';
    case 'at-risk':
      return 'color-mix(in oklab, #f59e0b 20%, transparent)';
    case 'off-track':
      return 'color-mix(in oklab, #ef4444 20%, transparent)';
    default:
      return 'var(--bg-secondary)';
  }
}

function statusColor(status) {
  switch (status) {
    case 'on-track':
      return 'var(--color-secondary)';
    case 'at-risk':
      return '#b45309';
    case 'off-track':
      return '#b91c1c';
    default:
      return 'var(--text-secondary)';
  }
}

function safeFormatDate(isoLike) {
  try {
    const d = new Date(isoLike);
    return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return isoLike;
  }
}
