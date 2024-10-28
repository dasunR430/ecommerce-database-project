'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Input } from '../components/basicUi/input';
import { useState, useEffect } from 'react';
// import { Button } from '../components/basicUi/button';
import { Button } from '@/components/ui/button';
import React from 'react';
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
  } from "@/components/ui/card"

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
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
    const handleCheckPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCheckPassword(e.target.value);
    }
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
    
        if (password !== checkPassword) {
            setError('Passwords do not match');
            setLoading(false);
            setCheckPassword('');
            return;
        }
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
            setCheckPassword('');
        }
    };
   
    return(
    // <div className="flex justify-center items-center min-h-screen">
    //     <Card className="w-2/5">
    //     <CardHeader>
    //     <CardTitle>Register</CardTitle>
    //     </CardHeader>
    //     <CardContent>
    //     <form onSubmit={handleSubmit}>
    //     <Input label="Email" type="email" placeholder="Email" value={email} onChange={handleEmailChange}/>
    //     <Input label="Password" type="password" placeholder="Password" value={password} onChange={handlePasswordChange}/>
    //     <Input label="Confirm Password" type="password" placeholder="Confirm Password" value={checkPassword} onChange={handleCheckPasswordChange}/>
    //     <Input label="Name" type="text" placeholder="Name" value={name} onChange={handleNameChange}/>
    //     <Input label='Phone Number' type='text' placeholder='Phone Number' value={phoneNumber} onChange={handlePhoneNumberChange}/>
    //     <br/>
    //     <Button type='submit'>Submit</Button>
    //     {error && <p style={{ color: 'red' }}>{error}</p>}
    //     <br/>
    //     <a href="/login" className="text-blue-500 underline">Already registered?</a>
    //     </form>
    //     </CardContent>
    //     </Card>
    // </div>
    <div className="min-h-screen flex items-center justify-center bg-gray-800 p-4 overflow-hidden">
        <div className="relative flex flex-col items-center bg-white bg-opacity-90 p-8 md:p-12 rounded-lg shadow-lg backdrop-blur-lg max-w-lg w-full">
            <div className="bg-red-900 rounded-full p-4 mb-6">
                <FontAwesomeIcon icon={faUser} className="h-16 w-16 text-gray-300" />
            </div>
            <h2 className="text-3xl font-bold text-blue-900 mb-8">Register</h2>
            <form onSubmit={handleSubmit}>
                <Input
                    label="Email"
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <Input
                    label="Password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <Input
                    label="Confirm Password"
                    type="password"
                    placeholder="Confirm Password"
                    value={checkPassword}
                    onChange={handleCheckPasswordChange}
                />
                <Input
                    label="Name"
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={handleNameChange}
                />
                <Input
                    label="Phone Number"
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
                <br />
                <Button type="submit">Submit</Button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <br />
                <div className="text-blue-500 underline">
                <a href="/login" className="text-blue-500 underline">
                    Already registered?
                </a>
                </div>
            </form>
        </div>
    </div>
    );
};