'use client';

import { useState, useEffect } from 'react';
import { Button} from '@/app/components/ui/button';
import { Card } from '@/app/components/ui/card';
import React from 'react';

export default function Register() {
    
    const [password, setPassword] = useState('');
    const [id, setId] = useState('');

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // For customer table
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setId(e.target.value);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

    
        try {
            const response = await fetch('/api/auth/changePassword', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    
                    password, 
                    id,
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
            setPassword('');
            setId('');
        }
    };
    
    return(
        <div>
            <form onSubmit={handleSubmit}>
                <Card>                    
                    <Button label='Submit'/>
                </Card>
            </form>
        </div>
    );
};