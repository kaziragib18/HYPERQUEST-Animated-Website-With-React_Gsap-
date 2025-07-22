import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";
import { TiLocationArrow } from "react-icons/ti";
import "../index.css";
import { useWindowScroll } from "react-use";
import gsap from "gsap";
import { TbMusicPause } from "react-icons/tb";
const navItems = ["Home", "About", "Vault", "Prologue", "Contact"];

const Navbar = () => {
  const ismdScreen = window.innerWidth >= 768;

  const navContainerRef = useRef(null);
  const audioElementRef = useRef(null);

  // State to manage audio playback and indicator animation
  // isAudioPlaying: tracks whether the audio is currently playing
  const [isAudioPlaying, setisAudioPlaying] = useState(false);
  const [isIndicatorActive, setisIndicatorActive] = useState(false);

  // Function to toggle audio playback and indicator animation
  // When the button is clicked, it toggles the audio playback state
  const toggleAudioIndicator = () => {
    setisAudioPlaying((prev) => !prev);
    setisIndicatorActive((prev) => !prev);
  };

  // Effect to handle audio playback based on isAudioPlaying state
  // If isAudioPlaying is true, the audio element plays; otherwise, it pauses
  useEffect(() => {
    if (isAudioPlaying) {
      audioElementRef.current.play();
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  const { y: currentScrollY } = useWindowScroll();
  const [lastScrollY, setlastScrollY] = useState(0);
  const [isNavVisible, setisNavVisible] = useState(true);

  // Effect to handle navigation visibility based on scroll position
  // If the user scrolls to the top, the navigation is visible
  useEffect(() => {
    if (currentScrollY === 0) {
      setisNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      setisNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY && ismdScreen) {
      setisNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }

    setlastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

  // Effect to animate the navigation container based on isNavVisible state
  // If isNavVisible is true, the navigation slides down; otherwise, it slides up
  useEffect(() => {
    gsap.to(navContainerRef.current, {
      y: isNavVisible ? 0 : -100,
      opacity: isNavVisible ? 1 : 0,
      duration: 0.2,
    });
  }, [isNavVisible]);

  return (
    <div
      ref={navContainerRef}
      className="fixed inset-x-0 top-4 z-50 h-16 border-none transition-all duration-700 sm:inset-x-6"
    >
      <header className="absolute top-1/2 w-full -translate-y-1/2 ">
        <nav className="flex size-full items-center justify-between p-4 ">
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />

            <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            />
          </div>

          <div className="flex h-full items-center">
            <div className="hidden md:block ">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  className="nav-hover-btn"
                  href={`#${item.toLowerCase()}`}
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              className="ml-10 flex items-center space-x-0.5"
              onClick={toggleAudioIndicator}
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.mp3"
                loop
              />
              {isAudioPlaying ? (
                [1, 2, 3, 4].map((bar) => (
                  <div
                    key={bar}
                    className={`cursor-pointer indicator-line ${
                      isIndicatorActive ? "active" : ""
                    }`}
                    style={{ animationDelay: `${bar * 0.1}s` }}
                  />
                ))
              ) : (
                <TbMusicPause
                  color="white"
                  size={18}
                  className="cursor-pointer"
                />
              )}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
