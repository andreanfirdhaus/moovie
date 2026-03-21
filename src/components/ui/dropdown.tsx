import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { Button, type ButtonProps } from '@/components/ui/button';

interface DropdownContextType {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    closeDropdown: () => void;
    toggleDropdown: () => void;
}

const DropdownContext = createContext<DropdownContextType | undefined>(undefined);

export function useDropdown() {
    const context = useContext(DropdownContext);
    if (!context) {
        throw new Error('useDropdown must be used within a Dropdown component');
    }
    return context;
}

interface DropdownProps {
    children: ReactNode;
    className?: string;
}

export function Dropdown({ children, className }: DropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const closeDropdown = () => setIsOpen(false);
    const toggleDropdown = () => setIsOpen((prev) => !prev);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                closeDropdown();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <DropdownContext.Provider value={{ isOpen, setIsOpen, closeDropdown, toggleDropdown }}>
            <div ref={dropdownRef} className={cn('relative inline-block text-left', className)}>
                {children}
            </div>
        </DropdownContext.Provider>
    );
}

type DropdownTriggerProps = ButtonProps & {
    asChild?: boolean;
};

export const DropdownTrigger = React.forwardRef<HTMLButtonElement, DropdownTriggerProps>(
    ({ className, children, asChild, onClick, ...props }, ref) => {
        const { isOpen, toggleDropdown } = useDropdown();

        // asChild — inject toggle ke child element (misal <Button> custom)
        if (asChild && React.isValidElement(children)) {
            return React.cloneElement(children as React.ReactElement<any>, {
                onClick: (e: any) => {
                    toggleDropdown();
                    (children as React.ReactElement<any>).props.onClick?.(e);
                    onClick?.(e);
                },
                ref: (node: HTMLButtonElement) => {
                    if (typeof ref === 'function') ref(node);
                    else if (ref) (ref as React.MutableRefObject<HTMLButtonElement | null>).current = node;

                    const childRef = (children as any).ref;
                    if (typeof childRef === 'function') childRef(node);
                    else if (childRef) childRef.current = node;
                },
                'data-state': isOpen ? 'open' : 'closed',
                ...props,
            });
        }

        // Default — render Button primitive
        return (
            <Button
                ref={ref}
                onClick={(e) => {
                    toggleDropdown();
                    onClick?.(e as React.MouseEvent<HTMLButtonElement>);
                }}
                data-state={isOpen ? 'open' : 'closed'}
                className={cn(className)}
                {...props}>
                {children}
            </Button>
        );
    }
);

DropdownTrigger.displayName = 'DropdownTrigger';

interface DropdownMenuProps {
    children: ReactNode;
    className?: string;
    align?: 'left' | 'right' | 'center';
    sideOffset?: number;
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
}

export function DropdownMenu({
    children,
    className,
    align = 'left',
    sideOffset = 8,
    initial = { opacity: 0, scale: 0.95, y: -sideOffset },
    animate = { opacity: 1, scale: 1, y: 0 },
    exit = { opacity: 0, scale: 0.95, y: -sideOffset },
    transition = { duration: 0.2, ease: 'easeOut' },
}: DropdownMenuProps) {
    const { isOpen } = useDropdown();

    const alignmentClasses = {
        left: 'left-0 origin-top-left',
        right: 'right-0 origin-top-right',
        center: 'left-1/2 -translate-x-1/2 origin-top',
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={transition}
                    className={cn(
                        'absolute z-50 mt-2 min-w-[8rem] overflow-hidden rounded-xl border border-zinc-800 bg-surface-2 text-zinc-200 shadow-xl shadow-black/30 outline-none',
                        alignmentClasses[align],
                        className
                    )}
                    style={{ top: `calc(100% + ${sideOffset}px)` }} // Provide a default gap below trigger
                >
                    {children}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

interface DropdownItemProps extends React.HTMLAttributes<HTMLDivElement> {
    children: ReactNode;
    onSelect?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void;
    closeOnSelect?: boolean;
}

export const DropdownItem = React.forwardRef<HTMLDivElement, DropdownItemProps>(
    ({ className, children, onSelect, onClick, closeOnSelect = true, ...props }, ref) => {
        const { closeDropdown } = useDropdown();

        const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            onSelect?.(e);
            onClick?.(e);
            if (closeOnSelect) {
                closeDropdown();
            }
        };

        return (
            <div
                ref={ref}
                onClick={handleClick}
                className={cn(
                    'relative flex cursor-pointer select-none items-center px-3 py-2.5 text-sm text-zinc-400 outline-none transition-colors hover:bg-surface-3 hover:text-zinc-200 focus:bg-surface-3 focus:text-zinc-200 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                    className
                )}
                {...props}>
                {children}
            </div>
        );
    }
);

DropdownItem.displayName = 'DropdownItem';
