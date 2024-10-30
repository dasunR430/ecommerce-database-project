'use client'
import { useEffect, useState } from "react";
import styles from "./address.module.css";
import Popup from "@/app/popupmsg/page";

export default function Address({ selectedAddress , setAddressData}) {
    const [addressDetails, setAddressDetails] = useState({
        CustomerName: "",
        AddressLine1: "",
        AddressLine2: "",
        PhoneNumber: "",
        City: "",
        District: "",
        PostalCode: ""
    });

    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        if (selectedAddress) {
            setAddressDetails({
                CustomerName: selectedAddress.CustomerName || "",
                AddressLine1: selectedAddress.AddressLine1 || "",
                AddressLine2: selectedAddress.AddressLine2 || "",
                PhoneNumber: selectedAddress.PhoneNumber || "",
                City: selectedAddress.City || "",
                District: selectedAddress.District || "",
                PostalCode: selectedAddress.PostalCode || ""
            });
        }
    }, [selectedAddress]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setAddressDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setAddressData(addressDetails);
        setShowPopup(true);
        setTimeout(() => {
            setShowPopup(false);
        }, 2000);
    };

    return (
        <div className={styles.addressdiv}>
            <h2 className={styles.head}>Address</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputdiv}>
                    <label htmlFor="addresstitle">Name*</label><br />
                    <input
                        type="text"
                        id="addresstitle"
                        name="CustomerName"
                        className={styles.inputtakes}
                        value={addressDetails.CustomerName}
                        onChange={handleChange} required
                    />
                </div>

                <div className={styles.twoinputtakes}>
                    <div className={styles.inputdiv}>
                        <label htmlFor="name">Address Line 1*</label><br />
                        <input
                            type="text"
                            id="name"
                            name="AddressLine1"
                            className={styles.inputtakes}
                            value={addressDetails.AddressLine1}
                            onChange={handleChange} required
                        />
                    </div>
                    <div className={styles.inputdiv}>
                        <label htmlFor="surname">Address Line 2*</label><br />
                        <input
                            type="text"
                            id="surname"
                            name="AddressLine2"
                            className={styles.inputtakes}
                            value={addressDetails.AddressLine2}
                            onChange={handleChange} required
                        />
                    </div>
                </div>

                <div className={styles.inputdiv}>
                    <label htmlFor="phonenumber">Phone number*</label><br />
                    <input
                        type="text"
                        id="phonenumber"
                        name="PhoneNumber"
                        className={styles.inputtakes}
                        value={addressDetails.PhoneNumber}
                        onChange={handleChange} required
                    />
                </div>

                <div className={styles.twoinputtakes}>
                    <div className={styles.inputdiv}>
                        <label htmlFor="city">Main City*</label><br />
                        <input
                            type="text"
                            id="city"
                            name="City"
                            className={styles.inputtakes}
                            value={addressDetails.City}
                            onChange={handleChange} required
                        />
                    </div>
                    <div className={styles.inputdiv}>
                        <label htmlFor="district">District*</label><br />
                        <input
                            type="text"
                            id="district"
                            name="District"
                            className={styles.inputtakes}
                            value={addressDetails.District}
                            onChange={handleChange} required
                        />
                    </div>
                </div>

                <div className={styles.inputdiv}>
                    <label htmlFor="postalCode">Postal Code*</label><br />
                    <input
                        type="text"
                        id="postalCode"
                        name="PostalCode"
                        className={styles.inputtakes}
                        value={addressDetails.PostalCode}
                        onChange={handleChange} required
                    />
                </div>
                <button type="submit" className={styles.addaddressbtn}>Add Address</button>
            </form>
            {showPopup && <Popup message="Address updated successfully" />}
        </div>
    );
}
