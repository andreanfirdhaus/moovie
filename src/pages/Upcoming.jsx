import React from "react";
import axios from "axios";
import request from "../config/request";
import { original, img_404, img_300 } from "../config/config";
// import MovSlide from "../components/Slider/MovSlide";
import TvSlide from "../components/slider/TvSlide";
import Nav from "../components/layout/navigation";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

// Import Modules Swiper
import { Autoplay, Navigation } from "swiper/modules";

// Import Swiper styles
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

export default function Upcoming() {
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
        <>
            <div className="bg-[#F0F1F2] dark:bg-black_primary antialiased">
                <div className="container mx-auto px-4 md:px-12 py-10">
                    <section className="mb-2 md:mb-15 ">
                        <React.Suspense fallback={" "}>
                            <MovSlide
                                title="Upcoming in Indoensia"
                                fetchUrl={request.upcomingIDN}
                                // onOpenModal={handleOpenModal}
                            />
                        </React.Suspense>
                    </section>
                </div>
            </div>
        </>
    );
}
