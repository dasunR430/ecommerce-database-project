"use client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import React, { useEffect,useState } from "react";
import ContactDetails from "../components/profile/contents/contactDetails";
import Orders from "../components/profile/contents/orders";
import User from "../components/profile/contents/user";
import { getSession } from "next-auth/react";
import { useRouter } from 'next/navigation';


export default function TestPage() {
    const router = useRouter();
    const [email, setEmail] = useState(""); // State to store user email

    const [activeCard, setActiveCard] = useState<string | null>(null);

    const handleClick = (card:string) => {
        setActiveCard(activeCard === card ? null : card);
    };    
    
    useEffect(() => {
        const checkSession = async () => {
          const session = await getSession(); // Getting the session  
          if (!session) {
            router.push("/login"); // Redirecting to sign-in if no session  
          }else{
            setEmail(session.user?.email || ""); // Set email if session exists  
          }  
        };  
    
        checkSession(); // Calling the session check
      }, [router]);  
    
    return (    
<div className="flex flex-col md:flex-row gap-6 p-6 bg-gray-50 rounded-lg shadow-md">
    {/* User Info Section */}
    <div className="md:w-1/4 p-4 bg-white rounded-lg shadow-md flex flex-col items-center space-y-4">
        <FontAwesomeIcon icon={faUser} className="h-20 w-20 text-gray-500 " />
        {/* User Component */}
        <User />
    </div>

    {/* Contact and Orders Section */}
    <div className="md:w-3/4 space-y-6">
        {/* Contact Details */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <ContactDetails email={email} />
        </div>
        {/* Orders */}
        <div className="bg-white p-6 rounded-lg shadow-md">
            <Orders />
        </div>
    </div>
</div>    

    );
}    

