import React from 'react';

/**
 * PUBLIC_INTERFACE
 * RecentWorkouts - Lists recent workout entries.
 * Props:
 *  - items: Array<{ id, date, title, type, durationMin, calories, notes }>
 */
export default function RecentWorkouts({ items = [] }) {
  return (
    <section className="card" aria-label="Recent Workouts">
      <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ marginBottom: 0 }}>Recent Workouts</h2>
          <p className="text-muted" style={{ marginTop: 4 }}>Your latest activities</p>
        </div>
        <button type="button" className="btn btn--secondary" title="Log workout">
          + Log workout
        </button>
      </header>

      <div style={{ marginTop: '0.75rem', display: 'grid', gap: '0.5rem' }}>
        {items.length === 0 ? (
          <p className="text-muted">No workouts yet. Start by logging your first activity!</p>
        ) : (
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem' }}>
            {items.map((w) => (
              <li
                key={w.id}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr auto',
                  gap: '0.5rem',
                  padding: '0.6rem 0.75rem',
                  borderRadius: '12px',
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                }}
              >
                <div>
                  <strong style={{ color: 'var(--text-primary)' }}>{w.title}</strong>
                  <div className="text-muted" style={{ fontSize: '0.9rem' }}>
                    {safeFormatDateTime(w.date)} • {w.type} • {w.durationMin} min • {w.calories} kcal
                  </div>
                  {w.notes ? (
                    <div className="text-muted" style={{ marginTop: 4 }}>{w.notes}</div>
                  ) : null}
                </div>
                <div style={{ display: 'grid', gap: 6, alignContent: 'center' }}>
                  <button className="btn btn--secondary" type="button" aria-label={`Edit ${w.title}`}>
                    Edit
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}

function safeFormatDateTime(iso) {
  try {
    const d = new Date(iso);
    return d.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return iso;
  }
}
