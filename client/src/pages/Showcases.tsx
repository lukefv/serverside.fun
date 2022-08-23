import Footer from 'components/Footer';
import NavBar from 'components/navbar';
import FadeIn from 'react-fade-in';

const callouts = [
  {
    name: 'TypicalModders',
    description: 'Robbing A Roblox Restaurant',
    imageSrc: '/typical1.png',
    imageAlt: '',
    href: 'https://www.youtube.com/watch?v=WSWjHgsillw&t=4s&ab_channel=TypicalModders',
  },
  {
    name: 'TypicalModders',
    description: 'Trap Rifle Script Trolling',
    imageSrc: '/typical2.png',
    imageAlt: '',
    href: 'https://www.youtube.com/watch?v=Qun34JRygjs&t=2s&ab_channel=TypicalModders',
  },
  {
    name: 'TypicalModders',
    description: 'Roblox Exploiting - Destroying A Funfair',
    imageSrc: '/typical6.jpg',
    imageAlt: '',
    href: 'https://youtu.be/0jw-QWF1qEE',
  },
  {
    name: 'TypicalModders',
    description: 'Roblox Exploiting - Booga Booga',
    imageSrc: '/typical5.jpg',
    imageAlt: '',
    href: 'https://youtu.be/gr2HVqHgD9E',
  },
  {
    name: 'Misfit Exploits',
    description: 'ROBLOX EXPLOITING #12 I Boho Salon Crushed',
    imageSrc: '/misfit1.jpg',
    imageAlt: '',
    href: 'https://www.youtube.com/watch?v=wob89wmhLMQ&ab_channel=MisfitExploits',
  },
  {
    name: 'Misfit Exploits',
    description: 'ROBLOX EXPLOITING #11 I MAKING GAMES INTO KFC!',
    imageSrc: '/misfit2.jpg',
    imageAlt: '',
    href: 'https://www.youtube.com/watch?v=fGIH1rJvyZg&ab_channel=MisfitExploits',
  },
  {
    name: 'Misfit Exploits',
    description: 'ROBLOX EXPLOITING! I VERDE DESTROYED!',
    imageSrc: '/misfit3.jpg',
    imageAlt: '',
    href: 'https://www.youtube.com/watch?v=DwNzZTSA2wk&ab_channel=MisfitExploits',
  },
 
];

export default function Showcases() {
  return (
    <FadeIn>
      <NavBar />
      <div className="bg-white-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
          <div className="max-w-2xl mx-auto py-16 sm:py-24 lg:py-16 lg:max-w-none">
            <h2 className="text-2xl font-extrabold text-gray-900">Showcases</h2>
            <p className="mt-2 text-xl text-gray-500">
              This is used by one of the biggest youtube platforms in this
              community. Have any showcases with 10k+ views? Let us know and we
              will add it.
            </p>
            <div className="mt-6 space-y-12 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-x-12">
              {callouts.map((callout) => (
                <div key={callout.name} className="group relative">
                  <div className="relative w-full h-80 bg-white rounded-lg overflow-hidden group-hover:opacity-75 sm:aspect-w-2 sm:aspect-h-1 sm:h-64 lg:aspect-w-1 lg:aspect-h-1 mt-3">
                    <img
                      src={callout.imageSrc}
                      alt={callout.imageAlt}
                      className="w-full h-full object-center object-cover"
                    />
                  </div>
                  <h3 className="mt-2 text-sm text-gray-500">
                    <a href={callout.href}>
                      <span className="absolute inset-0" />
                      {callout.name}
                    </a>
                  </h3>
                  <p className="text-base font-semibold text-gray-900">
                    {callout.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </FadeIn>
  );
}
