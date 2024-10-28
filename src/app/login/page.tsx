'use client';
import {Card} from "@/components/ui/card"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/app/components/basicUi/input';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '@/components/ui/button';

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
<div className="min-h-screen flex items-center justify-center bg-gray-800 p-4 overflow-hidden">
    <div className="relative flex flex-col items-center bg-white bg-opacity-90 p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-lg max-w-md w-full">
    <div className="bg-red-900 rounded-full p-4 mb-6">
                <FontAwesomeIcon icon={faUser} className="h-16 w-16 text-gray-300" />
    </div>
      
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
        <br/>
        <Button type="submit" >Login</Button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <br/>
      </form>
      <a href="/register" className="text-blue-500 underline">Not registered yet?</a>
    </div>
  </div>
);
};

export default Login;