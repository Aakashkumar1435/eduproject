import Hero from "@/components/home/hero/Hero";
import Hero2 from "@/components/home/hero2/Hero2";
import WhyChoose from "@/components/home/whyChoose/WhyChoose";
import Impact from "@/components/home/Impact/Impact";
import ExploreCourses from "@/components/home/exploreCourses/ExploreCourses";
import OurJourney from "@/components/home/OurJourney/OurJourney";
import FoundersSection from "@/components/home/founders/founders";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <Hero2 />
      <WhyChoose />
      <Impact />
      <ExploreCourses />
      <OurJourney />
      <FoundersSection />
      
    </main>
  );
}
