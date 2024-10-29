'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { Input } from '../components/basicUi/input';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from "@/components/ui/card";

export default function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);
    const handleCheckPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setCheckPassword(e.target.value);
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => setPhoneNumber(e.target.value);

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

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <Card className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-md">
                <div className="text-center">
                    <div className="mx-auto bg-[#f3f4f6] w-16 h-16 rounded-full flex items-center justify-center mb-4">
                        <FontAwesomeIcon icon={faUser} className="h-8 w-8 text-[#6b7280]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#475569] mb-2">Register</h2>
                    <p className="text-gray-500 text-sm">
                        Create a new account
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <Input
                        label="Password"
                        type="password"
                        placeholder="Enter your password"
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
                        placeholder="Enter your name"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <Input
                        label="Phone Number"
                        type="text"
                        placeholder="Enter your phone number"
                        value={phoneNumber}
                        onChange={handlePhoneNumberChange}
                    />
                    <Button
                        type="submit"
                        className="w-full bg-[#475569] hover:bg-[#334155] text-white py-3 rounded-md transition-colors"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </Button>

                    {error && (
                        <div className="bg-red-50 text-[#dc2626] p-3 rounded-md text-sm">
                            {error}
                        </div>
                    )}
                </form>

                <div className="text-center">
                    <a href="/login" className="text-gray-700 hover:text-gray-900 text-sm">
                        Already registered? →
                    </a>
                </div>
            </Card>
        </div>
    );
}