import React, { useState } from "react";
import NavItem from "./navItem"; // Ensure proper casing if using a file system with case-sensitivity
import Content from "./content";

interface SideNavigationBarProps {
  email: string;
}

const SideNavigationBar: React.FC<SideNavigationBarProps> = ({ email }) => {
  const [selectedItem, setSelectedItem] = useState<string>("Profile");

  return (
    <div className="flex min-h-screen">
      {/* Side Navigation */}
      <div className="w-60 p-4 bg-gray-800 text-white shadow-lg">
        <ul className="space-y-4">
          <NavItem
            title="Profile"
            icon="👤"
            // isActive={selectedItem === "Profile"}
            onClick={() => setSelectedItem("Profile")}
          />
          <NavItem
            title="Cart"
            icon="🛒"
            // isActive={selectedItem === "Cart"}
            onClick={() => setSelectedItem("Cart")}
          />
          <NavItem
            title="Orders"
            icon="📦"
            // isActive={selectedItem === "Orders"}
            onClick={() => setSelectedItem("Orders")}
          />
          <NavItem
            title="Contact details"
            icon="📞"
            // isActive={selectedItem === "Contact details"}
            onClick={() => setSelectedItem("Contact details")}
          />
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="ml-8 flex-1 p-8 bg-gray-100">
        <Content selectedItem={selectedItem} email={email} />
      </div>
    </div>
  );
};

export default SideNavigationBar;
