import React, { useEffect, useState } from "react";
import { useWindowScroll } from "react-use";

const ScrollIndicator = () => {
    const { y } = useWindowScroll();
    // const { x, y } = useWindowScroll();
    const [scrolled, setScrolled] = useState(0);

    useEffect(() => {
        const height =
            document.documentElement.scrollHeight -
            document.documentElement.clientHeight;
        setScrolled((y / height) * 100);
    }, [y]);
    return (
        <div className="w-full bg-gray-50">
            <div className="p-px bg-red-400 transition-all ease-in-out" style={{ width: `${scrolled}%` }}></div>
        </div>
    );
};

export default ScrollIndicator; 