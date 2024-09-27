'use client'
import React, { ReactEventHandler, useState } from 'react';

const SearchComponent = () => {
    // Sample list of names
    const namesList = ['Alice', 'Bob', 'Charlie', 'David', 'Eve', 'Frank', 'Grace'];

    // State for search input and filtered names
    const [searchInput, setSearchInput] = useState('');
    const [filteredNames, setFilteredNames] = useState<string[]>([]);

    // Handle input change
    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const query = e.target.value;
        setSearchInput(query);

        // Filter the names based on the query
        if (query === '') {
            setFilteredNames([]); // Show nothing names if input is empty
        } else {
            const matchingNames = namesList.filter((name) =>
                name.toLowerCase().includes(query.toLowerCase())
            );
            setFilteredNames(matchingNames);
        }
    };

    return (
        <>
            <div className="flex flex-grow relative items-center mx-6">
                <input
                    type="text"
                    placeholder="Search names..."
                    value={searchInput}
                    onChange={handleSearch}
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
                        {filteredNames.map((name, index) => (
                            <li key={index} className="p-2 border-b border-gray-200">
                                {name}
                            </li>
                        ))}
                        {filteredNames.length === 0 && searchInput !== '' && (
                            <li className="p-2 text-white">No matches found</li>
                        )}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default SearchComponent;
