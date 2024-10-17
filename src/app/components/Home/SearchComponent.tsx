'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { ReactEventHandler, useState } from 'react';

interface suggestion {
    ProductTitle: string[]
}

interface response {
    status: number;
    message?: string;
    suggestions: suggestion[];
}

const SearchComponent: React.FC = () => {
    // State for search input and filteredProduct
    const router = useRouter();
    const [searchInput, setSearchInput] = useState('');
    const [properQuery, setProperQuery] = useState('');
    const [filteredProduct, setFilteredProduct] = useState<suggestion[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [message, setMessage] = useState<string | undefined>();

    // Handle input change
    const handleOnChange: React.ChangeEventHandler<HTMLInputElement> = async (e) => {

        const query = e.target.value;
        setSearchInput(query);

        // Normalize the query by trimming and replacing multiple spaces with a single space
        const trimmedQuery = query.trim().replace(/\s+/g, ' ')
        setProperQuery(trimmedQuery);

        // Filter the names based on the query
        if (trimmedQuery === '') {
            setFilteredProduct([]); // Show nothing names if input is empty
        } else {
            await fetchSearchTerms(trimmedQuery) as unknown as response;
        }
    };

    const handleSearch = () => {
        // Filter the names based on the query
        if (properQuery === '') {
            // do nothing
        } else {
            router.push(`/filter?search=${searchInput}`);
            setSearchInput(searchInput);
        }
    };

    const fetchSearchTerms = async (query: string) => {
        let data: response | null = null;
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/searchterms`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ query: query })
                }
            );
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
                setFilteredProduct(data?.suggestions as suggestion[]);
            }
        }
        catch (error) {
            setMessage(data?.message as string);
            console.log("Error in catch ", message)
        }
    }

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
                        onFocus={() => setShowDropdown(true)}
                        onBlur={() => setTimeout(() => setShowDropdown(false), 100)}
                        className="flex-grow p-2 rounded-l focus:outline-none focus:bg-gray-300 text-black"
                    />
                    <button onClick={handleSearch} className="p-2 bg-gray-300 rounded-r border-gray-300">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="black" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                        </svg>
                    </button>
                    {/* Display matching names */}
                    {showDropdown &&
                        <div className='absolute top-full max-h-40 w-full overflow-y-auto bg-gray-200 rounded rounded-b-lg text-black z-10'> {/* Set a height here */}
                            {searchInput !== '' &&
                                <ul className="border-black">
                                    {filteredProduct?.map((suggestion, id) => (
                                        <Link href={`/filter?search=${suggestion.ProductTitle}`}>
                                            <li key={id} className="p-2 border-b border-gray-200 hover:bg-gray-400">
                                                <div>
                                                    {suggestion.ProductTitle}
                                                </div>
                                            </li>
                                        </Link>
                                    ))}
                                    {filteredProduct?.length === 0 && searchInput.trim() !== '' && (
                                        <li className="p-2 text-black">No matches found</li>
                                    )}
                                </ul>
                            }
                        </div>
                    }
                </div>
            </>
        );
    }
};

export default SearchComponent;