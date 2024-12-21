'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { registrationData } from '@/utils/mockData';

const LoginForm = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    setError('');
    
    const user = registrationData["Form Responses 1"].find(
      entry => entry["Email Address"].toLowerCase() === email.toLowerCase()
    );

    if (!user) {
      setError('Invalid email address');
      return;
    }

    const cleanPassword = password.replace(/\D/g, '');
    const cleanStoredPhone = user["Telephone contact"].replace(/\D/g, '');
    const normalizedPassword = cleanPassword.replace(/^0+/, '');
    const normalizedStoredPhone = cleanStoredPhone.replace(/^0+/, '');

    if (normalizedPassword !== normalizedStoredPhone) {
      setError('Invalid password');
      return;
    }

    router.push('/dashboard');
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-10 rounded-xl shadow-lg w-full max-w-md transition-colors">
      <div className="text-center mb-8">
        <h1 className="text-2xl font-bold text-blue-900 dark:text-blue-400 mb-2">Welcome Back</h1>
        <p className="text-gray-500 dark:text-gray-400">Please login to access your account</p>
      </div>

      <form onSubmit={handleLogin}>
        <div className="mb-6">
          <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Email Address
          </label>
          <div className="relative">
            <i className="fas fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-200 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-3 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your email"
              required
            />
          </div>
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">
            Password
          </label>
          <div className="relative">
            <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400" />
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-blue-200 dark:border-gray-600 rounded-md focus:outline-none focus:border-blue-600 dark:focus:border-blue-500 focus:ring-3 focus:ring-blue-600/10 dark:focus:ring-blue-500/10 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              placeholder="Enter your password"
              required
            />
          </div>
          {error && (
            <p className="text-red-600 dark:text-red-400 text-sm mt-2">{error}</p>
          )}
        </div>

        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="remember"
              className="rounded border-gray-300 dark:border-gray-600 text-blue-600 focus:ring-blue-500 dark:bg-gray-700"
            />
            <label htmlFor="remember" className="text-gray-700 dark:text-gray-300">
              Remember me
            </label>
          </div>
          <a href="#" className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm">
            Forgot Password?
          </a>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-blue-900 to-blue-600 dark:from-blue-800 dark:to-blue-600 text-white rounded-md font-medium hover:from-blue-800 hover:to-blue-900 dark:hover:from-blue-700 dark:hover:to-blue-800 transform hover:-translate-y-0.5 transition-all active:translate-y-0"
        >
          Log In
        </button>
      </form>
    </div>
  );
};

export default LoginForm;