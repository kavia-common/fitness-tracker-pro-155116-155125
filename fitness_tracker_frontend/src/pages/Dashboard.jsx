import React, { useMemo } from 'react';
import StatsCards from '../components/dashboard/StatsCards';
import RecentWorkouts from '../components/dashboard/RecentWorkouts';
import GoalsSummary from '../components/dashboard/GoalsSummary';

/**
 * PUBLIC_INTERFACE
 * Dashboard - Main overview page combining stats, recent workouts, and active goals.
 * Uses placeholder/sample data for now to allow UI integration before backend APIs are ready.
 */
export default function Dashboard() {
  // Placeholder data; replace with API calls/hooks later.
  const stats = useMemo(() => ({
    weekWorkouts: 4,
    totalDurationMin: 215, // minutes this week
    activeDays: 3, // unique days with workouts
    currentStreakDays: 6,
  }), []);

  const recentWorkouts = useMemo(() => ([
    {
      id: 'w1',
      date: '2025-08-25T08:30:00Z',
      title: 'Morning Run',
      type: 'Cardio',
      durationMin: 35,
      calories: 320,
      notes: 'Felt great, steady pace.',
    },
    {
      id: 'w2',
      date: '2025-08-24T18:00:00Z',
      title: 'Upper Body',
      type: 'Strength',
      durationMin: 45,
      calories: 280,
      notes: 'Bench PR +2.5kg',
    },
    {
      id: 'w3',
      date: '2025-08-23T12:15:00Z',
      title: 'Cycling',
      type: 'Cardio',
      durationMin: 50,
      calories: 410,
      notes: 'Hilly route',
    },
    {
      id: 'w4',
      date: '2025-08-22T07:45:00Z',
      title: 'Core & Mobility',
      type: 'Mobility',
      durationMin: 30,
      calories: 120,
      notes: 'Focused on form',
    },
  ]), []);

  const goals = useMemo(() => ([
    {
      id: 'g1',
      title: 'Run 20km this week',
      progress: 14, // km
      target: 20,
      unit: 'km',
      due: '2025-08-31',
      status: 'on-track',
    },
    {
      id: 'g2',
      title: '3 Strength Sessions',
      progress: 2,
      target: 3,
      unit: 'sessions',
      due: '2025-08-31',
      status: 'at-risk',
    },
    {
      id: 'g3',
      title: 'Daily Stretching',
      progress: 4,
      target: 7,
      unit: 'days',
      due: '2025-08-31',
      status: 'on-track',
    },
  ]), []);

  return (
    <section className="section" aria-label="Dashboard Overview">
      <div className="container" style={{ display: 'grid', gap: '1rem' }}>
        <div className="card">
          <h1>Dashboard</h1>
          <p className="text-muted">Overview of your workouts, goals, and progress.</p>
        </div>

        <StatsCards stats={stats} />

        <div
          style={{
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: '2fr 1fr',
          }}
        >
          <RecentWorkouts items={recentWorkouts} />
          <GoalsSummary items={goals} />
        </div>
      </div>
    </section>
  );
}
