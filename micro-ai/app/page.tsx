import Hero from "@/components/hero";
import ScrollVideo from "@/components/scrollVideos";
import DrawWithText from "@/components/drawWithText"; 
import DemoChat from "@/components/demoChat";
import VideoCarousel from "@/components/kullanimAlan";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ScrollVideo />
      <DrawWithText />
      <DemoChat />
      <VideoCarousel />
      <Footer />
    </main>
  );
}
