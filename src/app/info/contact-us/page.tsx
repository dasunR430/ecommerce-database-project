// app/info/contact-us/page.tsx
import React from 'react';

const ContactUs = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl px-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">Contact Us</h1>
          <p className="text-lg text-gray-600 mt-2">
            We'd love to hear from you! Please fill out the form below.
          </p>
        </header>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium text-gray-700">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
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
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-red-800 text-white font-semibold py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-black focus:ring-opacity-50"
            >
              Send Message
            </button>
          </form>
        </section>

        <footer className="mt-8 text-center">
          <h2 className="text-lg font-semibold text-gray-800">Get in Touch</h2>
          <p className="text-gray-600 mt-2">You can also reach us at:</p>
          <p className="text-gray-600">Email: support@example.com</p>
          <p className="text-gray-600">Phone: (123) 456-7890</p>
          <p className="text-gray-600">Address: 123 E-commerce St, City, Country</p>
        </footer>
      </div>
    </main>
  );
};

export default ContactUs;
