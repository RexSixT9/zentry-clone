import clsx from "clsx";
import gsap from "gsap";
import { useWindowScroll } from "react-use";
import { useEffect, useRef, useState } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

const navItems = ["Nexus", "Vault", "Prologue", "About", "Contact"];

const NavBar = () => {
  // State for toggling audio and visual indicator
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [isIndicatorActive, setIsIndicatorActive] = useState(false);

  // Refs for audio and navigation container
  const audioElementRef = useRef(null);
  const navContainerRef = useRef(null);

  const { y: currentScrollY } = useWindowScroll();
  const [isNavVisible, setIsNavVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Toggle audio and visual indicator
  const toggleAudioIndicator = () => {
    setIsAudioPlaying((prev) => !prev);
    setIsIndicatorActive((prev) => !prev);
  };

  // Manage audio playback
  //   useEffect(() => {
  //     if (!audioElementRef.current) return;
  //     if (isAudioPlaying) {
  //       audioElementRef.current.volume = 0.4;
  //       audioElementRef.current
  //         .play();
  //     } else {
  //       audioElementRef.current.pause();
  //     }
  //   }, [isAudioPlaying]);

  // Attempt to auto-play audio with fallback // new
  useEffect(() => {
    const audio = audioElementRef.current;
    if (!audio) return;

    const playAudio = () => { //new dcrp
      audio
        .play()
        .then(() => {
          setIsAudioPlaying(true);
          setIsIndicatorActive(true);
          document.removeEventListener("click", handleFirstInteraction, {
            capture: true,
          });
          window.removeEventListener("wheel", handleFirstInteraction, {
            capture: true,
          });
        })
        .catch((err) => {
          console.log("Autoplay failed or requires interaction:", err);
          document.addEventListener("click", handleFirstInteraction, {
            once: true,
            capture: true,
          });
          document.addEventListener("wheel", handleFirstInteraction, {
            once: true,
            capture: true,
          });
        });
    };

    const handleFirstInteraction = () => {
      playAudio();
    };

     if (document.readyState === "complete") {
      playAudio();
    } else {
      window.addEventListener("load", playAudio);
    }

    return () => {
      window.removeEventListener("load", playAudio);
      document.removeEventListener("click", handleFirstInteraction, {
        capture: true,
      });
      document.removeEventListener("wheel", handleFirstInteraction, {
        capture: true,
      });
    };
  }, []);

  // Manage audio playback // new
  useEffect(() => {
    if (!audioElementRef.current) return;
    if (isAudioPlaying) {
      audioElementRef.current.volume = 0.4;
      audioElementRef.current.play().catch((err) => {
        console.log("Play blocked:", err);
      });
    } else {
      audioElementRef.current.pause();
    }
  }, [isAudioPlaying]);

  useEffect(() => {
    if (currentScrollY === 0) {
      // Topmost position: show navbar without floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.remove("floating-nav");
    } else if (currentScrollY > lastScrollY) {
      // Scrolling down: hide navbar and apply floating-nav
      setIsNavVisible(false);
      navContainerRef.current.classList.add("floating-nav");
    } else if (currentScrollY < lastScrollY) {
      // Scrolling up: show navbar with floating-nav
      setIsNavVisible(true);
      navContainerRef.current.classList.add("floating-nav");
    }
    setLastScrollY(currentScrollY);
  }, [currentScrollY, lastScrollY]);

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
      <header className="absolute top-1/2 w-full -translate-y-1/2">
        <nav className="flex size-full items-center justify-between p-4">
          {/* Logo and Product button */}
          <div className="flex items-center gap-7">
            <img src="/img/logo.png" alt="logo" className="w-10" />
            {/* <Button
              id="product-button"
              title="Products"
              rightIcon={<TiLocationArrow />}
              containerClass="bg-blue-50 md:flex hidden items-center justify-center gap-1"
            /> */}
          </div>

          {/* Navigation Links and Audio Button */}
          <div className="flex h-full items-center">
            <div className="hidden md:block">
              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={`#${item.toLowerCase()}`}
                  className="nav-hover-btn"
                >
                  {item}
                </a>
              ))}
            </div>

            <button
              onClick={toggleAudioIndicator}
              className="ml-10 flex items-center space-x-0.5"
            >
              <audio
                ref={audioElementRef}
                className="hidden"
                src="/audio/loop.m4a"
                loop
                preload="auto"
              />
              {[1, 2, 3, 4].map((bar) => (
                <div
                  key={bar}
                  className={clsx("indicator-line", {
                    active: isIndicatorActive,
                  })}
                  style={{
                    animationDelay: `${bar * 0.1}s`,
                  }}
                />
              ))}
            </button>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default NavBar;
