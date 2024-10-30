import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { pool } from "../../../../sharedCode/dbconnect";

interface Brand {
    BrandID: number;
    BrandName: string;
}
interface response {
    status: number;
    message?: string;
    Brands: Brand[];
}

export async function GET(req: any) {
    console.log("No error so far")
    let conn : PoolConnection | null = null;
    try {
        conn = await pool.getConnection();
        const brand_query = `SELECT * FROM Brand`;
        
        const [brand_result] = await conn.execute<RowDataPacket[]>(brand_query);
        const brands = brand_result as Brand[]

        const data: response = {
            status: 200,
            message: "success",
            Brands: brands
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
        // console.log(error)
        return new Response(JSON.stringify({status : 500, message: 'Internal Server Error'}), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
    finally {
        if(conn){
            pool.releaseConnection(conn);
        }  
    }
}