import { ArrowRight, Mail } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";

const NewsLetter = () => {
    const [active, setActive] = useState(true);
    const inputRef = useRef(null);

    useEffect(() => {
        if (!active) {
        inputRef.current?.focus();
        }
    }, [active]);
  return (
       <div
        className="relative shadow-[0_8px_10px_-4px_rgba(0,0,0,0.3)] text-black h-[30vh] md:h-[40vh] lg:h-[48vh] xl:h-[49vh] 2xl:h-[48vh] w-full flex items-center justify-center bg-cover bg-center"
        style={{
            backgroundImage: `url("/Brayden_Schenn_Public_Signing_Ticket.jpg")`,
        }}
        >
        <div className="absolute inset-0 bg-white/40"></div>

        {/* Content */}
        <div className="relative flex-wrap bg-white rounded-2xl gap-5 p-6 md:p-10 lg:p-10 xl:p-10 2xl:p-10 flex flex-col items-center justify-center"
            style={{
                maxWidth: "530px",
                width: "calc(100% - 50px)"
            }}
        >
            <h5 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl 2xl:text-4xl xl:text-4xl font-bold text-center">Join The Cave Family!</h5>
            <p className="text-center text-[15px] sm:text-base md:text-base lg:text-base xl:text-base 2xl:text-base">Be the first to know about new collections and exclusive offers.</p>
            <div className="flex relative w-full rounded-sm border border-gray-400 py-2.5 px-12">
            <Mail color="#99a1af" className="absolute top-2.5 left-4" />
            <ArrowRight color="#99a1af" className="absolute hover:cursor-pointer top-2.5 right-2" />
            <input
                type="email"
                ref={inputRef}
                className="border-none outline-none w-full"
                onFocus={() => setActive(false)}
                onBlur={() => setActive(true)}
            />
            <p onClick={() => setActive(false)}
                className={`absolute transition-all ease-in-out duration-200 ${active ? "top-2.5 text-base" : "-top-2.5 text-[12px]"} left-12 bg-white text-[#99a1af]`}>
                Email
            </p>
            </div>
        </div>
        </div>

  );
};

export default NewsLetter;
