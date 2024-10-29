// app/info/pricing/page.tsx
import React from 'react';

const Pricing = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl px-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">Pricing</h1>
          <p className="text-lg text-gray-600 mt-2">
            Explore our competitive pricing for high-quality products.
          </p>
        </header>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">Affordable Pricing Plans</h2>
          <p className="text-gray-600">
            At C , we believe in providing exceptional value for your money.
            Our pricing is designed to accommodate all shoppers, whether you’re looking for everyday essentials or premium products.
          </p>
          <p className="text-gray-600 mt-4">
            Shopping with us means great prices and fantastic deals on a wide range of products!
          </p>
        </section>
      </div>

    </main>
  );
};

export default Pricing;
