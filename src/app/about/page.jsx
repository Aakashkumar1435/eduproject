import AboutHeader from '@/components/about/AboutHeader/AboutHeader';
import AboutWhatWeOffer from '@/components/about/AboutWhatWeOffer/AboutWhatWeOffer';
import AboutOurTeam from '@/components/about/AboutOurTeam/AboutOurTeam';
import Testimonials from '@/components/about/Testimonials/Testimonials';
import FeedbackForm from '@/components/about/FeedbackForm/FeedbackForm';

export default function AboutPage() {
  return (
    <main>
      <AboutHeader />
      <AboutWhatWeOffer />
      <AboutOurTeam/>
      <Testimonials/>
      <FeedbackForm/>
    </main>
  );
}
