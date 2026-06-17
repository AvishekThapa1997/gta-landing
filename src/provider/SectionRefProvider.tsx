import React, { createContext, useRef, type PropsWithChildren } from "react";

interface SectionRefContextData {
  heroRef: React.RefObject<HTMLElement | null>;
  jasonRef: {
    videoSectionRef: React.RefObject<HTMLVideoElement | null>;
    infoSectionRef: React.RefObject<HTMLElement | null>;
  };
}

export const SectionRefContext = createContext<SectionRefContextData | null>(
  null,
);
const SectionRefProvider = ({ children }: PropsWithChildren) => {
  const heroRef = useRef<HTMLElement | null>(null);
  const videoSectionRef = useRef<HTMLVideoElement | null>(null);
  const infoSectionRef = useRef<HTMLElement | null>(null);
  return (
    <SectionRefContext
      value={{ heroRef, jasonRef: { videoSectionRef, infoSectionRef } }}
    >
      {children}
    </SectionRefContext>
  );
};

export default SectionRefProvider;
