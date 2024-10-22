import {pool} from '@/sharedCode/dbconnect';


export async function GET(req: any) {
    const connection = pool.getConnection();
}