import { AnimatePresence } from 'framer-motion';
import { useIframeProgress } from '@/features/watch/hooks/use-iframe-progress';
import LoadingOverlay from '@/features/watch/components/loading-overlay';

interface PlayerFrameProps {
    playerUrl: string;
}

export default function PlayerFrame({ playerUrl }: PlayerFrameProps) {
    const { progress, isLoading, onIframeLoad } = useIframeProgress(playerUrl);

    return (
        <div className='relative max-sm:h-64 sm:aspect-video bg-surface-2 rounded-xl ring-1 ring-white/10 overflow-hidden'>
            <AnimatePresence>{isLoading && <LoadingOverlay progress={progress} />}</AnimatePresence>

            <iframe
                key={playerUrl}
                src={playerUrl}
                className='w-full h-full'
                allowFullScreen
                allow='autoplay; encrypted-media; picture-in-picture'
                referrerPolicy='no-referrer'
                sandbox='allow-scripts allow-same-origin allow-presentation'
                onLoad={onIframeLoad}
            />
        </div>
    );
}
