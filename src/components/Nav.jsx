import React from "react";
import { Link } from "react-router-dom";
import logo from "../assets/moovie-logo.svg";
import Switcher from "./Switcher.jsx";
import { Transition } from "@headlessui/react";
import { BsFire } from "react-icons/bs";
import { FaTheaterMasks } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function Nav() {
    const [isOpen, setIsOpen] = React.useState(false);

    return (
        <div>
            <nav className="bg-[#152F40] dark:bg-black_primary fixed z-10 w-full">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-0 md:py-1">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <Link to="/movie">
                                    <img
                                        className="h-5 sm:h-6"
                                        src={logo}
                                        alt="Moovie"
                                        draggable="false"
                                    />
                                </Link>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4 tracking-wider">
                                    <Link
                                        to="/genre"
                                        className="text-whiteLight dark:text-white px-3 py-2 rounded-md text-sm font-bold"
                                    >
                                        <span className="inline-flex">
                                            <FaTheaterMasks size={20} />
                                        </span>{" "}
                                        Genre
                                    </Link>

                                    <Link
                                        to="/upcoming"
                                        className="text-whiteLight dark:text-white px-3 py-2 rounded-md text-sm font-bold"
                                    >
                                        <span className="inline-flex">
                                            <BsFire size={18} />
                                        </span>{" "}
                                        Upcoming
                                    </Link>

                                    <Link
                                        to="/tv_series"
                                        className="text-whiteLight dark:text-white px-3 py-2 rounded-md text-sm font-bold"
                                    >
                                        Tv Series
                                    </Link>

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
                                                    <FiSearch className="absolute inset-y-0 my-auto z-0 h-8 w-12 border-r border-transparent px-3.5" />
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
                                <Link
                                    to="/upcoming"
                                    className="text-whiteLight dark:text-white block px-3 py-2 rounded-md text-base font-semibold"
                                >
                                    <span className="inline-flex">
                                        <BsFire size={18} />
                                    </span>{" "}
                                    Upcoming
                                </Link>

                                <Link
                                    to="/tv_series"
                                    className="text-whiteLight dark:text-white block px-3 py-2 rounded-md text-base font-semibold"
                                >
                                    Tv Series
                                </Link>

                                <Link
                                    to="/genre"
                                    className="text-whiteLight dark:text-white block px-3 py-2 rounded-md text-base font-semibold"
                                >
                                    Genre
                                </Link>

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

                                                <FiSearch className="absolute inset-y-0 my-auto h-8 w-12 border-r border-transparent px-3.5 text-whiteLight dark:text-white" />
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
