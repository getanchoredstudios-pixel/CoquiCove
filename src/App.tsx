import { Hero, Nav, TrustStrip } from "@/sections/Header";
import { ExperienceSection, FeaturesSection, QuoteBreak } from "@/sections/Experience";
import { GallerySection, WhySection } from "@/sections/Showcase";
import { ExploreSection, TestimonialsSection } from "@/sections/Explore";
import { FaqSection, FinalCta, Footer, MobileBookingBar, StaySection } from "@/sections/Stay";
import BookingModal from "@/components/BookingModal";

export default function App() {
  return (
    <div className="min-h-screen bg-jungle-950 pb-16 sm:pb-0">
      <Nav />
      <main>
        <Hero />
        <TrustStrip />
        <ExperienceSection />
        <FeaturesSection />
        <QuoteBreak />
        <GallerySection />
        <WhySection />
        <ExploreSection />
        <TestimonialsSection />
        <StaySection />
        <FaqSection />
        <FinalCta />
      </main>
      <Footer />
      <MobileBookingBar />
      <BookingModal />
    </div>
  );
}
