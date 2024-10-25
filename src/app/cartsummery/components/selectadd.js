import styles from "./selectadd.module.css";
export default function SelectAdd() {
    return (
        <div className={styles.selectadddiv}>
            <h2 className={styles.head}>Select Address</h2>
            <select id="address" className={styles.pickadd} placeholder="Select an address">
                <option value="address0">Select an address</option>
                <option value="address1">Address 1</option>
                <option value="address2">Address 2</option>
                <option value="address3">Address 3</option>
            </select>
        </div>
    );
};