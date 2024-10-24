import mysql from 'mysql2/promise';
import { NextRequest } from 'next/server';
import { pool } from '@/sharedCode/dbconnect';
import { getSession } from 'next-auth/react';
import { useState } from 'react';



export async function POST(req: NextRequest) {
    const requestBody = await req.json();

    const id = requestBody.id;
    const address1 = requestBody.address1;
    const address2 = requestBody.address2;
    const city = requestBody.city;
    const district = requestBody.district;
    const postalCode = requestBody.postalCode;
    
    console.log(id);

    try{        
        const connection = await pool.getConnection();

        const insertQuery = 'INSERT INTO ContactDetails(CustomerID, AddressLine1, AddressLine2, City, District, PostalCode) VALUES (?, ?, ?, ?, ?, ?)';

        await connection.execute(insertQuery, [id, address1, address2, city, district, postalCode]);

        connection.release();
    }catch(error){
        console.error('Failed to add contact details');
    }
    
    return new Response(JSON.stringify({ message: 'Contact details added successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
