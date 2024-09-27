import Link from 'next/link';
import React from 'react';

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

const CategorySection: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="">
                <ul className="mt-2">
                    {categories.map((category) => (
                        category.subCategories.map((subCategory) => (
                            <Link href={`/category/${category.name.toLowerCase()}/${subCategory.name.toLowerCase()}`}>
                                <li key={subCategory.id} className="p-4 m-2 hover:bg-gray-100 text-gray-700 inline-block shadow-md rounded-md border border-gray-200 hover:text-blue-600 cursor-pointer">
                                    {subCategory.name}
                                </li>
                            </Link>
                        ))
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategorySection;