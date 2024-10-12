'use client';
import {Card } from '@/app/components/ui/card';
import { Input } from '@/app/components/ui/input';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { Button } from '../components/ui/button';

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
  };

  // return (
  //   <div className="flex justify-center items-center min-h-screen bg-gray-100">
  //     <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
  //       <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
  //       <form onSubmit={handleSubmit} className="space-y-6">
  //         {error && (
  //           <div className="p-4 mb-4 text-red-700 bg-red-100 rounded-md" role="alert">
  //             {error}
  //           </div>
  //         )}
  //         <div className="space-y-1">
  //           <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
  //           <input
  //             type="email"
  //             id="email"
  //             value={email}
  //             onChange={(e) => setEmail(e.target.value)}
  //             required
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           />
  //         </div>
  //         <div className="space-y-1">
  //           <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
  //           <input
  //             type="password"
  //             id="password"
  //             value={password}
  //             onChange={(e) => setPassword(e.target.value)}
  //             required
  //             className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
  //           />
  //         </div>
  //         <button
  //           type="submit"
  //           className="w-full py-2 text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
  //           disabled={loading}
  //         >
  //           {loading ? 'Logging in...' : 'Login'}
  //         </button>
  //       </form>
  //     </div>
  //   </div>
  // );

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
        </Card>
    </>
);
};

export default Login;