'use client'
import { useRouter } from "next/navigation";

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
    router.push(`/products/${productID}`)
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform hover:shadow-lg">
      <div className="relative">
        {/* Image */}
        {/* <img
            src={product.PrimaryImage}
            alt={product.ProductTitle}
            className="absolute h-full w-full object-cover"
          /> */}
      </div>
      <div className="p-4">
        {/* Product Title */}
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {product.ProductTitle}
        </h3>
        {/* Price */}
        <p className="text-gray-600 text-md font-medium mb-4">
          ${product.BasePrice}
        </p>
        {/* CTA Button */}
        <button 
          className="bg-white text-red-800 border border-red-800 py-2 px-4 rounded w-full justify-between items-center hover:bg-red-800 hover:text-white transition-colors duration-300"
          onClick={()=> {handleOnClick(product.ProductID)}}  
        >
          View Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
