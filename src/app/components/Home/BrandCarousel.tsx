import React from 'react';

interface Brand {
    BrandID: number;
    BrandName: string;
}
interface response {
    status: number;
    message?: string;
    Brands: Brand[];
}

interface BrandCarousel {
    divId: string;
}

const BrandCarousel: React.FC<BrandCarousel> = async ({divId}) => {
    const fetchProducts = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/home/getbrands`);
            if (response.status !== 200) throw new Error("Response not ok!");
            const data: response = await response.json();
            return data.Brands;
        } catch (error) {
            console.error(error);
            return [];
        }
    };

    let brands: Brand[] = await fetchProducts();

    // Duplicate brands for seamless scrolling
    const duplicatedBrands = [...brands, ...brands];

    return (
        <div id={divId} className="relative overflow-hidden bg-gray-100 py-4">
            <div className="flex animate-scroll space-x-8">
                {duplicatedBrands.map((brand) => (
                    <div
                        key={brand.BrandID}
                        className="text-2xl font-semibold whitespace-nowrap text-gray-600"
                    >
                        {brand.BrandName}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BrandCarousel;
