import styles from "./addressinfo.module.css";
export default function AddressInfo() {
    return(
        <div className={styles.addressinfodiv}>
            <h2 className={styles.head}>Address</h2>
            <div className={styles.deliveryadd}>
                <h6>DELIVERY ADDRESS</h6>
            </div>
        </div>
    );
}