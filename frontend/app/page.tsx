import Header from "@/components/landing/Header";
import HeroSection from "@/components/landing/HeroSection";
import CenterSection from "@/components/landing/CenterSection";
import EAPSection from "@/components/landing/EAPSection";
import ProgramsSection from "@/components/landing/ProgramsSection";
import TestimonialsSection from "@/components/landing/TestimonialsSection";
import ContactSection from "@/components/landing/ContactSection";
import Footer from "@/components/landing/Footer";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <CenterSection />
      <EAPSection />
      <ProgramsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
