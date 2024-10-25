import { NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { pool } from '@/sharedCode/dbconnect';

interface ProductDetails {
    ProductName: string;
    Price: number;
    AvailableStock: number;
    PrimaryImage: string;
}

export async function GET(req: NextRequest, {params}: {params: {id: string}}) {
    try {
        const connection = await pool.getConnection();

        const retrieveQuery = 'SELECT ProductName, Price, AvailableStock, PrimaryImage FROM product WHERE ProductID = ?';
        const [rows] = await connection.execute<mysql.RowDataPacket[]>(retrieveQuery, [params.id]);

        const product: ProductDetails = rows[0] as ProductDetails;

        connection.release();

        return new Response(JSON.stringify(product), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to get product details:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}