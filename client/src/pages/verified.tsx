import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
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
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import NavBar from '../components/navbar';
import {
  BookmarkAltIcon,
  BookOpenIcon,
  RssIcon,
  ViewListIcon,
} from '@heroicons/react/outline';

import FadeIn from 'react-fade-in';

export default function verified() {
  return (
    <>
      <FadeIn>
        <NavBar />

        <div className="min-h-full pt-16 pb-12 flex flex-col bg-white">
          <main className="flex-grow flex flex-col justify-center max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8">
            <div className="py-16">
              <div className="text-center">
                <div className="flex-shrink-0 flex justify-center">
                  <a className="inline-flex">
                    <span className="sr-only">Workflow</span>
                    <img
                      className="h-24 w-auto"
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/Eo_circle_green_checkmark.svg/2048px-Eo_circle_green_checkmark.svg.png"
                      alt=""
                    />
                  </a>
                </div>
                <h1 className="mt-2 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                  Verified
                </h1>
                <p className="mt-2 text-base text-gray-500">
                  Please check back on discord. You have been given your roles.
                </p>
                <div className="mt-6"></div>
              </div>
            </div>
          </main>
        </div>
        <Footer />
      </FadeIn>
    </>
  );
}
