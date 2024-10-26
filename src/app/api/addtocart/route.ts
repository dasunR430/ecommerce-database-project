import mysql from 'mysql2/promise';
import { NextRequest } from 'next/server';
import { pool } from '@/sharedCode/dbconnect';
import { getSession } from 'next-auth/react';

export async function POST(req: NextRequest) {
    const requestBody = await req.json();

    const id = requestBody.id;
    const sku = requestBody.sku;
    const quantity = requestBody.quantity;
    

    let connection;
    try {        
        connection = await pool.getConnection();

        const insertQuery = 'INSERT INTO CartItem (CustomerID, SKU, Quantity) VALUES (?, ?, ?)';
        await connection.execute(insertQuery, [id, sku, quantity]);

        return new Response(JSON.stringify({ message: 'Contact details added successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to add contact details:', error);

        return new Response(JSON.stringify({ error: 'Failed to add contact details' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    } finally {
        if (connection) connection.release();
    }
}
