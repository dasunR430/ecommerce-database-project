'use client';
import React, { useState, useEffect } from 'react';
import { Input } from '../../basicUi/input';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { getSession } from 'next-auth/react';
import router from 'next/router';

interface Contacts {
    AddressID: number; // Keep AddressID in the interface
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    District: string;
    PostalCode: string;
    PhoneNumber: string; // Add PhoneNumber to the interface
}

function ContactDetails({ email }: { email: string }) {
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [city, setCity] = useState('');
    const [district, setDistrict] = useState('');
    const [postalCode, setPostalCode] = useState('');
    const [phoneNumber, setPhoneNumber] = useState(''); // Corrected variable name to camelCase

    const [id, setId] = useState('');
    const [contacts, setContacts] = useState<Contacts[]>([]);
    const [editingContactId, setEditingContactId] = useState<number | null>(null);

    useEffect(() => {
        const checkSession = async () => {
            const session = await getSession();
            if (!session) {
                router.push("/login");
            } else {
                setId(session.user?.id || '');
            }
        };
        checkSession();
    }, [router]);

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
    }

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (editingContactId !== null) {
            // Update existing contact
            await handleUpdate(editingContactId);
        } else {
            // Add new contact
            await handleAdd();
        }
    };

    const handleAdd = async () => {
        try {
            const response = await fetch('/api/profile/addContactDetails', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    address1,
                    address2: address2 === '' ? null : address2,
                    city,
                    district,
                    postalCode,
                    phoneNumber, // Add phoneNumber to the request body
                }),
            });

            if (response.ok) {
                console.log('Contact details added successfully');
                resetForm();
                fetchAddresses();
            } else {
                console.log('Failed to add contact details');
            }
        } catch (error) {
            console.error('Failed to add contact details', error);
        }
    };

    const handleUpdate = async (contactId: number) => {
        try {
            const response = await fetch(`/api/profile/updateContactDetails`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contactId,
                    address1,
                    address2: address2 === '' ? null : address2,
                    city,
                    district,
                    postalCode,
                    phoneNumber, // Add phoneNumber to the request body
                }),
            });

            if (response.ok) {
                console.log('Contact updated successfully');
                resetForm();
                fetchAddresses();
            } else {
                console.log('Failed to update contact');
            }
        } catch (error) {
            console.error('Failed to update contact', error);
        }
    };

    const handleEdit = (contact: Contacts) => {
        setEditingContactId(contact.AddressID); // Set the AddressID of the contact being edited
        setAddress1(contact.AddressLine1);
        setAddress2(contact.AddressLine2 || '');
        setCity(contact.City);
        setDistrict(contact.District);
        setPostalCode(contact.PostalCode);
        setPhoneNumber(contact.PhoneNumber); // Set the phone number
    };

    const handleDelete = async (contactId: number) => {
        try {
            const response = await fetch(`/api/profile/deleteContactDetails`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ contactId }),
            });

            if (response.ok) {
            console.log('Contact deleted successfully');
            fetchAddresses();
            } else {
            console.log('Failed to delete contact');
            }
        } catch (error) {
            console.error('Failed to delete contact', error);
        }
    };

    const resetForm = () => {
        setAddress1('');
        setAddress2('');
        setCity('');
        setDistrict('');
        setPostalCode('');
        setPhoneNumber(''); // Reset the phone number
        setEditingContactId(null);
    };

    const fetchAddresses = async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/profile/getContactDetails`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            });
            const contacts = await response.json();
            setContacts(contacts);
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        if (id) {
            fetchAddresses();
        }
    }, [id]);

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
                        <TableHead>Address 1</TableHead>
                        <TableHead>Address 2</TableHead>
                        <TableHead>Phone Number</TableHead> {/* Add Phone Number column */}
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {contacts.map((contact) => (
                        <TableRow key={contact.AddressID}>
                            <TableCell>{contact.City}</TableCell>
                            <TableCell>{contact.District}</TableCell>
                            <TableCell>{contact.PostalCode}</TableCell>
                            <TableCell>{contact.AddressLine1}</TableCell>
                            <TableCell>{contact.AddressLine2}</TableCell>
                            <TableCell>{contact.PhoneNumber}</TableCell>
                            <TableCell>
                                <Button onClick={() => handleEdit(contact)}>Edit</Button>
                                <Button onClick={() => handleDelete(contact.AddressID)}>Delete</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <hr />
            <form onSubmit={handleSave}>
                <Input label="City" type="text" placeholder="City" value={city} onChange={handleCityChange} />
                <Input label="District" type="text" placeholder="District" value={district} onChange={handleDistrictChange} />
                <Input label="Postal Code" type="text" placeholder="Postal Code" value={postalCode} onChange={handlePostalCodeChange} />
                <Input label="Address 1" type="text" placeholder="Address 1" value={address1} onChange={handleAddress1Change} />
                <Input label="Address 2" type="text" placeholder="Address 2" value={address2} onChange={handleAddress2Change} />
                <Input label="Phone Number" type="text" placeholder="Phone Number" value={phoneNumber} onChange={handlePhoneNumberChange} />
                <Button type="submit">{editingContactId !== null ? 'Save Changes' : 'Save'}</Button>
            </form>
        </div>
    );
}

export default ContactDetails;
