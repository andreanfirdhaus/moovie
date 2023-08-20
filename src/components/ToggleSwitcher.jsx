import React from "react";

export default function ToggleSwitcher({ isChecked, setIsChecked }) {
    const handleCheckboxChange = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div>
            <label className="relative inline-flex cursor-pointer select-none items-center">
                <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                    className="sr-only"
                />
                <div className="shadow-card flex w-48 items-center rounded-full border-2 border-blackSecondary">
                    <span
                        className={`shrink w-44 items-center justify-center text-base text-center ${
                            !isChecked
                                ? "bg-blackSecondary text-white rounded-full ease-in-out duration-300"
                                : "text-body-color"
                        }`}
                    >
                        Today
                    </span>
                    <span
                        className={`shrink w-52 items-center justify-center text-base text-center ${
                            isChecked
                                ? "bg-blackSecondary text-white rounded-full ease-in-out duration-300"
                                : "text-body-color"
                        }`}
                    >
                        This week
                    </span>
                </div>
            </label>
        </div>
    );
}
