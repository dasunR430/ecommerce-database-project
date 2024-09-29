import { RowDataPacket } from "mysql2/promise";
import { pool } from "../../dbconnect";
// TODO : Write correct logic for get recommened_products and trending_products
interface Product {
    ProductID: number;
    ProductTitle: string;
    BasePrice: number;
    PrimaryImage: string; // URL to the product image
}

interface response {
    status: number;
    message?: string;
    recommened_products: Product[];
    trending_products: Product[];
}

export async function GET(req: any) {
    const conn = await pool.getConnection();
    try {
        const query = `SELECT ProductID, ProductTitle, BasePrice, PrimaryImage FROM BaseProduct`;
        const [result, fields] = await conn.execute<RowDataPacket[]>(query);
        const data: response = {
            status: 200,
            message: "success",
            recommened_products: result as Product[],
            trending_products: result as Product[],
        }

        const myHeader = new Headers();
        myHeader.append('Content-Type', 'application/json')
        const response: Response = new Response(JSON.stringify(data), {
            status: 200,
            statusText: "okay",
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