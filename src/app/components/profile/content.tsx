'use client';
import React, { useEffect, useState } from "react";
import { getSession } from "next-auth/react";
import ContactDetails from "./contents/contactDetails";
import Orders from "./contents/orders";

interface ContentProps {
  selectedItem: string;
  email:string;
}

const Content: React.FC<ContentProps> = ({ selectedItem ,email}) => {
  const [loading, setLoading] = useState(true);

  const renderContent = () => {
    switch (selectedItem) {
      case "Profile":
        return <div>This is the Profile section</div>;
      case "Orders":
        return <Orders/>;
      case "Contact details":
        return <ContactDetails email={email}/>;
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  return <>{renderContent()}</>;
};

export default Content;
