import { getSession } from 'next-auth/react';
import Raw from '../../table/raw';
import React, { useEffect } from 'react';
import router from 'next/router';

interface Purchase{
  OrderID: number;
  orderedDate: string;
  ProductName: string;
  Price: number;
}

const Orders = () => {

  // console.log("Fetching orders");
  const [id,setId] = React.useState('');
  const [purchases, setPurchases] = React.useState<Purchase[]>([]);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession(); // Getting the session
      if (!session) {
        router.push("/login"); // Redirecting to sign-in if no session
      } else {
        setId(session.user?.id || ''); // Set email if session exists
      }
    };

    checkSession(); // Calling the session check
  }, [router]);

    useEffect(() => {
      const fetchPurchases = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/profile/getCustomerPurchases`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id })
          });
                const purchs = await response.json();
                setPurchases(purchs[0]);
                // console.log(prch);
            } catch (e) {
                console.log(e);
            }
        };

        if (id) {
            fetchPurchases();
        }
    }, [id]);

    // console.log(purchases);

  
    return (
        <div className="overflow-x-auto">
  <table className="min-w-full bg-white border border-gray-200 rounded-lg">
    <thead>
      <tr className="bg-gray-100">
        <th className="py-3 px-4 text-left font-semibold text-gray-600">Order Date</th>
        <th className="py-3 px-4 text-left font-semibold text-gray-600">Product</th>
        <th className="py-3 px-4 text-left font-semibold text-gray-600">Price</th>
      </tr>
    </thead>
    <tbody>
        {purchases.map((purchase, index) => (
          <Raw key={index} raw={[purchase.orderedDate, purchase.ProductName, `$${purchase.Price}`]} />
        ))}
    </tbody>
  </table>
</div>

    );
}

export default Orders;