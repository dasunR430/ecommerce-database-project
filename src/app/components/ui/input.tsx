import React from 'react';

interface InputProps {
    label: string;
    type: string;
    placeholder: string;
    value: string; // Add value prop
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
}

export const Input: React.FC<InputProps> = ({ label, type, placeholder, value, onChange }) => {
    return (
        <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value} // Bind value
                onChange={onChange} // Bind onChange handler
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
        </div>
    );
};
