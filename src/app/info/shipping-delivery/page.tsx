// app/info/shipping-delivery/page.tsx
import React from 'react';

const ShippingDelivery = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl px-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-red-800">Shipping & Delivery</h1>
          <p className="text-lg text-gray-600 mt-2">
            Get your products delivered right to your doorstep!
          </p>
        </header>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Shipping Policy</h2>
          <p className="text-gray-600 mb-4">
            We aim to provide you with a seamless shopping experience. Here’s what you can expect from our shipping and delivery process:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li>Orders are processed within 1-2 business days.</li>
            <li>Delivery is available for main cities and other locations.</li>
            <li>Shipping costs are calculated at checkout based on your location.</li>
          </ul>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Delivery Estimates</h2>
          <p className="text-gray-600 mb-4">
            The following delivery estimates apply based on product availability and location:
          </p>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b text-left text-gray-800">Product Availability</th>
                <th className="py-2 px-4 border-b text-left text-gray-800">Delivery Location</th>
                <th className="py-2 px-4 border-b text-left text-gray-800">Estimated Delivery Time</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-2 px-4 border-b">In Stock</td>
                <td className="py-2 px-4 border-b">Main City (e.g., Colombo)</td>
                <td className="py-2 px-4 border-b">5 Days</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">In Stock</td>
                <td className="py-2 px-4 border-b">Non-Main City (e.g., Negombo)</td>
                <td className="py-2 px-4 border-b">7 Days</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Out of Stock</td>
                <td className="py-2 px-4 border-b">Main City (e.g., Colombo)</td>
                <td className="py-2 px-4 border-b">8 Days</td>
              </tr>
              <tr>
                <td className="py-2 px-4 border-b">Out of Stock</td>
                <td className="py-2 px-4 border-b">Non-Main City (e.g., Negombo)</td>
                <td className="py-2 px-4 border-b">10 Days</td>
              </tr>
            </tbody>
          </table>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Checkout Information</h2>
          <p className="text-gray-600">
            Please note that the delivery estimate will be provided during the checkout process based on your order details and shipping address.
          </p>
          <p className="text-gray-600 mt-2">
            If you have any further questions about shipping or delivery, feel free to reach out to our customer support team!
          </p>
        </section>
      </div>
    </main>
  );
};

export default ShippingDelivery;
