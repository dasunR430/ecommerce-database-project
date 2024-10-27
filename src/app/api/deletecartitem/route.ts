import { NextRequest } from "next/server";
import { pool } from '@/sharedCode/dbconnect';

export async function DELETE(req: NextRequest) {
    try {
        const requestBody = await req.json();
        const { sku, id } = requestBody;

        // Input validation
        if (!sku || !id) {
            return new Response(
                JSON.stringify({ 
                    message: 'Missing required fields: SKU and customer ID are required' 
                }), {
                    status: 400,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        const connection = await pool.getConnection();

        try {
            // First check if the item exists
            const [checkResult] = await connection.execute(
                'SELECT * FROM cartitem WHERE CustomerID = ? AND sku = ?',
                [id, sku]
            );

            // TypeScript type assertion for the result
            if (!Array.isArray(checkResult) || checkResult.length === 0) {
                return new Response(
                    JSON.stringify({ 
                        message: 'Item not found in cart' 
                    }), {
                        status: 404,
                        headers: { 'Content-Type': 'application/json' },
                    }
                );
            }

            // Proceed with deletion
            const [deleteResult] = await connection.execute(
                `DELETE FROM cartitem 
                 WHERE CustomerID = ? 
                 AND sku = ?`,
                [id, sku]
            );

            return new Response(
                JSON.stringify({ 
                    message: 'Item deleted successfully',
                    success: true
                }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                }
            );

        } finally {
            // Always release the connection
            connection.release();
        }

    } catch (error) {
        console.error('Failed to delete item:', error);
        
        // Determine if it's a client error or server error
        const isClientError = error instanceof Error && 
            (error.message.includes('invalid input') || 
             error.message.includes('constraint violation'));

        return new Response(
            JSON.stringify({ 
                message: isClientError 
                    ? 'Invalid request data' 
                    : 'Internal server error',
                error: isClientError 
                    ? error.message 
                    : 'An unexpected error occurred'
            }), {
                status: isClientError ? 400 : 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}