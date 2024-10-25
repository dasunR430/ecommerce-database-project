import { getSession } from 'next-auth/react';
import router from 'next/router';
import React, { useEffect, useState, useCallback } from 'react';

export default function User() {
  const [userData, setUserData] = useState({ CustomerName: '', email: '', PhoneNumber: '' });

  // Fetch the session and redirect if not authenticated
  const checkSession = useCallback(async () => {
    const session = await getSession();
    if (!session) {
      router.push('/login');
    } else {
      setUserData((prevState) => ({
        ...prevState,
        email: session.user?.email || '',
      }));
    }
  }, [router]);

  // Fetch user data from API
  const fetchUserData = useCallback(async () => {
    try {
      const response = await fetch('/api/profile/getCustomer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userData.email }),
      });
      const user = await response.json();
      setUserData({
        CustomerName: user.CustomerName,
        email: userData.email,
        PhoneNumber: user.PhoneNumber,
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, [userData.email]);

  useEffect(() => {
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (userData.email) {
      fetchUserData();
    }
  }, [userData.email, fetchUserData]);

return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-50 shadow-lg rounded-lg max-w-md mx-auto">
        <div className="flex items-center gap-2 w-full">
            <h3 className="text-lg font-semibold text-gray-800">Name:</h3>
            <p className="text-lg text-gray-600">{userData.CustomerName || "Not available"}</p>
        </div>
        <div className="flex items-center gap-2 w-full">
            <h3 className="text-lg font-semibold text-gray-800">Email:</h3>
            <p className="text-lg text-gray-600">{userData.email || "Not available"}</p>
        </div>
        <div className="flex items-center gap-2 w-full">
            <h3 className="text-lg font-semibold text-gray-800">Phone:</h3>
            <p className="text-lg text-gray-600">{userData.PhoneNumber || "Not available"}</p>
        </div>
    </div>
);
}