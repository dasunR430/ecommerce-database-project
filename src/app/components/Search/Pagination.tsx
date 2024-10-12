'use client'
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface PaginationProps {
    totalCount: number;
    currentPage: number;
    limit: number;
}

const Pagination: React.FC<PaginationProps> = ({ totalCount, currentPage, limit }) => {
    const [page, setPage] = useState<number>(currentPage);
    const router = useRouter();
    const totalPages = Math.ceil(totalCount / limit);

    const handlePageChange = (page: number) => {
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete('page');
        currentUrl.searchParams.append('page', `${page}`)
        router.push(currentUrl.toString());
        setPage(page);
    };

    return (
        <div className="flex justify-center items-center my-4">
            <button 
                onClick={() => handlePageChange(page - 1)}
                className={`px-4 py-2 border rounded ${page <= 1 ? 'text-gray-400 pointer-events-none' : 'text-black hover:bg-gray-300'}`} 
                disabled={page <= 1}
            >
                Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, index) => (
                <button 
                    key={index} 
                    onClick={() => handlePageChange(index + 1)} 
                    className={`mx-2 px-4 py-2 border rounded ${page === index + 1 ? 'bg-black text-white' : 'text-red-800 hover:bg-gray-300'}`}
                >
                    {index + 1}
                </button>
            ))}

            <button 
                onClick={() => handlePageChange(page + 1)} 
                className={`px-4 py-2 border rounded ${page >= totalPages ? 'text-gray-400 pointer-events-none' : 'text-black hover:bg-gray-300'}`} 
                disabled={page >= totalPages}
            >
                Next
            </button>
        </div>
    );
};

export default Pagination;
