import { pool } from "../../../sharedCode/dbconnect"; // Adjust the path as necessary

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const cityName = searchParams.get("cityName");

    if (!cityName) {
        return new Response(JSON.stringify({ error: "CityName is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const conn = await pool.getConnection();

    try {
        // Call the stored procedure and get the CityExists result
        const [rows] = await conn.query("CALL CheckMainCity(?)", [cityName]);

        // Extract the result
        const cityExists = rows[0][0].CityExists;

        return new Response(JSON.stringify({ cityExists: Boolean(cityExists) }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Error fetching city existence:", error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        conn.release();
    }
}
