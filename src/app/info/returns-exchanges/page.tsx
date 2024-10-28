// app/info/returns-exchanges/page.tsx
import React from 'react';

const ReturnsExchanges = () => {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-3xl px-6">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-red-800">Returns & Exchanges</h1>
        </header>

        <section className="bg-white shadow-lg rounded-lg p-6 text-center">
          <div className="mb-4">
          <div className="mb-4 text-6xl text-red-800">
            ☹️
          </div>
          </div>
          <p className="text-lg text-gray-600">
            We’re sorry, but we currently do not accept returns or exchanges. 
          </p>
          <p className="text-lg text-gray-600 mt-4">
            We understand that this might not be what you were hoping for, and we appreciate your understanding in this matter. 
          </p>
          <p className="text-lg text-gray-600 mt-4">
            If you have any questions or need further assistance, feel free to reach out to our customer support team.
          </p>
        </section>
      </div>
    </main>
  );
};

export default ReturnsExchanges;
