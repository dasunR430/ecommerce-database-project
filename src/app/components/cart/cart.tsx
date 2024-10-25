
import { useEffect, useState } from "react";

interface ProductDetails {
  ProductName: string;
  Price: number;
  AvailableStock: number;
  PrimaryImage: string;
}

export const CartPage = () => {
    const [productDetails, setProductDetails] = useState<ProductDetails>();

    useEffect(() => {
      fetch('/api/cart/getCartInfo', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setProductDetails(data);
        });
    }, []);
    return (
      
    )
  }

export default CartPage;