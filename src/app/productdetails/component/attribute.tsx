import React from 'react';

interface Attribute {
    AttributeType: string;
    AttributeValue: string;
}

interface Feature {
    SKU: string;
    attributes: Attribute[];
    Price: string;
}

interface AttributeGroupProps {
    feature: Feature;
    isSelected: boolean;
    onSelect: () => void;
}

export default function AttributeGroup({
    feature,
    isSelected,
    onSelect
}: AttributeGroupProps) {
    return (
        <button
            onClick={onSelect}
            className={`
                w-full p-3 border rounded-lg transition-all duration-200
                ${isSelected 
                    ? 'border-blue-900 bg-blue-50 shadow-md' 
                    : 'border-gray-200 hover:border-blue-400 hover:bg-gray-50'
                }
            `}
        >
            <div className="flex items-center justify-between">
                <div className="flex-1 flex items-center space-x-4">
                    {feature.attributes.map((attr, index) => (
                        <div key={index} className="flex items-center">
                            <span className="text-sm font-medium text-gray-600">
                                {attr.AttributeType}:
                            </span>
                            <span className="ml-1 text-sm text-gray-900">
                                {attr.AttributeValue}
                            </span>
                        </div>
                    ))}
                </div>
                <div className="ml-4">
                    <span className="text-sm font-medium text-gray-900">
                        Rs. {feature.Price}
                    </span>
                </div>
            </div>
        </button>
    );
}