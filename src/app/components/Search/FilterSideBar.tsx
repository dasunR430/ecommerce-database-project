'use client'
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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

const FilterSideBar: React.FC = () => {
    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Record<number, boolean>>({});
    const [selectedSubCategories, setSelectedSubCategories] = useState<Record<number, boolean>>({});

    const getSelectedSubCategories = () => {
        // Object.entries returns an array of key-value pairs.
        // Filter where the value (isSelected) is true.
        const selectedSubCategoryIds = Object.entries(selectedSubCategories)
            .filter(([subCategoryId, isSelected]) => isSelected) // Keep only selected ones
            .map(([subCategoryId]) => Number(subCategoryId)); // Extract and convert keys to numbers
    
        return selectedSubCategoryIds;
    };

    const fetchCategories = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/getcategories`);
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
    if (categories?.length === 0)
        fetchCategories();

    // Handle selecting/deselecting a main category
    const mainHandle = (categoryId: number, subCategories: SubCategory[]) => {
        const isCategorySelected = selectedCategories[categoryId];

        // Toggle main category selection
        setSelectedCategories((prev) => ({
            ...prev,
            [categoryId]: !isCategorySelected
        }));

        // Toggle all subcategories of this category
        const newSubCategoriesState : Record<number, boolean>= {};
        subCategories.forEach((subCategory) => {
            newSubCategoriesState[subCategory.SubCategoryID] = !isCategorySelected;
        });

        setSelectedSubCategories((prev) => ({
            ...prev,
            ...newSubCategoriesState
        }));


        const selectedSubCategoryIds : number[]= getSelectedSubCategories();
        if(isCategorySelected) {
            // delete subcatagories form the array
            subCategories.map((subcategory)=> {
                const index = selectedSubCategoryIds.indexOf(subcategory.SubCategoryID);
                if (index > -1) { // only splice array when item is found
                    selectedSubCategoryIds.splice(index, 1); // 2nd parameter means remove one item only
                }
            })
        }
        else {
            // add sub categories to array
            subCategories.map((subcategory)=> {
                selectedSubCategoryIds.push(subcategory.SubCategoryID)
            })
        }
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete('subcategory');
        selectedSubCategoryIds.forEach((id) => currentUrl.searchParams.append('subcategory', `${id}`));
        router.push(currentUrl.toString());
    };

    // Handle selecting/deselecting a subcategory
    const subHandle = (subCategoryId: number, subCategory: SubCategory) => {
        setSelectedSubCategories((prev) => ({
            ...prev,
            [subCategoryId]: !prev[subCategoryId]
        }));

        let areAllSubCategoriesSelected: boolean;
        // Check if all subcategories of the main category are now selected
        const selectedSubCategoryIds : number[]= getSelectedSubCategories();

        if(selectedSubCategories[subCategoryId]) {
            areAllSubCategoriesSelected = categories.find(cat => cat.id === subCategory.MainCategoryID).subCategories
            .every(subCategory => selectedSubCategories[subCategory.SubCategoryID] || subCategory.SubCategoryID === subCategoryId ? false : false);
            
            const index = selectedSubCategoryIds.indexOf(subCategoryId);
            if (index > -1) { // only splice array when item is found
                selectedSubCategoryIds.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
        else {
            areAllSubCategoriesSelected = categories.find(cat => cat.id === subCategory.MainCategoryID).subCategories
            .every(subCategory => selectedSubCategories[subCategory.SubCategoryID] || subCategory.SubCategoryID === subCategoryId);
            selectedSubCategoryIds.push(subCategoryId)
        }

        // If all subcategories are selected, select the main category, otherwise deselect it
        setSelectedCategories((prev) => ({
            ...prev,
            [subCategory.MainCategoryID]: areAllSubCategoriesSelected
        }));

        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete('subcategory');
        selectedSubCategoryIds.forEach((id) => currentUrl.searchParams.append('subcategory', `${id}`));
        router.push(currentUrl.toString());
    };


    // const mainHandle = async (MainCategoryID: number) => {
    //     const currentUrl = new URL(window.location.href);
    //     currentUrl.searchParams.set('maincategory', `${MainCategoryID}`);
    //     router.push(currentUrl.toString());
    // }
    // const subHandle = async (SubCategoryID: number) => {
    //     const currentUrl = new URL(window.location.href);
    //     currentUrl.searchParams.set('subcategory', `${SubCategoryID}`);
    //     router.push(currentUrl.toString());
    // }

    return (
        <>
            <div className="flex relative items-center">
                <div className="p-5 top-full left-0 bg-white text-black z-10 shadow-lg rounded-lg w-64">
                    <div className="grid grid-cols-1 gap-4">
                        {categories?.map((category) => (
                            <div key={category.id} className="">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`category-${category.id}`}
                                        className="mr-2"
                                        checked={selectedCategories[category.id] || false}
                                        onChange={() => mainHandle(category.id, category.subCategories)}
                                    />
                                    <label htmlFor={`category-${category.id}`} className="text-xl font-semibold cursor-pointer">
                                        {category.name}
                                    </label>
                                </div>
                                <ul className="mt-2 pl-4">
                                    {category.subCategories.map((subCategory) => (
                                        <li key={subCategory.SubCategoryID} className="flex items-center mt-1">
                                            <input
                                                type="checkbox"
                                                id={`subcategory-${subCategory.SubCategoryID}`}
                                                className="mr-2"
                                                checked={selectedSubCategories[subCategory.SubCategoryID] || false}
                                                onChange={() => subHandle(subCategory.SubCategoryID, subCategory)}
                                            />
                                            <label
                                                htmlFor={`subcategory-${subCategory.SubCategoryID}`}
                                                className="text-gray-700 cursor-pointer"
                                            >
                                                {subCategory.SubCategoryName}
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </>
    );
};

export default FilterSideBar;

{/* <div className="flex relative items-center">
                <div className="p-5 top-full left-0 bg-white text-black z-10 shadow-lg rounded-lg w-64">
                    <div className="grid grid-cols-1 gap-4">
                        {categories?.map((category) => (
                            <div key={category.id} className="">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id={`category-${category.id}`}
                                        className="mr-2"
                                        onChange={() => mainHandle(category.id)}
                                    />
                                    <label htmlFor={`category-${category.id}`} className="text-xl font-semibold cursor-pointer">
                                        {category.name}
                                    </label>
                                </div>
                                <ul className="mt-2 pl-4">
                                    {category.subCategories.map((subCategory) => (
                                        <li key={subCategory.SubCategoryID} className="flex items-center mt-1">
                                            <input
                                                type="checkbox"
                                                id={`subcategory-${subCategory.SubCategoryID}`}
                                                className="mr-2"
                                                onChange={() => subHandle(subCategory.SubCategoryID)}
                                            />
                                            <label
                                                htmlFor={`subcategory-${subCategory.SubCategoryID}`}
                                                className="text-gray-700 cursor-pointer"
                                            >
                                                <Link
                                                    href={`/category/${category.name.toLowerCase()}/${subCategory.SubCategoryName.toLowerCase()}`}
                                                    className="hover:text-blue-600"
                                                >
                                                    {subCategory.SubCategoryName}
                                                </Link>
                                            </label>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div> */}