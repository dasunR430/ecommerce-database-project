import mysql, { RowDataPacket } from 'mysql2/promise';
import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { pool } from '@/sharedCode/dbconnect';
import bcrypt from 'bcrypt';
import { AdapterUser } from 'next-auth/adapters';

interface User {
  Email: string;
  Password: string;
  CustomerID: string;
}


export const authOptions: NextAuthOptions = {
  secret: process.env.SECRET,
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
            'SELECT * FROM customer WHERE Email = ?',
            [credentials.email]
          );

          const users = rows as User[];
          const user = users[0];
          // console.log(user);

          // If no user is found or password is undefined
          if (!user || !user.Password) {
            console.error('Invalid email or password');
            return null;
          }

          // Check if the provided password matches the hashed password in the database
          const isPasswordValid = await bcrypt.compare(credentials.password, user.Password);
          if (isPasswordValid) {
            // Return user object without password
            return { email: user.Email, id: user.CustomerID } ;
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
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.email = token.email as string;
        // Cast to any to bypass the type error
        (session.user as any).id = token.id as string;
      }
      return session;
    },
  },
  
};
