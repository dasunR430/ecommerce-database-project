import styles from './featurecard.module.css';
import Attribute from './attribute';


interface FeatureCardProps {

    feature: {

        Price: string; // Assuming Price is a string

        attributes: Array<{ AttributeID: number; AttributeValue: string }>;

    };

    setPrice: (price: number) => void; // Function type for setting price

}


export default function FeatureCard({ feature, setPrice }: FeatureCardProps) {
    return (
        <div className={styles.featuresdiv} onClick={() => setPrice(Number(feature.Price))}>
            <div>
                {feature.attributes.map((attribute) => (
                    <Attribute key={attribute.AttributeID} attribute={attribute.AttributeValue} />
                ))}
            </div>
        </div>
    );
}
