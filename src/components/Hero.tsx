import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import heroBg from "../assets/hero-bg.webm";
import lineScribble from "../assets/line-scribble.png";
import ovalScribble from "../assets/oval-scribble.png";

gsap.registerPlugin(SplitText);

export function Hero() {
  const taglineRef = useRef<HTMLSpanElement>(null);
  const studioRef = useRef<HTMLSpanElement>(null);
  const lineScribbleRef = useRef<HTMLImageElement>(null);
  const ovalScribbleRef = useRef<HTMLImageElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });

      // Split text into characters
      const taglineSplit = new SplitText(taglineRef.current, { type: "chars" });
      const studioSplit = new SplitText(studioRef.current, { type: "chars" });

      // Animate tagline letters - faster and more dynamic
      tl.from(taglineSplit.chars, {
        opacity: 0,
        y: 60,
        rotationX: -90,
        scale: 0.5,
        stagger: 0.04,
        duration: 1,
        ease: "back.out(1.7)",
      });

      // Line scribble drawing effect - starting in the middle of tagline
      tl.fromTo(
        lineScribbleRef.current,
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

      // Oval scribble drawing effect like a pie timer - faster
      tl.fromTo(
        ovalScribbleRef.current,
        {
          opacity: 1,
        },
        {
          duration: 0.5,
          ease: "power3.inOut",
          onUpdate: function() {
            const progress = this.progress();
            const angle = progress * 360;

            if (ovalScribbleRef.current) {
              // Create pie slice using clip-path with polygon points
              const centerX = 50;
              const centerY = 50;
              const radius = 70;

              // Calculate points for the pie slice
              let points = `${centerX}% ${centerY}%`;

              // Add points along the arc
              const steps = Math.ceil(angle / 5); // More steps for smoother arc
              for (let i = 0; i <= steps; i++) {
                const currentAngle = Math.min((i * 5) - 90, angle - 90); // Start from top
                const rad = (currentAngle * Math.PI) / 180;
                const x = centerX + radius * Math.cos(rad);
                const y = centerY + radius * Math.sin(rad);
                points += `, ${x}% ${y}%`;
              }

              ovalScribbleRef.current.style.clipPath = `polygon(${points})`;
            }
          }
        },
        "<0.25"
      );

      // Animate studio letters - random with scale and blur
      tl.from(
        studioSplit.chars,
        {
          opacity: 0,
          scale: 2,
          y: '50%',
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
      <div className="relative z-10 w-[95vw]">
        <div className="relative">
          <span
            ref={taglineRef}
            className="text-fit font-display leading-none text-[#E90C00] text-shadow-red blur-[1px]"
          >
            <span>
              <span className="tracking-widest">SUA IDEIA VIRA ARTE</span>
            </span>
            <span aria-hidden="true" className="tracking-widest">
              SUA IDEIA VIRA ARTE
            </span>
          </span>
          <img
            ref={lineScribbleRef}
            src={lineScribble}
            alt=""
            className="absolute bottom-[0%] left-[20%] w-[29%] pointer-events-none invert blur-[0.3px]"
          />
          <img
            ref={ovalScribbleRef}
            src={ovalScribble}
            alt=""
            className="absolute top-[-20%] right-[-2%] w-[32%] h-[140%] pointer-events-none invert blur-[0.3px]"
          />
        </div>
        <span
          ref={studioRef}
          className="text-fit font-display leading-none text-white text-shadow-white blur-[1px] mt-[-1%]"
        >
          <span>
            <span className="tracking-wide">STUDIO 091</span>
          </span>
          <span aria-hidden="true" className="tracking-wide">
            STUDIO 091
          </span>
        </span>
      </div>
    </header>
  );
}
