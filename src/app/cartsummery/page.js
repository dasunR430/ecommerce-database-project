import styles from "./page.module.css";
import CartSum from "./components/cartsum.js";
import Address from "./components/address.js";
import AddressInfo from "./components/addressinfo.js";
import Paymentdetails from "./components/paydetails.js";
import ShipingDetails from "./components/shipingdetails.js";
import Additional from "./components/additional.js";
import SelectAddress from "./components/selectadd.js";

export default function CartSummery(){
    return(
        <div className={styles.summerybody}>
            <div className={styles.sumbodyright}>  
                <SelectAddress />
                <Address />
                <ShipingDetails />
            </div>


        <div className={styles.sumbodyleft}>
            <div className={styles.sumbodyleftupper}>
                
                
                <CartSum />
               
                
            </div>

            <div className={styles.sumbodyleftupper}>
                <Paymentdetails />
            </div>
            </div>
        </div>
    );
}