'use client'
import Link from 'next/link';
import React, { useState } from 'react';

interface SubCategory {
    SubCategoryID: number;
    SubCategoryName: string;
    MainCategoryID: number;
}

interface Category {
    id: number;
    name: string;
    subCategories: SubCategory[];
}
interface response {
    status: number;
    message?: string;
    categories: Category[];
}

const CategoryFilter: React.FC = () => {
    const [isHovered, setIsHovered] = useState(false);
    const [categories, setCategories] = useState<Category[] | undefined>(undefined);

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/getcategories`);
            if (response.status !== 200)
                throw Error("response not ok!!")
            else {
                const data : response = await response.json();
                setCategories(data.categories);
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    const handleOnHover = () => {
        if (categories === undefined) {
            fetchCategories();
        }
        setIsHovered(true)
    };

    return (
        <>
            <div className="flex relative items-center" onMouseEnter={handleOnHover} onMouseLeave={() => setIsHovered(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mr-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
                </svg>
                categories

                {isHovered && (
                    <div className="p-5 absolute top-full left-0 bg-white text-black z-10 shadow-lg rounded-lg w-64 overflow-auto">
                        <div className="grid grid-cols-1 gap-4">
                            {categories?.map((category) => (
                                <div key={category.id} className="">
                                    <h3 className="text-xl font-semibold">{category.name}</h3>
                                    <ul className="mt-2">
                                        {category.subCategories.map((subCategory) => (
                                            <li key={subCategory.SubCategoryID} className="text-gray-700 hover:text-blue-600 cursor-pointer">
                                                <Link href={`/category/${category.name.toLowerCase()}/${subCategory.SubCategoryName.toLowerCase()}`}>
                                                    {subCategory.SubCategoryName}
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