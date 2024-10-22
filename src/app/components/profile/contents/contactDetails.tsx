'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';

function ContactDetails({ email }: { email: string }) {
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [postalCode, setPostalCode] = useState('');
    
    const handleAddress1Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress1(e.target.value);
    };
    const handleAddress2Change = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAddress2(e.target.value);
    };
    const handleCityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCity(e.target.value);
    };
    const handleDistrictChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDistrict(e.target.value);
    };
    const handlePostalCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPostalCode(e.target.value);
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await fetch('/api/auth/addContactDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    address1,
                    address2: address2 === '' ? null : address2, // Set address2 to null if empty
                    city,
                    district,
                    postalCode,
                }),
            });
            if (response.ok) {
                console.log('Contact details added successfully');
            } else {
                console.log('Failed to add contact details');
            }
        } catch (error) {
            console.error('Failed to add contact details');
        }
    };

    return (
        <div>
            <h2>Contact Details</h2>
            <form onSubmit={handleSave}>
                <Input label="Address 1" type="text" placeholder="Address 1" value={address1} onChange={handleAddress1Change} />
                <Input label="Address 2" type="text" placeholder="Address 2" value={address2} onChange={handleAddress2Change} />
                <Input label="City" type="text" placeholder="City" value={city} onChange={handleCityChange} />
                <Input label="District" type="text" placeholder="District" value={district} onChange={handleDistrictChange} />
                <Input label="Postal Code" type="text" placeholder="Postal Code" value={postalCode} onChange={handlePostalCodeChange} />
                <Button label="Save" />
            </form>
        </div>
    );
}

export default ContactDetails;
