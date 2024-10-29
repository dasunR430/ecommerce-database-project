'use client';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState, useCallback } from 'react';
import CartCard from './component/cartcard';

interface CartItem {
  ProductName: string;
  Quantity: number;
  total: number;
  SKU: string;
}

interface CartPageProps {
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
  isClicked: boolean;
}

export default function CartPage({ setIsClicked, isClicked }: CartPageProps) {
  const router = useRouter();
  const [id, setId] = useState<string>('');
  const [data, setData] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch cart items
  const fetchCartItems = useCallback(async (userId: string) => {
    try {
      const response = await fetch('/api/getcartitem', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: userId }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const cartItems = await response.json();
      setData(cartItems);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      console.error("Error:", err);
    }
  }, []);

  // Initialize cart
  useEffect(() => {
    const initializeCart = async () => {
      try {
        const session = await getSession();
        if (!session) {
          router.push("/login");
          return;
        }
        
        const userId = session.user?.id;
        if (!userId) {
          setError("User ID not found in session");
          return;
        }
        
        setId(userId);
        await fetchCartItems(userId);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    initializeCart();
  }, [router, fetchCartItems]);

  // Handler for cart item deletion
  const handleItemDelete = useCallback(async () => {
    if (id) {
      await fetchCartItems(id);
    }
  }, [id, fetchCartItems]);

  const totalCartAmount = data.reduce((sum, item) => Number(sum) + Number(item.total), 0);

  if (loading) return <div className={styles.cartdiv}>Loading...</div>;
  if (error) return <div className={styles.cartdiv}>Error: {error}</div>;

  return (
    <div className={styles.cartdiv}>
      <h1 className={styles.title}>Shopping Cart</h1>
      {data.length > 0 ? (
        <>
          <div className={styles.cartItems}>
            {data.map((item) => (
              <CartCard
                key={item.SKU} // Changed from ProductName to SKU for unique key
                {...item}
                onDelete={handleItemDelete}
              />
            ))}
          </div>
          <div className={styles.summary}>
            <div className={styles.totalAmount}>
              Cart Total: Rs.{totalCartAmount.toFixed(2)}
            </div>
          </div>
          <button 
            className={styles.checkoutButton}
            onClick={() => {
              router.push("../cartsummery");
              setIsClicked(!isClicked);
            }}
          >
            Proceed to Checkout
          </button>
        </>
      ) : (
        <p className={styles.emptyCart}>Your cart is empty</p>
      )}
    </div>
  );
}