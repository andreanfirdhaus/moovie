import React from "react";
import getUrl from "../../config/getUrl";
import axios from "axios";

// Import Swiper React components
import { img_300, img_404 } from "../../config/config";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/scrollbar";

// impot lazy loading
import {
    LazyLoadImage,
    trackWindowScroll,
} from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function MSlide({ title, fetchUrl }) {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        async function fetchData() {
            const requests = await axios.get("/api/" + fetchUrl);
            setItems(requests.data.results);
        }
        fetchData();
    }, []);
    // console.log(items);

    const params = {
        slidesPerView: 1,
        spaceBetween: 18,
        centeredSlides: false,
        slidesPerGroupSkip: 1,
        grabCursor: false,
        className: "mySwiper",
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
                spaceBetween: 11,
            },
        },
    };

    return (
        <div>
            <p className="text-xl md:text-xl font-bold capitalize tracking-wider dark:text-white">
                {title}
            </p>
            <Swiper {...params}>
                {items.map((movie, index) => (
                    <SwiperSlide key={index}>
                        <div className="py-3 sm:py-5 hover:scale-105 transition duration-300 ease-in-out">
                            <LazyLoadImage
                                effect="blur"
                                src={
                                    movie.poster_path
                                        ? img_300 + movie.poster_path
                                        : img_404
                                }
                                alt={movie.title}
                                className="bg-contain bg-center rounded-md drop-shadow-lg "
                            />
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export default trackWindowScroll(MSlide);
