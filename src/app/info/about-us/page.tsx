import React from 'react';

const AboutUs = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl px-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">About Us</h1>
          <p className="text-lg text-gray-600 mt-2">
            Learn more about who we are and our journey.
          </p>
        </header>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Founded in 2020, we are a team dedicated to providing the best service to our customers. Our journey started with a vision to simplify online shopping.
          </p>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Our Mission</h2>
          <p className="text-gray-600">
            Our mission is to bring high-quality products to our customers and ensure satisfaction with every purchase.
          </p>
        </section>
      </div>
    </main>
  );
};

export default AboutUs;
