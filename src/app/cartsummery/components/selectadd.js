'use client';

import { useEffect, useState } from "react";
import styles from "./selectadd.module.css";
import Address from "./address";


export default function SelectAdd({id, setAddressData}) {
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {
        async function fetchAddresses() {
            try {
                const response = await fetch(`/api/customer/getcustomeraddresses?customer_id=${id}`);    
                if (response.ok) {
                    const data = await response.json();
                    setAddresses(data);
                } else {
                    console.error("Failed to fetch addresses");
                }
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        }

        fetchAddresses();
    }, []);

    const handleAddressSelect = (event) => {
        const index = event.target.value;
        if (index) {
            setSelectedAddress(addresses[index]);
        } else {
            setSelectedAddress(null);
        }
    };

    return (
        <>
        <div className={styles.selectadddiv}>
            <h2 className={styles.head}>Select Address</h2>
            <select id="address" className={styles.pickadd} onChange={handleAddressSelect}>
                <option value="">Select an address</option>
                {addresses.map((address, index) => (
                    <option key={index} value={index}>
                        {`${address.AddressLine1}, ${address.City}, ${address.District}`}
                    </option>
                ))}
            </select>
           
        </div>
         <Address selectedAddress={selectedAddress} setAddressData = {setAddressData}/>
         </>
    );

}
