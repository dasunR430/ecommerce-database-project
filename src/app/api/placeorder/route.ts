import mysql from 'mysql2/promise';
import { NextRequest } from 'next/server';
import { pool } from '@/sharedCode/dbconnect';

export async function POST(req: NextRequest) {
    const requestBody = await req.json();
    const id = requestBody.id;
    const BillingAddressLine1 = requestBody.BillingAddressLine1;
    const BillingAddressLine2 = requestBody.BillingAddressLine2;
    const BillingCity = requestBody.BillingCity;
    const BillingDistrict = requestBody.BillingDistrict;
    const BillingPostalCode = requestBody.BillingPostalCode;
    const Email = requestBody.Email;
    const PhoneNumber = requestBody.PhoneNumber;
    const DeliveryMethod = requestBody.DeliveryMethod;
    const PaymentMethod = requestBody.PaymentMethod;
    const NetTotal = requestBody.NetTotal;

    console.log('Request body:', requestBody);
    let connection;
        try {
            connection = await pool.getConnection();
            const insertQuery = 'CALL PlaceOrder(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
            
            // Call the stored procedure
            await connection.execute(insertQuery, [
                id,
                BillingAddressLine1,
                BillingAddressLine2,
                BillingCity,
                BillingDistrict,
                BillingPostalCode,
                Email,
                PhoneNumber,
                DeliveryMethod,
                PaymentMethod,
                NetTotal,
            ]);

            return new Response(JSON.stringify({ message: 'Order placed successfully' }), {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            });
        } catch (error) {
            console.error('Failed to place order:', error);

            return new Response(JSON.stringify({ error: 'Failed to place order' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
        finally {
            if (connection) connection.release();
        }
}