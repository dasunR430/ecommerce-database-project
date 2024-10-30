'use client'
import React, { useEffect } from 'react';
import { useState, useCallback } from 'react';
import SearchComponent from './Home/SearchComponent';
import CategoryFilter from './Home/CategoryFilter';
import Link from 'next/link';
import Cart from '../cart/page';
import { getSession, signOut } from 'next-auth/react';
import { useRouter } from "next/navigation";

interface SearchKey {
    ProductID: number;
    ProductTitle: string;
}

const Header: React.FC = () => {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserID] = useState<number>(-1);
    const [isOpen, setIsOpen] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [cartCount, setCartCount] = useState(0);

    const getcartcount = useCallback(async (userId: number) => {
        try {
            // Only fetch cart count if user is logged in
            if (userId === -1) return;
            
            const response = await fetch('/api/getcartitem/getcartcount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: userId }), // Use the passed userId parameter
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart count');
            }

            const data = await response.json();
            setCartCount(data || 0);
        } catch (error) {
            console.error('Error fetching cart count:', error);
            setCartCount(0);
        }
    }, []); 

    useEffect(() => {
        const checkSession = async () => {
            try {
                const session = await getSession();
                if (session?.user?.id) {
                    const newUserId = Number(session.user.id);
                    setUserID(newUserId);
                    setIsLoggedIn(true);
                    // Fetch cart count after we have the user ID
                    await getcartcount(newUserId);
                } else {
                    setIsLoggedIn(false);
                    setUserID(-1);
                    setCartCount(0);
                }
            } catch (error) {
                console.error('Error checking session:', error);
                setIsLoggedIn(false);
                setUserID(-1);
                setCartCount(0);
            }
        };

        checkSession();
    }, [getcartcount, router]); // Add getcartcount to dependencies

    // Refetch cart count whenever userID changes
    useEffect(() => {
        if (userID !== -1) {
            getcartcount(userID);
        }
    }, [userID, getcartcount]);

    const handleSignOut = async () => {
        try {
            setIsLoggedIn(false);
            setUserID(-1);
            setCartCount(0);
            await signOut({ redirect: false });
            window.location.href = "/login";
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <>
        <header className="flex  sticky  top-0 z-50 items-center bg-black text-white p-2">
            <Link href={'/'}>
                <div className="flex items-center">
                    <div className="w-full max-w-[200px]">
                        <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 100">
                            <text x="50%" y="55%" textAnchor="middle" dominantBaseline="middle" fontFamily="Futura Extra Bold" fontSize="70" fill="White">C</text>
                        </svg>
                    </div>
                </div>
            </Link>

            <div className='hidden md:block'>
                <CategoryFilter />
            </div>

            <div className="flex-grow flex justify-center">
                <div className="md:w-1/2 lg:w-1/2">
                    <SearchComponent />
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <div className="relative" onClick={() => setIsClicked(!isClicked)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs">{cartCount}</span>                
                </div>
                {isClicked && <Cart isClicked ={isClicked} setIsClicked ={setIsClicked}/>}
                <div className="relative" onBlur={() => setTimeout(() => setIsOpen(false), 300)}>
                    {isLoggedIn ? (
                        <div className="relative">
                            <button onClick={() => setIsOpen(!isOpen)} className="flex items-center focus:outline-none">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                            </button>
                            {isOpen && (
                                <ul className="absolute right-0 mt-2 w-48 bg-white border text-black border-gray-200 rounded-md shadow-lg">
                                    <li>
                                        <button onClick={() => window.location.href = '/profile'} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                            Profile
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={handleSignOut} className="w-full text-left px-4 py-2 hover:bg-gray-100">
                                            Signout
                                        </button>
                                    </li>
                                </ul>
                            )}

                        </div>
                    ) : (
                        <a href="/login" className="bg-white text-black px-4 py-2 border border-gray-300 rounded hover:bg-gray-100">Login</a>
                    )}
                </div>
            </div>
        </header>
        </>
    );
};

export default Header;