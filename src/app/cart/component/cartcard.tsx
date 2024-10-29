'use client';
import styles from './CartCard.module.css';
import { Trash2 } from 'lucide-react';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Popup from '@/app/popupmsg/page';

interface CartCardProps {
  ProductName: string;
  Quantity: number;
  total: number;
  SKU: string;
  onDelete: () => Promise<void>;
}

export default function CartCard({
  ProductName,
  Quantity,
  total,
  SKU,
  onDelete,
}: CartCardProps) {
  const router = useRouter();
  const [id, setId] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/login");
        return;
      }
      if (session.user?.id) {
        setId(session.user.id);
      }
    };

    checkSession();
  }, [router]);

  const deleteItem = async () => {
    if (!id) {
      setError('User ID not available');
      return;
    }

    try {
      setIsDeleting(true);
      setError('');
      setShowPopup(true);
      setTimeout(() => {
        setShowPopup(false);
      }, 1000);

      const response = await fetch('/api/deletecartitem', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id, sku: SKU }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      // Call the parent's onDelete callback to refresh the cart
      await onDelete();

    } catch (err) {
      console.error('Failed to delete item:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete item');
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className={styles.cartCard}>
      <div className={styles.details}>
        <h3 className={styles.name}>{ProductName}</h3>
        <div className={styles.info}>
          <span>Quantity: {Quantity}</span>
          <span className={styles.total}>Total: Rs.{total}</span>
        </div>
        {error && <p className={styles.error}>{error}</p>}
      </div>
      <button 
        onClick={deleteItem}
        className={`${styles.deleteButton} ${isDeleting ? styles.deleting : ''}`}
        disabled={isDeleting}
        aria-label="Delete item"
      >
        <Trash2 size={18} />
      </button>
      {showPopup && <Popup message="Item deleted from cart" type='error'/>}
    </div>
  );
}