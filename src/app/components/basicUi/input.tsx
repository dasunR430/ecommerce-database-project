import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

interface InputProps {
    label: string;
    type: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const Input: React.FC<InputProps> = ({ label, type, placeholder, value, onChange }) => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword((prevState) => !prevState);
    };

    return (
        <div className="space-y-1 relative">
            <label className="block text-sm font-medium text-gray-700">{label}</label>
            <input
                type={type === 'password' && !showPassword ? "password" : "text"}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={`mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm 
                            focus:outline-none 
                            focus:ring-2 focus:ring-[#f87171] 
                            focus:ring-opacity-50
                            transition duration-200 ease-in-out`} // Changed the glow color to red
            />
            {type === 'password' && (
                <FontAwesomeIcon
                    className='absolute bottom-1 right-2 w-4 h-7 cursor-pointer'
                    icon={showPassword ? faEye : faEyeSlash}
                    onClick={togglePasswordVisibility}
                />
            )}
        </div>
    );
};