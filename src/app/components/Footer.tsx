import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer id="footer-section" className="bg-black text-white py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <li><a href="/info/about-us" className="hover:text-gray-400">About Us</a></li>
            </ul>
          </div>          
          <div>
            <h3 className="font-semibold text-lg mb-4">How to Buy</h3>
            <ul className="space-y-2">
              <li><a href="/info/pricing" className="hover:text-gray-400">Pricing</a></li>
              <li><a href="/info/faqs" className="hover:text-gray-400">FAQs</a></li>
              <li><a href="/info/payment-options" className="hover:text-gray-400">Payment Options</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Help</h3>
            <ul className="space-y-2">
              <li><a href="/info/contact-us" className="hover:text-gray-400">Contact Us</a></li>
              <li><a href="/info/customer-support" className="hover:text-gray-400">Customer Support</a></li>
              <li><a href="/info/shipping-delivery" className="hover:text-gray-400">Shipping & Delivery</a></li>
              <li><a href="/info/returns-exchanges" className="hover:text-gray-400">Returns & Exchanges</a></li>
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
