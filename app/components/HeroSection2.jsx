import React from "react";
import { NavLink } from "react-router";

const HeroSection2 = () => {
  return (
    <div
      className="relative shadow-[0_8px_10px_-4px_rgba(0,0,0,0.3)] text-black lg:h-[60vh] xl:h-[60vh] 2xl:h-[60vh] h-[40vh] w-full mx-auto flex items-center justify-start bg-cover bg-center 2xl:mb-20 xl:mb-20 md:mb-[60px] sm:mb-10 mb-10"
      style={{
        backgroundImage: "url('/overlay.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <div className="relative text-white z-10 max-w-2xl px-8 lg:px-16">
        <h1 className="md:text-2xl sm:text-2xl xs:text-2xl text-xl lg:text-5xl 2xl:text-5xl xl:text-5xl font-bold mb-4">Fancave News!</h1>
        <p className="mb-6 lg:text-lg xl:text-lg 2xl:text-lg text-xs md:text-sm leading-relaxed max-w-[50vw] text-wrap">
          Step into a world of legendary trading cards, rare sealed boxes, and exclusive memorabilia — your one-stop destination to fuel your passion and expand your ultimate fan collection.
        </p>
        <NavLink to={"/collections"} className="font-semibold transform transition-all ease-out duration-200 text-xs py-2 px-3 lg:py-4 lg:px-9 xk:py-4 xl:px-9 2xl:py-4 2xl:px-9 rounded-sm bg-transparent border border-white text-white hover:bg-white hover:text-black">Get Started</NavLink>
      </div>
    </div>
  );
};

export default HeroSection2;
