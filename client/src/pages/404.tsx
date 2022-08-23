import FadeIn from 'react-fade-in';

import {
  AnnotationIcon,
  ChevronRightIcon,
  GlobeAltIcon,
  HomeIcon,
  LightningBoltIcon,
  MailIcon,
  MenuIcon,
  ScaleIcon,
  UsersIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import NavBar from '../components/navbar';
import {
  BookmarkAltIcon,
  BookOpenIcon,
  RssIcon,
  ViewListIcon,
} from '@heroicons/react/outline';

const links = [
  { title: 'Home', description: 'Visit our main page', icon: HomeIcon },
];

export default function ERROR() {
  return (
    <>
      <FadeIn>
        <NavBar />

        <div className="bg-white">
          <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex-shrink-0 pt-16"></div>
            <div className="max-w-xl mx-auto py-16 sm:py-24">
              <div className="text-center">
                <p className="text-sm font-semibold text-indigo-600 uppercase tracking-wide">
                  404 error
                </p>
                <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  This page does not exist.
                </h1>
                <p className="mt-2 text-lg text-gray-500">
                  The page you are looking for could not be found.
                </p>
              </div>
              <div className="mt-12">
                <h2 className="text-sm font-semibold text-gray-500 tracking-wide uppercase">
                  Popular pages
                </h2>
                <ul
                  role="list"
                  className="mt-4 border-t border-b border-gray-200 divide-y divide-gray-200"
                >
                  {links.map((link, linkIdx) => (
                    <li
                      key={linkIdx}
                      className="relative py-6 flex items-start space-x-4"
                    >
                      <div className="flex-shrink-0">
                        <span className="flex items-center justify-center h-12 w-12 rounded-lg bg-indigo-50">
                          <link.icon
                            className="h-6 w-6 text-indigo-700"
                            aria-hidden="true"
                          />
                        </span>
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="text-base font-medium text-gray-900">
                          <span className="rounded-sm focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500">
                            <a href="/" className="focus:outline-none">
                              <span
                                className="absolute inset-0"
                                aria-hidden="true"
                              />
                              {link.title}
                            </a>
                          </span>
                        </h3>
                        <p className="text-base text-gray-500">
                          {link.description}
                        </p>
                      </div>
                      <div className="flex-shrink-0 self-center">
                        <ChevronRightIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </FadeIn>
    </>
  );
}
