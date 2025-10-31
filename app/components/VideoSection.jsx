export default function VideoSection() {
  // const videoUrl = "https://player.vimeo.com/video/1115688207?autoplay=0&loop=0&muted=0";
  const videoUrl = "./dummyVideo.mp4"

  return (
    <section className="w-full flex justify-center flex-col gap-5 lg:gap-8 xl:gap-8 2xl:gap-8 items-center py-16 px-4 bg-gray-50">
      <p className="lg:text-2xl xl:text-2xl 2xl:text-2xl md:text-lg sm:text-md xs:text-sm text-xs text-nowrap font-bold">Trade Night w/ St Louis Cardinals 1B/OF Alec Burleson</p>
      <div className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden shadow-lg border border-gray-200">
        <iframe
          src={videoUrl}
          className="w-full h-full"
          frameBorder="0"
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          title="Vimeo Video"
        ></iframe>
      </div>
    </section>
  );
}
