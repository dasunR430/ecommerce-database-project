// app/info/payment-options/page.tsx
import React from 'react';

const PaymentOptions = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl px-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-red-800">Payment Options</h1>
          <p className="text-lg text-gray-600 mt-2">
            We offer a variety of convenient payment methods to make your shopping experience smooth and hassle-free.
          </p>
        </header>

        <section className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Accepted Payment Methods</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow">
              <img
                src="https://img.icons8.com/color/48/000000/visa.png" // Visa Icon
                alt="Visa"
                className="h-16 mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-800">Credit/Debit Card</h3>
              <p className="text-gray-600 mt-2">
                Pay securely with your credit or debit card. We accept major cards including Visa, MasterCard, and American Express.
              </p>
            </div>
            <div className="flex flex-col items-center bg-gray-100 p-4 rounded-lg shadow">
              <img
                src="https://img.icons8.com/ios-filled/50/000000/money.png" // Cash Icon
                alt="Cash"
                className="h-16 mb-2"
              />
              <h3 className="text-lg font-semibold text-gray-800">Cash on Delivery</h3>
              <p className="text-gray-600 mt-2">
                Prefer to pay in cash? You can choose the cash on delivery option when checking out.
              </p>
            </div>
          </div>
        </section>

        <section className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Secure Transactions</h2>
          <p className="text-gray-600">
            We take your security seriously. All transactions are encrypted and processed through secure payment gateways.
          </p>
          <p className="text-gray-600 mt-2">
            If you have any questions regarding payment options, please feel free to contact our customer support team.
          </p>
        </section>
      </div>
    </main>
  );
};

export default PaymentOptions;
