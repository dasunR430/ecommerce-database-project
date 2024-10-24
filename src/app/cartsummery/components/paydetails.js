import styles from "./paydetails.module.css"
export default function PaymentDetail() {
    return (
        <div className={styles.paymentdiv}>
            <h2 className={styles.head}>Payment Details</h2>
            <div className={styles.inputdiv}>
                <label for="cardnumber">Card Number*</label><br />
                <input type="number" id="cardnumber" name="cardnumber" className={styles.inputtakes} />
            </div>
            <div className={styles.inputdiv}>
                <label for="cardname">Card Name*</label><br />
                <input type="text" id="cardname" name="cardname" className={styles.inputtakes} />
            </div>
            <div className={styles.twoinputtakes}>
                <div className={styles.inputdiv}>
                    <label for="expdate">Expiration Date*</label><br />
                    <input type="date" id="expdate" name="expdate" className={styles.inputtakes} />
                </div>
                <div className={styles.inputdiv}>
                    <label for="cvv">CVV*</label><br />
                    <input type="number" id="cvv" name="cvv" className={styles.inputtakes} />
                </div>
            </div>

            <div className={styles.inputdiv}>
                <input type="checkbox" id="saveinfo" name="saveinfo" />
                <label for="saveinfo">Save this information for next time</label>
            </div>
            <button className={styles.paybtn}>Confirm Order</button>
        </div>
    );
}