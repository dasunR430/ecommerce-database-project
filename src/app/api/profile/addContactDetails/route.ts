import mysql from 'mysql2/promise';
import { NextRequest } from 'next/server';
import { pool } from '@/sharedCode/dbconnect';
import { getSession } from 'next-auth/react';
import { useState } from 'react';

interface customer
{
    CustomerID: number;
}

export async function POST(req: NextRequest) {

    try{
        const { email,address1, address2, city, district, postalCode, phoneNumber } = await req.json();
        
        const connection = await pool.getConnection();

        const retriveQuery = 'SELECT CustomerID FROM customer WHERE Email = ?';
        const insertQuery = 'CALL addNewContactDetails(?, ?, ?, ?, ?, ?)';

        const [rows] = await connection.execute<mysql.RowDataPacket[]>(retriveQuery, [email]);

        const customer: customer = rows[0] as customer;

        await connection.execute(insertQuery, [customer.CustomerID, address1, address2, city, district, postalCode]);

        connection.release();
    }catch(error){
        console.error('Failed to add contact details');
    }
    
    return new Response(JSON.stringify({ message: 'Contact details added successfully' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}
