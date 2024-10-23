import { getToken } from "next-auth/jwt";
import { NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { pool } from '@/sharedCode/dbconnect';


interface ContactDetails {
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    District: string;
    PostalCode: string;
}

export async function POST(req: NextRequest) {
    // const token = await getToken({ req });

    const requestBody = await req.json();

    const id = requestBody.id;

    try {
        const connection = await pool.getConnection();

        const retriveQuery = 'SELECT AddressLine1,AddressLine2,City,District,PostalCode from contactdetails WHERE CustomerID = ?';
        const [rows] = await connection.execute<mysql.RowDataPacket[]>(retriveQuery, [id]);

        const contacts: ContactDetails[] = rows as ContactDetails[];

        connection.release();

        // console.log(purchases);

        return new Response(JSON.stringify(contacts), {
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