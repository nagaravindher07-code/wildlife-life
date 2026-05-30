import { Hero } from "@/components/Hero";
import { ParallaxSection } from "@/components/ParallaxSection";
import { Carousel } from "@/components/Carousel";

export default function Home() {
  return (
    <main>
      <Hero />
      <ParallaxSection />
      <Carousel />
    </main>
  );
}
