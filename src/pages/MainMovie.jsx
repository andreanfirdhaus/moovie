import React from "react";
import request from "../config/request";
import axios from "axios";
import { original, img_404 } from "../config/config";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper";
import SwiperCore from "swiper";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
const MovSlide = React.lazy(() => import("../components/Slider/MovSlide"));

import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

function MainMovie() {
    const [trending, setTrending] = React.useState([]);
    const url = `/api/trending/movie/day?api_key=${
        import.meta.env.VITE_API_KEY
    }&language=en-US&page=1`;

    const response = async () => {
        const {
            data: { results },
        } = await axios.get(url);
        setTrending(results);
    };

    React.useEffect(() => {
        response();
    }, []);

    SwiperCore.use([Autoplay]);
    return (
        <div className="bg-whiteLight dark:bg-blackSecondary antialiased">
            <div>
                <Swiper
                    modules={[Navigation, Autoplay]}
                    loop={true}
                    spaceBetween={20}
                    className="mySwiper px-0 md:px-12"
                    autoplay={{ delay: 6300 }}
                >
                    {trending.slice(0, 10).map((movie, index) => (
                        <SwiperSlide key={index}>
                            <div className="flex flex-col md:flex-row mt-16 md:mt-20">
                                <div className="bg-blackLight dark:bg-blackThird basis-1/2 flex items-center rounded-l-lg">
                                    <div className="sm:mx-10 md:mx-10 xl:mx-12">
                                        <div className="hidden md:flex text-sm xl:text-base font-bold text-whiteLight dark:text-white">
                                            {new Date(
                                                movie.release_date
                                                    ? movie.release_date
                                                    : movie.first_air_date
                                            )
                                                .toGMTString()
                                                .split(" ")
                                                .slice(0, 4)
                                                .join(" ")}
                                            <span className="inline-flex">
                                                <div className="mx-2">
                                                    {"•"}
                                                </div>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-4 w-4"
                                                    viewBox="0 0 576 450"
                                                    fill="currentColor"
                                                >
                                                    <path d="M381.2 150.3L524.9 171.5C536.8 173.2 546.8 181.6 550.6 193.1C554.4 204.7 551.3 217.3 542.7 225.9L438.5 328.1L463.1 474.7C465.1 486.7 460.2 498.9 450.2 506C440.3 513.1 427.2 514 416.5 508.3L288.1 439.8L159.8 508.3C149 514 135.9 513.1 126 506C116.1 498.9 111.1 486.7 113.2 474.7L137.8 328.1L33.58 225.9C24.97 217.3 21.91 204.7 25.69 193.1C29.46 181.6 39.43 173.2 51.42 171.5L195 150.3L259.4 17.97C264.7 6.954 275.9-.0391 288.1-.0391C300.4-.0391 311.6 6.954 316.9 17.97L381.2 150.3z" />
                                                </svg>

                                                <p className="font-bold mx-1">
                                                    {movie.vote_average.toFixed(
                                                        1
                                                    )}
                                                </p>
                                            </span>
                                        </div>
                                        <h1 className="hidden md:flex sm:text-2xl md:text-2xl lg:text-3xl md:my-0 lg:my-2 text-whiteLight dark:text-white">
                                            {""
                                                ? movie.title
                                                : movie.original_name
                                                ? movie.name
                                                : movie.title}
                                        </h1>
                                        <p className="hidden md:flex bg-transparent text-sm md:text-xs lg:text-base tracking-wide text-whiteLight dark:text-white">
                                            {movie.overview.length > 200
                                                ? `${movie.overview.substring(
                                                      0,
                                                      200
                                                  )}` + (" " + ".").repeat(3)
                                                : movie.overview}
                                        </p>
                                    </div>
                                </div>
                                <div className="max-h-3/4 basis-1/2 bg-gradient-to-r from-blackLight via-transparent to-transparent dark:bg-gradient-to-r dark:from-blackThird dark:via-transparent dark:to-transparent">
                                    <LazyLoadImage
                                        visibleByDefault={true}
                                        src={
                                            movie.backdrop_path
                                                ? original + movie.backdrop_path
                                                : img_404
                                        }
                                        className="bg-contain bg-center mix-blend-overlay dark:mix-blend-darken rounded-r-lg"
                                        alt={movie.title}
                                    />
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            <div className="container mx-auto px-4 md:px-12 py-10">
                <section className="mb-2 md:mb-15 ">
                    <React.Suspense fallback={" "}>
                        <MovSlide title="popular" fetchUrl={request.popular} />
                    </React.Suspense>
                </section>

                <section className="mb-2 md:mb-15">
                    <React.Suspense fallback={" "}>
                        <MovSlide title="Horror" fetchUrl={request.horror} />
                    </React.Suspense>
                </section>

                <section className="mb-2 md:mb-15">
                    <React.Suspense fallback={" "}>
                        <MovSlide title="drama" fetchUrl={request.drama} />
                    </React.Suspense>
                </section>

                <section className="mb-2 md:mb-15">
                    <React.Suspense fallback={" "}>
                        <MovSlide
                            title="action-advanture"
                            fetchUrl={request.action}
                        />
                    </React.Suspense>
                </section>

                <section className="mb-2 md:mb-15">
                    <React.Suspense fallback={" "}>
                        <MovSlide title="mystery" fetchUrl={request.mystery} />
                    </React.Suspense>
                </section>
            </div>
        </div>
    );
}

export default MainMovie;
