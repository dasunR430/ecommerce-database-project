'use client'

import { useRouter } from "next/navigation";

interface Product {
  ProductID: number;
  ProductTitle: string;
  BasePrice: number;
  PrimaryImage: string; // URL to the product image
}

interface ProductsProps {
  products: Product[];
  heading: string;
}

const Products: React.FC<ProductsProps> = ({ products, heading }) => {
  const router = useRouter();

  const handleOnClick = async (productID: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/incrementClickCount`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productID: productID })
      }
    );
    router.push(`/products/${productID}`)
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">{heading}</h2>
      <div className="overflow-x-auto">
        <div className="flex space-x-4">
          {products.map((product) => (
            <div key={product.ProductID} className="min-w-[200px] border rounded-lg p-4 bg-white shadow-md flex flex-col">
              <img src={'/'} alt={product.ProductTitle} className="h-48 w-full object-cover rounded-md" />
              <h3 className="text-xl font-semibold mt-2">{product.ProductTitle}</h3>
              <p className="text-lg text-gray-700">{formatPrice(product.BasePrice)}</p>
              <div className="mt-auto align-baseline"> {/* This pushes the button to the bottom */}
                <button
                  className="bg-white text-red-800 border border-red-800 py-2 px-4 rounded w-full justify-between items-center hover:bg-red-800 hover:text-white transition-colors duration-300"
                  onClick={() => { handleOnClick(product.ProductID) }}
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
        {
          products.length == 0 ?
            (
              <div className="text-center text-gray-500 py-6">
                <p className="text-lg font-medium">
                  No {heading} Available at the moment
                </p>
              </div>
            )
            : <></>
        }
      </div>
    </div>
  );
};

export default Products;

function formatPrice(amount : number, currency : string = 'LKR') {
  return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 2
  }).format(amount);
}