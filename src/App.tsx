import { useState, useEffect } from "react";
import { Hero } from "./components/Hero";
import { HeroMobile } from "./components/HeroMobile";

export function App() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return isMobile ? <HeroMobile /> : <Hero />;
}
