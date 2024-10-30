'use client';

import { useEffect, useState } from 'react';
import style from './cartsum.module.css';
import CartSummaryCard from "./cartcard";

interface CartItem {
  SKU: string;
  ProductName: string;
  Quantity: number;
  UnitPrice: number;
  AvailableStock: number;
}

interface CartSummaryProps {
  id: string;
  setIsLoading: (isLoading: boolean) => void;
  setTotal: (total: number) => void;
}

export default function CartSummary({ id , setIsLoading, setTotal}: CartSummaryProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [totalAmount, setTotalAmount] = useState<number>(0);
  const [deliveryEstimates, setDeliveryEstimates] = useState<Record<string, string>>({});
  // const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchCartSummary = async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await fetch(`/api/cartitems?customerID=${id}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch cart items');
        }

        const data = await response.json();
        setCartItems(data);
        
        const total = data.reduce((acc: number, item: CartItem) => 
          acc + (item.Quantity * item.UnitPrice), 0
        );
        setTotalAmount(total);
        
        setTotal(total);
        await calculateAllDeliveryDates(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'An error occurred');
        console.error("Error fetching cart summary:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchCartSummary();
    }
  }, [id]);

  const checkMainCity = async (cityName: string): Promise<boolean> => {
    try {
      const response = await fetch(`/api/checkmaincity?cityName=${cityName}`);
      if (!response.ok) throw new Error('Failed to check city status');
      const data = await response.json();
      return data.cityExists;
    } catch (error) {
      console.error("Error checking main city:", error);
      return false;
    }
  };

  const calculateDeliveryDate = async (inStock: boolean, cityName: string): Promise<string> => {
    const isMainCity = await checkMainCity(cityName);
    const currentDate = new Date();
    const deliveryDays = inStock ? (isMainCity ? 5 : 7) : (isMainCity ? 8 : 10);
    currentDate.setDate(currentDate.getDate() + deliveryDays);
    return currentDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const calculateAllDeliveryDates = async (items: CartItem[]) => {
    const estimates: Record<string, string> = {};
    for (const item of items) {
      const estimatedDelivery = await calculateDeliveryDate(
        item.AvailableStock > 0,
        'dfdsfdsfdsf' // You might want to replace this with actual city
      );
      estimates[item.SKU] = estimatedDelivery;
    }
    setDeliveryEstimates(estimates);
  };

  

  if (error) {
    return (
      <div className={style.errorContainer}>
        <p className={style.errorMessage}>{error}</p>
      </div>
    );
  }

  return (
    <div className={style.cartsumm}>
      <h2 className={style.head}>Cart Summary</h2>
      <div className={style.itemslist}>
        {cartItems.length > 0 ? (
          cartItems.map((item, index) => (
            <div key={item.SKU || index} className={style.item}>
              <CartSummaryCard
                ProductName={item.ProductName}
                Quantity={item.Quantity}
                NetPrice={Number(item.UnitPrice) * item.Quantity}
                estimatedDelivery={deliveryEstimates[item.SKU] || "Calculating..."}
              />
            </div>
          ))
        ) : (
          <div className={style.emptyCart}>
            <p>Your cart is empty</p>
          </div>
        )}
      </div>
      {cartItems.length > 0 && (
        <div className={style.totalSection}>
          <div className={style.subtotal}>
            <span>Subtotal</span>
            <span>Rs. {totalAmount.toFixed(2)}</span>
          </div>
          <div className={style.total}>
            <span>Total Amount</span>
            <span>Rs. {totalAmount.toFixed(2)}</span>
          </div>
        </div>
      )}
    </div>
  );
}