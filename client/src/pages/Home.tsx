import {
  ChevronRightIcon,
  CodeIcon,
  LightningBoltIcon,
  MailIcon,
} from '@heroicons/react/outline';
import Footer from 'components/Footer';
import NavBar from 'components/navbar';
import { CloudIcon, StarIcon } from '@heroicons/react/solid';
import FadeIn from 'react-fade-in';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

import instance from 'lib/AxiosClient';
// eslint-disable-next-line import/no-unresolved

const transferFeatures = [
  {
    id: 1,
    name: 'Cloud Saving',
    description:
      'Despite our software being internal, it still saves all of your scripts within our games. We use cloud-saving algorithims to make sure your scripts never get lost.',
    icon: CloudIcon,
  },
  {
    id: 2,
    name: 'Endless Execution',
    description:
      'Execute anything you wish with our product. Our product can be used to execute filtering-disabled scripts on all of our supported games without errors.',
    icon: CodeIcon,
  },
  {
    id: 3,
    name: 'No Download',
    description:
      'Our software is not a cheat or an exploit, it is fully internal giving you administrative-like permissions in all of our games. Simply set your account using our dashboard and you are ready to go.',
    icon: LightningBoltIcon,
  },
];
const communicationFeatures = [
  {
    id: 1,
    name: 'Huge Support',
    description:
      'We offer one of the largest collections of games you can use our product on. With over a million games, you will have endless fun.',
    icon: StarIcon,
  },
  {
    id: 2,
    name: 'Fully Automatic',
    description:
      'The moment you purchase this product, you will be given buyer access instantly to our intuitive dashboard. You can use our dashboard to set your account, and plenty more.',
    icon: MailIcon,
  },
];

