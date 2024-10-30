'use client'

import React, { useState } from 'react';

export function Nav() {
 const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

 return (
  <nav className="bg-[#94a3b8] shadow-md rounded-b-lg">
     <div className="flex justify-between items-center p-4">
       <div className="flex-row">
         <ul className="hidden md:flex space-x-6">
           <li>
             <a href="/" className="text-white hover:text-gray-300">Home</a>
           </li>
           <li>
             <a href="/#category-section" className="text-white hover:text-gray-300">Categories</a>
           </li>
           <li>
             <a href="/#trending-products" className="text-white hover:text-gray-300">Trending</a>
           </li>
           <li>
             <a href="/#recommended-products" className="text-white hover:text-gray-300">Recommended Products</a>
           </li>
           <li>
             <a href="/#brand-carousel" className="text-white hover:text-gray-300">Brands</a>
           </li>
           <li>
             <a href="/#footer-section" className="text-white hover:text-gray-300">About Us</a>
           </li>
         </ul>
       </div>

       <div className="hidden md:flex items-center text-sm font-bold text-white">
         <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
           <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
         </svg>
         Hotline (123) 456-7890
       </div>

       <div className="flex justify-end md:hidden">
         <button className="text-white" onClick={() => setMobileMenuOpen(!isMobileMenuOpen)}>
           <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
           </svg>
         </button>
       </div>
     </div>

     {isMobileMenuOpen && (
       <div className="bg-red-800 space-y-4 px-4 py-2">
         <ul>
           <li>
             <a href="#" className="text-white hover:text-gray-300">Home</a>
           </li>
           <li>
             <a href="#" className="text-white hover:text-gray-300">Top Deals</a>
           </li>
           <li>
             <a href="#" className="text-white hover:text-gray-300">Brands</a>
           </li>
           <li>
             <a href="#" className="text-white hover:text-gray-300">About</a>
           </li>
           <li>
             <a href="#" className="text-white hover:text-gray-300">Contact</a>
           </li>
         </ul>
         <div className="flex items-center text-sm font-bold text-white">
           <svg xmlns="http://www.w3.org/2000/svg" fill="white" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mr-2">
             <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 3.75v4.5m0-4.5h-4.5m4.5 0-6 6m3 12c-8.284 0-15-6.716-15-15V4.5A2.25 2.25 0 0 1 4.5 2.25h1.372c.516 0 .966.351 1.091.852l1.106 4.423c.11.44-.054.902-.417 1.173l-1.293.97a1.062 1.062 0 0 0-.38 1.21 12.035 12.035 0 0 0 7.143 7.143c.441.162.928-.004 1.21-.38l.97-1.293a1.125 1.125 0 0 1 1.173-.417l4.423 1.106c.5.125.852.575.852 1.091V19.5a2.25 2.25 0 0 1-2.25 2.25h-2.25Z" />
           </svg>
           Hotline +94 7739310
         </div>
       </div>
     )}
   </nav>
 );
}

export default Nav;