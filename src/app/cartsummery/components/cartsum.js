'use client'

import { useEffect, useState } from 'react';
import style from './cartsum.module.css';
import Card from "./cartitem"; // Assuming Card component can be reused or adjusted

export default function CartSummary() {
    const [cartItems, setCartItems] = useState([]); // Initialized as an empty array
    const [totalAmount, setTotalAmount] = useState(0);

    useEffect(() => {
        async function fetchCartSummary() {
            try {
                const customerID = 1; // Replace with the actual customer ID
                const response = await fetch(`/api/cartitems?customerID=${customerID}`);
                if (response.ok) {
                    const data = await response.json();
                    console.log(data);
                    setCartItems(data); // Assuming data.purchasedItems is the correct structure
                    const total = data.reduce((acc, item) => acc + (item.Quantity * item.UnitPrice), 0);
                    setTotalAmount(total.toFixed(2));
                } else {
                    console.error("Failed to fetch cart summary");
                }
            } catch (error) {
                console.error("Error fetching cart summary:", error);
            }
        }

        fetchCartSummary();
    }, []);

    return (
        <div className={style.cartsumm}>
            <h2 className={style.head}>Cart Summary</h2>
            <div className={style.itemslist}>
                {Array.isArray(cartItems) && cartItems.length > 0 ? (
                    cartItems.map((item, index) => {
                        const netTotal = (item.Quantity * item.UnitPrice).toFixed(2); // Calculate net total
                        return (
                            <div key={index} className={style.item}>
                                <Card 
                                    product={{
                                        title: (
                                            <>
                                                <span className={style.productName}>
                                                    {item.ProductName} * {item.Quantity}
                                                </span>
                                                <span className={style.netTotal}>
                                                    Rs. {netTotal}
                                                </span>
                                            </>
                                        ),
                                    }} 
                                />
                            </div>
                        );
                    })
                ) : (
                    <p>No items in the cart.</p> // Display message if no items
                )}
            </div>
            <div className={style.total}>
                <h2>Total Rs. {totalAmount}</h2>
            </div>
        </div>
    );
}
