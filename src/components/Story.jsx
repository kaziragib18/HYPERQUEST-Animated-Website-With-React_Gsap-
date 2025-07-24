import React, { useRef } from "react";
import AnimatedTitle from "./AnimatedTitle";
import "../index.css";
import gsap from "gsap";
import CreateEdge from "./CreateEdge";
import Button from "./Button";

const Story = () => {
  // Reference to the image element for mouse movement effects
  // It allows us to apply transformations based on mouse position
  const frameRef = useRef("null");
  const handleMouseLeave = () => {
    const element = frameRef.current;
    gsap.to(element, {
      duration: 0.3,
      rotateX: 0,
      rotateY: 0,

      ease: "power1.inOut",
    });
  };
  // Function to handle mouse movement and apply rotation effect
  // It calculates the rotation based on mouse position relative to the element
  const handleMouseMove = (e) => {
    const { clientX, clientY } = e;
    const element = frameRef.current;
    // If the element is not available, exit the function
    if (!e) return;
    const rect = element.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    // Calculate rotation based on mouse position
    // The rotation is applied to the element using GSAP for smooth animation
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;
    gsap.to(element, {
      duration: 0.3,
      rotateX,
      rotateY,
      transformPerspective: 500,
      ease: "power1.inOut",
    });
  };
  return (
    <section
      id="prologue"
      className="min-h-dvh w-screen bg-black text-blue-50 overflow-hidden"
    >
      <div className="flex flex-col size-full items-center py-10 pb-24">
        <p className="font-general text-sm uppercase md:text-[10px]">
          The story of HyperQuest is a journey through the realms of
          imagination.
        </p>
        <div className="relative size-full">
          <AnimatedTitle
            title="where heroes rise, legends are born."
            sectionID="#prologue"
            containerClass="mt-5 pointer-events-none mix-blend-difference relative z-10"
          />

          <div className="story-img-container ">
            <div className="story-img-mask">
              <div className="story-img-content">
                <img
                  // This image serves as the entrance to the story section
                  // It has mouse movement effects applied to it for a dynamic visual experience
                  ref={frameRef}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseLeave}
                  onMouseEnter={handleMouseLeave}
                  onMouseMove={handleMouseMove}
                  src="/img/portal_2.jpg"
                  alt="entrance"
                  className="object-contain"
                />
              </div>
            </div>
            <CreateEdge />
          </div>
        </div>
        <div className="-mt-80 flex w-full justify-center md:-mt-64 md:me-44 md:justify-end ">
          <div className="flex h-full w-fit flex-col items-center md:items-start ">
            <p className="mt-3 max-w-sm text-center font-mono text-violet-50 md:text-start">
              The journey begins with a single step, and every step leads to a
              new adventure. Discover the realms of HyperQuest, where every
              choice is a quest, and every quest is a story waiting to be told.
            </p>
            <Button
              id="realm-button"
              title="Browse Games"
              containerClass="mt-5"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
