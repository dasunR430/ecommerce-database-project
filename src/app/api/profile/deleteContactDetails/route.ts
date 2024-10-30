import { NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import { pool } from '@/sharedCode/dbconnect';

export async function DELETE(req: NextRequest) {
    const requestBody = await req.json();
    const AddressID = requestBody.contactId;

    
    if (!AddressID) {
        return new Response(JSON.stringify({ message: 'AddressID is required' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    
    let connection = null;
    try {
        connection = await pool.getConnection();

        const deleteQuery = 'DELETE FROM contactdetails WHERE AddressID = ?';
        await connection.execute(deleteQuery, [AddressID]);

        
        return new Response(JSON.stringify({ message: 'Contact details deleted successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Failed to delete contact details:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }finally{
        connection?.release();
    }
}
