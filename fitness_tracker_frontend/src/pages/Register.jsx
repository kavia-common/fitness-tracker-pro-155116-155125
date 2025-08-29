import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

/**
 * PUBLIC_INTERFACE
 * Register - Registration form with basic validation and error display.
 */
export default function Register() {
  const { register, loading } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState('');

  const validate = () => {
    const errs = {};
    if (!form.name) errs.name = 'Name is required';
    if (!form.email) errs.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(form.email)) errs.email = 'Enter a valid email';
    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';
    if (form.confirmPassword !== form.password) errs.confirmPassword = 'Passwords do not match';
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
      await register({ name: form.name, email: form.email, password: form.password });
      navigate('/dashboard', { replace: true });
    } catch (err) {
      const msg = err?.response?.data?.message || 'Registration failed. Please try again.';
      setApiError(msg);
    }
  };

  return (
    <section className="card" role="region" aria-label="Register section" style={{ maxWidth: 520, margin: '2rem auto' }}>
      <h1>Create your account</h1>
      <p className="text-muted">Start tracking workouts and goals in minutes.</p>

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
          <span style={{ fontWeight: 600 }}>Name</span>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={onChange}
            placeholder="Jane Doe"
            autoComplete="name"
            style={{
              padding: '0.6rem 0.75rem',
              borderRadius: '10px',
              border: `1px solid ${errors.name ? '#ef4444' : 'var(--border-color)'}`,
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            required
          />
          {errors.name ? (
            <small id="name-error" style={{ color: '#ef4444' }}>
              {errors.name}
            </small>
          ) : null}
        </label>

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
            autoComplete="new-password"
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

        <label style={{ display: 'grid', gap: 6 }}>
          <span style={{ fontWeight: 600 }}>Confirm Password</span>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={onChange}
            placeholder="••••••••"
            autoComplete="new-password"
            style={{
              padding: '0.6rem 0.75rem',
              borderRadius: '10px',
              border: `1px solid ${errors.confirmPassword ? '#ef4444' : 'var(--border-color)'}`,
              background: 'var(--bg-primary)',
              color: 'var(--text-primary)',
            }}
            aria-invalid={!!errors.confirmPassword}
            aria-describedby={errors.confirmPassword ? 'confirmPassword-error' : undefined}
            required
          />
          {errors.confirmPassword ? (
            <small id="confirmPassword-error" style={{ color: '#ef4444' }}>
              {errors.confirmPassword}
            </small>
          ) : null}
        </label>

        <button className="btn" type="submit" disabled={loading} style={{ marginTop: '0.5rem' }}>
          {loading ? 'Creating account...' : 'Create account'}
        </button>
      </form>

      <p style={{ marginTop: '1rem' }}>
        Already have an account?{' '}
        <Link to="/login" className="btn btn--secondary" style={{ padding: '0.3rem 0.6rem' }}>
          Log in
        </Link>
      </p>
    </section>
  );
}
