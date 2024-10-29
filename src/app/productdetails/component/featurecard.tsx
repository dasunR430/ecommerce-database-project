import React from 'react';
import AttributeGroup from './attribute';

interface Attribute {
    AttributeType: string;
    AttributeValue: string;
}

interface Feature {
    SKU: string;
    attributes: Attribute[];
    Price: string;
}

interface FeatureVariantsProps {
    features: Feature[];
    selectedFeature: Feature | null;
    onSelect: (feature: Feature) => void;
}

const FeatureVariants = ({ 
    features, 
    selectedFeature, 
    onSelect 
}: FeatureVariantsProps) => {
    return (
        <div className="space-y-2">
            <h3 className="text-lg font-semibold mb-3">Available Options:</h3>
            {features.map((feature) => (
                <AttributeGroup
                    key={feature.SKU}
                    feature={feature}
                    isSelected={selectedFeature?.SKU === feature.SKU}
                    onSelect={() => onSelect(feature)}
                />
            ))}
        </div>
    );
};

export default FeatureVariants;