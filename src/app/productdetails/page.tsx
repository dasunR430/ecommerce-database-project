"use client";
import { useState } from 'react';

export default function ProductDetailsPage() {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count > 0 ? count - 1 : 0);

    return (
        <div className="bg-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-200 mb-4 shadow-lg">
                            <img className="w-full h-full object-cover rounded-lg" src="https://cdn.pixabay.com/photo/2020/05/22/17/53/mockup-5206355_960_720.jpg" alt="Product Image" />
                        </div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-3">
                                <button onClick={decrement} className="flex items-center justify-center w-12 h-12 bg-blue-900 text-white rounded-sm hover:bg-blue-800 transition duration-300">
                                    <svg width="12" height="4" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                        <defs>
                                            <path d="M11.357 3.332A.641.641 0 0 0 12 2.69V.643A.641.641 0 0 0 11.357 0H.643A.641.641 0 0 0 0 .643v2.046c0 .357.287.643.643.643h10.714Z" id="a"/>
                                        </defs>
                                        <use fill="#FFFFFF" fillRule="nonzero" xlinkHref="#a"/>
                                    </svg>
                                </button>


                                <span className="text-xl text-black bg-gray-100 px-8 py-3 rounded-sm border border-gray-400 shadow-sm">{count}</span>
                                <button onClick={increment} className="flex items-center justify-center w-12 h-12 bg-blue-900 text-white rounded-sm hover:bg-blue-800 transition duration-300">
                                <svg width="12" height="12" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                                    <defs>
                                        <path d="M12 7.023V4.977a.641.641 0 0 0-.643-.643h-3.69V.643A.641.641 0 0 0 7.022 0H4.977a.641.641 0 0 0-.643.643v3.69H.643A.641.641 0 0 0 0 4.978v2.046c0 .356.287.643.643.643h3.69v3.691c0 .356.288.643.644.643h2.046a.641.641 0 0 0 .643-.643v-3.69h3.691A.641.641 0 0 0 12 7.022Z" id="b"/>
                                    </defs>
                                    <use fill="#FFFFFF" fill-rule="nonzero" xlinkHref="#b"/></svg>
                                </button>
                            </div>
                            <button className="w-1/2 bg-blue-900 text-white py-3 px-6 rounded-full font-bold hover:bg-blue-800 shadow-lg transition duration-300">Add to Cart</button>
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-3xl font-bold text-black mb-4">Product Name</h2>
                        <p className="text-gray-600 text-sm mb-6">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer euismod libero id mauris malesuada tincidunt.
                        </p>
                        <div className="flex mb-6">
                            <div className="mr-4">
                                <span className="font-bold text-gray-800">Price:</span>
                                <span className="text-gray-600 ml-2">$29.99</span>
                            </div>
                            <div>
                                <span className="font-bold text-gray-800">Availability:</span>
                                <span className="text-gray-600 ml-2">In Stock</span>
                            </div>
                        </div>
                        <div className="mb-6">
                            <span className="font-bold text-gray-800">Select Color:</span>
                            <div className="flex items-center mt-2 space-x-2">
                                <button className="w-6 h-6 rounded-full bg-gray-800"></button>
                                <button className="w-6 h-6 rounded-full bg-red-600"></button>
                                <button className="w-6 h-6 rounded-full bg-blue-600"></button>
                                <button className="w-6 h-6 rounded-full bg-yellow-500"></button>
                            </div>
                        </div>
                        <div className="mb-6">
                            <span className="font-bold text-gray-800">Select Size:</span>
                            <div className="flex items-center mt-2 space-x-2">
                                <button className="bg-gray-800 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-700">S</button>
                                <button className="bg-gray-800 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-700">M</button>
                                <button className="bg-gray-800 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-700">L</button>
                                <button className="bg-gray-800 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-700">XL</button>
                                <button className="bg-gray-800 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-700">XXL</button>
                            </div>
                        </div>
                        <div>
                            <span className="font-bold text-gray-800">Product Description:</span>
                            <p className="text-gray-600 text-sm mt-2">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus commodo nulla ut lorem rhoncus aliquet. Duis dapibus augue vel ipsum pretium, et venenatis sem blandit.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
