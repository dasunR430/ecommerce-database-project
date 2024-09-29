'use client'

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
    const [searchInput, setSearchInput] = useState('');
    const [filteredProduct, setFilteredProduct] = useState<SearchKey[]>([]);
    const [availableProducts, setAvailableProducts] = useState<SearchKey[] | undefined>(undefined);

    // Handle input change
    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const query = e.target.value;
        setSearchInput(query);

        // Filter the names based on the query
        if (query.trim() === '') {
            setFilteredProduct([]); // Show nothing names if input is empty
        } else {
            const matchingProducts = availableProducts?.filter((available_product) =>
                available_product.ProductTitle.toLowerCase().includes(query.trim().toLowerCase())
            );
            setFilteredProduct(matchingProducts as SearchKey[]);
        }
    };

    const fetchProcducts = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/searchproducts`);
            if (response.status !== 200)
                throw Error("response not ok!!")
            else {
                const data : response = await response.json();
                setAvailableProducts(data.available_products);
            }
        }
        catch (error) {
            console.log(error)
        }
    }

    const handleOnFocus: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        if (availableProducts === undefined) {
            fetchProcducts();
        }
    };


    return (
        <>
            <div className="flex flex-grow w-9 relative items-center mx-2">
                <input
                    type="text"
                    placeholder="Search Products..."
                    value={searchInput}
                    onChange={handleSearch}
                    onFocus={handleOnFocus}
                    className="flex-grow p-2 rounded-l focus:outline-none text-black"
                />
                <button className="p-2 bg-white rounded-r border-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                </button>
                {/* Display matching names */}
                <div className='absolute top-full max-h-40 w-64 overflow-y-auto bg-white text-black z-10'> {/* Set a height here */}
                    <ul className="">
                        {filteredProduct.map((product) => (
                            <li key={product.ProductID} className="p-2 border-b border-gray-200">
                                {product.ProductTitle}
                            </li>
                        ))}
                        {filteredProduct.length === 0 && searchInput.trim() !== '' && (
                            <li className="p-2 text-black">No matches found</li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SearchComponent;