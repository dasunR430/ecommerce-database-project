'use client'

import { getSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import styles from "./selectadd.module.css";

export default function SelectAdd({id}) {
    const [addresses, setAddresses] = useState([]);
    
    

    useEffect(() => {
        async function fetchAddresses() {
            try {
                const response = await fetch(`/api/customer/getcustomeraddresses?customer_id=${id}`); // Replace with your API endpoint and add customer ID as needed
                if (response.ok) {
                    const data = await response.json();
                    setAddresses(data); // Assuming the API returns an array of addresses
                } else {
                    console.error("Failed to fetch addresses");
                }
            } catch (error) {
                console.error("Error fetching addresses:", error);
            }
        }

        fetchAddresses();
    }, []);

    return (
        <div className={styles.selectadddiv}>
            <h2 className={styles.head}>Select Address</h2>
            <select id="address" className={styles.pickadd}>
                <option value="">Select an address</option>
                {addresses.map((address, index) => (
                    <option key={index} value={`address${index}`}>
                        {`${address.AddressLine1}, ${address.City}, ${address.District}`}
                    </option>
                ))}
            </select>
        </div>
    );
};
