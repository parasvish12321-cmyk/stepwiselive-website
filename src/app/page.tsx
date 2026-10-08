import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import FounderStory from "@/components/sections/FounderStory";
import WhyStepWise from "@/components/sections/WhyStepWise";
import PortalOverview from "@/components/sections/PortalOverview";
import Results from "@/components/sections/Results";
import Courses from "@/components/sections/Courses";
import CallPredictor from "@/components/sections/CallPredictor";
import FAQ from "@/components/sections/FAQ";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex-1 w-full flex flex-col">
        <Hero />
        <FounderStory />
        <WhyStepWise />
        <PortalOverview />
        <Results />
        <Courses />
        <CallPredictor />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
