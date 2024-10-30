'use client'
import React, { useState } from 'react';
import RangeFilter from './RangeFilter';
import { useRouter } from 'next/navigation';

interface PriceRangeFilterProps {
    globalMin: number;
    globalMax: number;
}

const PriceRangeFilter: React.FC<PriceRangeFilterProps> = ({globalMin = 0, globalMax = 500_000}) => {
    const router = useRouter();
    const handlePriceFilter = (min: number, max: number, isAscending: boolean) => {
        // console.log(`Filtering products from ${min} to ${max}`);
        const currentUrl = new URL(window.location.href);
        currentUrl.searchParams.delete('min');
        currentUrl.searchParams.delete('max');
        currentUrl.searchParams.append('min', `${min}`)
        currentUrl.searchParams.append('max', `${max}`)

        // to avoid bug when changing filter
        currentUrl.searchParams.delete('page');
        currentUrl.searchParams.append('page', `${1}`)

        currentUrl.searchParams.delete('ascending');
        currentUrl.searchParams.append('ascending', isAscending ? '1' : '0');
        
        router.push(currentUrl.toString());
    };

    return (
        <div className='m-3'>
            <h2 className="text-xl font-semibold">Price Range</h2>
            <RangeFilter min={globalMin} max={globalMax} onApply={handlePriceFilter} />
        </div>
    );
};

export default PriceRangeFilter;
