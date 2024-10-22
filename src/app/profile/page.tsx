"use client";
import { getSession } from "next-auth/react"; // Importing getSession from next-auth
import { useRouter } from "next/navigation"; // Importing useRouter for routing
import { useEffect, useState } from "react"; // Importing useEffect and useState from React
import Profile from "../components/profile/sideNavigation"; // Importing the Profile component
import React from "react";

export default function ProfilePage() {
  const router = useRouter(); // Initializing the router
  const [loading, setLoading] = useState(true); // State to manage loading
  const [email, setEmail] = useState<string | null>(null); // State to store user email

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession(); // Getting the session
      if (!session) {
        router.push("/login"); // Redirecting to sign-in if no session
      } else {
        setEmail(session.user?.email || null); // Set email if session exists
        setLoading(false); // Set loading to false if session exists
      }
    };

    checkSession(); // Calling the session check
  }, [router]);

  // Show loading indicator while checking session
  if (loading) {
    return <div>Loading...</div>;
  }

  console.log(email);
  return <Profile email={email || ""}/>;
}