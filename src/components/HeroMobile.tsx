import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import heroBg from "../assets/hero-bg.webm";
import lineScribble from "../assets/line-scribble.png";

gsap.registerPlugin(SplitText);

export function HeroMobile() {
  const suaIdeiaRef = useRef<HTMLSpanElement>(null);
  const viraArteRef = useRef<HTMLSpanElement>(null);
  const studioRef = useRef<HTMLSpanElement>(null);
  const numberRef = useRef<HTMLSpanElement>(null);
  const lineScribble1Ref = useRef<HTMLImageElement>(null);
  const lineScribble2Ref = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Split text into characters
      const suaIdeiaSplit = new SplitText(suaIdeiaRef.current, {
        type: "chars",
      });
      const viraArteSplit = new SplitText(viraArteRef.current, {
        type: "chars",
      });
      const studioSplit = new SplitText(studioRef.current, { type: "chars" });
      const numberSplit = new SplitText(numberRef.current, { type: "chars" });

      // Animate "SUA IDEIA" letters
      tl.from(suaIdeiaSplit.chars, {
        opacity: 0,
        y: 60,
        rotationX: -90,
        scale: 0.5,
        stagger: 0.04,
        duration: 1,
        ease: "back.out(1.7)",
      });

      // First line scribble
      tl.fromTo(
        lineScribble1Ref.current,
        {
          opacity: 1,
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.5,
          ease: "power3.inOut",
        },
        "<0.25"
      );

      // Animate "VIRA ARTE" letters
      tl.from(
        viraArteSplit.chars,
        {
          opacity: 0,
          y: 60,
          rotationX: -90,
          scale: 0.5,
          stagger: 0.04,
          duration: 1,
          ease: "back.out(1.7)",
        },
        "<0.25"
      );

      // Second line scribble
      tl.fromTo(
        lineScribble2Ref.current,
        {
          opacity: 1,
          clipPath: "inset(0 100% 0 0)",
        },
        {
          clipPath: "inset(0 0% 0 0)",
          duration: 0.5,
          ease: "power3.inOut",
        },
        "<0.5"
      );

      // Animate "STUDIO" letters - random with scale and blur
      tl.from(
        studioSplit.chars,
        {
          opacity: 0,
          scale: 2,
          y: "50%",
          filter: "blur(5px)",
          stagger: {
            amount: 0.8,
            from: "random",
          },
          duration: 1,
          ease: "power3.out",
        },
        "<0.25"
      );

      // Animate "091" letters - random with scale and blur
      tl.from(
        numberSplit.chars,
        {
          opacity: 0,
          scale: 2,
          y: "50%",
          filter: "blur(5px)",
          stagger: {
            amount: 0.4,
            from: "random",
          },
          duration: 1,
          ease: "power3.out",
        },
        "<0.5"
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <header className="relative flex items-center justify-center h-screen bg-black overflow-hidden">
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      >
        <source src={heroBg} type="video/webm" />
      </video>
      <div className="relative z-10 w-[90vw]">
        <div className="relative">
          <span
            ref={suaIdeiaRef}
            className="text-fit font-display leading-none text-[#E90C00] text-shadow-red blur-[1px]"
          >
            <span>
              <span className="tracking-widest">SUA IDEIA</span>
            </span>
            <span aria-hidden="true" className="tracking-widest">
              SUA IDEIA
            </span>
          </span>
          <img
            ref={lineScribble1Ref}
            src={lineScribble}
            alt=""
            className="absolute bottom-[0%] right-[-2%] w-[60%] pointer-events-none invert blur-[0.3px]"
          />
        </div>
        <div className="relative">
          <span
            ref={viraArteRef}
            className="text-fit font-display leading-none text-[#E90C00] text-shadow-red blur-[1px]"
          >
            <span>
              <span className="tracking-widest">VIRA ARTE</span>
            </span>
            <span aria-hidden="true" className="tracking-widest">
              VIRA ARTE
            </span>
          </span>
          <img
            ref={lineScribble2Ref}
            src={lineScribble}
            alt=""
            className="absolute bottom-[0%] right-[-2%] w-[57%] pointer-events-none invert blur-[0.3px]"
          />
        </div>
        <span
          ref={studioRef}
          className="text-fit font-display leading-none text-white text-shadow-white blur-[1px] mt-[-1%]"
        >
          <span>
            <span className="tracking-wide">STUDIO</span>
          </span>
          <span aria-hidden="true" className="tracking-wide">
            STUDIO
          </span>
        </span>
        <span
          ref={numberRef}
          className="text-fit font-display leading-none text-white text-shadow-white blur-[1px] mt-[-8%]"
        >
          <span>
            <span className="tracking-wide">091</span>
          </span>
          <span aria-hidden="true" className="tracking-wide">
            091
          </span>
        </span>
      </div>
    </header>
  );
}
