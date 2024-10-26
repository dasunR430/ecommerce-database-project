import { pool } from "../../../sharedCode/dbconnect";

export async function GET(req) {
    const { searchParams } = new URL(req.url);
    const orderID = searchParams.get("orderID");

    if (!orderID) {
        return new Response(JSON.stringify({ error: "OrderID is required" }), {
            status: 400,
            headers: { "Content-Type": "application/json" },
        });
    }

    const conn = await pool.getConnection();

    try {
        // Call the stored procedure
        const [orderSummary] = await conn.query(
            "CALL GetOrderSummary(?)",
            [orderID]
        );

        // Extracting results
        const purchasedItems = orderSummary[0];
        const summary = orderSummary[1][0];

        const responseData = {
            purchasedItems: purchasedItems.map((item) => ({
                SKU: item.SKU,
                ProductName: item.ProductName,
                Quantity: item.Quantity,
                Price: item.Price,
                ExpectedDeliveryDate: item.ExpectedDeliveryDate,
                SubTotal: item.SubTotal,
            })),
            NetTotal: summary.NetTotal,
            MaxDeliveryDate: summary.MaxDeliveryDate,
        };

        return new Response(JSON.stringify(responseData), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: "Internal Server Error" }), {
            status: 500,
            headers: { "Content-Type": "application/json" },
        });
    } finally {
        conn.release();
    }
}
