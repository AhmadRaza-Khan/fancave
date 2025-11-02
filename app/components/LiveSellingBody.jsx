import React, { useEffect, useRef } from "react";
import { NavLink } from "react-router";

const LiveSelling = () => {
  const canvasRef1 = useRef(null);
  const canvasRef2 = useRef(null);

  useEffect(() => {
    const drawImage = (canvas, src) => {
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      const imageWidth = 350; // px — consistent size
      const imageHeight = imageWidth * 1.2;

      canvas.width = imageWidth;
      canvas.height = imageHeight;

      const img = new Image();
      img.src = src;
      img.onload = () => {
        ctx.fillStyle = "#f5f5f5";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.shadowColor = "rgba(0,0,0,0.15)";
        ctx.shadowBlur = 8;
        ctx.drawImage(img, 0, 0, imageWidth, imageHeight);
      };
    };

    const drawBoth = () => {
      drawImage(canvasRef1.current, "/WhatnotShow1.jpg");
      drawImage(canvasRef2.current, "/Whatnot_Show.jpg");
    };

    drawBoth();
    window.addEventListener("resize", drawBoth);
    return () => window.removeEventListener("resize", drawBoth);
  }, []);

  return (
    <div className="w-full h-auto flex flex-col items-center py-8 px-5">
      <h1 className="text-5xl text-[#2A2B2A] my-8 text-center font-bold">
        Live Selling
      </h1>

      {/* Main flex container */}
      <div className="flex flex-col md:flex-row justify-center items-center gap-6">
        <canvas
          ref={canvasRef1}
          className="shadow-md block my-8 rounded-md translate-x-5 md:translate-x-0"
        />
        <canvas
          ref={canvasRef2}
          className="shadow-md block my-8 rounded-md translate-x-5 md:translate-x-0"
        />
      </div>

       <p className="lg:w-[40vw] xl:w-[40vw] 2xl:w-[40vw] w-full leading-relaxed pt-10">
        <b>Our Whatnot Journey:</b> <br />
        When we launched our Whatnot journey back in May 2025, Rebecca and I didn't
        know what to expect. We had a very small base of "followers" from previous
        starts / stops and it literally felt like we pulled the plug out of the boat
        and started taking in water. We had no idea what we were doing, how to do it
        or what to even talk about. It was awkward, odd and fun all at the same time.
        <br />
        <br />
        We listened to a lot of people - we watched a lot of whatnot streams - we
        learned as much as we could. We joined a network of like-minded individuals
        called "CSN - Chill Streamers Network" and that provided a comfort zone for
        us. It helps to discuss any issues, share thoughts or concerns, etc. with
        other streamers and CSN is a safe haven for that type of banter. We listened
        to those who had already walked this path, took their advice and kept showing
        up. The advice was simple: keep grinding, keep showing up, keep doing shows
        consistently. So that's what we have done.
        <br />
        <br />
        Fast forward to today (October 12th, 2025 - roughly 6 months since we
        started) and we just crossed an incredible milestone - over 11,000 followers
        and growing rapidly.
        <br />
        <br />
        If you are interested in joining in on the fun, getting some great deals or
        just want to come hang out -- it's very easy!
        <br />
        <br />
        Download the Whatnot App by clicking this QR Code and get $15 in credits to
        use on our show.
      </p>

      {/* Third Image */}
      <div className="my-8">
        <img
          className="object-contain mx-auto"
          src="/WhatnotPromo.jpg"
          alt="Store Vault"
          style={{ width: "455px" }}
        />
      </div>
      <p className="lg:w-[40vw] xl:w-[40vw] 2xl:w-[40vw] w-full leading-relaxed">
        Or simply go to this link: <NavLink className="underline" to={'https://www.whatnot.com/s/BVB504Ez'}>https://www.whatnot.com/s/BVB504Ez</NavLink>
            <br/> <br/>
        A valuable lesson to everyone - Don’t give up when things get tough. Consistency, hard work, and perseverance pay off and we are thoroughly enjoying the ride! Join Us Today!
      </p>
    </div>
  );
};

export default LiveSelling;

