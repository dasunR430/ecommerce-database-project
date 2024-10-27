import styles from "./address.module.css";
export default function Address()  {
    return (
        <div className={styles.addressdiv}>
            <h2 className={styles.head}>Address</h2>
            <div className={styles.inputdiv}>
                <label for="addresstitle">Name*</label><br />
                <input type="text" id="addresstitle" name="address" className={styles.inputtakes} />
            </div>

            <div className={styles.twoinputtakes}>
                <div className={styles.inputdiv}>
                    <label for="name">Address Line 1*</label><br />
                    <input type="text" id="name" name="name" className={styles.inputtakes}  />
                </div>
                <div className={styles.inputdiv}>
                    <label for="surname">Address Line 2*</label><br />
                    <input type="text" id="surname" name="surname" className={styles.inputtakes} />
                </div>
            </div>

            <div className={styles.inputdiv}>
                <label for="phonenumber">Phone number*</label><br />
                <input type="number" id="phonenumber" name="phonenumber" className={styles.inputtakes} />
            </div>

            <div className={styles.twoinputtakes}>
                <div className={styles.inputdiv}>
                    <label for="city">Main City*</label><br />
                    <input type="text" id="city" name="city" className={styles.inputtakes} />
                </div>
                <div className={styles.inputdiv}>
                    <label for="surname">District*</label><br />
                    <input type="text" id="surname" name="surname" className={styles.inputtakes} />
                </div>
            </div>

            <div className={styles.inputdiv}>
                <div className={styles.inputdiv}>
                    <label for="name">Postal Code*</label><br />
                    <input type="text" id="name" name="name" className={styles.inputtakes}  />
                </div>
                
            </div>
            <button className={styles.addaddressbtn}>Add Address</button>
        </div>
    );
}