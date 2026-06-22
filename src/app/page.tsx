import { ScrollProgress } from "@/components/portfolio/scroll-progress";
import { CursorGlow } from "@/components/portfolio/cursor-glow";
import { CustomCursor } from "@/components/portfolio/custom-cursor";
import { IntroLoader } from "@/components/portfolio/intro-loader";
import { Navbar } from "@/components/portfolio/navbar";
import { Hero } from "@/components/portfolio/hero";
import { About } from "@/components/portfolio/about";
import { Stats } from "@/components/portfolio/stats";
import { Languages } from "@/components/portfolio/languages";
import { AdminApp } from "@/components/portfolio/admin-app";
import { MonopolyGame } from "@/components/portfolio/monopoly-game";
import { SecurityServices } from "@/components/portfolio/security-services";
import { Gallery } from "@/components/portfolio/gallery";
import { Contact } from "@/components/portfolio/contact";
import { Footer } from "@/components/portfolio/footer";

export default function Home() {
  return (
    <main className="relative min-h-screen w-full overflow-x-hidden bg-background text-foreground">
      <IntroLoader />
      <ScrollProgress />
      <CustomCursor />
      <CursorGlow />
      <Navbar />
      <Hero />
      <About />
      <Stats />
      <Languages />
      <AdminApp />
      <MonopolyGame />
      <SecurityServices />
      <Gallery />
      <Contact />
      <Footer />
    </main>
  );
}
