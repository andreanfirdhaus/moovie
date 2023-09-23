import React from "react";
import logo from "./assets/moovie-logo.svg";

function Footer() {
    return (
        <>
            <div className="bg-[#152F40] dark:bg-black_primary">
                <footer className="max-w-7xl mx-auto py-6 sm:py-0 px-4 sm:px-6 lg:px-8">
                    <div className="container mx-auto space-y-6">
                        <div className="px-12 pt-12 space-y-8 md:flex md:justify-between md:px-6 md:space-y-0">
                            <div className="flex flex-col my-6 space-y-4 md:m-0">
                                <a
                                    href="#"
                                    className="flex justify-center space-x-3 md:justify-start"
                                >
                                    <img
                                        src={logo}
                                        alt=""
                                        className="h-7"
                                        draggable="false"
                                    />
                                </a>
                                <p className="text-center md:max-w-sm md:text-left text-base font-normal tracking-wide text-whiteLight dark:text-white">
                                    A basic website that gives you quick deets
                                    about a{" "}
                                    <a
                                        href="http://www.staggeringbeauty.com/"
                                        target={`_blank`}
                                        className="underline decoration-whiteLight"
                                    >
                                        movie
                                    </a>
                                </p>
                            </div>
                            {/* <div className="flex flex-wrap justify-center lg:space-x-8 text-whiteLight dark:text-white">
                                <div className="p-6 md:py-0">
                                    <p className="pb-2 text-lg font-bold tracking-wide">
                                        Support
                                    </p>
                                    <ul className="space-y-1 text-sm text-gray-300 list-none">
                                        <li className="text-sm md:text-base tracking-wide">
                                            <a href="#">Help</a>
                                        </li>
                                        <li className="text-sm md:text-base tracking-wide">
                                            <a href="">Privacy</a>
                                        </li>
                                        <li className="text-sm md:text-base tracking-wide">
                                            <a href="#">Status</a>
                                        </li>
                                    </ul>
                                </div>

                                <div className="p-6 md:py-0 md:pr-0">
                                    <p className="pb-2 text-lg font-bold tracking-wide ">
                                        Category
                                    </p>
                                    <ul className="space-y-1 text-sm text-gray-300 list-none">
                                        <li className="text-sm md:text-base tracking-wide">
                                            <a href="#">Action</a>
                                        </li>
                                        <li className="text-sm md:text-base tracking-wide">
                                            <a href="#">Comedy</a>
                                        </li>
                                        <li className="text-sm md:text-base tracking-wide">
                                            <a href="#">Drama</a>
                                        </li>
                                    </ul>
                                </div>
                            </div> */}
                        </div>
                        <div className="flex flex-col-reverse items-center justify-center p-4 text-center sm:flex-row text-whiteLight dark:text-white">
                            <div className="flex flex-col self-center text-sm text-center md:block lg:col-start-1 md:space-x-6 tracking-wide font-semibold">
                                <span>&copy; 2022 All rights reserved</span>
                            </div>
                            <div className="flex justify-center pt-4 space-x-4 lg:pt-0 lg:col-end-13"></div>
                        </div>
                    </div>
                </footer>
            </div>
        </>
    );
}

export default Footer;
