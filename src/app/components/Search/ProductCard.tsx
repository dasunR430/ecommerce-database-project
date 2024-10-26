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
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:shadow-lg m-10">
      <div className="flex items-center"> {/* Flex container to align items */}
        <div className="relative m-5">
          <Image
            src={product.PrimaryImage}
            alt={product.ProductTitle}
            width={200}
            height={300}
            className="object-contain h-[150px] w-[150px]" // Ensure the image takes full height
          />
        </div>
        <div className="p-4 text-right flex-1"> {/* Added flex-1 to take remaining space */}
          {/* Product Title */}
          <h3 className="text-lg font-semibold text-gray-800 mb-2">
            {product.ProductTitle}
          </h3>
          {/* Price */}
          <p className="text-gray-600 text-md font-medium mb-4">
            {formatPrice(product.BasePrice)}
          </p>
          {/* CTA Button */}
          <button
            className="bg-white text-red-800 border border-red-800 py-2 px-4 rounded w-full justify-between items-center hover:bg-red-800 hover:text-white transition-colors duration-300"
            onClick={() => { handleOnClick(product.ProductID) }}
          >
            View Product
          </button>
        </div>
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