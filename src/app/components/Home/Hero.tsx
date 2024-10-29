import React from 'react';

const Hero: React.FC = () => {
  return (
    <div className="relative bg-blue-600 text-white py-20">
      <div className="absolute inset-0 bg-cover bg-center">
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>
      <div className="relative container mx-auto px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">Welcome to Our Store</h1>
        <p className="text-lg mb-8">Discover amazing products at unbeatable prices.</p>
      </div>
    </div>
  );
};

export default Hero;