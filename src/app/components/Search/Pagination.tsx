'use client'
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';

interface PaginationProps {
    totalCount: number;
    limit: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalCount, limit }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const page = searchParams.get('page') ?? 1
    const totalPages = Math.ceil(totalCount / limit);

  

    const handlePageChange = (page: number) => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete('page');
        currentUrl.searchParams.append('page', `${page}`)
        router.push(currentUrl.toString());
    };

    return (
        <div className="flex justify-center items-center my-4">
            <button 
                onClick={() => handlePageChange(Number(page) - 1)}
                className={`px-4 py-2 border rounded ${Number(page) <= 1 ? 'text-gray-400 pointer-events-none' : 'text-black hover:bg-gray-300'}`} 
                disabled={Number(page) <= 1}
            >
                Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, index) => (
                <button 
                    key={index} 
                    onClick={() => handlePageChange(index + 1)} 
                    className={`mx-2 px-4 py-2 border rounded ${Number(page) === index + 1 ? 'bg-black text-white' : 'text-red-800 hover:bg-gray-300'}`}
                >
                    {index + 1}
                </button>
            ))}

            <button 
                onClick={() => handlePageChange(Number(page) + 1)} 
                className={`px-4 py-2 border rounded ${Number(page) >= totalPages ? 'text-gray-400 pointer-events-none' : 'text-black hover:bg-gray-300'}`} 
                disabled={Number(page) >= totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
