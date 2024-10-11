'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactEventHandler, useState } from 'react';

interface SearchKey {
    ProductID: number;
    ProductTitle: string;
}

interface response {
    status: number;
    message?: string;
    available_products: SearchKey[];
}

const SearchComponent: React.FC = () => {
    // State for search input and filteredProduct
    const router = useRouter();
    const [searchInput, setSearchInput] = useState('');
    const [properQuery, setProperQuery] = useState('');
    const [filteredProduct, setFilteredProduct] = useState<SearchKey[]>([]);
    const [availableProducts, setAvailableProducts] = useState<SearchKey[] | undefined>(undefined);
    const [message, setMessage] = useState<string | undefined>();

    // Handle input change
    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const query = e.target.value;
        setSearchInput(query);

        // Normalize the query by trimming and replacing multiple spaces with a single space
        const trimmedQuery = query.trim().replace(/\s+/g, ' ')
        setProperQuery(trimmedQuery);

        // Filter the names based on the query
        if (trimmedQuery === '') {
            setFilteredProduct([]); // Show nothing names if input is empty
        } else {
            const matchingProducts = availableProducts?.filter((available_product) =>
                available_product.ProductTitle.toLowerCase().includes(query.trim().toLowerCase())
            );
            setFilteredProduct(matchingProducts as SearchKey[]);
        }
    };

    const handleSearch = () => {
        // Filter the names based on the query
        if (properQuery === '') {
            // do nothing
        } else {
            router.push(`/filter?search=${searchInput}`);
            setSearchInput('');
        }
    };

    const fetchProcducts = async () => {
        let data: response | null = null;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/searchproducts`);
            data = await response.json();
            console.log("Data : ", data);
            if (data?.status === 500) {
                // setMessage(data?.message);
                console.log("Erorr in if 500 : ", data?.message)
            }
            else if (data?.status === 503) {
                // setMessage(data?.message);
                console.log("Erorr in if 503 : ", data?.message)
            }
            else {
                setAvailableProducts(data?.available_products);
            }
        }
        catch (error) {
            setMessage(data?.message as string);
            console.log("Error in catch ", message)
        }
    }

    const handleOnFocus: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (availableProducts === undefined) {
            fetchProcducts();
        }
    };

    if (message) {
        return (
            <>{message}</>
        );
    }
    else {
        return (
            <>
                <div className="flex flex-grow relative items-center mx-2">
                    <input
                        type="text"
                        placeholder="Search Products..."
                        value={searchInput}
                        onChange={handleOnChange}
                        onFocus={handleOnFocus}
                        className="flex-grow p-2 rounded-l focus:outline-none text-black"
                    />
                    <button onClick={handleSearch} className="p-2 bg-white rounded-r border-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                    {/* Display matching names */}
                    <div className='absolute top-full max-h-40 w-64 overflow-y-auto bg-white text-black z-10'> {/* Set a height here */}
                        {searchInput !== '' &&
                            <ul className="">
                                {filteredProduct?.map((product) => (
                                    <li key={product.ProductID} className="p-2 border-b border-gray-200">
                                        {/* TODO: change link to productdetails page */}
                                        <Link href={`/filter?search=${product.ProductTitle}`}>
                                            <div>
                                                {product.ProductTitle}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                                {filteredProduct?.length === 0 && searchInput.trim() !== '' && (
                                    <li className="p-2 text-black">No matches found</li>
                                )}
                            </ul>
                        }
                    </div>
                </div>
            </>
        );
    }
};

export default SearchComponent;