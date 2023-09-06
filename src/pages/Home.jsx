import React from "react";
import HomeImg from "../components/assets/Homepage_Poster.jpg";
import NavHomePage from "../components/NavHomePage";
import { Link } from "react-router-dom";
import imgDesktop from "../components/assets/homepageDesktop.png";
import imgMobile from "../components/assets/homepageMobile.png";
export default function Home() {
    return (
        <div>
            <NavHomePage />
            <div className="relative overflow-hidden bg-gradient-to-b from-blackDark via-blackSecondary to-blackDark">
                <img
                    src={HomeImg}
                    className="h-screen sm:h-96 md:h-screen w-full object-cover object-center mix-blend-color-normal dark:mix-blend-color-dodge"
                    alt="PageImg"
                    draggable="false"
                />

                <div className="absolute top-1/3 sm:top-1/2 text-whiteLight dark:text-white w-full text-center">
                    <h1 className="text-2xl md:text-3xl font-extrabold capitalize tracking-wide drop-shadow-xl">
                        get the latest movie information <br /> Movie n'
                        TvSeries
                    </h1>

                    <Link to="/movie">
                        <div
                            className="text-xl tracking-wider font-bold underline-offset-8 px-2 pt-5 rounded-xl ease-in-out transition hover:underline hover:-translate-y-1.5 hover:duration-300"
                            style={{ WebkitTapHighlightColor: "transparent" }}
                        >
                            get started
                        </div>
                    </Link>
                </div>
            </div>

            <section className="bg-blackSecondary dark:bg-base w-full">
                <div className="container mx-auto sm:px-4 md:px-12">
                    <div className="h-screen px-5 hidden sm:flex sm:items-center">
                        <img src={imgDesktop} alt="" />
                    </div>
                    <div className="h-screen px-5 md:hidden flex items-center">
                        <img src={imgMobile} alt="" />
                    </div>
                </div>
            </section>
        </div>
    );
}
