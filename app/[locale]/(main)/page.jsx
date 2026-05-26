import GreetingSlider from '@/components/blocks/GreetingSlider'
import Testimonials from '@/components/blocks/Testimonials';


export default function page() {
  return (
    <main className='flex flex-col pt-17.5 overflow-x-hidden'>
      <GreetingSlider />
      <Testimonials />
    </main>
  );
}
