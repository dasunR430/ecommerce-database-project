import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { pool } from '@/sharedCode/dbconnect';


interface Purchase{
    OrderID: number;
    orderedDate: string;
    ProductName: string;
    Price: number;
}

export async function POST(req: NextRequest) {
    // const token = await getToken({ req });
    const requestBody = await req.json();

    const id = requestBody.id;
    let connection =null;

    try {
        connection = await pool.getConnection();

        const retriveQuery = 'CALL GetCustomerPurchases(?)';
        const [rows] = await connection.execute<mysql.RowDataPacket[]>(retriveQuery, [id]);

        const purchases: Purchase[] = rows as Purchase[];

        // console.log(purchases);

        
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
    }finally{
        connection?.release();
    }
}