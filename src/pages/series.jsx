import React from 'react';
import axios from 'axios';
import request from '../config/request';
import { original, img_404 } from '../config/config';
import Nav from '../components/layout/navigation';
import { TiStarFullOutline } from 'react-icons/ti';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';

// Import Modules Swiper
import { Autoplay, Navigation } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';

// Import React Lazy Loading
import {
    LazyLoadImage,
    trackWindowScroll,
} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
const TvSlide = React.lazy(() => import('../components/slider/TvSlide'));

function Series() {
    const [tvSeries, setTvSeries] = React.useState([]);
    const url = `/api/trending/tv/day?api_key=${
        import.meta.env.VITE_API_KEY
    }&language=en-US&page=1`;

    const response = async () => {
        const {
            data: { results },
        } = await axios.get(url);
        setTvSeries(results);
    };

    React.useEffect(() => {
        response();
    }, []);

    SwiperCore.use([Autoplay]);
    return (
        <>
            <div className='bg-[#F0F1F2] dark:bg-black_primary antialiased'>
                <div>
                    <Swiper
                        // navigation={true}
                        modules={[Navigation, Autoplay]}
                        loop={true}
                        // calculateHeight={true}
                        spaceBetween={20}
                        className='mySwiper px-0 md:px-12'
                        autoplay={{ delay: 6000 }}>
                        {tvSeries.slice(0, 10).map((movie, index) => (
                            <SwiperSlide key={index}>
                                <div className='flex flex-col md:flex-row mt-16 md:mt-20'>
                                    <div className='bg-blackLight dark:bg-blackThird basis-1/2 flex items-center rounded-l-lg'>
                                        <div className='sm:mx-10 md:mx-10 xl:mx-12'>
                                            <h1 className='hidden md:flex sm:text-2xl md:text-2xl lg:text-3xl font-semibold md:my-0 text-white_primary'>
                                                {'' ?
                                                    movie.title
                                                : movie.original_name ?
                                                    movie.name
                                                :   movie.title}
                                            </h1>
                                            <div className='hidden md:flex text-sm xl:text-base font-semibold lg:my-2 text-white_primary '>
                                                {/* {new Date(
                                                    movie.release_date
                                                        ? movie.release_date
                                                        : movie.first_air_date
                                                )
                                                    .toGMTString()
                                                    .split(" ")
                                                    .slice(0, 4)
                                                    .join(" ")} */}
                                                {new Date(
                                                    movie.release_date ?
                                                        movie.release_date
                                                    :   movie.first_air_date,
                                                )
                                                    .toLocaleDateString(
                                                        'en-US', // format en-US menampilkan M D, Y  || format ID menampilkan D M, Y
                                                        {
                                                            day: 'numeric',
                                                            month: 'short',
                                                            year: 'numeric',
                                                        },
                                                    )
                                                    .split(' ')
                                                    .join(' ')}
                                                <span className='inline-flex'>
                                                    <div className='mx-2'>
                                                        {'•'}
                                                    </div>

                                                    <TiStarFullOutline
                                                        size={23}
                                                    />

                                                    <p className='font-bold mx-1'>
                                                        {movie.vote_average.toFixed(
                                                            1,
                                                        )}
                                                    </p>
                                                </span>
                                            </div>

                                            <p className='hidden md:flex bg-transparent text-sm md:text-xs lg:text-base tracking-wide text-white_primary'>
                                                {movie.overview.length > 200 ?
                                                    `${movie.overview.substring(
                                                        0,
                                                        200,
                                                    )}` + (' ' + '.').repeat(3)
                                                :   movie.overview}
                                            </p>
                                        </div>
                                    </div>
                                    <div className='max-h-96 basis-1/2 bg-gradient-to-r from-blackLight via-transparent to-transparent dark:bg-gradient-to-r dark:from-blackThird dark:via-transparent dark:to-transparent '>
                                        <LazyLoadImage
                                            visibleByDefault={true}
                                            src={
                                                movie.backdrop_path ?
                                                    original +
                                                    movie.backdrop_path
                                                :   img_404
                                            }
                                            className='bg-contain bg-center mix-blend-overlay dark:mix-blend-darken rounded-r-lg'
                                            alt={movie.title}
                                        />
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className='container mx-auto px-4 md:px-12 py-10'>
                    <section className='mb-2 md:mb-15 '>
                        <React.Suspense fallback={' '}>
                            <TvSlide
                                title='Top Rated'
                                fetchUrl={request.tvTopRated}
                            />
                        </React.Suspense>
                    </section>
                </div>
            </div>
        </>
    );
}
export default trackWindowScroll(Series);
