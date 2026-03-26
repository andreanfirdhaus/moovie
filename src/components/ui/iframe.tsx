interface IFrameProps {
    playerUrl: string;
}

export default function IFrame({ playerUrl }: IFrameProps) {
    return (
        <div className='relative max-sm:h-64 sm:aspect-video rounded-xl border border-zinc-800 overflow-hidden'>
            <iframe
                key={playerUrl}
                src={playerUrl}
                className='w-full h-full'
                allowFullScreen
                allow='autoplay; encrypted-media; picture-in-picture'
                referrerPolicy='origin'
            />
        </div>
    );
}
