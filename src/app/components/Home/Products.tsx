import React from 'react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string; // URL to the product image
}

interface ProductsProps {
  products: Product[];
  heading : string;
}

const Products: React.FC<ProductsProps>= ({products, heading}) => {
  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{heading}</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4">
          {products.map((product) => (
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

export default Products;