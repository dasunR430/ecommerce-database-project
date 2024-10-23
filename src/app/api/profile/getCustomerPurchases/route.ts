import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { pool } from '@/sharedCode/dbconnect';


interface Purchase{
    OrderID: number;
    orderDate: string;
    ProductName: string;
    Price: number;
}

export async function POST(req: NextRequest) {
    // const token = await getToken({ req });

    const requestBody = await req.json();

    const id = requestBody.id;

    try {
        const connection = await pool.getConnection();

        const retriveQuery = 'CALL GetCustomerPurchases(?)';
        const [rows] = await connection.execute<mysql.RowDataPacket[]>(retriveQuery, [id]);

        const purchases: Purchase[] = rows as Purchase[];

        connection.release();

        // console.log(purchases);

        return new Response(JSON.stringify(purchases), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to get customer purchases:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}