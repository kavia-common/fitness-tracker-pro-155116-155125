import React from 'react';

/**
 * PUBLIC_INTERFACE
 * StatsCards - Displays KPI tiles for dashboard metrics.
 * Props:
 *  - stats: {
 *      weekWorkouts: number,
 *      totalDurationMin: number,
 *      activeDays: number,
 *      currentStreakDays: number
 *    }
 */
export default function StatsCards({ stats = {} }) {
  const cards = [
    {
      key: 'weekWorkouts',
      label: 'Workouts this week',
      value: stats.weekWorkouts ?? 0,
      emoji: '🏋️',
      tone: 'primary',
    },
    {
      key: 'totalDurationMin',
      label: 'Total duration',
      value: `${stats.totalDurationMin ?? 0} min`,
      emoji: '⏱️',
      tone: 'secondary',
    },
    {
      key: 'activeDays',
      label: 'Active days',
      value: stats.activeDays ?? 0,
      emoji: '📆',
      tone: 'accent',
    },
    {
      key: 'currentStreakDays',
      label: 'Current streak',
      value: `${stats.currentStreakDays ?? 0} days`,
      emoji: '🔥',
      tone: 'primary',
    },
  ];

  return (
    <section aria-label="Stats Summary">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: '1rem',
        }}
      >
        {cards.map((c) => (
          <article
            key={c.key}
            className="card"
            aria-label={`${c.label}: ${c.value}`}
            style={{
              display: 'grid',
              gap: '0.25rem',
              alignContent: 'start',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span className="badge" aria-hidden>{c.emoji}</span>
              <span
                className={`badge ${toneToClass(c.tone)}`}
                style={{ border: 'none' }}
                aria-hidden
              >
                {toneLabel(c.tone)}
              </span>
            </div>
            <p className="text-muted" style={{ marginTop: '0.25rem' }}>{c.label}</p>
            <h2 style={{ marginTop: '0.25rem' }}>{c.value}</h2>
          </article>
        ))}
      </div>
    </section>
  );
}

function toneToClass(tone) {
  switch (tone) {
    case 'primary':
      return 'theme-primary';
    case 'secondary':
      return 'theme-secondary';
    case 'accent':
      return 'theme-accent';
    default:
      return '';
  }
}

function toneLabel(tone) {
  switch (tone) {
    case 'primary':
      return 'Now';
    case 'secondary':
      return 'This week';
    case 'accent':
      return 'Goal';
    default:
      return '';
  }
}
