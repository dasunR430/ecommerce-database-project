'use client'

import { useEffect, useState } from "react";
import styles from "./shipingdetails.module.css";

export default function ShippingDetails() {
    const [estimatedDate, setEstimatedDate] = useState("");
   

    useEffect(() => {
        async function fetchShippingDetails() {
            try {
                const response = await fetch("/api/shippingdetails?orderID=1"); // Replace with your API endpoint
                if (response.ok) {
                    const data = await response.json();
                    // Assuming data contains fields 'MaxDeliveryDate' and 'NetTotal'
                    setEstimatedDate(formatDate(data.MaxDeliveryDate));
                    setAmount(data.NetTotal);
                } else {
                    console.error("Failed to fetch shipping details");
                }
            } catch (error) {
                console.error("Error fetching shipping details:", error);
            }
        }

        fetchShippingDetails();
    }, []);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    return (
        <div className={styles.sdetails}>
            <h2 className={styles.head}>Shipping Details</h2>
            
            <div className={styles.inputdiv}>
                <label>Estimated Delivery Date:</label><br />
                <p className={styles.displayText}>{estimatedDate}</p>
            </div>

           
           
        </div>
    );
}

