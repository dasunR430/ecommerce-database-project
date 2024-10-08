import mysql, { RowDataPacket } from 'mysql2/promise';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { pool } from '@/sharedCode/dbconnect';
import bcrypt from 'bcrypt';

interface User {
  Email: string;
  Password: string;
}

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/Login",  // Custom sign-in page
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          console.error('Missing email or password');
          return null;
        }

        let connection;
        try {
          // Get a connection from the pool
          connection = await pool.getConnection();

          // Query the database for the user with the provided email
          const [rows] = await connection.execute<RowDataPacket[]>(
            'SELECT * FROM customer WHERE email = ?',
            [credentials.email]
          );

          // console.log('Rows fetched from DB:', rows);

          const users = rows as User[];
          const user = users[0];

          // If no user is found or password is undefined
          if (!user || !user.Password) {
            console.error('Invalid email or password');
            return null;
          }

          // Check if the provided password matches the hashed password in the database
          const isPasswordValid = await bcrypt.compare(credentials.password, user.Password);
          if (isPasswordValid) {
            // console.log('User authenticated successfully:', user.Email);
            // Return user object without password
            return { email: user.Email };
          } else {
            console.error('Invalid password for user:', user.Email);
            return null;
          }
        } catch (error) {
          console.error('Error authorizing user:', error);
          return null;
        } finally {
          if (connection) {
            connection.release();  // Properly release the connection back to the pool
          }
        }
      },
    }),
  ],
  // session and callbacks remain unchanged
};