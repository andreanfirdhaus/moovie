import { cn } from '@/utils/cn';
import { LoaderCircle } from 'lucide-react';
import { ComponentPropsWithRef, ElementType, ReactNode, forwardRef } from 'react';

const buttonVariants = {
    variant: {
        primary: 'bg-brand/80 hover:bg-brand border border-brand text-white',
        secondary: 'bg-surface-4 text-zinc-100 border border-zinc-700 hover:bg-surface-4/80',
        ghost: 'bg-surface-2 text-zinc-300 hover:bg-surface-3 hover:text-zinc-100 border border-zinc-800',
        outline:
            'bg-transparent border border-zinc-700 text-zinc-300 hover:border-zinc-500 hover:text-zinc-100 hover:bg-surface-2',
        danger: 'bg-red-950 text-red-400 border border-red-900 hover:bg-red-900 hover:text-red-300',
        link: 'bg-transparent text-zinc-200 underline-offset-4 hover:underline hover:text-zinc-100 p-0 h-auto',
    },
    active: {
        primary: 'bg-brand border-brand text-white',
        secondary: 'bg-surface-4 text-zinc-100 border-zinc-700',
        ghost: 'bg-surface-3 text-zinc-100 border-zinc-700 border-zinc-100',
        outline: 'bg-surface-3 text-zinc-100 border-zinc-700 border-zinc-100',
        danger: 'bg-red-500 text-white border-red-500',
        link: 'text-zinc-100 underline',
    },
    size: {
        sm: 'px-3 py-1.5 text-xs',
        md: 'px-5 py-2.5 text-sm',
        lg: 'px-7 py-3.5 text-base',
        icon: 'p-2.5 aspect-square',
    },
    rounded: {
        full: 'rounded-full',
        lg: 'rounded-lg',
        md: 'rounded-md',
        none: 'rounded-none',
    },
} as const;

type Variant = keyof typeof buttonVariants.variant;
type Size = keyof typeof buttonVariants.size;
type Rounded = keyof typeof buttonVariants.rounded;

type AsProp<T extends ElementType> = {
    as?: T;
};

type ButtonOwnProps = {
    variant?: Variant;
    size?: Size;
    rounded?: Rounded;
    isLoading?: boolean;
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    children?: ReactNode;
    className?: string;
};

type ButtonProps<T extends ElementType = 'button'> = AsProp<T> &
    ButtonOwnProps &
    Omit<ComponentPropsWithRef<T>, keyof ButtonOwnProps | 'as'>;

const BASE =
    'inline-flex items-center justify-center gap-2 font-medium whitespace-nowrap ' +
    'transition-all duration-300 cursor-pointer select-none ' +
    'disabled:pointer-events-none disabled:opacity-50 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent';

export const Button = forwardRef(
    <T extends ElementType = 'button'>(
        {
            as,
            variant = 'ghost',
            size = 'md',
            rounded = 'full',
            isLoading = false,
            leftIcon,
            rightIcon,
            children,
            className,
            ...rest
        }: ButtonProps<T>,
        ref: React.Ref<any>
    ) => {
        const Component = as ?? 'button';

        const defaultProps = Component === 'button' ? { type: 'button' as const } : {};

        return (
            <Component
                ref={ref}
                {...defaultProps}
                {...rest}
                disabled={isLoading || (rest as { disabled?: boolean }).disabled}
                className={cn(
                    BASE,
                    buttonVariants.variant[variant],
                    buttonVariants.size[size],
                    buttonVariants.rounded[rounded],
                    className
                )}>
                {isLoading && <LoaderCircle />}

                {!isLoading && leftIcon && <span className='shrink-0'>{leftIcon}</span>}

                {children}

                {rightIcon && <span className='shrink-0'>{rightIcon}</span>}
            </Component>
        );
    }
);

Button.displayName = 'Button';

export { buttonVariants };
export type { ButtonProps, Variant, Size, Rounded };
