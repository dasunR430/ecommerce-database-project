'use client';

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { User } from "lucide-react";

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        window.location.href = '/';
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
    setPassword("");
    setEmail("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-md">
        <div className="text-center">
          <div className="mx-auto bg-[#f3f4f6] w-16 h-16 rounded-full flex items-center justify-center mb-4">
            <User className="h-8 w-8 text-[#6b7280]" />
          </div>
          <h2 className="text-2xl font-bold text-[#475569] mb-2">
            Welcome Back
          </h2>
          <p className="text-gray-500 text-sm">
            Please sign in to your account
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleEmailChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#94a3b8] focus:ring-opacity-50 transition duration-200 ease-in-out"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-[#94a3b8] focus:ring-opacity-50 transition duration-200 ease-in-out"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-[#475569] hover:bg-[#334155] text-white py-3 rounded-md transition-colors"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </Button>

          {error && (
            <div className="bg-red-50 text-[#dc2626] p-3 rounded-md text-sm">
              {error}
            </div>
          )}
        </form>

        <div className="text-center">
            <a href="/register" className="text-gray-700 hover:text-gray-900 text-sm">
            Create an account →
            </a>
        </div>
      </Card>
    </div>
  );
};

export default Login;