import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { pool } from "../../../sharedCode/dbconnect";
import { NextResponse } from "next/server";

// This function handles GET requests to fetch product details
export default async function GET(req: Request) {
    let conn: PoolConnection | null = null;

    try {
        // Get a connection from the pool
        conn = await pool.getConnection();

        // Query to fetch product details by ProductID
        const productQuery = `SELECT ProductName, Price, AvailableStock, PrimaryImage FROM product WHERE ProductID = 14`;

        // Execute the query and store the results
        const [product_result] = await conn.execute<RowDataPacket[]>(productQuery);

        // Prepare the response data
        const data = {
            status: 200,
            message: "success",
            product: product_result, // This should be an array of product objects
        };

        // Return the response as JSON
        return NextResponse.json(data); 
    } catch (error) {
        console.error("Database query error:", error);
        
        // Return an error response
        return NextResponse.json({
            status: 500,
            message: "Internal Server Error",
        });
    } finally {
        // Ensure the connection is released back to the pool
        if (conn) conn.release();
    }
}
