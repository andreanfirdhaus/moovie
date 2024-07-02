import React, { useState } from 'react';
import getUrl from '../../config/getUrl';
import { img_300, img_404 } from '../../config/config';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/scrollbar';

//import lazy loading
import {
    LazyLoadImage,
    trackWindowScroll,
} from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

function MSlide({ title, fetchUrl, onOpenModal }) {
    const [items, setItems] = React.useState([]);

    const handleOpenModal = () => {
        onOpenModal(); // Memanggil fungsi yang diterima sebagai prop untuk membuka modal
    };

    React.useEffect(() => {
        async function fetchData() {
            const requests = await getUrl.get(fetchUrl);
            setItems(requests.data.results);
        }
        fetchData();
    }, []);

    const params = {
        slidesPerView: 1,
        spaceBetween: 18,
        centeredSlides: false,
        slidesPerGroupSkip: 1,
        grabCursor: false,
        breakpoints: {
            320: {
                slidesPerView: 3,
                spaceBetween: 10,
            },
            768: {
                slidesPerView: 5,
                spaceBetween: 12,
            },
            1024: {
                slidesPerView: 8,
                spaceBetween: 20,
            },
        },
    };

    return (
        <>
            <div>
                <p className='text-xl md:text-xl font-bold capitalize tracking-wider dark:text-white'>
                    {title}
                </p>
                <Swiper {...params}>
                    {items.map((movie, index) => (
                        <SwiperSlide key={index}>
                            <div className='py-3 sm:py-4'>
                                <LazyLoadImage
                                    effect='blur'
                                    src={
                                        movie.poster_path ?
                                            img_300 + movie.poster_path
                                        :   img_404
                                    }
                                    alt={movie.name}
                                    className='bg-contain bg-center rounded-md drop-shadow-lg hover:scale-105 transition duration-300 ease-in-out'
                                    style={{ transition: '0.2s ease-in-out' }}
                                />

                                <div className='py-2 relative'>
                                    {/* <div className="max-w-5 py-3">
                                    <div
                                        className="bg-white drop-shadow-lg rounded-full text-sm ml-2"
                                        style={{
                                            height: "30px",
                                            width: "30px",
                                            justifyContent: "center",
                                            display: "flex",
                                            alignItems: "center",
                                        }}
                                    >
                                        <p className="font-bold dark:font-normal text-blackDark">
                                            {movie.vote_average}
                                        </p>
                                    </div>
                                </div> */}
                                    <p className='font-semibold text-base dark:text-white tracking-normal'>
                                        {movie.title.length > 17 ?
                                            `${movie.title.substring(0, 17)}...`
                                        :   movie.title}
                                    </p>
                                    <p className='font-normal dark:text-white'>
                                        {new Date(
                                            movie.release_date ?
                                                movie.release_date
                                            :   movie.first_air_date,
                                        )
                                            .toDateString()
                                            .split(' ')
                                            .slice(1, 4)
                                            .join(' ')}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    );
}

export default trackWindowScroll(MSlide);
