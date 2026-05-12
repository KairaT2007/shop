import HeroSection from '@/components/blocks/Greeting'
import Testimonials from '@/components/blocks/Testimonials';

const menudata = [
  {
    id: 1,
    img: '/signin.jpg',
    imgAlt: 'plate-1',
    userComment: 'The ambiance is perfect and the food is absolutely delicious. Highly recommended!',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-56.png'
  },
  {
    id: 2,
    img: '/signup.jpg',
    imgAlt: 'plate-2',
    userComment: 'Best dining experience in town. The staff is friendly and the menu is exceptional.',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-46.png'
  },
  {
    id: 3,
    img: '/signin.jpg',
    imgAlt: 'plate-3',
    userComment: 'Every dish is crafted with care. This place never disappoints!',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png'
  },
  {
    id: 4,
    img: '/signup.jpg',
    imgAlt: 'plate-4',
    userComment: 'Great atmosphere and incredible flavors. A must-visit restaurant!',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-58.png'
  },
  {
    id: 5,
    img: '/signin.jpg',
    imgAlt: 'plate-3',
    userComment: 'Every dish is crafted with care. This place never disappoints!',
    userAvatar: 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-57.png'
  }
]

export default function Home() {
  return (
    <div>
      <div className='overflow-x-hidden'>
        <main className='flex flex-col pt-17.5'>
          <HeroSection menudata={menudata} />
          <Testimonials/>
        </main>
      </div>
    </div>
  );
}
