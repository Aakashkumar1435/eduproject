import AboutHeader from '@/app/components/about/AboutHeader/AboutHeader';
import AboutWhatWeOffer from '@/app/components/about/AboutWhatWeOffer/AboutWhatWeOffer';
import AboutOurTeam from '@/app/components/about/AboutOurTeam/AboutOurTeam';
import Testimonials from '@/app/components/about/Testimonials/Testimonials';
import Navbar from '../components/Home/Navbar';
import Footer from '../components/footer/Footer';


export default function AboutPage() {
  return (
    <main>
      <Navbar />
      <div className="pt-16"> {/* Adjust 'pt-24' to match Navbar height */}
        <AboutHeader />
        <AboutWhatWeOffer />
        <AboutOurTeam />
        <Testimonials />
        <Footer />
      </div>

    </main>
  );
}
