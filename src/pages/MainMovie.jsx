import React, { useState } from "react";
import axios from "axios";

import request from "../config/request";
import { original, img_300, img_404 } from "../config/config";
import ToggleSwitcher from "../components/ToggleSwitcher";
import Nav from "../components/Nav";

import { FaStar } from "react-icons/fa";

// Import Swiper React Components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

// Import Modules Swiper
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";

// Import React Lazy Loading
import "react-lazy-load-image-component/src/effects/blur.css";
import {
    LazyLoadComponent,
    LazyLoadImage,
} from "react-lazy-load-image-component";
const MovSlide = React.lazy(() => import("../components/slider/MovSlide"));

export default function MainMovie() {
    const [trending, setTrending] = React.useState([]);
    const url = `/api/trending/movie/day?api_key=${
        import.meta.env.VITE_API_KEY
    }&language=en-US&page=1`;

    // start test api switcher
    const [testUrl, setTestUrl] = React.useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [hoveredImage, setHoveredImage] = useState(null);

    const url_testSwitcher = `/api/trending/tv/${
        isChecked ? "week" : "day"
    }?api_key=${import.meta.env.VITE_API_KEY}&language=en-US&page=1`;

    const responseTest = async () => {
        const {
            data: { results },
        } = await axios.get(url_testSwitcher);
        setTestUrl(results);
    };
    // end test api switcher

    const response = async () => {
        const {
            data: { results },
        } = await axios.get(url);
        setTrending(results);
    };

    React.useEffect(() => {
        response();
        responseTest();
    }, [isChecked]);

    SwiperCore.use([Autoplay]);

    return (
        <div>
            <Nav />
            <div className="bg-whiteLight dark:bg-base antialiased">
                <div className="hidden md:block">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        loop={true}
                        spaceBetween={20}
                        className="mySwiper px-0 md:px-12"
                        autoplay={{ delay: 5500 }}
                    >
                        {trending.slice(0, 10).map((movie, index) => (
                            <SwiperSlide key={index}>
                                <LazyLoadComponent visibleByDefault={false}>
                                    {/* ketika halaman dimuat maka LazyLoadComponent ini akan mengurangi resources download gambarnya, ketika LazyLoadComponent dihapus maka resources downloadn gambarnya besar sehingga dapat memperlambat halaman web */}
                                    <div className="flex flex-col md:flex-row mt-16 md:mt-20">
                                        <div className="bg-blackLight dark:bg-blackThird basis-1/2 flex items-center rounded-l-lg">
                                            <div className="sm:mx-10 md:mx-10 xl:mx-12">
                                                <h1 className="hidden md:flex sm:text-2xl md:text-2xl lg:text-3xl md:my-0 lg:my-2 font-bold text-whiteLight dark:text-white">
                                                    {""
                                                        ? movie.title
                                                        : movie.original_name
                                                        ? movie.name
                                                        : movie.title}
                                                </h1>
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
                                                            {"|"}
                                                        </div>

                                                        <FaStar
                                                            size={19}
                                                            style={{
                                                                color: "#eab308",
                                                            }}
                                                        />

                                                        <p className="font-bold mx-1">
                                                            {movie.vote_average.toFixed(
                                                                1
                                                            )}
                                                        </p>
                                                    </span>
                                                </div>
                                                <p className="hidden md:flex bg-transparent text-sm md:text-xs lg:text-base tracking-wide text-whiteLight dark:text-white py-5">
                                                    {movie.overview.length > 200
                                                        ? `${movie.overview.substring(
                                                              0,
                                                              180
                                                          )}` +
                                                          (" " + ".").repeat(3)
                                                        : movie.overview}
                                                </p>
                                            </div>
                                        </div>
                                        <div className="max-h-96 basis-2/3 bg-gradient-to-r from-blackLight via-transparent to-transparent dark:bg-gradient-to-r dark:from-blackThird dark:via-transparent dark:to-transparent">
                                            <LazyLoadImage
                                                visibleByDefault={true}
                                                src={
                                                    movie.backdrop_path
                                                        ? original +
                                                          movie.backdrop_path
                                                        : img_404
                                                }
                                                className="bg-contain bg-center mix-blend-overlay dark:mix-blend-darken rounded-r-lg"
                                                alt={movie.title}
                                            />
                                        </div>
                                    </div>
                                </LazyLoadComponent>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="container mx-auto sm:px-4 md:px-12 py-10 relative">
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        centeredSlides={false}
                        breakpoints={{
                            320: {
                                slidesPerView: 1,
                                spaceBetween: 10,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 20,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 20,
                            },
                        }}
                        className="mySwiper container mx-auto pl-7 md:pl-20 py-24 md:py-24 lg:py-32 relative "
                        style={{
                            // jika gambar terhover maka tampilkan backdrop_path jika tidak maka backdrop_path dari arrah [0] akan ditampilkan
                            background: hoveredImage
                                ? `url(${
                                      original + hoveredImage
                                  }) no-repeat center center`
                                : testUrl.length > 0
                                ? `url(${
                                      original + testUrl[0].backdrop_path
                                  }) no-repeat center center`
                                : " ",
                            transition: "0.3s ease-in-out",
                        }}
                    >
                        <div className="absolute top-10 flex items-center gap-5 z-10">
                            <h1 className="text-xl md:text-xl font-bold capitalize tracking-wider dark:text-white">
                                TRENDING
                            </h1>
                            <ToggleSwitcher
                                isChecked={isChecked}
                                setIsChecked={setIsChecked}
                            />
                        </div>

                        <div className="absolute inset-0 bg-gradient-to-r from-blackDark via-blackDark/25 to-blackDark "></div>
                        {testUrl.map((movie, index) => (
                            <SwiperSlide
                                key={index}
                                onMouseEnter={() =>
                                    setHoveredImage(movie.backdrop_path)
                                }
                                onMouseLeave={() =>
                                    setHoveredImage(movie.backdrop_path)
                                }
                            >
                                <div className="hover:scale-105 transition duration-300 ease-in-out">
                                    <LazyLoadImage
                                        effect="blur"
                                        src={
                                            movie.backdrop_path
                                                ? img_300 + movie.backdrop_path
                                                : img_404
                                        }
                                        alt={movie.title}
                                        onMouseLeave={() =>
                                            setHoveredImage(null)
                                        }
                                        className="bg-contain bg-center rounded-md drop-shadow-lg "
                                    />
                                </div>
                                <div className="py-2 flex justify-center">
                                    <p className="font-semibold text-base lg:text-lg dark:text-white">
                                        {movie.name.length > 17
                                            ? `${movie.name.substring(
                                                  0,
                                                  15
                                              )}...`
                                            : movie.name}
                                    </p>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="container mx-auto px-4 md:px-12 py-10">
                    <section className="mb-2 md:mb-15 ">
                        <React.Suspense fallback={" "}>
                            <MovSlide
                                title="popular"
                                fetchUrl={request.popular}
                            />
                        </React.Suspense>
                    </section>

                    <section className="mb-2 md:mb-15">
                        <React.Suspense fallback={" "}>
                            <MovSlide
                                title="Horror"
                                fetchUrl={request.horror}
                            />
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
                            <MovSlide
                                title="mystery"
                                fetchUrl={request.mystery}
                            />
                        </React.Suspense>
                    </section>
                </div>
            </div>
        </div>
    );
}
