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

        const getitemquery = 'select count(*) from cartitem where CustomerID = ?';
        const [rows] = await connection.execute<mysql.RowDataPacket[]>(getitemquery, [id]);

        const result = (rows[0] as { 'count(*)': number })['count(*)'];
        return Response.json(result, {
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
