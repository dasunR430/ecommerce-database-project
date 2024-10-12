'use client'
import Link from 'next/link';
import React, { useState } from 'react';

interface SubCategory {
    id: number;
    name: string;
}

interface MainCategory {
    id: number;
    name: string;
    subCategories: SubCategory[];
}

const categories: MainCategory[] = [
    {
        id: 1,
        name: 'Electronics',
        subCategories: [
            { id: 1, name: 'Mobile Phones' },
            { id: 2, name: 'Laptops' },
            { id: 3, name: 'Televisions' },
        ],
    },
    {
        id: 2,
        name: 'Toys',
        subCategories: [
            { id: 4, name: 'Action Figures' },
            { id: 5, name: 'Board Games' },
            { id: 6, name: 'Dolls' },
        ],
    },
];

const CategoryFilter: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <>
            <div className="flex relative items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
                categories

                {isHovered && (
                    <div className="p-4 absolute top-full left-0 bg-white text-black z-10 shadow-lg rounded-lg w-64 overflow-auto">
                        <h2 className="text-2xl font-bold mb-4">Categories</h2>
                        <div className="grid grid-cols-1 gap-4">
                            {categories.map((category) => (
                                <div key={category.id} className="">
                                    <h3 className="text-xl font-semibold">{category.name}</h3>
                                    <ul className="mt-2">
                                        {category.subCategories.map((subCategory) => (
                                            <li key={subCategory.id} className="text-gray-700 hover:text-blue-600 cursor-pointer">
                                                <Link href={`/category/${category.name.toLowerCase()}/${subCategory.name.toLowerCase()}`}>
                                                    {subCategory.name}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )
                }
            </div>
        </>
    );
};

export default CategoryFilter;