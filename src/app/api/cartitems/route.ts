// src/pages/api/cart/getCartItems.js

import { pool } from "../../../sharedCode/dbconnect"; // Adjust the path as necessary

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const customerID = searchParams.get("customerID");

    if (!customerID) {
        return new Response(JSON.stringify({ error: "CustomerID is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const conn = await pool.getConnection();

    try {
        // Call the stored procedure
        const [rows] = await conn.query("CALL GetCartItems(?)", [customerID]);

        // Extracting results
        const responseData = rows[0].map(item => ({
            ProductName: item.ProductName,
            SKU: item.SKU,
            Quantity: item.Quantity,
            UnitPrice: item.UnitPrice,
            NetPrice: item.NetPrice,
        }));

        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        conn.release();
    }
}
