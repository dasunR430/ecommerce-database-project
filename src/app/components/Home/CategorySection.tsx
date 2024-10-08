import Link from 'next/link';
import React from 'react';

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

const CategorySection: React.FC = async () => {
    
    const fetchProcducts = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/getcategories`);
            if (response.status !== 200)
                throw Error("response not ok!!")
            else {
                const data : response = await response.json();
                return data.categories;
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    let categories : Category[] | undefined = await fetchProcducts();

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Categories</h2>
            <div className="">
                <ul className="mt-2">
                    {categories?.map((category) => (
                        category.subCategories.map((subCategory) => (
                            <Link href={`/category/${category.name.toLowerCase()}/${subCategory.SubCategoryName.toLowerCase()}`}>
                                <li key={subCategory.SubCategoryID} className="p-4 m-2 hover:bg-gray-100 text-gray-700 inline-block shadow-md rounded-md border border-gray-200 hover:text-blue-600 cursor-pointer">
                                    {subCategory.SubCategoryName}
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