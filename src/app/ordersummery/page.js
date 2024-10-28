'use client';
import styles from './page.module.css'
import { useRouter } from 'next/router'
export default function OrderSummery({id, isClicked, setIsClicked}){  
    // const router = useRouter();
    return(
        <main>
            <div className={styles.background}>
                <div className={styles.summerydiv}>
                    <h1>{id}</h1>
                    <div className={styles.btnsdiv}>
                        <button className={styles.confirmbtn} onClick={() => {setIsClicked(!isClicked)}}>Confirm</button>
                        <button className={styles.cancelbtn} onClick={() => setIsClicked(!isClicked)}>Cancel</button>
                    </div>
                </div>
            </div>
        </main>
    )
}