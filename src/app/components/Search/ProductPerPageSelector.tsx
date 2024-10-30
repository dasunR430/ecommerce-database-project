'use client'
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

interface ProductPerPageSelectorProps {
    productperpage: number;
}

export default function ProductPerPageSelector({ productperpage }: ProductPerPageSelectorProps) {
  const router = useRouter();
  const [productPerPage, setProductPerPage] = useState(productperpage);

  const handleProductPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedPerPage = Number(event.target.value);
    setProductPerPage(selectedPerPage);

    // Update the URL query parameter without reloading the page
    const currentUrl = new URL(window.location.href);
    currentUrl.searchParams.delete('productperpage');
    currentUrl.searchParams.append('productperpage', `${selectedPerPage}`)

    // to avoid bug when changing filter
    currentUrl.searchParams.delete('page');
    currentUrl.searchParams.append('page', `${1}`)
    router.push(currentUrl.toString());
    
    router.push(currentUrl.toString());
  };

  useEffect(() => {
    setProductPerPage(productperpage);
  }, [productperpage]);

  return (
    <div className="m-3">
      <label htmlFor="productPerPage" className="mr-2">Products per page:</label>
      <select
        id="productPerPage"
        value={productPerPage}
        onChange={handleProductPerPageChange}
        className="border border-gray-300 rounded px-2 py-1"
      >
        {[5, 10, 20, 50].map((num) => (
          <option key={num} value={num}>{num}</option>
        ))}
      </select>
    </div>
  );
}
