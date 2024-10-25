import styles from './page.module.css';
export default function CartPage() {
  return (
    <div className={styles.cartdiv}>
        <h1>Cart</h1>
        <h2>Items</h2>
        <button className={styles.cartbutton}>Checkout</button>
    </div>
  );
}