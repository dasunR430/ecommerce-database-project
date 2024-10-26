import mysql from 'mysql2/promise';
import { NextRequest } from 'next/server';
import { pool } from '@/sharedCode/dbconnect';
import { getSession } from 'next-auth/react';

export async function POST(req: NextRequest) {
    const requestBody = await req.json();

    const id = requestBody.id;

    let connection;
    try {        
        connection = await pool.getConnection();

        const getitemquery = 'select ProductName, Quantity, Quantity*Price as total from product natural left join cartitem where CustomerID = ?';
        const [row] = await connection.execute(getitemquery, [id]);

        return Response.json(row, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
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
