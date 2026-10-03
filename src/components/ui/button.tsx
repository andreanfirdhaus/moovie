import { cn } from '@/utils/cn';
import { LoaderCircle } from 'lucide-react';
import { ComponentPropsWithRef, ElementType, ReactNode, forwardRef } from 'react';

const buttonVariants = {
    variant: {
        primary: 'bg-primary hover:bg-primary-hover active:bg-primary-active text-white',
        secondary: 'bg-surface-elevated border border-border text-foreground hover:bg-surface-hover',
        surface:
            'bg-surface-raised border border-border-subtle text-foreground-secondary hover:bg-surface-hover hover:text-foreground',
        ghost: 'bg-transparent text-foreground-muted hover:bg-surface-raised hover:text-foreground',
        outline:
            'bg-transparent border border-border text-foreground-muted hover:border-border-hover hover:text-foreground hover:bg-surface-raised',
        danger: 'bg-danger-surface border border-danger-border text-danger-text hover:bg-danger-hover hover:text-white',
        link: 'bg-transparent text-foreground-muted underline-offset-4 hover:underline hover:text-foreground p-0 h-auto',
    },
    active: {
        primary: 'bg-primary-active text-white',
        secondary: 'bg-surface-elevated text-foreground',
        surface: 'bg-surface-hover text-foreground',
        ghost: 'bg-surface-raised text-foreground',
        outline: 'bg-surface-raised text-foreground',
        danger: 'bg-danger-hover text-white',
        link: 'text-foreground underline',
        subtle: 'bg-primary-muted text-primary-accent',
    },
    size: {
        sm: 'min-h-8 px-3 text-xs',
        md: 'min-h-10 px-5 text-sm',
        lg: 'min-h-12 px-7 text-base',
        icon: 'size-10 p-2.5',
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
    'transition-colors duration-200 cursor-pointer select-none ' +
    'disabled:pointer-events-none disabled:opacity-50 ' +
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-accent';

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
