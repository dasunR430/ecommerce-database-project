import { RowDataPacket } from "mysql2/promise";
import { pool } from "../../../../sharedCode/dbconnect";
// TODO : Write correct logic for get recommened_products and trending_products
interface Product {
    ProductID: number;
    ProductTitle: string;
    BasePrice: number;
    PrimaryImage: string; // URL to the product image
}
interface SearchKey {
    ProductID: number;
    ProductTitle: string;
}
interface response {
    status: number;
    message?: string;
    recommened_products: Product[];
    trending_products: Product[];
    available_products: SearchKey[];
}

export async function GET(req: any) {
    const conn = await pool.getConnection();
    try {
        const trending_query = `SELECT ProductID, ProductTitle, BasePrice, PrimaryImage FROM BaseProduct`;
        const available_products_query = `SELECT ProductID, ProductTitle FROM BaseProduct`;
        const [trending_products_result] = await conn.execute<RowDataPacket[]>(trending_query);
        const [available_products_result] = await conn.execute<RowDataPacket[]>(available_products_query);
        const data: response = {
            status: 200,
            message: "success",
            recommened_products: trending_products_result as Product[],
            trending_products: trending_products_result as Product[],
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