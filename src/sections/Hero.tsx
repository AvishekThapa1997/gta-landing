import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMaskSettings, useSectionRef } from "../constants";
import ComingSoon from "./ComingSoon";

const Hero = () => {
  const { heroRef } = useSectionRef();
  const { initialMaskPos, initialMaskSize, maskSize } = useMaskSettings();
  useGSAP(
    () => {
      gsap.set(".mask-wrapper", {
        maskSize: initialMaskSize,
        maskPosition: initialMaskPos,
      });
      gsap.set(".mask-logo", { marginTop: "-100vh", opacity: 0 });
      gsap.set(".entrance-message", { marginTop: "0vh" });
      const heroAnimationTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".hero-section",
          start: "top top",
          end: "+=250%",
          scrub: 2.5,
          pin: true,
        },
      });
      heroAnimationTimeline
        .to(".fade-out", {
          opacity: 0,
          ease: "power1.inOut",
        })
        .to(".scale-out", { scale: 1, ease: "power1.inOut" })
        .to(
          ".mask-wrapper",
          { maskSize, duration: 1, ease: "power1.inOut" },
          "<",
        )
        .to(".white-overlay", { opacity: 1, duration: 0.5, zIndex: 10 }, "<0.7")
        .to(".mask-wrapper", { opacity: 0 })
        .to(
          ".overlay-logo",
          {
            opacity: 1,
          },
          "<",
        )
        .to(
          ".entrance-message",
          {
            duration: 1,
            ease: "power1.inOut",
            maskImage:
              "radial-gradient(circle at 50% 0vh, black 50%, transparent 100%)",
            onComplete: () => {
              gsap.to(".overlay-logo,.mask-logo", { opacity: 0 });
            },
          },
          "<",
        );
    },
    { scope: heroRef },
  );
  return (
    <section ref={heroRef}>
      <div className="hero-section">
        <div className="size-full mask-wrapper">
          <div className="white-overlay absolute bg-white opacity-0 inset-0"></div>
          <img
            src="/images/hero-bg.webp"
            alt="Background"
            className="scale-out"
          />
          <img
            src="/images/hero-text.webp"
            alt="hero-logo"
            className="title-logo fade-out"
          />
          <img
            src="/images/watch-trailer.png"
            alt="Trailer"
            className="trailer-logo fade-out"
          />
          <div className="play-img fade-out">
            <img src="/images/play.png" alt="play" className="w-7 ml-1" />
          </div>
        </div>
        <div className="fake-logo-wrapper">
          <img src="/images/big-hero-text.svg" className="overlay-logo" />
        </div>
        <ComingSoon />
      </div>
    </section>
  );
};

export default Hero;
