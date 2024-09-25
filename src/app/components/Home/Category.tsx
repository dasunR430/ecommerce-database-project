// src/components/Category.tsx
import Link from 'next/link';
import React from 'react';

interface SubCategory {
    id: number;
    name: string;
}

interface Category {
    id: number;
    name: string;
    subCategories: SubCategory[];
}

const categories: Category[] = [
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

const CategoryComponent: React.FC = () => {
    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                {categories.map((category) => (
                    <div key={category.id} className="border rounded-lg p-4 bg-white shadow-md">
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
    );
};

export default CategoryComponent;