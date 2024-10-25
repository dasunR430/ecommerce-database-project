import mysql from 'mysql2/promise';
import bcrypt from 'bcrypt';
import { NextRequest } from 'next/server';
import { pool } from '@/sharedCode/dbconnect';

interface Customer {
    Email: string;
    Password: string;
    CustomerName: string;
}

export async function POST(req: NextRequest) {
    try {
        // Parse request body
        const connection = await pool.getConnection();

        const insertQuery = 'UPDATE employee SET Password = ? WHERE EmployeeID = ?';
        const getQuery = 'SELECT Password FROM Employee WHERE EmployeeID = ?';
        let psswrd: string;
        for (let i = 1; i <= 5; i++) {
            const [rows] = await connection.execute<mysql.RowDataPacket[]>(getQuery, [i]);
            psswrd = rows[0].Password;
            const hashPassword = await bcrypt.hash(psswrd, 10);
            await connection.execute<mysql.RowDataPacket[]>(insertQuery,[hashPassword,i]);

        }
        return new Response(JSON.stringify({ message: 'User added successfully' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
