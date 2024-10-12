'use client'
import React, { useState } from 'react';
import { Range, getTrackBackground } from 'react-range';

interface RangeFilterProps {
    min: number;
    max: number;
    onApply: (min: number, max: number) => void;
}

const RangeFilter: React.FC<RangeFilterProps> = ({ min, max, onApply }) => {
    const [values, setValues] = useState([min, max]);

    const handleApply = () => {
        onApply(values[0], values[1]);
    };

    return (
        <div className="p-2 bg-white rounded-lg">

            {/* Displaying the selected range */}
            <div className="flex justify-between mb-4">
                <div>Min: Rs.{values[0]}</div>
                <div>Max: Rs.{values[1]}</div>
            </div>

            {/* The Range Slider */}
            <Range
                step={1}
                min={min}
                max={max}
                values={values}
                onChange={(newValues) => setValues(newValues)}
                renderTrack={({ props, children }) => (
                    <div
                        {...props}
                        style={{
                            ...props.style,
                            height: '6px',
                            width: '100%',
                            background: getTrackBackground({
                                values,
                                colors: ['#ccc', '#000000', '#ccc'],
                                min: min,
                                max: max,
                            }),
                            borderRadius: '4px',
                        }}
                    >
                        {children}
                    </div>
                )}
                renderThumb={({ props }) => (
                    <div
                        {...props}
                        key={props.key}
                        style={{
                            ...props.style,
                            height: '15px',
                            width: '15px',
                            borderRadius: '50%',
                            backgroundColor: '#000000',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            boxShadow: '0 2px 6px rgba(0, 0, 0, 0)',
                        }}
                    />
                )}
            />

            {/* Apply Button */}
            <button
                onClick={handleApply}
                className="mt-4 w-full bg-red-800 text-white justify-center px-4 py-2 rounded-md hover:bg-red-900 transition"
            >
                Apply
            </button>
        </div>
    );
};

export default RangeFilter;
