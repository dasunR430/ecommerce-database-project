import { RowDataPacket } from "mysql2/promise";
import { pool } from "../../../../sharedCode/dbconnect";

interface response {
    status: number;
    message: string;
}

export async function POST(req: any) {
    const conn = await pool.getConnection();
    try {
        const {productID} = await req.json();
        const incrementing_query = `INSERT INTO ClickCount (ProductID) VALUES (?) ON DUPLICATE KEY UPDATE ClickDate = VALUES(ClickDate),  Count = Count + 1;`;
        const [incrementing_query_result] = await conn.execute<RowDataPacket[]>(incrementing_query, [productID]);
        const data: response = {
            status: 200,
            message: "success",
        }

        const myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json')
        const response: Response = new Response(JSON.stringify(data), {
            status: 200,
            headers: myHeader,
        })   
        return response;
    }
    catch (error) {
        console.log(error)
        return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    finally {
        pool.releaseConnection(conn);
    }
}