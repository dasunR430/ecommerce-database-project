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

interface AttributeFilterProps {
    selectedSubCategoryIds: number[]
}

const AttributeFilter: React.FC<AttributeFilterProps> = (props) => {
    const [showCategoryFilter, setShowCategoryFilter] = useState(true);

    const { selectedSubCategoryIds } = props;
    const subCategoryRecord: Record<number, boolean> = selectedSubCategoryIds.reduce((acc, id) => {
        acc[id.valueOf()] = true;
        return acc;
    }, {} as Record<number, boolean>);

    const router = useRouter();
    const [categories, setCategories] = useState<Category[]>([]);
    const [selectedCategoryRecord, setSelectedCategoryRecord] = useState<Record<number, boolean>>({});
    const [selectedSubCategoryRecord, setSelectedSubCategoryRecord] = useState<Record<number, boolean>>(subCategoryRecord);

    const recordTOArray = (record: Record<number, boolean>) => {
        // Object.entries returns an array of key-value pairs.
        // Filter where the value (isSelected) is true.
        const array = Object.entries(record)
            .filter(([id, isSelected]) => isSelected) // Keep only selected ones
            .map(([id]) => Number(id)); // Extract and convert keys to numbers

        return array;
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
    const mainHandle = (categoryId: number, subCategories: SubCategory[], selectedSubCategoryIds: number[]) => {
        const currentUrl = new URL(window.location.href);
        const isCategorySelected = selectedCategoryRecord[categoryId];

        // Toggle main category selection
        setSelectedCategoryRecord((prev) => ({
            ...prev,
            [categoryId]: !isCategorySelected
        }));

        // Toggle all subcategories of this category
        const newSubCategoriesState: Record<number, boolean> = {};
        subCategories.forEach((subCategory) => {
            newSubCategoriesState[subCategory.SubCategoryID] = !isCategorySelected;
        });

        setSelectedSubCategoryRecord((prev) => ({
            ...prev,
            ...newSubCategoriesState
        }));


        // const selectedSubCategoryIds: number[] = getSelectedSubCategories();
        if (isCategorySelected) {
            // delete subcatagories form the array
            subCategories.map((subcategory) => {
                const index = selectedSubCategoryIds.indexOf(subcategory.SubCategoryID);
                if (index > -1) { // only splice array when item is found
                    selectedSubCategoryIds.splice(index, 1); // 2nd parameter means remove one item only
                }
            })
            currentUrl.searchParams.delete('maincategory');
            const selectedCategoryIds = recordTOArray(selectedCategoryRecord);
            selectedCategoryIds.forEach((id) => currentUrl.searchParams.append('subcategory', `${id}`))
        }
        else {
            // add sub categories to array
            subCategories.map((subcategory) => {
                selectedSubCategoryIds.push(subcategory.SubCategoryID)
            })
            currentUrl.searchParams.delete('maincategory');
            const selectedCategoryIds = recordTOArray(selectedCategoryRecord);
            selectedCategoryIds.forEach((id) => currentUrl.searchParams.append('subcategory', `${id}`))
        }

        currentUrl.searchParams.delete('subcategory');
        selectedSubCategoryIds.forEach((id) => currentUrl.searchParams.append('subcategory', `${id}`));
        router.push(currentUrl.toString());


    };

    // Handle selecting/deselecting a subcategory
    const subHandle = (subCategoryId: number, subCategory: SubCategory) => {
        setSelectedSubCategoryRecord((prev) => ({
            ...prev,
            [subCategoryId]: !prev[subCategoryId]
        }));

        let areAllSubCategoriesSelected: boolean;
        // Check if all subcategories of the main category are now selected
        const selectedSubCategoryIds: number[] = recordTOArray(selectedSubCategoryRecord);

        if (selectedSubCategoryRecord[subCategoryId]) {
            // when uncheck a subcategory
            areAllSubCategoriesSelected = categories.find(cat => cat.id === subCategory.MainCategoryID).subCategories
                .every(subCategory => selectedSubCategoryRecord[subCategory.SubCategoryID] || subCategory.SubCategoryID === subCategoryId ? false : false);

            const index = selectedSubCategoryIds.indexOf(subCategoryId);
            if (index > -1) { // only splice array when item is found
                selectedSubCategoryIds.splice(index, 1); // 2nd parameter means remove one item only
            }
        }
        else {
            // when check a subcategory
            areAllSubCategoriesSelected = categories.find(cat => cat.id === subCategory.MainCategoryID).subCategories
                .every(subCategory => selectedSubCategoryRecord[subCategory.SubCategoryID] || subCategory.SubCategoryID === subCategoryId);
            selectedSubCategoryIds.push(subCategoryId)
        }

        // If all subcategories are selected, select the main category, otherwise deselect it
        setSelectedCategoryRecord((prev) => ({
            ...prev,
            [subCategory.MainCategoryID]: areAllSubCategoriesSelected
        }));

        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete('subcategory');
        selectedSubCategoryIds.forEach((id) => currentUrl.searchParams.append('subcategory', `${id}`));
        router.push(currentUrl.toString());
    };

    return (
        <>
            <div className="relative mb-4 m-2">
                {/* Dropdown Button */}
                <button
                    onClick={() => setShowCategoryFilter(!showCategoryFilter)}
                    className="bg-white text-red-800 border border-red-800 py-2 px-4 rounded w-full flex justify-between items-center hover:bg-red-800 hover:text-white transition-colors duration-300"
                >
                    Attribute Filter
                    {showCategoryFilter ? (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                        </svg>

                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                        </svg>

                    )}
                </button>

                {/* Dropdown Content */}
                <div
                    className={`transition-all duration-300 ease-in-out overflow-y-scroll ${showCategoryFilter ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                        } bg-gray-100 rounded mt-2 shadow-md`}
                >
                    <div className="p-2">
                        <div className="flex relative items-center">
                            <div className="p-5 top-full left-0 bg-white text-black z-10 shadow-lg rounded-lg w-full">
                                <div className="grid grid-cols-1 gap-4">
                                    {categories?.map((category) => (
                                        <div key={category.id} className="">
                                            <div className="flex items-center">
                                                <input
                                                    type="checkbox"
                                                    id={`category-${category.id}`}
                                                    className="mr-2"
                                                    checked={selectedCategoryRecord[category.id] || false}
                                                    onChange={() => mainHandle(category.id, category.subCategories, recordTOArray(selectedSubCategoryRecord))}
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
                                                            checked={selectedSubCategoryRecord[subCategory.SubCategoryID] || false}
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default AttributeFilter;