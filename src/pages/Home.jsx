import React from "react";
import HomeImg from "../assets/Homepage_Poster.jpg";
import NavHomePage from "../components/NavHomePage";
import { Link } from "react-router-dom";
import imgDesktop from "../assets/homepageDesktop.svg";
import imgMobile from "../assets/homepageMobile.svg";

export default function Home() {
    return (
        <>
            <NavHomePage />
            <div className="relative overflow-hidden ">
                <div className="absolute inset-0 dark:bg-gradient-to-b dark:from-black_primary/75 dark:via-black_primary/75 dark:to-black_primary"></div>

                <img
                    src={HomeImg}
                    className="h-screen sm:h-96 md:h-[46rem] w-full object-cover object-center"
                    alt="homepage-image"
                    draggable="false"
                />

                <div className="absolute top-1/3 sm:top-4/3 text-whiteLight dark:text-[#F0F1F2] w-full text-center">
                    <h1 className="text-2xl md:text-4xl font-extrabold capitalize tracking-wide drop-shadow-xl">
                        get the latest movie information <br /> Movie n'
                        TvSeries
                    </h1>

                    <Link to="/movie">
                        <div
                            className="text-xl tracking-wider font-bold underline-offset-8 px-2 pt-5 rounded-xl ease-in-out transition hover:underline hover:-translate-y-1.5 hover:duration-300"
                            style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                            Check this out!
                        </div>
                    </Link>
                </div>
            </div>

            <section className="bg-[#F0F1F2] dark:bg-black_primary w-full">
                <div className="container mx-auto sm:px-4 md:px-12">
                    <div className="pt-28 text-center text-3xl font-bold trakcing-wider dark:text-[#F0F1F2]  ">
                        The Devices
                    </div>
                    <div className="h-screen px-5 hidden sm:flex sm:items-center">
                        <img src={imgDesktop} alt="desktop-devices" />
                    </div>
                    <div className="h-screen px-5 md:hidden flex items-center">
                        <img src={imgMobile} alt="mobile-devices" />
                    </div>
                </div>
            </section>
        </>
    );
}
