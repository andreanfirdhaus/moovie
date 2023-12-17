import React, { useState } from "react";

export default function ToggleSwitcher({
    isChecked,
    setIsChecked,
    labels,
    onLabelChange,
}) {
    const [selectedLabel, setSelectedLabel] = useState(labels[0]);

    const handleLabelClick = (label) => {
        setSelectedLabel(label);
        // onLabelChange(label);
    };

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div>
            <label className="relative inline-flex cursor-pointer select-none items-center drop-shadow-xl">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="sr-only"
                />
                <div className="shadow-card flex w-auto h-8 items-center rounded-full border-2 border-blackSecondary">
                    {labels.map((label, index) => (
                        <span
                            key={index}
                            onClick={() => handleLabelClick(label)}
                            className={`shrink flex w-auto px-3 h-8 items-center justify-center text-base text-center ${
                                selectedLabel === label
                                    ? "bg-blackSecondary text-white font-semibold rounded-full ease-in-out duration-300"
                                    : " "
                            }`}
                        >
                            {label}
                        </span>
                    ))}
                </div>
            </label>
        </div>
    );
}
