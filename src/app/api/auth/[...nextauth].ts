import NextAuth from 'next-auth'; 
import CredentialsProvider from 'next-auth/providers/credentials';
import { pool } from '../dbconnect'; // Assuming this is a valid pool connection
import { RowDataPacket } from 'mysql2';

const bcrypt = require('bcrypt');

interface User {
    email: string;
    password: string;
}

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials) {
                if (!credentials) {
                    return null;
                }

                const { email, password } = credentials;

                let conn;
                try {
                    // Get a connection from the pool
                    conn = await pool.getConnection();

                    // Query the user from the database
                    const query = 'SELECT email, password FROM customers WHERE email = ?';
                    const [rows] = await conn.execute<RowDataPacket[]>(query, [email]);
                    const users = rows as User[];

                    console.log("User :", users);
                    const user = users[0];

                    // Check if user exists
                    if (!user) {
                        return null;
                    }

                    // Compare the password with the stored hashed password
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    if (!passwordMatch) {
                        return null;
                    }

                    // Return user object
                    return user as User;
                } catch (error) {
                    console.error("Error during authorization:", error);
                    return null;
                } finally {
                    if (conn) conn.release();  // Release the connection
                }
            }
        })
    ],
    pages: {
        signIn: '/pages/auth/page',
    }
};

const handler = NextAuth(authOptions);
