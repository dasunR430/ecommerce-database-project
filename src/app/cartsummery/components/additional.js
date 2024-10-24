import styles from "./additional.module.css";

export default function Additional() {
    return (
        <div className={styles.additional}>
            <h2 className={styles.head}>Additional</h2>
            <div className={styles.showdiv}>
                <h6 >DELIVERY ADDRESS</h6>
            </div>
        </div>
    );
}