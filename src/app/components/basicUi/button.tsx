interface ButtonProps {
    label: string;
}

export const Button: React.FC<ButtonProps> = ({ label }) => {
    return (
        <button
            type="submit" // Ensures it works with the form submission
            className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg"
        >
            {label}
        </button>
    );
};
