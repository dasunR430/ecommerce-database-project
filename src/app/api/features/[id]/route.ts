import { RowDataPacket } from "mysql2/promise";
import { pool } from "@/sharedCode/dbconnect"; // Ensure this path is correct
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    const conn = await pool.getConnection();

    try {
        // Call the stored procedure
        const query = `SELECT p.SKU, pa.AttributeID, pa.AttributeValue, p.Price 
                        FROM product AS p 
                        LEFT OUTER JOIN productattribute AS pa ON p.SKU = pa.SKU 
                        WHERE p.ProductID = ? 
                        ORDER BY p.SKU`;

        const values = [params.id];

        // Execute the stored procedure
        const [rows] = await conn.execute<RowDataPacket[]>(query, values);

        // Stored procedures often return results within an array, so access the first element
        const result = rows; 

        interface GroupedItem {
            attributes: { AttributeID: string; AttributeValue: string }[];
            Price: number;
        }
        
        const groupedBySKU = result.reduce((acc: { [key: string]: GroupedItem }, item) => {
            const { SKU, AttributeID, AttributeValue, Price } = item;
        
            // Check if the SKU already exists in the accumulator
            if (!acc[SKU]) {
                // Initialize the entry with an empty attributes array and set the Price
                acc[SKU] = { attributes: [], Price: Price };
            }
        
            // Push the attribute to the attributes array
            acc[SKU].attributes.push({ AttributeID, AttributeValue });
        
            return acc;
        }, {});

        console.log(groupedBySKU);


        return NextResponse.json(groupedBySKU, {
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
