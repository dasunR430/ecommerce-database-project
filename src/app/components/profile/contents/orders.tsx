import { getSession } from 'next-auth/react';
import Raw from '../../table/raw';
import React, { useEffect, useState } from 'react';
import router from 'next/router';

interface Purchase {
  OrderID: number;
  orderedDate: string;
  ProductName: string;
  Price: number;
}

function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

const Orders = () => {
  const [id, setId] = useState('');
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const session = await getSession();
      if (!session) {
        router.push("/login");
      } else {
        setId(session.user?.id || '');
      }
    };

    checkSession();
  }, [router]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/profile/getCustomerPurchases`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        
        const purchs = await response.json();
        setPurchases(purchs[0] || []); // Default to an empty array if purchs[0] is null or undefined
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    if (id) {
      fetchPurchases();
    }
  }, [id]);

  return (
    <div className="overflow-x-auto">
      {loading ? (
        <p>Loading orders...</p>
      ) : purchases.length === 0 ? (
        <p>No purchases found.</p>
      ) : (
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
              <Raw
                key={index}
                raw={[
                  formatDate(purchase.orderedDate),
                  purchase.ProductName,
                  `$${purchase.Price}`,
                ]}
              />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Orders;
