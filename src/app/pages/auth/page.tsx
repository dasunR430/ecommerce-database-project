// "use client"

// import { signIn } from 'next-auth/react';
// import { useState } from 'react';
// import React from 'react';

// // export default function AuthPage() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [error, setError] = useState('');

// //   const handleSubmit = async (e: React.FormEvent) => {
// //     e.preventDefault();
    
// //     const result = await signIn('credentials', {
// //       redirect: false, // Avoid immediate redirect so you can check the result
// //       email,           // Send email as credential
// //       password,        // Send password as credential
// //     });

// //     console.log("Sign-in result: ", result); // Add a debug log to check the result

// //     if (result?.ok && !result.error) {
// //       // Handle successful sign-in
// //       setError(''); // Clear any existing error messages
// //       window.location.href = '/errorCatch'; // Redirect to dashboard on successful login
// //     } else {
// //       // Handle failed sign-in
// //       setError('Invalid email or password. Please try again.'); // Set error message
// //     }
// //   };

// //   return (
// //     <form onSubmit={handleSubmit}>
// //       <div>
// //         <label>Email</label>
// //         <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
// //       </div>
// //       <div>
// //         <label>Password</label>
// //         <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
// //       </div>
// //       {error && <p style={{ color: 'red' }}>{error}</p>}
// //       <button type="submit">Sign In</button>
// //     </form>
// //   );
// // }


"use client"
import { signIn } from 'next-auth/react';

function SignInButton() {
  const handleSignIn = async () => {
    await signIn('credentials', {
      redirect: false,
      email: 'himala@gmail.com',
      password: '12345',
    });
  };

  return (
    <button onClick={handleSignIn}>Sign In</button>
  );
}

export default SignInButton;