import React from "react";
import Switcher from "./Switcher.jsx";

export default function NavHomePage() {
    return (
        <div>
            <nav className="bg-transparent fixed z-10 w-full">
                <div className="max-w-7xl mx-auto px-5 sm:px-6 lg:px-8 py-0 md:py-1">
                    <div className="flex items-center justify-end gap-5 h-24">
                        <div>
                            <Switcher />
                        </div>
                        <button class="bg-white hover:bg-whiteLight text-blacSecondary font-bold py-1 px-4 rounded btn-sm">
                            Log In
                        </button>
                    </div>
                </div>
            </nav>
        </div>
    );
}
