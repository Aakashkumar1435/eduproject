import AboutHeader from '@/app/components/about/AboutHeader/AboutHeader';
import AboutWhatWeOffer from '@/app/components/about/AboutWhatWeOffer/AboutWhatWeOffer';
import AboutOurTeam from '@/app/components/about/AboutOurTeam/AboutOurTeam';
import Testimonials from '@/app/components/about/Testimonials/Testimonials';
import FeedbackForm from '@/app/components/about/FeedbackForm/FeedbackForm';

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
