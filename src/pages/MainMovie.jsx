import React, { useState } from "react";
import axios from "axios";
import request from "../config/request";
import { original, img_300, img_404 } from "../config/config";
import Nav from "../components/Nav";
import Modal from "../components/Modal";
import ToggleSwitcher from "../components/ToggleSwitcher";
import backgroundHeader from "../components/assets/search-background.png";
import { FiSearch } from "react-icons/fi";

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
    const [data, setData] = React.useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const [hoveredImage, setHoveredImage] = useState(null); // State awal dari hoverImage untuk set background
    // const [selectedLabel, setSelectedLabel] = useState(false);

    const [showModal, setShowModal] = useState(false); // State awal dari modal
    const handleOpenModal = () => {
        setShowModal(true);
    };
    const handleCloseModal = () => {
        setShowModal(false);
    };

    const url = `/api/trending/tv/${isChecked ? "week" : "day"}?api_key=${
        import.meta.env.VITE_API_KEY
    }&language=en-US&page=1`;

    const responseTest = async () => {
        const {
            data: { results },
        } = await axios.get(url);
        setData(results);
    };

    // const handleLabelChange = (label) => {
    // setSelectedLabel(label);
    // Selanjutnya, Anda dapat menambahkan logika untuk mengubah background
    // atau mengambil data sesuai dengan label yang dipilih di sini.
    // };

    React.useEffect(() => {
        responseTest();
    }, [isChecked]);

    SwiperCore.use([Autoplay]);

    return (
        <>
            <Nav />
            <Modal show={showModal} onClose={handleCloseModal} />
            <div className="bg-[#F0F1F2] dark:bg-black_primary antialiased">
                <div className="container mx-auto sm:px-4 md:px-12 py-10">
                    <div
                        className="h-80 bg-white p-12 mt-6 md:mt-20 flex flex-col gap-3"
                        style={{
                            backgroundImage: `url(${backgroundHeader})`,
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <h1 className="text-xl md:text-2xl font-bold text-white">
                            <span className="text-xl md:text-2xl"> 👋 </span>Hi
                            Folks, welcome back
                        </h1>
                        <h1 className="text-lg md:text-xl font-semibold text-white text-center md:text-left">
                            Millions of movies and TV shows. Explore now, Less
                            goo
                        </h1>
                        <div className=" flex overflow-hidden sm:py-12">
                            <div className="relative">
                                <div className="mx-auto max-w-md">
                                    <form
                                        action=""
                                        className="relative mx-auto w-max bg-whiteLight dark:bg-whiteDark rounded-xl"
                                    >
                                        <input
                                            type="search"
                                            placeholder="Search"
                                            className="peer relative h-10 w-96 cursor-pointer rounded-xl text-sm tracking-wider bg-transparent pl-12 outline-none focus:w-96 focus:cursor-text focus:pl-12 focus:pr-4 hover:pr-4"
                                        />
                                        <FiSearch className="absolute inset-y-0 my-auto z-0 h-8 w-12 border-r border-transparent px-3.5" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="container mx-auto px-4 md:px-12 py-10">
                    <section className="mb-2 md:mb-15 ">
                        <React.Suspense fallback={" "}>
                            <MovSlide
                                title="popular"
                                fetchUrl={request.popular}
                                onOpenModal={handleOpenModal}
                            />
                        </React.Suspense>
                    </section>
                </div>

                <div className="container sm:max-w-[80%] mx-auto sm:px-4 md:px-12 py-10 relative">
                    <div className="hidden md:block">
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
                            className="mySwiper container mx-auto pl-7 md:pl-20 py-24 md:py-24 lg:py-28 relative"
                            style={{
                                // jika gambar terhover maka tampilkan backdrop_path jika tidak maka backdrop_path dari arrah [0] akan ditampilkan
                                background: hoveredImage
                                    ? `url(${
                                          original + hoveredImage
                                      }) no-repeat center top `
                                    : data.length > 0
                                    ? `url(${
                                          original + data[0].backdrop_path
                                      }) no-repeat center top `
                                    : " ",
                                transition: "0.3s ease-in-out",
                            }}
                        >
                            <div className="absolute top-16 flex items-center gap-5 z-10">
                                <h1 className="text-xl md:text-xl font-bold capitalize tracking-wider text-white_primary dark:text-white">
                                    Trending
                                </h1>
                                <ToggleSwitcher
                                    labels={["Today", "This week"]}
                                    // onLabelChange={handleLabelChange}
                                    isChecked={isChecked}
                                    setIsChecked={setIsChecked}
                                />
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-r from-black_primary via-black_primary/25 to-black_primary "></div>
                            {data.map((movie, index) => (
                                <SwiperSlide
                                    key={index}
                                    onMouseEnter={() =>
                                        setHoveredImage(movie.backdrop_path)
                                    }
                                    onMouseLeave={() =>
                                        setHoveredImage(movie.backdrop_path)
                                    }
                                    className="pt-32"
                                >
                                    <div className="hover:scale-105 transition duration-300 ease-in-out">
                                        <LazyLoadImage
                                            effect="blur"
                                            src={
                                                movie.backdrop_path
                                                    ? img_300 +
                                                      movie.backdrop_path
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
                                        <p className="font-semibold text-base lg:text-xl tracking-wider dark:text-white">
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
                </div>

                <div className="container mx-auto px-4 md:px-12 py-10">
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
        </>
    );
}
