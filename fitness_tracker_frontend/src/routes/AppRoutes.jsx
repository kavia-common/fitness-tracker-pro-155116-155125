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
 import ProtectedRoute from '../components/auth/ProtectedRoute';
 import Login from '../pages/Login';
 import Register from '../pages/Register';
 import Dashboard from '../pages/Dashboard';

 /** Simple stub components for now; replace with actual pages later */
 const Page = ({ title, description }) => (
   <section className="card" role="region" aria-label={`${title} section`}>
     <h1>{title}</h1>
     {description ? <p className="text-muted">{description}</p> : null}
   </section>
 );

 export default function AppRoutes() {
   return (
     <Routes>
       {/* Public routes */}
       <Route path="/login" element={<Login />} />
       <Route path="/register" element={<Register />} />

       {/* Protected routes */}
       <Route
         path="/dashboard"
         element={
           <ProtectedRoute>
             <Dashboard />
           </ProtectedRoute>
         }
       />
       <Route
         path="/workouts"
         element={
           <ProtectedRoute>
             <Page title="Workouts" description="Log new workouts and manage your exercise history." />
           </ProtectedRoute>
         }
       />
       <Route
         path="/goals"
         element={
           <ProtectedRoute>
             <Page title="Goals" description="Set, edit, and track your fitness goals." />
           </ProtectedRoute>
         }
       />
       <Route
         path="/progress"
         element={
           <ProtectedRoute>
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
