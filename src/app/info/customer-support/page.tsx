// app/info/customer-support/page.tsx
import React from 'react';

const CustomerSupport = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl px-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-red-800">Customer Support</h1>
          <p className="text-lg text-gray-600 mt-2">
            We're here to help! Reach out with any questions or concerns.
          </p>
        </header>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Common Support Topics</h2>
          <ul className="space-y-2">
            <li className="flex items-start">
              <span className="text-red-800 font-semibold mr-2">•</span>
              <p className="text-gray-600">Order Status: Track your order in real time.</p>
            </li>
            <li className="flex items-start">
              <span className="text-red-800 font-semibold mr-2">•</span>
              <p className="text-gray-600">Returns & Exchanges: Learn about our return policy.</p>
            </li>
            <li className="flex items-start">
              <span className="text-red-800 font-semibold mr-2">•</span>
              <p className="text-gray-600">Payment Options: Discover our accepted payment methods.</p>
            </li>
            <li className="flex items-start">
              <span className="text-red-800 font-semibold mr-2">•</span>
              <p className="text-gray-600">Shipping Information: Get details on shipping times and methods.</p>
            </li>
          </ul>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Contact Support</h2>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-red-500 focus:border-red-500"
              />
            </div>

            <button
              type="submit"
              className="bg-red-800 text-white font-semibold py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-black w-full"
            >
              Submit
            </button>
          </form>
        </section>
      </div>
    </main>
  );
};

export default CustomerSupport;
