// src/components/Header.tsx
import React from 'react';
import SearchComponent from './Home/SearchComponent';
import CategoryFilter from './Home/CategoryFilter';

interface HeaderProps {
    isLoggedIn: boolean; // Determine if the user is logged in
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn }) => {
    return (
        <header className="flex sticky top-0 z-50 items-center bg-black text-white p-3">
            <div className="flex items-center">
                <div className="w-full max-w-[200px]">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 100 50">
                        <text x="50%" y="55%" text-anchor="middle" dominant-baseline="middle" font-family="Arial, sans-serif" font-size="70" fill="White">C</text>
                    </svg>
                </div>
            </div>

            <CategoryFilter/>

            <SearchComponent/>



            <div className="flex items-center space-x-4">
                <a href="/cart" className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                    </svg>
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full px-1 text-xs">0</span>
                </a>
                {false ? (
                    <a href="/profile">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        </svg>
                    </a>
                ) : (
                    <a href="/login" className="hover:underline">Login</a>
                )}
            </div>
        </header>
    );
};

export default Header;