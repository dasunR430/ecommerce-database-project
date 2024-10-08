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
    return (
        <div className="bg-white shadow-md rounded-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-lg">
        <div className="relative pb-2/3">
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
          <button className="bg-blue-500 text-white py-2 px-4 rounded-lg w-full hover:bg-blue-600 transition-colors">
            View Product
          </button>
        </div>
      </div>
    );
};

export default ProductCard;
