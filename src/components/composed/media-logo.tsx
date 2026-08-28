interface MediaLogoProps {
    logoUrl?: string | null;
    title?: string;
    year?: string | number | null;
    className?: string;
}

export default function MediaLogo({ logoUrl, title, year, className }: MediaLogoProps) {
    if (logoUrl) {
        return (
            <img
                src={logoUrl}
                alt={title || ''}
                className={`h-auto w-auto max-h-16 lg:max-h-20 xl:max-h-28 object-contain ${className || ''}`}
                loading='lazy'
                draggable={false}
            />
        );
    }

    return (
        <h1
            className={`mb-1 text-2xl font-bold text-foreground text-balance sm:text-3xl lg:text-4xl ${className || ''}`}>
            {title}
            {year ? ` (${year})` : null}
        </h1>
    );
}
