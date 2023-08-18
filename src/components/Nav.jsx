import React from "react";
import logo from "./assets/Logo.svg";
import Switcher from "./Switcher.jsx";
import { Transition } from "@headlessui/react";

export default function Nav() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div>
            <nav className="bg-blackLight dark:bg-blackDark fixed z-10 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 md:py-1">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <a href="/movie">
                                    <img
                                        className="h-8"
                                        src={logo}
                                        alt="Moovie"
                                        draggable="false"
                                    />
                                </a>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4 tracking-wider">
                                    <a
                                        href="/genre"
                                        className="text-whiteLight dark:text-white px-3 py-2 rounded-md text-sm font-bold"
                                    >
                                        <span className="inline-flex">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 640 512"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    clipRule="evenodd"
                                                    d="M399.3 509.7c-58.2-8.8-108.2-72.8-137.6-119.7c-20-31.9-25.1-70.3-19.6-107.7L266.3 118c1.4-9.8 5.1-19.2 12.9-25.2c20.2-15.6 72.4-41.5 185.1-24.5s155.2 57.4 170 78.3c5.7 8 6.5 18.1 5.1 27.9L615.2 338.8c-5.5 37.3-21.5 72.6-49.8 97.2c-41.7 36.1-108 82.5-166.1 73.7zm17.1-277.7c.1-.5 .2-1.1 .3-1.6c3.2-21.8-11.6-42-33.1-45.3s-41.5 11.8-44.7 33.5c-.1 .5-.1 1.1-.2 1.6c-.6 5.4 5.2 8.4 10.3 6.7c9-3 18.8-3.9 28.7-2.4s19.1 5.3 26.8 10.8c4.4 3.1 10.8 2 11.8-3.3zm112.6 22.2c4.4 3.1 10.8 2 11.8-3.3c.1-.5 .2-1.1 .3-1.6c3.2-21.8-11.6-42-33.1-45.3s-41.5 11.8-44.7 33.5c-.1 .5-.1 1.1-.2 1.6c-.6 5.4 5.2 8.4 10.3 6.7c9-3 18.8-3.9 28.7-2.4s19.1 5.3 26.8 10.8zm-11.5 85.2c-28.8 12.8-61.4 17.8-94.9 12.8s-63.2-19.5-87-40.3c-6.3-5.5-16.2-1.7-15.2 6.7c5.9 48.5 43 89.1 93 96.7s97.2-20.2 116.8-64.9c3.4-7.7-5-14.3-12.6-10.9zM240.7 446.9c-58.2 8.8-124.5-37.5-166.1-73.7c-28.3-24.5-44.3-59.8-49.8-97.2L.6 111.8C-.8 102 0 91.9 5.7 83.9C20.5 63 63 22.7 175.7 5.6s164.9 8.9 185.1 24.5c.9 .7 1.7 1.4 2.4 2.1c-52.8 4.8-85.1 21-103.6 35.3c-17 13.1-23 32-25 45.9L215.3 244.7c-2.6 .1-5.2 .4-7.9 .8c-35.2 5.3-61.8 32.7-68.2 66.3c-1.6 8.2 8.3 12.2 14.8 7c15.6-12.4 34.1-21.3 54.7-25.4c-3 38.4 4 78.7 25.9 113.6c6.9 11 15 23.1 24.2 35.4c-5.9 2.1-11.9 3.6-18 4.5zM174.1 157c-1-5.3-7.4-6.4-11.8-3.3c-7.7 5.5-16.8 9.3-26.8 10.8s-19.8 .6-28.7-2.4c-5.1-1.7-10.9 1.3-10.3 6.7c.1 .5 .1 1.1 .2 1.6c3.2 21.8 23.2 36.8 44.7 33.5s36.3-23.5 33.1-45.3c-.1-.5-.2-1.1-.3-1.6z"
                                                />
                                            </svg>
                                        </span>{" "}
                                        Genre
                                    </a>

                                    <a
                                        href="/upcoming"
                                        className="text-whiteLight dark:text-white px-3 py-2 rounded-md text-sm font-bold"
                                    >
                                        <span className="inline-flex">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </span>{" "}
                                        Upcoming
                                    </a>

                                    <a
                                        href="/tv_series"
                                        className="text-whiteLight dark:text-white px-3 py-2 rounded-md text-sm font-bold"
                                    >
                                        Tv Series
                                    </a>

                                    <div className="relative flex overflow-hidden sm:py-12">
                                        <div className="relative">
                                            <div className="mx-auto max-w-md">
                                                <form
                                                    action=""
                                                    className="relative mx-auto w-max bg-whiteLight dark:bg-whiteDark rounded-xl"
                                                >
                                                    <input
                                                        type="search"
                                                        placeholder="Search"
                                                        className="peer relative z-10 h-7 w-7 cursor-pointer rounded-xl text-sm tracking-wider bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:pl-12 focus:pr-4 focus:duration-700"
                                                    />
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        className="absolute inset-y-0 my-auto z-0 h-8 w-12 border-r border-transparent px-3.5"
                                                        fill="none"
                                                        viewBox="0 0 24 24"
                                                        stroke="currentColor"
                                                        strokeWidth="2"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                        />
                                                    </svg>
                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end px-3 grow">
                            <Switcher />
                        </div>
                        <div className="-mr-2 flex md:hidden">
                            <button
                                onClick={() => setIsOpen(!isOpen)}
                                type="button"
                                className="text-whiteLight inline-flex items-center justify-center p-2 rounded-md text-whitePrimary hover:text-white hover:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 "
                                aria-controls="mobile-menu"
                                aria-expanded="false"
                            >
                                <span className="sr-only">Open main menu</span>
                                {!isOpen ? (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        className="block h-6 w-6"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        aria-hidden="true"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="2"
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* mobile version */}
                <Transition
                    show={isOpen}
                    enter="transition ease-out duration-100 transform"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="transition ease-in duration-75 transform"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    {(ref) => (
                        <div className="md:hidden" id="mobile-menu">
                            <div
                                ref={ref}
                                className="px-2 pt-2 pb-3 space-y-1 sm:px-3"
                            >
                                {/* <a
                                    href="#"
                                    className="text-whiteLight dark:text-white block px-3 py-2 rounded-md text-base font-semibold"
                                >
                                    <span className="inline-flex">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-5 w-5"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </span>{" "}
                                    Now Playing
                                </a> */}

                                <a
                                    href="/tv_series"
                                    className="text-whiteLight dark:text-white block px-3 py-2 rounded-md text-base font-semibold"
                                >
                                    Tv Series
                                </a>

                                <a
                                    href="/genre"
                                    className="text-whiteLight dark:text-white block px-3 py-2 rounded-md text-base font-semibold"
                                >
                                    Genre
                                </a>

                                <div className="relative flex overflow-hidden text-whitePrimary">
                                    <div className="relative">
                                        <div className="mx-auto max-w-md">
                                            <form
                                                action=""
                                                className="relative mx-auto w-max"
                                            >
                                                <input
                                                    type="search"
                                                    placeholder="Search"
                                                    className="peer relative z-10 h-8 w-8 cursor-pointer rounded-xl border-b-1 border-white  bg-transparent pl-12 outline-none focus:w-full focus:cursor-text focus:pl-16 focus:pr-4"
                                                />
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent px-3.5 text-whiteLight dark:text-white"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                    stroke-width="2"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                                    />
                                                </svg>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Transition>
            </nav>
        </div>
    );
}
