import { ChevronDown, Check } from 'lucide-react';
import { COUNTRIES } from '@/constants/countries';
import { useCountry } from '@/context/country-context';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, useDropdown } from '@/components/ui/dropdown';
import { Button } from '@/components/ui/button';

function CountryTrigger() {
    const { currentCountry } = useCountry();
    const { isOpen } = useDropdown();

    return (
        <DropdownTrigger asChild>
            <Button
                variant='outline'
                rounded='full'
                className='h-10 sm:h-12 px-2.5 sm:px-3.5 text-sm text-foreground border-white/10 bg-transparent hover:border-white/40 hover:bg-white/5 flex items-center gap-2'
                aria-label={`Current country: ${currentCountry.name}. Click to change`}>
                <span className='text-base leading-none' role='img' aria-label={currentCountry.name}>
                    {currentCountry.flag}
                </span>
                <span className='font-semibold text-xs sm:text-sm tracking-wide'>{currentCountry.code}</span>
                <ChevronDown
                    size={14}
                    strokeWidth={2}
                    className={`text-foreground-muted transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
            </Button>
        </DropdownTrigger>
    );
}

export function CountryDropdown() {
    const { selectedCountry, setCountry } = useCountry();

    return (
        <Dropdown>
            <CountryTrigger />
            <DropdownMenu
                align='right'
                className='w-52 max-h-72 overflow-y-auto p-1.5 rounded-xl bg-surface-overlay border border-border shadow-xl'>
                <div className='px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wider text-foreground-disabled border-b border-border/50 mb-1'>
                    Region / Country
                </div>
                {COUNTRIES.map((item) => {
                    const isSelected = item.code === selectedCountry;
                    return (
                        <DropdownItem
                            key={item.code}
                            onSelect={() => setCountry(item.code)}
                            className={`flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors ${
                                isSelected ?
                                    'bg-primary/15 text-primary-hover font-semibold hover:bg-primary/20'
                                :   'text-foreground-secondary hover:bg-surface-hover hover:text-foreground'
                            }`}>
                            <div className='flex items-center gap-2.5 truncate'>
                                <span className='text-base leading-none'>{item.flag}</span>
                                <span className='truncate'>{item.name}</span>
                            </div>
                            {isSelected && <Check size={15} className='text-primary-hover flex-shrink-0 ml-2' />}
                        </DropdownItem>
                    );
                })}
            </DropdownMenu>
        </Dropdown>
    );
}
