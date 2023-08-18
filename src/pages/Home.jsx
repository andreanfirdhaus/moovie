import React from "react";
import HomeImg from "../components/assets/Homepage_Poster.jpg";

export default function Home() {
    return (
        <div>
            <div className="relative overflow-hidden bg-gradient-to-b from-blackSecondary via-transparent to-transparent">
                <img
                    src={HomeImg}
                    className="h-screen sm:h-96 md:h-auto w-full object-cover object-center mix-blend-overlay dark:mix-blend-multiply"
                    alt="PageImg"
                    draggable="false"
                />

                <div className="absolute top-1/3 text-whiteLight dark:text-white w-full text-center">
                    <h1 className="text-2xl md:text-3xl font-bold capitalize tracking-wide drop-shadow-xl">
                        get the latest movie information
                    </h1>

                    <h1 className="text-xl md:text-3xl normal-case tracking-wide py-2 drop-shadow-xl">
                        Movie n' TvSeries
                    </h1>

                    <button
                        href="/movie"
                        className="text-xl tracking-wider font-bold underline-offset-8 px-2 pt-5 rounded-xl ease-in-out transition hover:underline hover:-translate-y-1.5 hover:duration-300"
                        style={{ WebkitTapHighlightColor: "transparent" }}
                    >
                        get started
                    </button>
                </div>
            </div>

            <section>
                <div className="h-screen bg-blackLight dark:bg-blackDark w-full"></div>
            </section>
        </div>
    );
}
