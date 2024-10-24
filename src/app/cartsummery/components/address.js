import styles from "./address.module.css";
export default function Address() {
    return (
        <div className={styles.addressdiv}>
            <h2 className={styles.head}>Address</h2>
            <div className={styles.inputdiv}>
                <label for="addresstitle">Address title*</label><br />
                <input type="text" id="addresstitle" name="address" className={styles.inputtakes} />
            </div>

            <div className={styles.twoinputtakes}>
                <div className={styles.inputdiv}>
                    <label for="name">Name*</label><br />
                    <input type="text" id="name" name="name" className={styles.inputtakes}  />
                </div>
                <div className={styles.inputdiv}>
                    <label for="surname">Surname*</label><br />
                    <input type="text" id="surname" name="surname" className={styles.inputtakes} />
                </div>
            </div>

            <div className={styles.inputdiv}>
                <label for="phonenumber">Phone number*</label><br />
                <input type="number" id="phonenumber" name="phonenumber" className={styles.inputtakes} />
            </div>

            <div className={styles.twoinputtakes}>
                <div className={styles.inputdiv}>
                    <label for="country">Country*</label><br />
                    <input type="text" id="country" name="country" className={styles.inputtakes} />
                </div>
                <div className={styles.inputdiv}>
                    <label for="city">City*</label><br />
                    <input type="text" id="city" name="city" className={styles.inputtakes} />
                </div>
            </div>

            <div className={styles.inputdiv}>
                <label for="address">Address*</label><br />
                <input type="text" id="address" name="address" className={styles.inputtakes} />
            </div>
            <button className={styles.addaddressbtn}>Add Address</button>
        </div>
    );
}