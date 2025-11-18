import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [showResetForm, setShowResetForm] = useState(false);
  const { login, resetPassword } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await login(email, password);
      navigate('/');
    } catch {
      setError('Failed to sign in');
    }

    setLoading(false);
  }

  async function handleResetPassword(e) {
    e.preventDefault();

    try {
      setError('');
      setLoading(true);
      await resetPassword(resetEmail);
      alert('Password reset email sent!');
      setShowResetForm(false);
    } catch {
      setError('Failed to reset password');
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="mx-auto bg-gradient-to-r from-amber-600 to-amber-800 w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <span className="text-white text-2xl font-bold">H</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Hair Salon Admin</h1>
          <p className="text-gray-600 mt-2">Sign in to your account</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        {!showResetForm ? (
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-800 text-white py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-900 transition-all duration-300 shadow-lg"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setShowResetForm(true)}
                className="text-amber-600 hover:text-amber-800 font-medium"
              >
                Forgot Password?
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleResetPassword}>
            <div className="mb-4">
              <label htmlFor="resetEmail" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="resetEmail"
                value={resetEmail}
                onChange={(e) => setResetEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                required
              />
            </div>

            <button
              disabled={loading}
              type="submit"
              className="w-full bg-gradient-to-r from-amber-600 to-amber-800 text-white py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-amber-900 transition-all duration-300 shadow-lg"
            >
              {loading ? 'Sending...' : 'Send Reset Email'}
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setShowResetForm(false)}
                className="text-amber-600 hover:text-amber-800 font-medium"
              >
                Back to Sign In
              </button>
            </div>
          </form>
        )}
      </motion.div>
    </div>
  );
}