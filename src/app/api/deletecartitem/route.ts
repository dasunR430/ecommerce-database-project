import { NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { pool } from '@/sharedCode/dbconnect';

export async function DELETE(req: NextRequest) {
    const requestBody = await req.json();
    const productName = requestBody.productName;

    try {
        const connection = await pool.getConnection();

        const deleteQuery = 'delete from cartitem where SKU in (select SKU from product where productName = ?)';
        await connection.execute(deleteQuery, [productName]);

        connection.release();

        return new Response(JSON.stringify({ message: 'Item deleted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to delete  item:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
