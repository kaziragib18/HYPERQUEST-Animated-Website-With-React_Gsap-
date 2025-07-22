import "../index.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "center center",
        end: "+=800 center",
        scrub: 0.5,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(".mask-clip-path", {
      width: "100vw",
      height: "100vh",
      borderRadius: 0,
    });
  });

  return (
    <div id="about" className="min-h-screen w-screen">
      <div className="relative mb-8 mt-10 md:mt-36 flex flex-col items-center gap-5">
        <AnimatedTitle
          title="One World. One Journey. Endless Discovery"
          containerClass="mt-5 !text-black text-center "
        />
        <div className="about-subtext">
          <p>When the World Becomes the Server, Every Choice Is a Quest</p>
          <p className="text-gray-500">
            Breaking the boundaries between games—one world where everyone plays
            together.
          </p>
        </div>
      </div>

      <div className="h-dvh w-screen" id="clip">
        <div className="mask-clip-path about-image">
          <video
            src="videos/about.mp4"
            alt="Background"
            autoPlay
            loop
            className="absolute left-0 top-0 size-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
