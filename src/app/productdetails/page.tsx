'use client';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ProductDetailsPage() {
  const router = useRouter();
  const [id, setId] = useState('');

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession(); // Getting the session
      if (!session) {
        router.push("/login"); // Redirecting to sign-in if no session
      } else {
        setId(session.user?.id || ''); // Set email if session exists
      }
    };

    checkSession(); // Calling the session check
  }, [router]);

  return (
    <div>
      <h1>Product ID: {id}</h1>
      
    </div>
  );
}