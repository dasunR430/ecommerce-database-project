// ProductDetailsPage.tsx
"use client";
import { useParams } from 'next/navigation';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import FeatureVariants from '../component/featurecard';
import { Plus, Minus, ShoppingCart, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Popup from '../../popupmsg/page';

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

interface Attribute {
    AttributeType: string;
    AttributeValue: string;
}

interface Feature {
    SKU: string;
    attributes: Attribute[];
    Price: string;
}

export default function ProductDetailsPage() {
    const router = useRouter();
    const [cid, setcId] = useState('');
    const { id } = useParams();
    const [product, setProduct] = useState<ProductDetails | null>(null);
    const [count, setCount] = useState(1);
    const [features, setFeatures] = useState<Feature[]>([]);
    const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
    const [currentPrice, setCurrentPrice] = useState<string | number>('');
    const [showPopup, setShowPopup] = useState(false);
    const [error, setError] = useState(false);
    const increment = () => setCount(count + 1);
    const decrement = () => setCount(count > 1 ? count - 1 : 1);


    useEffect(() => {
        if (id) {
            fetchProductDetails();
            fetchFeatures();
        }
    }, [id]);

    useEffect(() => {
        // Update current price when selected feature changes
        if (selectedFeature) {
            setCurrentPrice(selectedFeature.Price);
        } else if (product) {
            setCurrentPrice(product.BasePrice);
        }
        const checkSession = async () => {
            const session = await getSession(); // Getting the session
            if (!session) {
            //   router.push("/login"); // Redirecting to sign-in if no session
            } else {
              setcId(session.user?.id || ''); // Set email if session exists
            }
          };
      
          checkSession();
    }, [selectedFeature, product, router]);

    const fetchProductDetails = async () => {
        try {
            const res = await fetch(`/api/home/getproducts/${id}`);
            const data = await res.json();
            setProduct(data.result[0]);
            setCurrentPrice(data.result[0].BasePrice); // Set initial price
        } catch (error) {
            console.error("Error fetching product details:", error);
        }
    };

    const fetchFeatures = async () => {
        try {
            const res = await fetch(`/api/features/${id}`);
            const data = await res.json();
            
            const featureList = Object.keys(data).map(sku => ({
                SKU: sku,
                attributes: data[sku].attributes,
                Price: data[sku].Price,
            }));
            
            setFeatures(featureList);
            if (featureList.length > 0) {
                setSelectedFeature(featureList[0]);
                setCurrentPrice(featureList[0].Price); // Set initial feature price
            }
        } catch (error) {
            console.error("Error fetching features:", error);
        }
    };

    const handleFeatureSelect = (feature: Feature) => {
        setSelectedFeature(feature);
        setCurrentPrice(feature.Price);
    };

    const handleAddToCart = async () => {
        if (count > 0 && selectedFeature) {
            try{
                const response = await fetch('/api/addtocart', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ 
                        id: cid,
                        sku: selectedFeature.SKU,
                        quantity: count
                    }),
                });
                if(response.ok){
                    console.log("Product added to cart successfully");
                    setShowPopup(true);
                    setTimeout(() => {
                        setShowPopup(false);
                    }, 2000);
                    
                }else{
                    console.log("Failed to add product to cart");
                    setShowPopup(true);
                    setError(true);
                    setTimeout(() => {
                        setShowPopup(false);
                        setError(false);
                    }, 2000);
                }
            }catch(error){
                console.error("Error adding product to cart:", error);
            }

        } else {
            alert("Please select a product variant and quantity");
        }
    };

    // if (!product) return <p>Loading...</p>;
    if(!product) {
        return (
        <div
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '90vw', margin: '0 auto', animation: 'fadeIn 1s ease-in-out' }}
          >
            <Loader2 style={{ marginBottom: '1rem', animation: 'pulse 1.5s infinite ease-in-out' }} />
            <span style={{ animation: 'blink 1.2s infinite' }}>Loading...</span>
          
            <style jsx>{`
              @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
              @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
              @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }
            `}</style>
          </div>
          
        );
    }

    return (
        <div className="bg-white py-8">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row -mx-4">
                    <div className="md:flex-1 px-4">
                        <div className="h-[460px] rounded-lg bg-gray-200 mb-4 shadow-lg overflow-hidden">
                            <img 
                                className="w-full h-full object-contain rounded-lg" 
                                src={product.PrimaryImage} 
                                alt={product.ProductTitle} 
                            />
                        </div>
                    </div>
                    <div className="md:flex-1 px-4">
                        <h2 className="text-3xl font-bold text-black mb-4">
                            {product.ProductTitle}
                        </h2>
                        <span className="text-gray-600 text-sm mb-6 block">
                            {product.Description}
                        </span>
                        <div className="flex mb-6">
                            <div className="mr-4">
                                <span className="font-bold text-gray-800">Price:</span>
                                <span className="text-gray-600 ml-2">
                                    Rs.{currentPrice}
                                </span>
                            </div>
                        </div>

                        <FeatureVariants 
                            features={features}
                            selectedFeature={selectedFeature}
                            onSelect={handleFeatureSelect}
                        />

                        <div className="flex items-center justify-between mt-8">
                            <div className="flex items-center space-x-3 bg-gray-50 rounded-lg p-2">
                                <button 
                                    onClick={decrement}
                                    className="flex items-center justify-center w-10 h-10 bg-white text-blue-900 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-blue-500 transition-all duration-200"
                                    aria-label="Decrease quantity"
                                >
                                    <Minus size={18} />
                                </button>
                                <div className="w-16 text-center">
                                    <span className="text-lg font-medium text-gray-900">
                                        {count}
                                    </span>
                                </div>
                                <button 
                                    onClick={increment}
                                    className="flex items-center justify-center w-10 h-10 bg-white text-blue-900 rounded-lg border border-gray-200 hover:bg-gray-50 hover:border-blue-500 transition-all duration-200"
                                    aria-label="Increase quantity"
                                >
                                    <Plus size={18} />
                                </button>
                            </div>
                            <button 
                                onClick={handleAddToCart}
                                className="flex items-center justify-center gap-2 w-1/2 bg-blue-900 text-white py-3 px-6 rounded-lg font-bold hover:bg-blue-800 shadow-lg transition duration-300"
                            >
                                <ShoppingCart size={20} />
                                <span>Add to Cart</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            {showPopup && <Popup message={error ? "Failed to add product to cart" : "Product added to cart"} type={error ? "error" : "success"}/>}
        </div>
    );
}