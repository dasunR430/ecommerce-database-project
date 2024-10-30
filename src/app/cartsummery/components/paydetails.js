import styles from "./paydetails.module.css";
import { useState } from 'react';

export default function PaymentDetail({isClicked, setIsClicked, setPaymentData}) {
    const[deliveryMethod, setDeliveryMethod] = useState({deliverymethod: "Door Delivery", paymentmethod: "Cash on Delivery"});

    const handleDeliveryMethodChange = (e) => {
        setDeliveryMethod(prev => ({
            ...prev,
            deliverymethod: e.target.value
        }));
    };

    const handlePaymentMethodChange = (e) => {
        setDeliveryMethod(prev => ({
            ...prev,
            paymentmethod: e.target.value
        }));
    };

    const handleConfirmOrder = () => {
        setPaymentData(deliveryMethod); // Pass the data to parent
        setIsClicked(!isClicked);
    };

    return (
        <div className={styles.paymentdiv}>
            <h2 className={styles.head}>Payment Details</h2>

            {/* Delivery Method Dropdown */}
            <div className={styles.inputdiv}>
                <label htmlFor="deliverymethod">Delivery Method*</label><br />
                <select 
                    id="deliverymethod" 
                    name="deliverymethod" 
                    className={styles.inputtakes}
                    value={deliveryMethod.deliverymethod}
                    onChange={handleDeliveryMethodChange}
                >
                    <option value="Door Delivery">Door Delivery</option>
                    <option value="Store Pick">Store Pick</option>
                </select>
            </div>

            {/* Payment Method Dropdown */}
            <div className={styles.inputdiv}>
                <label htmlFor="paymentmethod">Payment Method*</label><br />
                <select 
                    id="paymentmethod" 
                    name="paymentmethod" 
                    className={styles.inputtakes}
                    value={deliveryMethod.paymentmethod}
                    onChange={handlePaymentMethodChange}
                >
                    <option value="card">Card</option>
                    <option value="cash">Cash on Delivery</option>
                </select>
            </div>

            <button 
                className={styles.paybtn} 
                onClick={handleConfirmOrder}
            >
                Confirm Order
            </button>
        </div>
    );
}