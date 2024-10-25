import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        {/* Grid layout for 4 columns */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          {/* Column 1: Company */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
              <li><a href="/careers" className="hover:text-gray-400">Careers</a></li>
              <li><a href="/blog" className="hover:text-gray-400">Blog</a></li>
              <li><a href="/press" className="hover:text-gray-400">Press</a></li>
            </ul>
          </div>
          
          {/* Column 2: Opportunities */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Opportunities</h3>
            <ul className="space-y-2">
              <li><a href="/partnerships" className="hover:text-gray-400">Partnerships</a></li>
              <li><a href="/affiliates" className="hover:text-gray-400">Affiliate Program</a></li>
              <li><a href="/investors" className="hover:text-gray-400">Investors</a></li>
              <li><a href="/jobs" className="hover:text-gray-400">Job Openings</a></li>
            </ul>
          </div>
          
          {/* Column 3: How to Buy */}
          <div>
            <h3 className="font-semibold text-lg mb-4">How to Buy</h3>
            <ul className="space-y-2">
              <li><a href="/pricing" className="hover:text-gray-400">Pricing</a></li>
              <li><a href="/locations" className="hover:text-gray-400">Find a Store</a></li>
              <li><a href="/faq" className="hover:text-gray-400">FAQs</a></li>
              <li><a href="/payment-options" className="hover:text-gray-400">Payment Options</a></li>
            </ul>
          </div>
          
          {/* Column 4: Help */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="/contact" className="hover:text-gray-400">Contact Us</a></li>
              <li><a href="/support" className="hover:text-gray-400">Customer Support</a></li>
              <li><a href="/shipping" className="hover:text-gray-400">Shipping & Delivery</a></li>
              <li><a href="/returns" className="hover:text-gray-400">Returns & Exchanges</a></li>
            </ul>
          </div>

        </div>

        {/* Footer bottom text */}
        <div className="text-center mt-8">
          <p>© 2024 C Retailers. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
