import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import FadeIn from 'react-fade-in';
import { Link, useLocation } from 'react-router-dom';
import BrandLogo from 'assets/BrandLogo';
import useUser from 'lib/Hooks';

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'FAQ', href: '/faq' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Showcases', href: '/showcases' },
];
function NavBar() {
  const { user, isFetching: loading } = useUser();
  const location = useLocation();

  return (
    <FadeIn delay={20}>
      <Popover>
        <nav
          className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6"
          aria-label="Global"
        >
          <div className="flex items-center flex-1">
            <div className="flex items-center justify-between w-full md:w-auto">
              <Link to="/">
                <div>
                  <span className="sr-only">JohnDoe</span>
                  <BrandLogo className="w-52" />
                </div>
              </Link>

              <div className="-mr-2 flex items-center md:hidden">
                <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                  <span className="sr-only">Open main menu</span>
                  <MenuIcon className="h-6 w-6" aria-hidden="true" />
                </Popover.Button>
              </div>
            </div>
            <div className="hidden md:block md:ml-10 md:space-x-10">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`${
                    location.pathname === item.href
                      ? 'font-bold underline underline-offset-2 text-red-500'
                      : 'font-medium'
                  } text-gray-500 transition hover:underline hover:text-gray-900`}
                >
                  {item.name}
                </Link>
              ))}
              <a
                className="text-gray-500 font-medium transition hover:underline hover:text-gray-900"
                href="https://serverside.fun/discord"
                target="_blank"
              >
                Discord
              </a>
            </div>
          </div>
          <div className="hidden md:block text-right">
            <span className="inline-flex rounded-md shadow-md ring-1 ring-black ring-opacity-5">
              {!loading && user ? (
                <Link
                  to="/user/dashboard"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white transition bg-red-600 hover:bg-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-opacity-0 focus:ring-red-500"
                >
                  Dashboard
                </Link>
              ) : (
                <a
                  href={`${process.env.REACT_APP_API_URL}/auth/discord`}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-white transition bg-red-600 hover:bg-white hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-opacity-0 focus:ring-red-500"
                >
                  Log In
                </a>
              )}
            </span>
          </div>
        </nav>

        <Transition
          as={Fragment}
          enter="duration-150 ease-out"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="duration-100 ease-in"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <Popover.Panel
            focus
            className="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden"
          >
            <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="px-5 pt-4 flex items-center justify-between">
                <div>
                  <BrandLogo className="h-8 w-auto" />
                </div>
                <div className="-mr-2">
                  <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500">
                    <span className="sr-only">Close main menu</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </Popover.Button>
                </div>
              </div>
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`${
                      location.pathname === item.href
                        ? 'text-red-500 font-bold underline underline-offset-2'
                        : 'text-gray-700 font-medium'
                    } block px-3 py-2 rounded-md text-base hover:text-gray-900 hover:bg-gray-50`}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              {!loading && user ? (
                <Link
                  to="/user/dashboard"
                  className="block w-full px-5 py-3 text-center font-medium text-red-600 bg-gray-50 hover:bg-gray-100"
                >
                  Dashboard
                </Link>
              ) : (
                <a
                  href={`${process.env.REACT_APP_API_URL}/auth/discord`}
                  className="block w-full px-5 py-3 text-center font-medium text-red-600 bg-gray-50 hover:bg-gray-100"
                >
                  Log In
                </a>
              )}
            </div>
          </Popover.Panel>
        </Transition>
      </Popover>
    </FadeIn>
  );
}

export default NavBar;
