import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const Header = ({ title, categories, activeType, onTypeChange }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <header className='flex flex-row items-center gap-6 px-4 sm:px-6 lg:px-8 mb-2 sm:mb-6 w-[296px] sm:w-full'>
            <h2 className='text-left text-2xl font-semibold text-zinc-100 mb-0 sm:mb-1.5'>{title}</h2>

            {/* Mobile Dropdown */}
            <div className='sm:hidden relative w-fit'>
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`flex items-center justify-between gap-2 px-4 py-2 bg-zinc-900 text-zinc-300 text-sm font-semibold ${isOpen ? 'rounded-t-[18px]' : 'rounded-full'}`}>
                    <span>{categories.find((opt) => opt.value === activeType)?.label}</span>

                    <ChevronDown
                        className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
                        size={20}
                        strokeWidth={2.5}
                    />
                </button>

                {isOpen && (
                    <div className='absolute top-full left-0 right-0 bg-zinc-900 rounded-b-[18px] shadow-lg z-10 overflow-hidden'>
                        {categories
                            .filter((option) => option.value !== activeType)
                            .map((option) => (
                                <button
                                    key={option.value}
                                    onClick={() => {
                                        onTypeChange(option.value);
                                        setIsOpen(false);
                                    }}
                                    className='w-full text-left px-5 py-2.5 text-sm font-semibold text-zinc-300 hover:bg-zinc-800'>
                                    {option.label}
                                </button>
                            ))}
                    </div>
                )}
            </div>

            {/* Desktop Buttons */}
            <div className='hidden sm:flex items-center gap-5 sm:gap-6'>
                {categories.map((option) => (
                    <button
                        key={option.value}
                        onClick={() => onTypeChange(option.value)}
                        className={`text-base font-medium ${activeType === option.value ? 'text-zinc-200' : 'text-zinc-400'}`}>
                        {option.label}
                    </button>
                ))}
            </div>
        </header>
    );
};
