'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"

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
            <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>

            <TableHeader>
                <TableRow>
                <TableHead className="w-[100px]">City</TableHead>
                <TableHead>District</TableHead>
                <TableHead>Postal Code</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Address 1</TableHead>
                <TableHead className="text-right">Address 2</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                <TableRow>
                <TableCell className="font-medium">Narammala</TableCell>
                <TableCell>Kurunegala</TableCell>
                <TableCell>90321</TableCell>
                <TableCell className="text-right">555-0983</TableCell>
                <TableCell>123 Main St</TableCell>
                <TableCell className="text-right">Apt 2</TableCell>
                </TableRow>
            </TableBody>
            </Table>
            <hr />
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
