import { RowDataPacket } from "mysql2/promise";
import { pool } from "../../../../sharedCode/dbconnect";

interface Address {
    CustomerID: number;
    CustomerName: string; // New field
    AddressLine1: string;
    AddressLine2: string;
    City: string;
    District: string;
    PostalCode: string;
    PhoneNumber: string;
}

export async function GET(req: Request) {
    const url = new URL(req.url);
    const customerId = url.searchParams.get("customer_id");

    if (!customerId) {
        return new Response(JSON.stringify({ message: "Customer ID is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const conn = await pool.getConnection();
    try {
        const query = `CALL GetCustomerAddresses(?)`;
        const [result] = await conn.execute<RowDataPacket[]>(query, [customerId]);

        // Sending the entire result array, assuming result[0] is an array of address objects
        return new Response(JSON.stringify(result[0]), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ message: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        pool.releaseConnection(conn);
    }
}
