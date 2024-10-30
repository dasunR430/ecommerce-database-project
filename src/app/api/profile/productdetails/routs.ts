import { NextRequest } from "next/server";
import mysql from 'mysql2/promise';
import  {pool} from '@/sharedCode/dbconnect';


interface ContactDetails {
    ProductName: string;
    Price: number;
    AvailableStock: number;
    PrimaryImage: string;
}

export async function POST(req: NextRequest) {
    // const token = await getToken({ req });

    const requestBody = await req.json();

    let connection = null;
    try {
        connection = await pool.getConnection();

        const retriveQuery =`SELECT ProductName, Price, AvailableStock, PrimaryImage FROM product WHERE ProductID = 14`;
        const [rows] = await connection.execute<mysql.RowDataPacket[]>(retriveQuery);

        const contacts: ContactDetails[] = rows as ContactDetails[];

        
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
    }finally{
        connection?.release();
    }
}