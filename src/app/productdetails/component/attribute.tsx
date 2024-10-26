// AttributeGroup.tsx
interface Attribute {
    AttributeID: number;
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

const getAttributeLabel = (attributeId: number) => {
    // Customize this based on your attribute IDs
    switch (attributeId) {
        case 1:
            return "Size";
        case 2:
            return "Color";
        case 3:
            return "Material";
        default:
            return "Feature";
    }
};

export default function AttributeGroup({
    feature,
    isSelected,
    onSelect
}: AttributeGroupProps) {
    const sortedAttributes = [...feature.attributes].sort((a, b) => a.AttributeID - b.AttributeID);

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
                    {sortedAttributes.map((attr) => (
                        <div key={attr.AttributeID} className="flex items-center">
                            <span className="text-sm font-medium text-gray-600">
                                {getAttributeLabel(attr.AttributeID)}:
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