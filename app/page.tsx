import { Navbar } from "./components/Navbar";
import { Features } from "./components/Features";
import { HowItWorks } from "./components/HowItWorks";
import { Hero } from "./components/Hero";
import { Footer } from "./components/Footer";
import { FAQ } from "./components/FAQ";
import { CTA } from "./components/CTA";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <HowItWorks />
      <Features />
      <FAQ />
      <CTA />
      <Footer />
    </main>
  );
}
