/**
 * PUBLIC_INTERFACE
 * AppRoutes - Defines application route structure with public and protected routes.
 * Routes:
 *  - /login, /register (public)
 *  - /dashboard, /workouts, /goals, /progress (protected stubs)
 *  - * (404 fallback)
 */
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

/** Simple stub components for now; replace with actual pages later */
const Page = ({ title, description }) => (
  <section className="card" role="region" aria-label={`${title} section`}>
    <h1>{title}</h1>
    {description ? <p className="text-muted">{description}</p> : null}
  </section>
);

// PUBLIC_INTERFACE
function ProtectedRoute({ isAuthenticated = false, children }) {
  /** In future, wire to auth state from context; redirect to /login if not authed */
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
}

export default function AppRoutes() {
  const isAuthed = false; // TODO: replace with real auth state

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/login" element={<Page title="Login" description="Access your account to track your fitness journey." />} />
      <Route path="/register" element={<Page title="Register" description="Create a new account to start tracking workouts and goals." />} />

      {/* Protected routes (stubbed) */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute isAuthenticated={isAuthed}>
            <Page title="Dashboard" description="Overview of your workouts, goals, and progress." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/workouts"
        element={
          <ProtectedRoute isAuthenticated={isAuthed}>
            <Page title="Workouts" description="Log new workouts and manage your exercise history." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/goals"
        element={
          <ProtectedRoute isAuthenticated={isAuthed}>
            <Page title="Goals" description="Set, edit, and track your fitness goals." />
          </ProtectedRoute>
        }
      />
      <Route
        path="/progress"
        element={
          <ProtectedRoute isAuthenticated={isAuthed}>
            <Page title="Progress" description="Visualize your performance and trends over time." />
          </ProtectedRoute>
        }
      />

      {/* Default redirect root -> dashboard (protected) */}
      <Route path="/" element={<Navigate to="/dashboard" replace />} />

      {/* 404 fallback */}
      <Route path="*" element={<Page title="404 - Not Found" description="The page you are looking for does not exist." />} />
    </Routes>
  );
}
