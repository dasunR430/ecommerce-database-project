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

import OrderSum from "../ordersummery/page"

export default function CartSummery(){
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [id, setId] = useState('');
    const [isclicked, setIsClicked] = useState(false);
    const [addressData, setAddressData] = useState({
        CustomerName: " ", 
        AddressLine1: " ", 
        AddressLine2: " ", 
        PhoneNumber: " ", 
        City: " ", 
        District: " ", 
        PostalCode: " "});
    const [paymentData, setPaymentData] = useState({
        Deliverymethod: " ", 
        Paymentmethod: " "});

    const [ShippingData, setShippingData] = useState();

    const combined = { ...addressData, ...paymentData, ShippingData };

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
        // console.log(addressData);  
        // console.log(paymentData); 
        console.log(combined);
    });
    if(!id) {
        return <div>Loading...</div>;
    }
//     if (isLoading) {
//     return (
//       <div className={style.loadingContainer}>
//         <Loader2 className={style.loadingSpinner} />
//         <span>Loading cart...</span>
//       </div>
//     );
//   }
    return(        
        <div className={styles.summerybody}>
            <div className={styles.sumbodyright}>  
                <SelectAddress id={id} setAddressData = {setAddressData} />
                
                <ShipingDetails id={id} setShippingData={setShippingData}/>
            </div>


        <div className={styles.sumbodyleft}>
            <div className={styles.sumbodyleftupper}>
                
                
                <CartSum id={id} setIsLoading={setIsLoading}/>
               
                
            </div>

            <div className={styles.sumbodyleftupper}>
                <Paymentdetails isClicked={isclicked} setIsClicked={setIsClicked} setPaymentData={setPaymentData}/>
            </div>
            </div>
            {isclicked && <OrderSum id={id} isClicked={isclicked} setIsClicked={setIsClicked} combinedData = {combined}/>}

            {/* <button onClick={() => { console.log(addressData); }}>print</button> //debugging purpose */}
        </div>
    );
}