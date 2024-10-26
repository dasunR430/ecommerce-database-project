// components/CartCard.tsx
'use client';
import styles from './CartCard.module.css';
import { Trash2 } from 'lucide-react';

interface CartCardProps {
  ProductName: string;
  Quantity: number;
  total: number;
}

export default function CartCard({
  ProductName,
  Quantity,
  total,
}: CartCardProps) {
  return (
    <div className={styles.cartCard}>
      <div className={styles.details}>
        <h3 className={styles.name}>{ProductName}</h3>
        <div className={styles.info}>
          <span>Quantity: {Quantity}</span>
          <span className={styles.total}>Total: ${total}</span>
        </div>
      </div>
      <button 
        // onClick={() => console.log('Delete item' + ProductName)}
        className={styles.deleteButton}
        aria-label="Delete item"
      >
        <Trash2 size={18} />
      </button>
    </div>
  );
}