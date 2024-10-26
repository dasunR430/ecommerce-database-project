interface AttributeProps {
    attribute: string; // Expecting a string for attribute value
}

export default function Attribute({ attribute }: AttributeProps) {
    return (
        <div>
            <h2>{attribute}</h2>
        </div>
    );
}
