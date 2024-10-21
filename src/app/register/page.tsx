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
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPhoneNumber(e.target.value);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
    
    
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
                    <Input label='Phone Number' type='text' placeholder='Phone Number' value={phoneNumber} onChange={handlePhoneNumberChange}/>
                    <Button label='Submit'/>
                </Card>
            </form>
        </div>
    );
};