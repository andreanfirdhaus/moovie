import React, { useState } from "react";
import useDarkSide from "../hook/useDarkSide";
import { DarkModeSwitch } from "react-toggle-dark-mode";

function Switcher() {
    const [colorTheme, setTheme] = useDarkSide();
    const [darkSide, setDarkSide] = useState(
        colorTheme === "light" ? true : false
    );

    const toggleDarkMode = (checked) => {
        setTheme(colorTheme);
        setDarkSide(checked);
    };
    return (
        <>
            <div>
                <DarkModeSwitch
                    checked={darkSide}
                    onChange={toggleDarkMode}
                    size={25}
                    className="text-whiteLight dark:text-white"
                />
            </div>
        </>
    );
}

export default Switcher;
