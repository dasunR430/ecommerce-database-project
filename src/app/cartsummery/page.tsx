'use client';
import { getSession } from 'next-auth/react';
import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import styles from "./page.module.css";
import CartSum from "./components/cartsum";


import Paymentdetails from "./components/paydetails";
import ShipingDetails from "./components/shipingdetails";

import SelectAddress from "./components/selectadd";

import OrderSum from "../ordersummery/page"
import { Loader2 } from 'lucide-react';


export default function CartSummery(){
    

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [id, setId] = useState('');
    const [isclicked, setIsClicked] = useState(false);
    const [total, setTotal] = useState(0);
    
    const [addressData, setAddressData] = useState({
        CustomerName: " ", 
        AddressLine1: " ", 
        AddressLine2: " ", 
        PhoneNumber: " ", 
        City: " ", 
        District: " ", 
        PostalCode: " "});
    const [paymentData, setPaymentData] = useState({
        deliverymethod: " ", 
        paymentmethod: " "});

    const [ShippingData, setShippingData] = useState();

    const combined = { ...addressData, ...paymentData, ShippingData };
    const [cartCount, setCartCount] = useState(0);        

    // function getRandomInt(min, max) {
    //     min = Math.ceil(min);
    //     max = Math.floor(max);
    //     return Math.floor(Math.random() * (max - min + 1)) + min;
    // }

    const placeOrder = async () => {
        const req_body = {
            id,
            BillingAddressLine1: combined.AddressLine1,
            BillingAddressLine2: combined.AddressLine2,
            BillingCity: combined.City,
            BillingDistrict: combined.District,
            BillingPostalCode: combined.PostalCode,
            Email: "",
            PhoneNumber: combined.PhoneNumber,
            DeliveryMethod: combined.deliverymethod,
            PaymentMethod: combined.paymentmethod,
            NetTotal: total,
        }

        if(!id) {
            console.error('User ID not available');
            return;
        }
        try {
            const response = await fetch('/api/placeorder', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(req_body),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || `Failed to place order : ${response.status}`);
            }
            setIsClicked(false);

        } catch (error) {
            console.error('Failed to place order');
        }
    }

    // Define getcartcount with useCallback outside useEffect
    const getcartcount = useCallback(async (id: string) => {
        try {
            if (id === '') return;
            
            const response = await fetch('/api/getcartitem/getcartcount', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id: id }),
            });

            if (!response.ok) {
                throw new Error('Failed to fetch cart count');
            }

            const data = await response.json();
            setCartCount(data || 0);
        } catch (error) {
            console.error('Error fetching cart count:', error);
            setCartCount(0);
        }
    }, []);

    // Then in useEffect
    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            if (!session) {
                router.push("/login");
            } else {
                setId(session.user?.id || '');
            }
        };

        checkSession();
    }, [router]);

    useEffect(() => {
        if (id) {
            getcartcount(id);
        }
    }, [id, getcartcount]);

    if(!id) {
        return (
        <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '90vw', margin: '0 auto', animation: 'fadeIn 1s ease-in-out' }}
          >
            <Loader2 style={{ marginBottom: '1rem', animation: 'pulse 1.5s infinite ease-in-out' }} />
            <span style={{ animation: 'blink 1.2s infinite' }}>Loading cart...</span>
          
            <style jsx>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
              @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            `}</style>
          </div>          
        );
    }

    return(        
        <div className={styles.summerybody}>
            <div className={styles.sumbodyright}>  
                <SelectAddress id={id} setAddressData = {setAddressData} />
                
                <ShipingDetails id={id} setShippingData={setShippingData}/>
            </div>
        <div className={styles.sumbodyleft}>
            <div className={styles.sumbodyleftupper}> 
                <CartSum id={id} setIsLoading={setIsLoading} setTotal={setTotal}/>
            </div>

            <div className={styles.sumbodyleftupper}>
                <Paymentdetails isClicked={isclicked} setIsClicked={setIsClicked} setPaymentData={setPaymentData}/>
            </div>
            </div>

            {isclicked && <OrderSum id={id} isClicked={isclicked} setIsClicked={setIsClicked} combinedData={combined} placeOrder={placeOrder} cartCount={cartCount}/>}
        </div>
    );
}

