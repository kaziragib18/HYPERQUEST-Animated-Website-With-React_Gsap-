import React, { useRef, useState } from "react";
import "../index.css";
import GameCard from "./GameCard";
import { TiLocationArrow } from "react-icons/ti";

const CardTilt = ({ children, className = "" }) => {
  const [transformStyle, settransformStyle] = useState("");
  const itemRef = useRef();
  const handleMouseMove = (e) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - left) / width;
    const relativeY = (e.clientY - top) / height;
    const tiltX = (relativeY - 0.5) * 7;
    const tiltY = (relativeX - 0.5) * -7;
    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(0.98,0.98,0.98)`;
    settransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    settransformStyle("");
  };

  return (
    <div
      className={className}
      ref={itemRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const Features = () => {
  return (
    <section className="bg-black pb-52" id="vault">
      <div className="container mx-auto px-3 md:px-10">
        <div className="px-5 py-32">
          <p className="font-VeniteAdoremus-regular text-lg text-blue-50">
            Into the Metagame Layer
          </p>
          <p className="max-w-md font-circularweb text-lg text-blue-50 opacity-50">
            Immerse yourself in a rich and ever-expanding universe where a
            vibrant array of products converge into an interconnected overlay
            experience on your world.
          </p>
        </div>

        <CardTilt className="border-hsla relative mb-7 h-96 w-full overflow-hidden rounded-md md:h-[65vh]">
          <GameCard
            src="videos/card-9.mp4"
            title={<>The Witcher</>}
            description="Geralt of Rivia, also known as the White Wolf, is a monster hunter for hire, known for his exceptional combat skills and deep sense of morality."
          />
        </CardTilt>
        <div className="grid h-[145vh] grid-cols-2 grid-rows-3 gap-7">
          <CardTilt className="card-tilt_1 col-span-2 row-span-1 md:col-span-1 md:row-span-2 border-hsla rounded-md">
            <GameCard
              src="videos/card-2.mp4"
              title={<>Capitano</>}
              description=" One of the highest-ranked Fatui Harbingers a powerful and enigmatic group serving under the Cryo Archon, the Tsaritsa of Snezhnaya."
            />
          </CardTilt>
          <CardTilt className="cards-tilt_1 border-hsla rounded-md row-span-1 col-span-2 md:col-span-1 md:row-span-1 w-full md:pr-4">
            <GameCard
              src="videos/card-3.mp4"
              title={<>Jinx</>}
              description="known for her chaotic, anarchic, and unpredictable nature. She's obsessed with destruction and mischief."
            />
          </CardTilt>
          <CardTilt className="Card-tilt_1 border-hsla rounded-md row-span-1 col-span-2 md:col-span-1 md:row-span-1 w-full overflow-hidden">
            <GameCard
              src="videos/card-4.mp4"
              title={<>Viper</>}
              description="She is cold, calculating, and ruthless, often taunting her enemies and showing little empathy."
            />
          </CardTilt>

          <CardTilt className="card-tilt_2">
            <div
              className="grid grid-cols-1 grid-rows-4 gap-4 bg-black p-4 rounded-md
                  md:grid-cols-2 md:grid-rows-2"
            >
              <div className="flex items-center justify-center rounded-md p-6">
                <h1 className="card-title font-VeniteAdoremus-regular text-blue-50 text-center text-4xl md:text-5xl">
                  More coming soon!
                </h1>
              </div>

              <div>
                <img
                  src="/img/2.gif"
                  alt="Image 1"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div>
                <img
                  src="/img/1.gif"
                  alt="Image 2"
                  className="w-full h-full object-cover rounded-md"
                />
              </div>

              <div className="flex items-end justify-end p-3 text-blue-50">
                <TiLocationArrow className="scale-[3]" />
              </div>
            </div>
          </CardTilt>

          <CardTilt className="card-tilt_2 ">
            <GameCard
              src="videos/card-7.mp4"
              title={<>Zelda</>}
              description="Reimagine the conflict across timelines, reincarnations, and different versions of Hyrule."
            />
          </CardTilt>
        </div>
      </div>
    </section>
  );
};

export default Features;
