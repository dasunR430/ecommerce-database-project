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
        const { email, password, name, phoneNumber } =await req.json();

        // Validate input
        if (!email || !password) {
            return new Response(JSON.stringify({ message: 'Email and password are required' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        // Create MySQL connection
        const connection = await pool.getConnection();

        // Check if email already exists
        const retriveQuery = 'SELECT * FROM customer WHERE email = ?';
        const [rows] = await connection.execute<mysql.ResultSetHeader>(retriveQuery, [email]);

        // console.log(rows);

        if (rows.length > 0) {
            // console.log('Email already in use');
            return new Response(JSON.stringify({ message: 'Email already in use' }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            const insertQuery = 'CALL addNewCustomer(?, ?, ?, ?)';
            const hashPassword = await bcrypt.hash(password, 10);
            await connection.execute(insertQuery, [name, email, hashPassword,phoneNumber]);
            return new Response(JSON.stringify({ message: 'User added successfully' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });


            //// Hash the password and insert new user
            // const insertQuery = 'INSERT INTO customer (Email, Password, CustomerName) VALUES (?, ?, ?)';
            // const hashPassword = await bcrypt.hash(password, 10);
            // await connection.execute(insertQuery, [email, hashPassword, name]);
            // return new Response(JSON.stringify({ message: 'User added successfully' }), {
            //     status: 200,
            //     headers: { 'Content-Type': 'application/json' },
            // });
        }
    } catch (error) {
        console.error('Database error:', error);
        return new Response(JSON.stringify({ message: 'Internal server error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
