'use client';

import { Input } from '../components/ui/input';
import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import React from 'react';

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');

    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // For customer table
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    };

    //For contact details table
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
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
        // If address2 is empty, set it to null
        const processedAddress2 = address2 === '' ? null : address2;
    
        try {
            const response = await fetch('/api/auth/addUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    email, 
                    password, 
                    name, 
                    address1, 
                    address2: processedAddress2, // Use processedAddress2 here
                    city, 
                    district, 
                    postalCode, 
                    phoneNumber 
                }),
            });
    
            if (response.ok) {
                console.log('User added successfully');
                window.location.href = '/';
            } else {
                console.log('Failed to add user');
                setError('Please enter a different email');
            }
        } catch (error) {
            console.log('Error adding user:', error);
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
            setName('');
            setEmail('');
            setPassword('');
            setAddress1('');
            setAddress2('');
            setCity('');
            setDistrict('');
            setPostalCode('');
            setPhoneNumber('');
        }
    };
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <Card>
                    <Input label="Email" type="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
                    <Input label="Password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
                    <Input label="Name" type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
                    <Input label="Address 1" type="text" placeholder="Address 1" value={address1} onChange={handleAddress1Change}/>
                    <Input label="Address 2" type="text" placeholder="Address 2" value={address2} onChange={handleAddress2Change}/>
                    <Input label="City" type="text" placeholder="City" value={city} onChange={handleCityChange}/>
                    <Input label="District" type="text" placeholder="District" value={district} onChange={handleDistrictChange}/>
                    <Input label="Postal Code" type="text" placeholder="Postal Code" value={postalCode} onChange={handlePostalCodeChange}/>
                    <Input label="Phone Number" type="text" placeholder="Phone Number" value={phoneNumber} onChange={handlePhoneNumberChange}/>
                    <Button label='Submit'/>
                </Card>
            </form>
        </div>
    );
};