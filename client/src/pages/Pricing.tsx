import { Link } from 'react-router-dom';
import { CheckCircleIcon } from '@heroicons/react/solid';
import Footer from 'components/Footer';
import NavBar from 'components/navbar';
import FadeIn from 'react-fade-in';
import { CheckIcon } from '@heroicons/react/outline'
const includedFeatures = [
  'Access to one of the best serversides on the market',
  'Unrestricted access to games',
  '24/7 Support',
  'Script saving system',
  'Dozens of unique features that no other serverside has',
  'Built in script hub',
];
const premiumfeatures = [
  'Everything in Standard',
  'Access to 10K+ player games',
  'Bypass our blacklist policy',
  'Private Scripts',
  'Access to the best, and most powerful interface seen',
  'Beta Tester',
];
export default function Pricing() {
  return (
    <FadeIn>
      <NavBar />
      <div className="bg-white-100">
        <div className="pt-12 sm:pt-16 lg:pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-4xl">
                Pricing
              </h2>
              <p className="mt-4 text-xl text-gray-600">
                If you&apos;re not satisfied, contact us at{' '}
                <strong>refund@serverside.fun</strong> within the first 30 days
                and we will send you a full refund. You can also get a free
                trial that lasts a day before you consider purchasing.
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 bg-white pb-16 sm:mt-12 sm:pb-20 lg:pb-28">
          <div className="relative">
            <div className="absolute inset-0 h-1/2 bg-white-100" />
            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                  <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                    Standard Access
                  </h3>
                  <p className="mt-6 text-base text-gray-500">
                    The second you purchase this, you get instant, unrestricted
                    access to all of our supported games. We&apos;ve been
                    leading the serverside sector since 2018, and have been
                    maintaining our reputation for being{' '}
                    <strong>the best</strong>.
                  </p>
                  <div className="mt-8">
                    <div className="flex items-center">
                      <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
                        What&apos;s included
                      </h4>
                      <div className="flex-1 border-t-2 border-gray-200" />
                    </div>
                    <ul
                      role="list"
                      className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5"
                    >
                      {includedFeatures.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start lg:col-span-1"
                        >
                          <div className="flex-shrink-0">
                            <CheckCircleIcon
                              className="h-5 w-5 text-green-400"
                              aria-hidden="true"
                            />
                          </div>
                          <p className="ml-3 text-sm text-gray-700">
                            {feature}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                  <p className="text-lg leading-6 font-medium text-gray-900">
                    Pay once, own it forever
                  </p>
                  <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
                    <span>$13</span>
                    <span className="ml-3 text-xl font-medium text-gray-500">
                      USD
                    </span>
                  </div>
                  <p className="mt-4 text-sm">
                      <Link
                        className="font-medium text-gray-500 underline"
                        to="/terms"
                      >
                        Learn about our blacklist policy & terms
                      </Link>
                    </p>
                  <div className="mt-6">
                    <div className="rounded-md shadow">
                    <a href="https://api.serverside.fun/auth/discord" className="flex w-full items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                    Purchase Standard
                  </a>
                     
                    </div>
                  </div>
                  <div className="mt-4 text-sm">
                    <Link to="/trial">
                      Get a free trial{' '}
                      <span className="font-normal text-gray-500">(1 day)</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="pt-12 sm:pt-16 lg:pt-20">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                  <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl lg:text-3xl">
                    Premium Version
                  </h2>
                  <p className="mt-4 text-xl text-gray-600">
                    Explore the endless possibilities of serverside access with
                    our premium version.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-lg mx-auto rounded-lg shadow-lg overflow-hidden lg:max-w-none lg:flex">
                  <div className="flex-1 bg-white px-6 py-8 lg:p-12">
                    <h3 className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                      Endless Access
                    </h3>
                    <p className="mt-6 text-base text-gray-500">
                    The second you purchase this, you get instant, unrestricted
                    access to all of our supported games. We&apos;ve been
                    leading the serverside sector since 2018, and have been
                    maintaining our reputation for being{' '}
                    <strong>the best</strong>.
                  </p>
                    <div className="mt-8">
                      <div className="flex items-center">
                        <h4 className="flex-shrink-0 pr-4 bg-white text-sm tracking-wider font-semibold uppercase text-indigo-600">
                          What&apos;s included
                        </h4>
                        <div className="flex-1 border-t-2 border-gray-200" />
                      </div>
                      <ul
                        role="list"
                        className="mt-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5"
                      >
                        {premiumfeatures.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-start lg:col-span-1"
                          >
                            <div className="flex-shrink-0">
                              <CheckCircleIcon
                                className="h-5 w-5 text-green-400"
                                aria-hidden="true"
                              />
                            </div>
                            <p className="ml-3 text-sm text-gray-700">
                              {feature}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="py-8 px-6 text-center bg-gray-50 lg:flex-shrink-0 lg:flex lg:flex-col lg:justify-center lg:p-12">
                    <p className="text-lg leading-6 font-medium text-gray-900">
                      Pay once, own it forever
                    </p>
                    <div className="mt-4 flex items-center justify-center text-5xl font-extrabold text-gray-900">
                      <span>$50-100</span>
                      <span className="ml-3 text-xl font-medium text-gray-500">
                        USD
                      </span>
                    </div>
                    <p className="mt-4 text-sm">
                      <Link
                        className="font-medium text-gray-500 underline"
                        to="/terms"
                      >
                        Learn about our blacklist policy & terms
                      </Link>
                    </p>
                    <div className="mt-6">
                    <div className="rounded-md shadow">
                    <a href="https://pastebin.com/raw/F6K9Nbrm" className="flex w-full items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700">
                    Purchase Premium
                  </a>
                      </div>
                    </div>
                    <div className="mt-4 text-sm" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </FadeIn>
  );
}