export default function Home() {
  const [games, setGames] = useState(0);
  const [buyers, setBuyers] = useState(0);
  const [executed, setExecuted] = useState(0);

  useEffect(() => {
    instance.get('/v1/stats').then((res) => {
      setGames(res.data.cache);
      setBuyers(res.data.buyer);
      setExecuted(res.data.scripts);
    });
  }, []);
  return (
    <>
      <div className="relative bg-white overflow-hidden">
        <div
          className="hidden lg:block lg:absolute lg:inset-0"
          aria-hidden="true"
        >
          <svg
            className="absolute top-0 left-1/2 transform translate-x-64 -translate-y-8"
            width={640}
            height={784}
            fill="none"
            viewBox="0 0 640 784"
          >
            <defs>
              <pattern
                id="9ebea6f4-a1f5-4d96-8c4e-4c2abf658047"
                x={118}
                y={0}
                width={20}
                height={20}
                patternUnits="userSpaceOnUse"
              >
                <rect
                  x={0}
                  y={0}
                  width={4}
                  height={4}
                  className="text-gray-200"
                  fill="currentColor"
                />
              </pattern>
            </defs>
            <rect
              y={72}
              width={640}
              height={640}
              className="text-gray-50"
              fill="currentColor"
            />
          </svg>
        </div>

        <div className="relative">
          <NavBar />
          <title>John Doe Serverside</title>
          <meta
            name="description"
            content="The Best Serverside on the Market"
          />
          <meta property="og:image" content="https://serverside.fun/icon.png" />
          <meta
            name="keywords"
            content="john doe serverside, john doe ss, john doe server side, roblox serverside, roblox server side, roblox ss, roblox hack, roblox cheat, roblox fe bypass, fe bypass roblox, best robox server side"
          />

          <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
            <div className="lg:grid lg:grid-cols-12 lg:gap-8">
              <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
                <h1>
                  <FadeIn delay={60}>
                    <Link
                      to="/trial"
                      className="inline-flex items-center text-black bg-gray-200 rounded-full p-1 pr-2 sm:text-base lg:text-sm xl:text-base hover:text-black"
                    >
                      <span className="px-3 py-0.5 text-center sm:text-left text-white text-xs font-semibold leading-5 uppercase tracking-wide bg-red-500 rounded-full">
                        FREE TRIAL
                      </span>
                      <span className="ml-4 text-sm">
                        Redeem your free one-day trial
                      </span>
                      <ChevronRightIcon
                        className="ml-2 w-5 h-5 text-gray-500"
                        aria-hidden="true"
                      />
                    </Link>
                    <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                      <span className="block text-black">
                        The Best{' '}
                        <span className="text-red-500 ">Serverside</span>
                      </span>

                      <span className="block text-gray-900">On The Market</span>
                    </span>
                  </FadeIn>
                </h1>
                <FadeIn delay={80}>
                  <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                    We are one of the most popular and powerful serversides on
                    the market. We&apos;ve been around since 2018 and have been
                    delivering the best experience for all of our users.
                  </p>
                </FadeIn>
              </div>

              <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
                <svg
                  className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-8 scale-75 origin-top sm:scale-100 lg:hidden"
                  width={640}
                  height={784}
                  fill="none"
                  viewBox="0 0 640 784"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="4f4f415c-a0e9-44c2-9601-6ded5a34a13e"
                      x={118}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-gray-200"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    y={72}
                    width={640}
                    height={640}
                    className="text-gray-50"
                    fill="currentColor"
                  />
                  <rect
                    x={118}
                    width={404}
                    height={784}
                    fill="url(#4f4f415c-a0e9-44c2-9601-6ded5a34a13e)"
                  />
                </svg>
                <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                  <FadeIn delay={90}>
                    <button
                      type="button"
                      className="relative block w-full bg-white rounded-lg overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      <span className="sr-only">Open Image</span>
                      <img className="w-full" src="dahood.png" alt="" />
                      <div
                        className="absolute inset-0 w-full h-full flex items-center justify-center"
                        aria-hidden="true"
                      />
                    </button>
                  </FadeIn>
                </div>
              </div>
            </div>

            <div className="py-16  overflow-hidden lg:py-24">
              <div className="relative max-w-xl mx-auto px-4 sm:px-6 lg:px-8 lg:max-w-7xl">
                <svg
                  className="hidden lg:block absolute left-full transform -translate-x-1/2 -translate-y-1/4"
                  width={404}
                  height={784}
                  fill="none"
                  viewBox="0 0 404 784"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="b1e6e422-73f8-40a6-b5d9-c8586e37e0e7"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-gray-200"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={784}
                    fill="url(#b1e6e422-73f8-40a6-b5d9-c8586e37e0e7)"
                  />
                </svg>

                <div className="relative">
                  <FadeIn delay={100}>
                    <h2 className="text-center text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                      Delivering the Best Experience for All of Our Users
                    </h2>
                    <p className="mt-4 max-w-3xl mx-auto text-center text-xl text-gray-500">
                      With a ton of features, we&apos;ve made it easy for you to
                      get the{' '}
                      <span className="underline font-medium text-black decoration-red-500">
                        most
                      </span>{' '}
                      out of our product.
                    </p>
                  </FadeIn>
                </div>
                <div className="relative mt-12 lg:mt-24 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
                  <div className="relative">
                    <FadeIn delay={110}>
                      <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                        Intuitive Interface & Features
                      </h3>
                      <p className="mt-3 text-lg text-gray-500">
                        Compared to our competitors, our interface is easy to
                        use and intuitive with our dashboard, keeping all of our
                        integrations in one spot.
                      </p>

                      <dl className="mt-10 space-y-10">
                        {transferFeatures.map((item) => (
                          <div key={item.id} className="relative">
                            <dt>
                              <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                                <item.icon
                                  className="h-6 w-6"
                                  aria-hidden="true"
                                />
                              </div>
                              <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                {item.name}
                              </p>
                            </dt>
                            <dd className="mt-2 ml-16 text-base text-gray-500">
                              {item.description}
                            </dd>
                          </div>
                        ))}
                      </dl>
                    </FadeIn>
                  </div>

                  <div
                    className="mt-10 -mx-4 relative lg:mt-0"
                    aria-hidden="true"
                  >
                    <FadeIn delay={120}>
                      <svg
                        className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                        width={784}
                        height={404}
                        fill="none"
                        viewBox="0 0 784 404"
                      >
                        <defs>
                          <pattern
                            id="ca9667ae-9f92-4be7-abcb-9e3d727f2941"
                            x={0}
                            y={0}
                            width={20}
                            height={20}
                            patternUnits="userSpaceOnUse"
                          >
                            <rect
                              x={0}
                              y={0}
                              width={4}
                              height={4}
                              className="text-gray-200"
                              fill="currentColor"
                            />
                          </pattern>
                        </defs>
                        <rect
                          width={784}
                          height={404}
                          fill="url(#ca9667ae-9f92-4be7-abcb-9e3d727f2941)"
                        />
                      </svg>
                      <img
                        className="relative mx-auto"
                        width={400}
                        src="/script.png"
                        alt=""
                      />
                    </FadeIn>
                  </div>
                </div>

                <svg
                  className="hidden lg:block absolute right-full transform translate-x-1/2 translate-y-12"
                  width={404}
                  height={784}
                  fill="none"
                  viewBox="0 0 404 784"
                  aria-hidden="true"
                >
                  <defs>
                    <pattern
                      id="64e643ad-2176-4f86-b3d7-f2c5da3b6a6d"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-gray-200"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={784}
                    fill="url(#64e643ad-2176-4f86-b3d7-f2c5da3b6a6d)"
                  />
                </svg>

                <div className="relative mt-12 sm:mt-16 lg:mt-24">
                  <div className="lg:grid lg:grid-flow-row-dense lg:grid-cols-2 lg:gap-8 lg:items-center">
                    <div className="lg:col-start-2">
                      <FadeIn delay={150}>
                        <h3 className="text-2xl font-extrabold text-gray-900 tracking-tight sm:text-3xl">
                          Unique Features
                        </h3>
                        <p className="mt-3 text-lg text-gray-500">
                          Our team constantly works on new features to make sure
                          that we beat the competition.
                        </p>

                        <dl className="mt-10 space-y-10">
                          {communicationFeatures.map((item) => (
                            <div key={item.id} className="relative">
                              <dt>
                                <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
                                  <item.icon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                  />
                                </div>
                                <p className="ml-16 text-lg leading-6 font-medium text-gray-900">
                                  {item.name}
                                </p>
                              </dt>
                              <dd className="mt-2 ml-16 text-base text-gray-500">
                                {item.description}
                              </dd>
                            </div>
                          ))}
                        </dl>
                      </FadeIn>
                    </div>

                    <div className="mt-10 -mx-4 relative lg:mt-0 lg:col-start-1">
                      <FadeIn delay={165}>
                        <svg
                          className="absolute left-1/2 transform -translate-x-1/2 translate-y-16 lg:hidden"
                          width={784}
                          height={404}
                          fill="none"
                          viewBox="0 0 784 404"
                          aria-hidden="true"
                        >
                          <defs>
                            <pattern
                              id="e80155a9-dfde-425a-b5ea-1f6fadd20131"
                              x={0}
                              y={0}
                              width={20}
                              height={20}
                              patternUnits="userSpaceOnUse"
                            >
                              <rect
                                x={0}
                                y={0}
                                width={4}
                                height={4}
                                className="text-gray-200"
                                fill="currentColor"
                              />
                            </pattern>
                          </defs>
                          <rect
                            width={784}
                            height={404}
                            fill="url(#e80155a9-dfde-425a-b5ea-1f6fadd20131)"
                          />
                        </svg>
                        <img
                          className="relative mx-auto"
                          width={510}
                          src="/arsenal.png"
                          alt=""
                        />
                      </FadeIn>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-red-600 mb-8">
              <FadeIn delay={180}>
                <div className="max-w-7xl mx-auto py-12 px-4 sm:py-16 sm:px-6 lg:px-8 lg:py-20">
                  <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                      Trusted by Hundreds of Customers
                    </h2>
                    <p className="mt-3 text-xl text-red-200 sm:mt-4">
                      serverside.fun is built by a team of experts and veterans
                      in this community. We strive to deliver many high-quality
                      supported games, and one of the best experiences you will
                      have.
                    </p>
                  </div>
                  <dl className="mt-10 text-center sm:max-w-3xl sm:mx-auto sm:grid sm:grid-cols-3 sm:gap-8">
                    <div className="flex flex-col">
                      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-red-200">
                        Active Buyers
                      </dt>
                      <dd className="order-1 text-5xl font-extrabold text-white">
                        {buyers && buyers.toLocaleString()}
                      </dd>
                    </div>
                    <div className="flex flex-col mt-10 sm:mt-0">
                      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-red-200">
                        Unique Games
                      </dt>
                      <dt className="order-2 mt-2 text-lg leading-10 font-medium text-red-200">
                        (LIVE)
                      </dt>
                      <dd className="order-1 text-5xl font-extrabold text-white">
                        {games && games.toLocaleString()}
                      </dd>
                    </div>
                    <div className="flex flex-col mt-10 sm:mt-0">
                      <dt className="order-2 mt-2 text-lg leading-6 font-medium text-red-200">
                        Scripts Executed
                      </dt>
                      <dd className="order-1 text-5xl font-extrabold text-white">
                        {executed && executed.toLocaleString()}
                      </dd>
                    </div>
                  </dl>
                </div>
              </FadeIn>
            </div>
          </main>
        </div>
      </div>
     
       
   
   
      <div className="max-w-7xl mx-auto text-center py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
          <span className="block">Ready to dive in?</span>
          <span className="block text-red-600">Purchase the best serverside today.</span>
        </h2>
        <div className="mt-8 flex justify-center">
          <div className="inline-flex rounded-md shadow">
            <a
              href="https://serverside.fun/pricing"
              className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700"
            >
              Purchase
            </a>
          </div>
          <div className="ml-3 inline-flex">
            
          </div>
        </div>
      </div>
      <div className="relative">
          
          <a
            href="https://www.trustpilot.com/review/serverside.fun"
          >
            <img
              className="mx-auto h-14"
              src="/trustpilot.png"
              alt="Trustpilot"
            />
          </a>
      

    </div>
    
      <Footer />
    </>
  );
}
