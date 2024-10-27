'use client';
import { getSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from "./page.module.css";
import CartSum from "./components/cartsum";
import Address from "./components/address";

import Paymentdetails from "./components/paydetails";
import ShipingDetails from "./components/shipingdetails";

import SelectAddress from "./components/selectadd";

export default function CartSummery(){
    const router = useRouter();
    const [id, setId] = useState('');

    useEffect(() => {
        const checkSession = async () => {
        const session = await getSession(); // Getting the session
        if (!session) {
            router.push("/login"); // Redirecting to sign-in if no session
        } else {
            setId(session.user?.id || ''); // Set email if session exists
        }
        };

        checkSession(); // Calling the session check
    }, [router]);

    useEffect(() => {
        console.log(id);   
    });
    if(!id) {
        return <div>Loading...</div>;
    }

    return(        
        <div className={styles.summerybody}>
            <div className={styles.sumbodyright}>  
                <SelectAddress id={id}/>
                
                <ShipingDetails id={id} />
            </div>


        <div className={styles.sumbodyleft}>
            <div className={styles.sumbodyleftupper}>
                
                
                <CartSum id={id}/>
               
                
            </div>

            <div className={styles.sumbodyleftupper}>
                <Paymentdetails />
            </div>
            </div>
        </div>
    );
}