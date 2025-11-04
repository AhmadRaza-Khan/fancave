import { ArrowRight, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router";

export default function VideoSection() {
  const videoUrl = "/Fan_Cave_Alec_Burleson.mp4";
  const videoRef = useRef(null);
  const sentinelRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [shrunk, setShrunk] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setShrunk(entry.isIntersecting),
      { threshold: 0 }
    );
    if (sentinelRef.current) observer.observe(sentinelRef.current);
    return () => observer.disconnect();
  }, []);

  const toggleVideo = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section className="w-full flex justify-center mb-5 items-center lg:pb-16 md:pb-5 xl:pb-16 2xl:pb-16 bg-[#F5F6F6] relative">
      <div className="w-full aspect-video relative overflow-hidden">

        {/* animated wrapper (no change) */}
        <div
          className={`
            absolute inset-0 origin-bottom
            transition-all duration-700 ease-[cubic-bezier(.19,1,.22,1)]
            ${shrunk
              ? "scale-[0.90] rounded-xl"
              : "scale-100 rounded-none"
            }
          `}
        >
          <video
            ref={videoRef}
            src={videoUrl}
            muted
            loop
            autoPlay
            playsInline
            className={`w-full h-full object-cover ${shrunk? "rounded-xl" : "rounded-none"}`}
          />

          {/* overlay */}
          <div className="absolute bottom-[8vh] md:bottom-[16vh] sm:bottom-[12vh] lg:bottom-[30vh] xl:bottom-[32vh] 2xl:bottom-[33vh] left-0 right-0 inset flex items-center justify-center">
            <div className="flex flex-col gap-8 items-center justify-center mx-auto">
              <h1 className="text-white font-bold text-center text-wrap 2xl:text-4xl lg:text-4xl md:text-2xl sm:text-lg text-lg xl:text-4xl pointer-events-none">
                Alec Burleson Exclusive Collection
              </h1>
              <NavLink
                to="/collections"
                className="cursor-pointer lg:py-3 2xl:py-3 xl:py-3 md:py-2 sm:py-1.5 py-1.5 xl:px-5 2xl:px-5 lg:px-5 md:px-3 sm:px-2 px-2 text-white gap-2 border font-bold border-white rounded-sm xl:text-sm 2xl:text-sm text-xs lg:text-sm flex items-center justify-center"
              >
                <span>SHOP NOW</span>
                <ArrowRight className="w-4 h-4 font-thin" color="#fff" />
              </NavLink>
            </div>
          </div>

          {/* play / pause button */}
          <button
            onClick={toggleVideo}
            className="absolute cursor-pointer xl:bottom-6 2xl:bottom-6 md:bottom-4 lg:bottom-6 bottom-3 right-4 bg-[#F5F6F6] transition-all xl:py-3 2xl:p-3 p-2 lg:p-3 rounded-full backdrop-blur pointer-events-auto"
          >
            {isPlaying ? <Pause className="w-4 h-4 sm:w-4 sm:h-4 md:w-6 md:h-6 lg:h-8 lg:w-8 xl:h-8 xl:w-8 2xl:h-8 2xl:w-8" /> : <Play />}
          </button>
        </div>

        {/* sentinel moved OUTSIDE the animated wrapper — reliable intersection detection */}
        <div
          ref={sentinelRef}
          className="absolute -bottom-1 left-0 w-full h-1 pointer-events-none"
        />
      </div>
    </section>
  );
}
