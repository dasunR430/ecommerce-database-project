'use client';
import styles from './cartcard.module.css';

interface CartSummaryCardProps {
  ProductName: string;
  Quantity: number;
  NetPrice: number;
  estimatedDelivery: string;
}

export default function CartSummaryCard({
  ProductName,
  Quantity,
  NetPrice,
  estimatedDelivery,
}: CartSummaryCardProps) {
  return (
    <div className={styles.cartCard}>
      <div className={styles.details}>
        <h3 className={styles.name}>{ProductName}</h3>
        <div className={styles.info}>
          <span>Quantity: {Quantity}</span>
          <span className={styles.total}>Rs. {NetPrice.toFixed(2)}</span>
        </div>
        <span className={styles.deliveryText}>
          Estimated Delivery: {estimatedDelivery}
        </span>
      </div>
    </div>
  );
}