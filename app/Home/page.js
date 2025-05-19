import React from 'react'
import Hero from '../components/Home/Hero';
import Hero2 from '../components/Home/Hero2';
import FoundersSection from '../components/Home/Founders';
import Impact from '../components/Home/Impact';
import OurJourney from '../components/Home/OurJourney';
import ExploreCourses from '../components/Home/Courses';
import Choose from '../components/Home/Choose';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/footer/Footer';

function HomePage() {
  return (
    <>
    <Navbar />
    <main>
      <Hero />
      <Hero2 />
      <Choose />
      <Impact />
      {/* <ExploreCourses /> */}
      {/* <OurJourney /> */}
      <FoundersSection />
      <Footer />
    </main>
    </>
  )
}

export default HomePage;