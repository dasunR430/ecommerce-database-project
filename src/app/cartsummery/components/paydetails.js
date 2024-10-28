import styles from "./paydetails.module.css";

export default function PaymentDetail({isClicked, setIsClicked}) {
    return (
        <div className={styles.paymentdiv}>
            <h2 className={styles.head}>Payment Details</h2>

            {/* Delivery Method Dropdown */}
            <div className={styles.inputdiv}>
                <label htmlFor="deliverymethod">Delivery Method*</label><br />
                <select id="deliverymethod" name="deliverymethod" className={styles.inputtakes}>
                    <option value="door">Door Delivery</option>
                    <option value="store">Store Pick</option>
                </select>
            </div>

            {/* Payment Method Dropdown */}
            <div className={styles.inputdiv}>
                <label htmlFor="paymentmethod">Payment Method*</label><br />
                <select id="paymentmethod" name="paymentmethod" className={styles.inputtakes}>
                    <option value="card">Card</option>
                    <option value="cash">Cash on Delivery</option>
                </select>
            </div>

            <button className={styles.paybtn} onClick={()=>setIsClicked(!isClicked)}>Confirm Order</button>
        </div>
    );
}
