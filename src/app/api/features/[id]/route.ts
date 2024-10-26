import { RowDataPacket } from "mysql2/promise";
import { pool } from "@/sharedCode/dbconnect"; // Ensure this path is correct
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const conn = await pool.getConnection();

    try {
        // Call the stored procedure
        const query = `select * from product where ProductID = ?`;
        const values = [params.id];

        // Execute the stored procedure
        const [rows] = await conn.execute<RowDataPacket[]>(query, values);

        // Stored procedures often return results within an array, so access the first element
        const result = rows; 

        console.log("result", result);

        const details = {
            result: result
        };
    
        console.log("details", details);

        return NextResponse.json(details, {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    catch (error) {
        console.log("Database error:", error);
        return NextResponse.json({ message: 'Internal Server Error' }, {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
    finally {
        pool.releaseConnection(conn);
    }
}
