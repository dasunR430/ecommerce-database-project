import { RowDataPacket } from "mysql2/promise";
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
    const conn = await pool.getConnection();
    try {
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