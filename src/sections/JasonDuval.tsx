import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";
import { useSectionRef } from "../constants";

export const JasonDuval = () => {
  return (
    <>
      <JasonDuvalIntroVideo />
      <JasonDuvalInfo />
    </>
  );
};

const JasonDuvalInfo = () => {
  const infoSectionRef = useRef<HTMLElement | null>(null);
  const { jasonRef } = useSectionRef();
  const { videoSectionRef } = jasonRef;
  useGSAP(
    () => {
      gsap.set(".jason", {
        marginTop: "-80vh",
      });
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".jason",
          start: "top 90%",
          scrub: 2,
          end: "20% 60%",
        },
      });
      timeline
        .to(videoSectionRef.current, {
          opacity: 0,
          duration: 2,
          ease: "power1.inOut",
        })
        .to(
          ".img-box",
          {
            y: -300,
            duration: 2,
            ease: "power1.inOut",
            scrollTrigger: {
              trigger: ".jason",
              start: "top center",
              end: "80% center",
              scrub: 2,
            },
          },
          "<0.25",
        );
    },
    { scope: infoSectionRef },
  );
  return (
    <section ref={infoSectionRef}>
      <div className="jason -mt-200">
        <div className="max-w-lg jason-content">
          <div>
            <h1>Jason Duval</h1>
            <h2>
              Jason wants an easy life, but things just keep getting harder.
            </h2>
            <p>
              Jason grew up around grifters and crooks. After a stint in the
              Army trying to shake off his troubled teens, he found himself in
              the Keys doing what he knows best, working for local drug runners.
              It might be time to try something new.
            </p>
          </div>
          <div className="jason-2">
            <img src="/images/jason-2.webp" />
          </div>
        </div>
        <div className="space-y-5 mt-96 img-box">
          <div className="jason-1">
            <img src="/images/jason-1.webp" />
          </div>
          <div className="jason-3">
            <img src="/images/jason-3.webp" />
          </div>
        </div>
      </div>
    </section>
  );
};

const JasonDuvalIntroVideo = () => {
  const { heroRef, jasonRef } = useSectionRef();
  const { videoSectionRef } = jasonRef;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useGSAP(() => {
    gsap.set(videoSectionRef.current, { marginTop: "-140vh", opacity: 0 });
    const timeLine = gsap.timeline({
      scrollTrigger: {
        trigger: videoSectionRef.current,
        pin: true,
        scrub: true,
        start: "top top",
        end: "+=200%",
      },
    });
    timeLine
      .to(heroRef.current, {
        opacity: 0,
        duration: 1,
        ease: "power1.inOut",
      })
      .to(
        videoSectionRef.current,
        {
          opacity: 1,
          duration: 2,
          ease: "power1.inOut",
        },
        ">",
      );

    function handleOnLoadMetaData(e: Event) {
      const video = e.target as HTMLVideoElement;
      timeLine.to(
        video,
        {
          currentTime: video.duration,
          duration: 20,
          ease: "power1.inOut",
        },
        "<",
      );
    }

    videoRef.current?.addEventListener("loadedmetadata", handleOnLoadMetaData);
    return () => {
      videoRef.current?.removeEventListener(
        "loadedmetadata",
        handleOnLoadMetaData,
      );
    };
  });
  return (
    <section ref={videoSectionRef} className="h-dvh">
      <div className="content h-full">
        <div className="h-full relative">
          <video
            ref={videoRef}
            className="size-full object-cover"
            muted
            playsInline
            preload="auto"
            src="/videos/output1.mp4"
          />
        </div>
      </div>
    </section>
  );
};
export default JasonDuval;
