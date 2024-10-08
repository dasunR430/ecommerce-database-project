import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { pool } from "../../dbconnect";

interface SearchKey {
    ProductID: number;
    ProductTitle: string;
}
interface response {
    status: number;
    message?: string;
    available_products: SearchKey[];
}

export async function GET(req: any) {
    let conn: PoolConnection | null = null;
    try {
        conn = await pool.getConnection();
        const available_products_query = `SELECT ProductID, ProductTitle FROM BaseProduct`;
        const [available_products_result] = await conn.execute<RowDataPacket[]>(available_products_query);
        // TODO : handle when available_products_result is empty
        const data: response = {
            status: 200,
            message: "success",
            available_products: available_products_result as SearchKey[],
        }

        const myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json')
        const response: Response = new Response(JSON.stringify(data), {
            status: 200,
            headers: myHeader,
        })
        return response;
    }
    catch (error: any) {
        console.log("this is fateal : ", error)
        if (error.code === 'ECONNREFUSED') {
            console.error('Database server is down:', error.message);
            return new Response(JSON.stringify({ status: 503, message: 'Database server is down, please try again later.' }), {
                status: 503,
                headers: { 'Content-Type': 'application/json' },
            });
        } else {
            console.error('An unexpected error occurred:', error.message);
            return new Response(JSON.stringify({ status: 500, message: 'Internal Server Erorr, please try again later.' }), {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    }
    finally {
        if (conn) {
            pool.releaseConnection(conn);
        }
    }
}