import { useEffect, useState } from 'react';
import { getTrailers } from '@/api/detail/route';

interface TrailerModalProps {
    isOpen: boolean;
    onClose: () => void;
    movieId: number;
    mediaType: string;
}

export const TrailerModal = ({ isOpen, onClose, movieId, mediaType }: TrailerModalProps) => {
    const [trailerKey, setTrailerKey] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (isOpen && movieId) {
            fetchTrailer();
        }

        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, movieId]);

    const fetchTrailer = async () => {
        try {
            setIsLoading(true);
            const response = await getTrailers(mediaType, movieId.toString(), {});

            const videos = response.data.results;
            const trailer = videos.find((v: any) => v.type === 'Trailer' && v.site === 'YouTube') || videos[0];

            setTrailerKey(trailer?.key || null);
        } catch (error) {
            console.error('Error fetching trailer:', error);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className='fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-sm'
            onClick={onClose}>
            <div className='relative w-full max-w-5xl mx-4' onClick={(e) => e.stopPropagation()}>
                <div className='relative bg-black rounded-lg overflow-hidden' style={{ paddingBottom: '60%' }}>
                    {isLoading ?
                        <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='text-white'>Loading trailer...</div>
                        </div>
                    : trailerKey ?
                        <iframe
                            className='absolute inset-0 w-full h-full'
                            src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1&controls=1&modestbranding=1&rel=0&showinfo=0&fs=1&color=white&playsinline=1&iv_load_policy=3&vq=hd1080&cc_load_policy=0&disablekb=0`}
                            title='Trailer'
                            allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                            allowFullScreen
                        />
                    :   <div className='absolute inset-0 flex items-center justify-center'>
                            <div className='text-white'>No trailer available</div>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

// import { useEffect, useState } from 'react';
// import { X } from 'lucide-react';
// import ReactPlayer from 'react-player';
// import { getTrailers } from '@/api/detail/route';

// interface TrailerModalProps {
//     isOpen: boolean;
//     onClose: () => void;
//     movieId: number;
//     mediaType: string;
// }

// export const TrailerModal = ({ isOpen, onClose, movieId, mediaType }: TrailerModalProps) => {
//     const [trailerKey, setTrailerKey] = useState<string | null>(null);
//     const [isLoading, setIsLoading] = useState(false);

//     useEffect(() => {
//         if (isOpen && movieId) {
//             fetchTrailer();
//         }

//         if (isOpen) {
//             document.body.style.overflow = 'hidden';
//         } else {
//             document.body.style.overflow = 'unset';
//             setTrailerKey(null);
//         }

//         return () => {
//             document.body.style.overflow = 'unset';
//         };
//     }, [isOpen, movieId]);

//     const fetchTrailer = async () => {
//         try {
//             setIsLoading(true);
//             const response = await getTrailers(mediaType, movieId.toString(), {});

//             const videos = response.data.results;
//             const trailer = videos.find((v: any) =>
//                 v.type === 'Trailer' && v.site === 'YouTube'
//             ) || videos[0];

//             setTrailerKey(trailer?.key || null);
//         } catch (error) {
//             console.error('Error fetching trailer:', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     if (!isOpen) return null;

//     return (
//         <div
//             className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
//             onClick={onClose}
//         >
//             <div
//                 className="relative w-full max-w-5xl"
//                 onClick={(e) => e.stopPropagation()}
//             >
//                 <button
//                     onClick={onClose}
//                     className="absolute -top-12 right-0 text-white hover:text-zinc-300 transition-colors z-10"
//                     aria-label="Close trailer"
//                 >
//                     <X size={32} />
//                 </button>

//                 <div className="relative bg-black rounded-lg overflow-hidden aspect-video">
//                     {isLoading ? (
//                         <div className="absolute inset-0 flex items-center justify-center">
//                             <div className="text-white text-lg">Loading trailer...</div>
//                         </div>
//                     ) : trailerKey ? (
//                         <ReactPlayer
//                             src={`https://www.youtube.com/watch?v=${trailerKey}`}
//                             playing={false}
//                             controls={false}
//                             width="100%"
//                             height="100%"
//                             volume={0.8}
//                             config={{
//                                 youtube: {
//                                     playerVars: {
//                                         autoplay: 1,
//                                         modestbranding: 1,
//                                         rel: 0,
//                                         showinfo: 0,
//                                         color: 'white'
//                                     }
//                                 } as any
//                             }}
//                         />
//                     ) : (
//                         <div className="absolute inset-0 flex items-center justify-center">
//                             <div className="text-white text-lg">No trailer available</div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </div>
//     );
// };
