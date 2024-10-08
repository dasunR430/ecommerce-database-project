import { RowDataPacket } from "mysql2/promise";
import { pool } from "../../dbconnect";
// TODO : Write correct logic for get recommened_products
interface Product {
    ProductID: number;
    ProductTitle: string;
    BasePrice: number;
    PrimaryImage: string; // URL to the product image
}
interface response {
    status: number;
    message?: string;
    matching_products: Product[];
}

export async function POST(req: any) {
    const conn = await pool.getConnection();
    try {
        const { search, subCategories } = await req.json();

        // const matching_products_query = `SELECT ProductID, ProductTitle, BasePrice, PrimaryImage FROM BaseProduct WHERE ProductTitle LIKE ?`;
        let matching_products_query: string;
        let matching_products_result: RowDataPacket[];
        if ((search === '' ||  search === undefined) && subCategories.length === 0) {
            matching_products_query = `SELECT ProductID, ProductTitle, BasePrice, PrimaryImage FROM BaseProduct`;
            [matching_products_result] = await conn.execute<RowDataPacket[]>(matching_products_query);
        }
        else if ((search === '' ||  search === undefined) && subCategories.length != 0) {
            matching_products_query = `SELECT b.ProductID, ProductTitle, BasePrice, PrimaryImage FROM BaseProduct b JOIN ProductSubcategory s ON b.ProductID = s.ProductID WHERE s.subCategoryID IN (${subCategories.map(() => '?').join(', ')})`;
            [matching_products_result] = await conn.execute<RowDataPacket[]>(matching_products_query, [`%${search}%`, ...subCategories]);
        }
        else if (search != '' && subCategories.length == 0) {
            matching_products_query = `SELECT ProductID, ProductTitle, BasePrice, PrimaryImage FROM BaseProduct WHERE ProductTitle LIKE ?`;
            [matching_products_result] = await conn.execute<RowDataPacket[]>(matching_products_query, [`%${search}%`]);
        }
        else {
            matching_products_query = `SELECT b.ProductID, ProductTitle, BasePrice, PrimaryImage FROM BaseProduct b JOIN ProductSubcategory s ON b.ProductID = s.ProductID WHERE b.ProductTitle LIKE ? AND s.subCategoryID IN (${subCategories.map(() => '?').join(', ')})`;
            [matching_products_result] = await conn.execute<RowDataPacket[]>(matching_products_query, [`%${search}%`, ...subCategories]);
        }

        console.log("matching_products_query :", matching_products_query);
        console.log("subCategories :", subCategories);


        const data: response = {
            status: 200,
            message: "success",
            matching_products: matching_products_result as Product[],
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

// SELECT b.ProductID, ProductTitle, BasePrice, PrimaryImage FROM BaseProduct b JOIN ProductSubcategory s ON b.ProductID = s.ProductID WHERE b.ProductTitle LIKE "%sa%" AND s.subCategoryID IN (1,2,3);