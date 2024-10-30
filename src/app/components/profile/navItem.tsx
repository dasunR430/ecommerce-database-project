import React from "react";

interface NavItemProps {
    title: string;
    icon: string;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ title, icon, onClick }) => {
    return (
        <li>
            <button 
                className="w-full text-left px-4 py-2 flex items-center rounded-lg hover:bg-gray-700 transition-colors duration-300"
                onClick={onClick}>
                    <span className="mr-3">{icon}</span>
                    {title}
                </button>
        </li>
    );
}

export default NavItem;