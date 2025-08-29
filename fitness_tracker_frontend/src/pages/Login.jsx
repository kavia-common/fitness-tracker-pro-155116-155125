import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Login - Login form with basic validation and error display.
 */
export default function Login() {
  const { login, loading, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  if (isAuthenticated) {
    // Already logged in
    navigate(from, { replace: true });
  }

  const validate = () => {
    const errs = {};
    if (!form.email) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const onChange = (e) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setApiError('');
    if (!validate()) return;
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || 'Login failed. Please check your credentials.';
      setApiError(msg);
    }
  };

  return (
    <section className="card" role="region" aria-label="Login section" style={{ maxWidth: 520, margin: '2rem auto' }}>
      <h1>Welcome back</h1>
      <p className="text-muted">Access your account to track your fitness journey.</p>

      {apiError ? (
        <div
          role="alert"
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '10px',
            border: '1px solid var(--border-color)',
            background: 'color-mix(in oklab, #ff4d4f 10%, transparent)',
            color: '#b91c1c',
            marginTop: '1rem',
          }}
        >
          {apiError}
        </div>
      ) : null}

      <form onSubmit={onSubmit} style={{ display: 'grid', gap: '0.75rem', marginTop: '1rem' }} noValidate>
        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Email</span>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={onChange}
            placeholder="you@example.com"
            autoComplete="email"
            style={{
              padding: '0.6rem 0.75rem',
              borderRadius: '10px',
              border: `1px solid ${errors.email ? '#ef4444' : 'var(--border-color)'}`,
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            required
          />
          {errors.email ? (
            <small id="email-error" style={{ color: '#ef4444' }}>
              {errors.email}
            </small>
          ) : null}
        </label>

        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Password</span>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={onChange}
            placeholder="••••••••"
            autoComplete="current-password"
            style={{
              padding: '0.6rem 0.75rem',
              borderRadius: '10px',
              border: `1px solid ${errors.password ? '#ef4444' : 'var(--border-color)'}`,
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
            aria-invalid={!!errors.password}
            aria-describedby={errors.password ? 'password-error' : undefined}
            required
          />
          {errors.password ? (
            <small id="password-error" style={{ color: '#ef4444' }}>
              {errors.password}
            </small>
          ) : null}
        </label>

        <button className="btn" type="submit" disabled={loading} style={{ marginTop: '0.5rem' }}>
          {loading ? 'Logging in...' : 'Log in'}
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        New here?{' '}
        <Link to="/register" className="btn btn--secondary" style={{ padding: '0.3rem 0.6rem' }}>
          Create an account
        </Link>
      </p>
    </section>
  );
}
