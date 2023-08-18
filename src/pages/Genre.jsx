import React from "react";

export default function Genre() {
    const Data = [
        {
            imageUrl: "src/components/assets/genre-img/action.webp",
            text: "Action",
            // Url: "/home"
        },
        {
            imageUrl: "src/components/assets/genre-img/horror.webp",
            text: "Horror",
        },
        {
            imageUrl: "src/components/assets/genre-img/anime.webp",
            text: "Anime",
        },
        {
            imageUrl: "src/components/assets/genre-img/family.webp",
            text: "Family",
        },
        {
            imageUrl: "src/components/assets/genre-img/crime.webp",
            text: "Crime",
        },
        {
            imageUrl: "src/components/assets/genre-img/drama.webp",
            text: "Drama",
        },
        {
            imageUrl: "src/components/assets/genre-img/comedy.webp",
            text: "Comedy",
        },
        {
            imageUrl: "src/components/assets/genre-img/animation.webp",
            text: "Animation",
        },
        {
            imageUrl: "src/components/assets/genre-img/romance.webp",
            text: "Romance",
        },
        {
            imageUrl: "src/components/assets/genre-img/scifi.webp",
            text: "Sci-Fi",
        },
    ];

    return (
        <div className="bg-whiteLight dark:bg-blackSecondary antialiased">
            <div className="container mx-auto px-16 md:px-32 lg:px-60 py-10">
                <div className="flex flex-wrap justify-center text-center py-10 -mx-3 overflow-hidden sm:-mx-1 md:-mx-2 lg:-mx-0 xl:-mx-0 mt-16 md:mt-20">
                    {Data.map((item, index) => {
                        return (
                            <div
                                key={index}
                                className="hover:scale-105 transition duration-300 ease-in-out transform-gpu my-3 px-3 w-full overflow-hidden sm:my-1 sm:px-1 sm:w-1/2 md:my-2 md:px-2 md:w-1/2 lg:my-2 lg:px-2 lg:w-1/4 xl:my-2 xl:px-2 xl:w-1/4"
                            >
                                <div className="relative bg-blackDark rounded-lg antialiased w-auto h-32">
                                    <img
                                        src={item.imageUrl}
                                        alt=""
                                        className="rounded-lg h-32 w-full object-cover object-center mix-blend-normal dark:mix-blend-lighten absolute inset-0 bg-cover bg-center z-0"
                                        draggable="false"
                                    />
                                    {/* 
                                    <p className="select-none first-letter:absolute text-lg tracking-wider text-white font-bold top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                        {item.text}{" "}
                                    </p> */}

                                    <a
                                        className="opacity-0 hover:opacity-75 duration-300 absolute inset-0 z-10 flex justify-center items-center text-3xl text-white font-semibold hover:bg-blackDark hover:rounded-lg disable-text-selection"
                                        href="#"
                                    >
                                        {item.text}{" "}
                                    </a>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}
