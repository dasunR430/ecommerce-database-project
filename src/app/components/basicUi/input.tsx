// import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import React, { useState } from 'react';

// interface InputProps {
//     label: string;
//     type: string;
//     placeholder: string;
//     value: string; // Add value prop
//     onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; // Add onChange prop
// }

// export const Input: React.FC<InputProps> = ({ label, type, placeholder, value, onChange }) => {
//     const [showPassword,setShowPassword] = useState(false);

//     const togglePasswordVisibility = () => {
//         setShowPassword((prevState) => !prevState);
//     };
    
//     if(type === 'password'){
//         return(
//             <div className="space-y-1 relative">
//                 <label className="block text-sm font-medium text-gray-700">{label}</label>
//                 <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder={placeholder}
//                     value={value} // Bind value
//                     onChange={onChange} // Bind onChange handler
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm relative" // Set input to relative
//                 />
//                 <FontAwesomeIcon
//                     className='absolute bottom-1 right-2 w-4 h-7 cursor-pointer' // Adjust positioning
//                     icon={showPassword ? faEye : faEyeSlash}
//                     onClick={togglePasswordVisibility}
//                 />
//             </div>
//         );
//     }else{
//         return (
//             <div className="space-y-1">
//                 <label className="block text-sm font-medium text-gray-700">{label}</label>
//                 <input
//                     type={type}
//                     placeholder={placeholder}
//                     value={value} // Bind value
//                     onChange={onChange} // Bind onChange handler
//                     className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
//                 />
//             </div>
//         );
//     }
// };
import { faEyeSlash, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState } from 'react';

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
                            focus:ring-2 focus:ring-blue-400 
                            focus:ring-opacity-50
                            transition duration-200 ease-in-out`} // Glow effect using ring
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
