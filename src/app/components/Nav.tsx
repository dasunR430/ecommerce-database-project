'use client'
import React from 'react';
import { useState } from 'react';

export function Nav() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="px-2 bg-red-800 shadow-md">
      <div className="flex justify-between">
        <div className="flex-row">
          <ul className="hidden md:flex space-x-6 p-3">
            <li>
              <a href="/home" className="text-white">Home</a>
            </li>
            <li>
              <a href="#" className="text-white">Top Deals</a>
            </li>
            <li>
              <a href="#" className="text-white">Brands</a>
            </li>
            <li>
              <a href="#" className="text-white">About</a>
            </li>
            <li>
              <a href="#" className="text-white">Contact</a>
            </li>
          </ul>
        </div>

        {/* Phone number for larger screens */}
        <div className="hidden md:flex items-center ml-auto text-sm font-bold text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
          </svg>
          Hotline +94 7739310
        </div>
      </div>

      {/* Small screens */}
      <div className="flex justify-end md:hidden p-3">
        <button className="text-white " onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>
      </div>
      <div className="flex md:hidden" >
        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <ul className="bg-red-800 space-y-4 px-4 py-2">
            <li>
              <a href="#" className="text-white">Home</a>
            </li>
            <li>
              <a href="#" className="text-white">Top Deals</a>
            </li>
            <li>
              <a href="#" className="text-white">Brands</a>
            </li>
            <li>
              <a href="#" className="text-white">About</a>
            </li>
            <li>
              <a href="#" className="text-white">Contact</a>
            </li>
            {/* Phone number for mobile */}
            <div className="flex items-center text-sm font-bold text-white">
              <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-3">
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
              </svg>
              Hotline +94 7739310
            </div>
          </ul>
        )}
      </div>
    </nav>
  );
}


export default Nav;
