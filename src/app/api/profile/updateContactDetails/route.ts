import { NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { pool } from '@/sharedCode/dbconnect';

export async function PUT(req: NextRequest) { // Changed to PUT
    const requestBody = await req.json();
    const AddressID = requestBody.contactId;
    
    const AddressLine1 = requestBody.address1;
    const AddressLine2 = requestBody.address2;
    const City = requestBody.city;
    const District = requestBody.district;
    const PostalCode = requestBody.postalCode;
    const PhoneNumber = requestBody.phoneNumber; 

    if (!AddressID) {
        return new Response(JSON.stringify({ message: 'AddressID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    try {
        const connection = await pool.getConnection();

        const updateQuery = 'UPDATE contactdetails SET AddressLine1 = ?, AddressLine2 = ?, City = ?, District = ?, PostalCode = ?,PhoneNumber = ? WHERE AddressID = ?';
        await connection.execute(updateQuery, [AddressLine1, AddressLine2, City, District, PostalCode,PhoneNumber, AddressID]);

        connection.release();

        return new Response(JSON.stringify({ message: 'Contact details updated successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to update contact details:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
