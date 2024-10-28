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

interface Address {
    CustomerName: string;
    AddressLine1: string;
    AddressLine2: string;
    PhoneNumber: string;
    City: string;
    District: string;
    PostalCode: string;
}

interface Paymentdetails {
    Deliverymethod: string;
    Paymentmethod: string;
}

export default function CartSummery(){
    const router = useRouter();
    const [id, setId] = useState('');
    const [isclicked, setIsClicked] = useState(false);
    const [data, setData] = useState({
        CustomerName: " ", 
        AddressLine1: " ", 
        AddressLine2: " ", 
        PhoneNumber: " ", 
        City: " ", 
        District: " ", 
        PostalCode: " ",
        Deliverymethod: " ", 
        Paymentmethod: " " });

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
        console.log(data);   
    });
    if(!id) {
        return <div>Loading...</div>;
    }

    return(        
        <div className={styles.summerybody}>
            <div className={styles.sumbodyright}>  
                <SelectAddress id={id}  />
                setData()
                <ShipingDetails id={id} />
            </div>


        <div className={styles.sumbodyleft}>
            <div className={styles.sumbodyleftupper}>
                
                
                <CartSum id={id}/>
               
                
            </div>

            <div className={styles.sumbodyleftupper}>
                <Paymentdetails isClicked={isclicked} setIsClicked={setIsClicked}/>
            </div>
            </div>
            {isclicked && <OrderSum id={id} isClicked={isclicked} setIsClicked={setIsClicked}/>}
        </div>
    );
}