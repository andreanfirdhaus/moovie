import React, { createContext, useContext, useState, useRef, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/utils/cn';
import { Button, type ButtonProps } from '@/components/ui/button';

interface DropdownContextType {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
    closeDropdown: () => void;
    toggleDropdown: () => void;
    triggerRect: DOMRect | null;
    updatePosition: () => void;
    triggerRef: React.RefObject<HTMLDivElement | null>;
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
    const [triggerRect, setTriggerRect] = useState<DOMRect | null>(null);
    const triggerRef = useRef<HTMLDivElement>(null);

    const closeDropdown = () => setIsOpen(false);

    const updatePosition = () => {
        if (triggerRef.current) {
            setTriggerRect(triggerRef.current.getBoundingClientRect());
        }
    };

    const toggleDropdown = () => {
        if (!isOpen) {
            updatePosition();
        }
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        if (!isOpen) return;

        window.addEventListener('resize', updatePosition);
        window.addEventListener('scroll', updatePosition, true);

        return () => {
            window.removeEventListener('resize', updatePosition);
            window.removeEventListener('scroll', updatePosition, true);
        };
    }, [isOpen]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
                const portalElement = document.getElementById('dropdown-portal-content');
                if (portalElement && portalElement.contains(event.target as Node)) {
                    return;
                }
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
        <DropdownContext.Provider
            value={{ isOpen, setIsOpen, closeDropdown, toggleDropdown, triggerRect, updatePosition, triggerRef }}>
            <div ref={triggerRef} className={cn('relative inline-block text-left', className)}>
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
    initial = { opacity: 0, scale: 0.95, y: -4 },
    animate = { opacity: 1, scale: 1, y: 0 },
    exit = { opacity: 0, scale: 0.95, y: -4 },
    transition = { duration: 0.15, ease: 'easeOut' },
}: DropdownMenuProps) {
    const { isOpen, triggerRect } = useDropdown();
    const menuRef = useRef<HTMLDivElement>(null);
    const [coords, setCoords] = useState<React.CSSProperties>({});

    useEffect(() => {
        if (!isOpen || !triggerRect) return;

        const viewportWidth = window.innerWidth;
        const menuWidth = menuRef.current?.offsetWidth || 200;
        const margin = 12;

        const top = triggerRect.bottom + sideOffset;
        let left = triggerRect.left;

        if (align === 'right') {
            left = triggerRect.right - menuWidth;
        } else if (align === 'center') {
            left = triggerRect.left + triggerRect.width / 2 - menuWidth / 2;
        }

        if (left + menuWidth > viewportWidth - margin) {
            left = viewportWidth - menuWidth - margin;
        }
        if (left < margin) {
            left = margin;
        }

        setCoords({
            position: 'fixed',
            top: `${top}px`,
            left: `${left}px`,
        });
    }, [isOpen, triggerRect, align, sideOffset]);

    if (typeof window === 'undefined') return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && triggerRect && (
                <motion.div
                    ref={menuRef}
                    id='dropdown-portal-content'
                    initial={initial}
                    animate={animate}
                    exit={exit}
                    transition={transition}
                    style={coords}
                    className={cn(
                        'z-[9999] p-1.5 min-w-[10rem] max-w-[calc(100vw-24px)] max-h-80 overflow-y-auto rounded-2xl bg-surface-raised border border-border text-foreground-secondary shadow-2xl [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]',
                        className
                    )}>
                    <div className='flex flex-col gap-0.5'>{children}</div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
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
                    'relative flex w-full cursor-pointer select-none items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-sm text-foreground-secondary transition-colors hover:bg-surface-hover/50 hover:text-foreground focus:bg-surface-hover focus:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
                    className
                )}
                {...props}>
                {children}
            </div>
        );
    }
);

DropdownItem.displayName = 'DropdownItem';
