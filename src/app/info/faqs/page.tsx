'use client'
import React, { useState } from 'react';

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: 'How can I track my order?',
      answer: 'In future, You can track your order by visiting the "Order Tracking" page on our website and entering your order number and email address. Keep an eye for new updates'
    },
    {
      question: 'What is your return policy?',
      answer: 'Our return policy allows you to return items within 30 days of purchase for a full refund. Items must be in original condition.'
    },
    {
      question: 'Do you offer international shipping?',
      answer: 'No, we do not offer international shipping to select countries. Please check our shipping policy for more details.'
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can reach our customer support team via email at support@example.com or call us at (123) 456-7890.'
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards, PayPal, and other secure payment methods (cash too : ). Please visit our payment options page for more information.'
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center py-10">
      <div className="w-full max-w-4xl px-6">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800">FAQs</h1>
          <p className="text-lg text-gray-600 mt-2">Find answers to common questions.</p>
        </header>

        <section className="bg-white shadow-lg rounded-lg">
          <div>
            {faqs.map((faq, index) => (
              <div key={index}>
                <button
                  className="w-full text-left p-4 border-b border-gray-200 hover:bg-gray-100 focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <h2 className="text-lg font-semibold text-gray-800">{faq.question}</h2>
                </button>
                {openIndex === index && (
                  <div className="p-4 text-gray-600">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};

export default FAQs;
