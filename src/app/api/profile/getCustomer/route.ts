import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { pool } from '@/sharedCode/dbconnect';


interface Customer{
    CustomerName: string;
    PhoneNumber: string;
}

export async function POST(req: NextRequest) {
    // const token = await getToken({ req });

    const requestBody = await req.json();

    const email = requestBody.email;

    let connection = null;

    try {
        connection = await pool.getConnection();

        const retriveQuery = 'SELECT CustomerName, PhoneNumber FROM customer WHERE Email = ?';
        const [rows] = await connection.execute<mysql.RowDataPacket[]>(retriveQuery, [email]);

        const customer: Customer = rows[0] as Customer;

        
        // console.log(purchases);
        
        return new Response(JSON.stringify(customer), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to get customer purchases:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }finally{
        connection?.release();
    }
}