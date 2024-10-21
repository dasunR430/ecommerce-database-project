import React from "react";
import { getSession } from "next-auth/react"; // Importing getSession from next-auth
import { useEffect, useState } from "react"; // Importing useEffect and useState from React
import { useRouter } from "next/router";
import ContactDetails from "./contents/contactDetails";

interface ContentProps {
  selectedItem: string;
}

const Content: React.FC<ContentProps> = ({ selectedItem }) => {
    const router = useRouter(); // Initializing the router
    const [loading, setLoading] = useState(true); // State to manage loading
    const [email, setEmail] = useState<string | null>(null); // State to store user email
  
    useEffect(() => {
      const checkSession = async () => {
        const session = await getSession(); // Getting the session
        if (!session) {
          router.push("/login"); // Redirecting to sign-in if no session
        } else {
          setEmail(session.user?.email || null); // Set email if session exists
          setLoading(false); // Set loading to false if session exists
        }
      };
      checkSession(); // Calling the session check
    }, [router]);


  const renderContent = () => {
    switch (selectedItem) {
      case "Profile":
        return <div>This is the Profile section</div>;
      case "Cart":
        return <div>This is the Cart section</div>;
      case "Orders":
        return <div>This is the Orders section</div>;
      case "Contact details":
        return <ContactDetails />;
      default:
        return <div>Select an option from the menu</div>;
    }
  };

  return <>{renderContent()}</>;
};

export default Content;
