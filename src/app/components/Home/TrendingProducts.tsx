// src/components/TrendingProducts.tsx
import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string; // URL to the product image
}

const trendingProducts: Product[] = [
  {
    id: 1,
    name: 'Smartphone XYZ',
    price: 699,
    image: '/images/smartphone.jpg', // Replace with your actual image path
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 199,
    image: '/images/headphones.jpg', // Replace with your actual image path
  },
  {
    id: 3,
    name: '4K Ultra HD TV',
    price: 999,
    image: '/images/tv.jpg', // Replace with your actual image path
  },
  {
    id: 4,
    name: 'Gaming Console',
    price: 499,
    image: '/images/console.jpg', // Replace with your actual image path
  },
  {
    id: 1,
    name: 'Smartphone XYZ',
    price: 699,
    image: '/images/smartphone.jpg', // Replace with your actual image path
  },
  {
    id: 2,
    name: 'Wireless Headphones',
    price: 199,
    image: '/images/headphones.jpg', // Replace with your actual image path
  },
  {
    id: 3,
    name: '4K Ultra HD TV',
    price: 999,
    image: '/images/tv.jpg', // Replace with your actual image path
  },
  {
    id: 4,
    name: 'Gaming Console',
    price: 499,
    image: '/images/console.jpg', // Replace with your actual image path
  },
];

const TrendingProducts: React.FC = () => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Trending Products</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4">
          {trendingProducts.map((product) => (
            <div key={product.id} className="min-w-[200px] border rounded-lg p-4 bg-white shadow-md flex flex-col">
              {/* <img src={product.image} alt={product.name} className="h-48 w-full object-cover rounded-md" /> */}
              <h3 className="text-xl font-semibold mt-2">{product.name}</h3>
              <p className="text-lg text-gray-700">${product.price}</p>
              <div className="mt-auto align-baseline"> {/* This pushes the button to the bottom */}
                <button className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-500 transition duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrendingProducts;