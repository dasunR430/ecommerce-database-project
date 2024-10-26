'use client'
import { useRouter } from "next/navigation";
import Image from 'next/image';

type Product = {
  ProductID: number;
  ProductTitle: string;
  BasePrice: number;
  PrimaryImage: string;
};

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const handleOnClick = async (productID: number) => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/incrementClickCount`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ productID: productID })
      }
    );
    router.push(`/product/${productID}`)
  }

  return (
    <div key={product.ProductID} className="max-w-[300px] border rounded-lg p-4 bg-white shadow-md flex flex-col justify-center items-center">
      <Image
        src={product.PrimaryImage}
        alt={product.ProductTitle}
        width={200}
        height={300}
        className="object-contain h-[150px] w-[150px]" // Make sure image covers the space
      />
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
  );
};

export default ProductCard;

function formatPrice(amount: number, currency: string = 'LKR') {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 2
  }).format(amount);
}