'use client'
import {useRouter} from 'next/navigation';
import React, { useEffect, useState } from 'react';

interface SubCategory {
    SubCategoryID: number;
    SubCategoryName: string;
    MainCategoryID: number;
}

interface Category {
    id: number;
    name: string;
    image: string;
    subCategories: SubCategory[];
}
interface response {
    status: number;
    message?: string;
    categories: Category[];
}

interface CategorySectionProps {
    divId: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ divId }) => {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[] | undefined>()
    const fetchProcducts = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/getmaincategories`);
            if (response.status !== 200)
                throw Error("response not ok!!")
            else {
                const data: response = await response.json();
                setCategories(data.categories);
            }
        }
        catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        fetchProcducts();
    }, [])
    

    const handleCategoryClick = (subCategories: SubCategory[]) => {
        const subCategoryParams = subCategories.map((sub) => `subcategory=${sub.SubCategoryID}`).join('&');
        router.push(`/filter?${subCategoryParams}`);
    };

    return (
        <section id = {divId} className="py-12 bg-gray-100">
            <div className="container mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Shop by Category</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categories?.map((category : Category) => (
                        category.subCategories.length != 0 && (<div
                            key={category.id}
                            className="relative group overflow-hidden rounded-lg shadow-lg cursor-pointer"
                            onClick={() => handleCategoryClick(category.subCategories)}
                        >
                            <img
                                src={category.image}
                                alt={category.name}
                                className="w-full h-48 object-cover transition-transform duration-300 transform group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            <div className="absolute bottom-0 p-4 text-white">
                                <h3 className="text-lg font-semibold">{category.name}</h3>
                                <ul className="mt-2 space-y-1">
                                    {category.subCategories.map((sub : SubCategory) => (
                                        <li key={sub.SubCategoryID} className="text-sm">
                                            {sub.SubCategoryName}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>)
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CategorySection;


        // <div id={divId} className="p-4">
        //     <h2 className="text-2xl font-bold mb-4">Categories</h2>
        //     <div className="">
        //         <ul className="mt-2">
        //             {categories?.map((category) => (
        //                 category.subCategories.map((subCategory) => (
        //                     <Link href={`/filter?subcategory=${subCategory.SubCategoryID}`}>
        //                         <li key={subCategory.SubCategoryID} className="p-4 m-2 hover:bg-gray-100 text-gray-700 inline-block shadow-md rounded-md border border-gray-200 hover:text-blue-600 cursor-pointer">
        //                             {subCategory.SubCategoryName}
        //                         </li>
        //                     </Link>
        //                 ))
        //             ))}
        //         </ul>
        //     </div>
        // </div>