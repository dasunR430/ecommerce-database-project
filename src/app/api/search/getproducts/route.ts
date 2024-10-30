import { RowDataPacket } from "mysql2/promise";
import { pool } from "../../../../sharedCode/dbconnect";
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
    totalProducts: number;
    maxPrice : number;
}

interface body {
    search : string;
    subCategories : number[];
    min : number;
    max : number;
    page : number;
    productperpage : number;
    isAscending : boolean;
}

export async function POST(req: any) {
    const conn = await pool.getConnection();
    console.log("reached search/getproducts api")
    try {
        const { search, subCategories, min, max , page, productperpage, isAscending} : body = await req.json();
        console.log("route max", typeof max);
        let limit :number = productperpage; // products per page 
        let matching_products_query: string;
        let matching_products_result: RowDataPacket[];
        let orderby = isAscending ? 'ASC' : 'DESC';

        console.log(search?.length);

        if ((search === '' ||  search === undefined) && subCategories.length === 0) {
            matching_products_query = `SELECT SQL_CALC_FOUND_ROWS DISTINCT b.ProductID, b.ProductTitle, b.BasePrice, b.PrimaryImage FROM BaseProduct b WHERE BasePrice BETWEEN ? AND ? ORDER BY b.BasePrice ${orderby} LIMIT ? OFFSET ?`;
            [matching_products_result] = await conn.execute<RowDataPacket[]>(matching_products_query, [min,max, `${limit}`, `${(page-1)*limit}`]);
            console.log(matching_products_query);
        }
        else if ((search === '' ||  search === undefined) && subCategories.length != 0) {
            matching_products_query = `SELECT SQL_CALC_FOUND_ROWS DISTINCT b.ProductID, b.ProductTitle, b.BasePrice, b.PrimaryImage FROM BaseProduct b JOIN ProductSubcategory s ON b.ProductID = s.ProductID WHERE s.subCategoryID IN (${subCategories.map(() => '?').join(', ')}) AND b.BasePrice BETWEEN ? AND ? ORDER BY b.BasePrice ${orderby} LIMIT ? OFFSET ? `;
            [matching_products_result] = await conn.execute<RowDataPacket[]>(matching_products_query, [...subCategories, min, max, `${limit}`, `${(page-1)*limit}`]);
        }
        else if (search.length <= 2 && subCategories.length == 0) {
            matching_products_query = `SELECT SQL_CALC_FOUND_ROWS DISTINCT b.ProductID, b.ProductTitle, b.BasePrice, b.PrimaryImage FROM BaseProduct b WHERE ProductTitle LIKE ? AND BasePrice BETWEEN ? AND ? ORDER BY b.BasePrice ${orderby} LIMIT ? OFFSET ?`;
            [matching_products_result] = await conn.execute<RowDataPacket[]>(matching_products_query, [`${search}%`, min, max, `${limit}`, `${(page-1)*limit}`]);
        }
        else if (search.length <= 2 && subCategories.length != 0) {
            matching_products_query = `SELECT SQL_CALC_FOUND_ROWS DISTINCT b.ProductID, b.ProductTitle, b.BasePrice, b.PrimaryImage FROM BaseProduct b JOIN ProductSubcategory s ON b.ProductID = s.ProductID WHERE b.ProductTitle LIKE ? AND s.subCategoryID IN (${subCategories.map(() => '?').join(', ')}) AND b.BasePrice BETWEEN ? AND ? ORDER BY b.BasePrice ${orderby} LIMIT ? OFFSET ?`;
            [matching_products_result] = await conn.execute<RowDataPacket[]>(matching_products_query, [`${search}%`, ...subCategories, min, max, `${limit}`, `${(page-1)*limit}`]);
        }
        else if (search != '' && subCategories.length == 0) {
            matching_products_query = `SELECT SQL_CALC_FOUND_ROWS DISTINCT b.ProductID, b.ProductTitle, b.BasePrice, b.PrimaryImage FROM BaseProduct b WHERE MATCH(ProductTitle, Description) AGAINST(?) AND BasePrice BETWEEN ? AND ? ORDER BY b.BasePrice ${orderby} LIMIT ? OFFSET ?`;
            console.log(matching_products_query);
            console.log([`${search}`, min, max, `${limit}`, `${(page-1)*limit}`]);
            [matching_products_result] = await conn.execute<RowDataPacket[]>(matching_products_query, [`${search}`, min, max, `${limit}`, `${(page-1)*limit}`]);
        }
        else {
            matching_products_query = `SELECT SQL_CALC_FOUND_ROWS DISTINCT b.ProductID, b.ProductTitle, b.BasePrice, b.PrimaryImage FROM BaseProduct b JOIN ProductSubcategory s ON b.ProductID = s.ProductID WHERE MATCH(b.ProductTitle, b.Description) AGAINST(?) AND s.subCategoryID IN (${subCategories.map(() => '?').join(', ')}) AND b.BasePrice BETWEEN ? AND ? ORDER BY b.BasePrice ${orderby} LIMIT ? OFFSET ?`;
            [matching_products_result] = await conn.execute<RowDataPacket[]>(matching_products_query, [`${search}`, ...subCategories, min, max, `${limit}`, `${(page-1)*limit}`]);
        }

        console.log("matching_products_query :", matching_products_query);
        console.log("subCategories :", subCategories);
        // Fetch total count of filtered products without LIMIT
        const [totalResult] = await conn.execute<RowDataPacket[]>('SELECT FOUND_ROWS() AS total');
        const totalProducts = totalResult[0].total;

        const data: response = {
            status: 200,
            message: "success",
            matching_products: matching_products_result as Product[],
            totalProducts : totalProducts,
            maxPrice : 500_000
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


// Using full text- search
// if ((search === '' ||  search === undefined) && subCategories.length === 0) {
//     matching_products_query = `SELECT ProductID, ProductTitle, BasePrice, PrimaryImage FROM BaseProduct`;
//     [matching_products_result] = await conn.execute<RowDataPacket[]>(matching_products_query);
// }
// else if ((search === '' ||  search === undefined) && subCategories.length != 0) {
//     matching_products_query = `SELECT b.ProductID, ProductTitle, BasePrice, PrimaryImage FROM BaseProduct b JOIN ProductSubcategory s ON b.ProductID = s.ProductID WHERE s.subCategoryID IN (${subCategories.map(() => '?').join(', ')})`;
//     [matching_products_result] = await conn.execute<RowDataPacket[]>(matching_products_query, [search, ...subCategories]);
// }
// else if (search != '' && subCategories.length == 0) {
//     matching_products_query = `SELECT ProductID, ProductTitle, BasePrice, PrimaryImage FROM BaseProduct WHERE MATCH(ProductTitle) AGAINST(? IN BOOLEAN MODE)`;
//     [matching_products_result] = await conn.execute<RowDataPacket[]>(matching_products_query, [search]);
// }
// else {
//     matching_products_query = `SELECT b.ProductID, ProductTitle, BasePrice, PrimaryImage FROM BaseProduct b JOIN ProductSubcategory s ON b.ProductID = s.ProductID WHERE MATCH(b.ProductTitle) AGAINST(? IN BOOLEAN MODE) AND s.subCategoryID IN (${subCategories.map(() => '?').join(', ')})`;
//     [matching_products_result] = await conn.execute<RowDataPacket[]>(matching_products_query, [search, ...subCategories]);
// }