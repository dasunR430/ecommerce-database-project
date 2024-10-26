"use client";
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

interface ProductDetails {
    ProductID: number;
    ProductTitle: string;
    BrandID: string;
    Description: string;
    BasePrice: number;
    Weight: number;
    PrimaryImage: string;
    Availability: string;
}

export default function ProductDetailsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const id = searchParams.get('id');

    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count > 0 ? count - 1 : 0);

    useEffect(() => {
        if (id) {
            fetchProductDetails();
        }
    }, [id]);

    const fetchProductDetails = async () => {
        try {
            const res = await fetch(`/api/home/getproducts/${id}`);
            const data = await res.json();
            setProduct(data.result[0]); // Adjust based on your API response structure
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    if (!product) return <p>Loading...</p>;

    return (
        <div className="bg-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-200 mb-4 shadow-lg">
                            <img className="w-full h-full object-cover rounded-lg" src={product.PrimaryImage} alt={product.ProductTitle} />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <button onClick={decrement} className="flex items-center justify-center w-12 h-12 bg-blue-900 text-white rounded-sm hover:bg-blue-800 transition duration-300">
                                    <svg width="12" height="4" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z" fill="#FFFFFF"/>
                                    </svg>
                                </button>
                                <span className="text-xl text-black bg-gray-100 px-8 py-3 rounded-sm border border-gray-400 shadow-sm">{count}</span>
                                <button onClick={increment} className="flex items-center justify-center w-12 h-12 bg-blue-900 text-white rounded-sm hover:bg-blue-800 transition duration-300">
                                    <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z" fill="#FFFFFF"/>
                                    </svg>
                                </button>
                            </div>
                            <button className="w-1/2 bg-blue-900 text-white py-3 px-6 rounded-full font-bold hover:bg-blue-800 shadow-lg transition duration-300">Add to Cart</button>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-3xl font-bold text-black mb-4">{product.ProductTitle}</h2>
                        <p className="text-gray-600 text-sm mb-6">{product.Description}</p>
                        <div className="flex mb-6">
                            <div className="mr-4">
                                <span className="font-bold text-gray-800">Price:</span>
                                <span className="text-gray-600 ml-2">${product.BasePrice}</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-800">Availability:</span>
                                <span className="text-gray-600 ml-2">{product.Availability}</span>
                            </div>
                        </div>
                        {/* Add color, size, and description sections as needed */}
                    </div>
                </div>
            </div>
        </div>
    );
}
