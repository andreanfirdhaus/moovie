import React from "react";
// import MovSlide from "../components/Slider/MovSlide";
import TvSlide from "../components/Slider/TvSlide";
import request from "../config/request";
import axios from "axios";
import { original, img_404, img_300 } from "../config/config";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import SwiperCore from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
const MovSlide = React.lazy(() => import("../components/Slider/MovSlide"));

function Upcoming() {
    const [trending, setTrending] = React.useState([]);
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=de3790bae60efc6e28ac47556fab38b1&language=en-US&region=ID&sort_by=primary_release_date.dsc&page=1&primary_release_date.gte=2023-04-01&primary_release_date.lte=2024-01-01`;

    const response = async () => {
        const {
            data: { results },
        } = await axios.get(url);
        setTrending(results);
    };

    React.useEffect(() => {
        response();
    }, []);
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

    SwiperCore.use([Autoplay]);
    return (
        <div className="bg-whiteLight dark:bg-blackSecondary antialiased py-20">
            <div className="container mx-auto px-4 md:px-12 py-10">
                <p className="text-xl md:text-xl font-bold capitalize tracking-wider dark:text-white">
                    UPCOMING ON 2023
                </p>
                <Swiper {...params}>
                    {trending.slice(0, 20).map((movie, index) => (
                        <SwiperSlide key={index}>
                            <div className="py-3 sm:py-5 ">
                                <img
                                    src={
                                        movie.poster_path
                                            ? img_300 + movie.poster_path
                                            : img_404
                                    }
                                    alt={movie.title}
                                    className="bg-contain bg-center rounded-md drop-shadow-lg"
                                />

                                <div className="py-2 relative">
                                    {/* <div className="max-w-5 py-3">
                                        <div
                                            className="drop-shadow-lg bg-white rounded-full text-sm ml-2"
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
                                    <p className="font-semibold text-base dark:text-white">
                                        {movie.title.length > 17
                                            ? `${movie.title.substring(
                                                  0,
                                                  17
                                              )}...`
                                            : movie.title}
                                    </p>
                                    <p className="font-normal dark:text-white">
                                        {new Date(
                                            movie.release_date
                                                ? movie.release_date
                                                : movie.first_air_date
                                        )
                                            .toGMTString()
                                            .split(" ")
                                            .slice(0, 4)
                                            .join(" ")}
                                    </p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </div>
    );
}

export default Upcoming;
