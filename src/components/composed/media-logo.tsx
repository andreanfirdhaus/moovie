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
                className={`h-auto w-auto max-h-12 md:max-h-16 lg:max-h-20 xl:max-h-28 object-contain ${className || ''}`}
                loading='lazy'
                draggable={false}
            />
        );
    }

    return (
        <h1
            className={`text-2xl sm:text-3xl lg:text-4xl xl:text-[40px] xl:leading-[1.2] font-bold text-zinc-100 mb-1 text-balance ${className || ''}`}>
            {title}
            {year ? ` (${year})` : null}
        </h1>
    );
}
