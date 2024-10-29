import { PoolConnection, RowDataPacket } from "mysql2/promise";
import { pool } from "../../../../sharedCode/dbconnect";
// TODO : Write correct logic for get recommened_products and trending_products

interface MainCategory {
    MainCategoryID: number;
    MainCategoryName: string;
    MainCategoryImageURL : string;
}

interface SubCategory {
    SubCategoryID: number;
    SubCategoryName: string;
    MainCategoryID: number;
}

interface Category {
    id: number;
    name: string;
    image : string;
    subCategories: SubCategory[];
}

interface response {
    status: number;
    message?: string;
    categories: Category[];
}

export async function GET(req: any) {
    console.log("No error so far")
    let conn : PoolConnection | null = null;
    try {
        conn = await pool.getConnection();
        const main_category_query = `SELECT * FROM MainCategory`;
        
        const sub_category_query = `SELECT * FROM SubCategory`;
        const [main_category_result] = await conn.execute<RowDataPacket[]>(main_category_query);
        const [sub_category_result] = await conn.execute<RowDataPacket[]>(sub_category_query);

        let formated_categories: Category[] = [];
        const main_categories = main_category_result as MainCategory[];
        const sub_categories = sub_category_result as SubCategory[];

        main_categories.map((main_category: MainCategory) => {
            formated_categories.push(
                {
                    id: main_category.MainCategoryID,
                    name: main_category.MainCategoryName,
                    image : main_category.MainCategoryImageURL,
                    subCategories: []
                }
            )
        })

        sub_categories.map((sub_category: SubCategory) => {
            let index = formated_categories.findIndex((formated_category) => formated_category.id == sub_category.MainCategoryID)
            formated_categories[index].subCategories.push(sub_category)
        })

        const data: response = {
            status: 200,
            message: "success",
            categories: formated_categories
        }
        console.log(formated_categories);
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