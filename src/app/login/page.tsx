'use client';
import {Card } from '@/app/components/basicUi/card';
import { Input } from '@/app/components/basicUi/input';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '../components/basicUi/button';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function handleEmailChange(e: React.ChangeEvent<HTMLInputElement>) {
    setEmail(e.target.value);
  }
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPassword(e.target.value);
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    // console.log('*', email, password);

    try {
      const result = await signIn('credentials', {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else if (result?.ok) {
        window.location.href = '/'; // Redirect to home or a protected page
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
    <>
        <Card>
          <form onSubmit={handleSubmit}>
            <Input 
                type="email" 
                placeholder="Email" 
                label="Email" 
                value={email} // Pass email state to value
                onChange={handleEmailChange} // Pass handler to onChange
            />
            <Input 
                type="password" 
                placeholder="*****" 
                label="Password" 
                value={password} // Pass email state to value
                onChange={handlePasswordChange} // Pass handler to onChange
            />
            <Button label="Login"/>
          </form>
          <a href="/register" className="text-blue-500 underline">Not registered yet?</a>
        </Card>
    </>
);
};

export default Login;