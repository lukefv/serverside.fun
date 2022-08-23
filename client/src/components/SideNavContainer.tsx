/* eslint-disable jsx-a11y/anchor-is-valid */
import { Fragment, useState } from 'react';
import {
  CodeIcon,
  FolderIcon,
  MenuIcon,
  PuzzleIcon,
  ShieldCheckIcon,
  TrendingUpIcon,
  XIcon,
} from '@heroicons/react/outline';
import { Transition, Dialog } from '@headlessui/react';
import { classNames } from 'lib/CustomFunctions';
import BrandLogo from 'assets/BrandLogo';
import { Link, useLocation } from 'react-router-dom';
import useUser from 'lib/Hooks';
import PageHeader from './PageHeader';

export default function SideNavContainer(props: {
  children: any;
  title: string;
  header: boolean;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const { user, isFetching } = useUser();

  const isDashboard = location.pathname === '/user/dashboard';
  const isGames = location.pathname === '/buyers/games';
  const isScript = location.pathname === '/buyers/scripts';
  const isExecutor = location.pathname === '/buyers/executor';
  const isLogs = location.pathname === '/admin/logs';

  const navigation = [
    {
      name: 'Dashboard',
      href: '/user/dashboard',
      icon: TrendingUpIcon,
      current: isDashboard,
    },
    {
      name: 'Games',
      href: '/buyers/games',
      buyerProtected: true,
      icon: PuzzleIcon,
      current: isGames,
    },
    {
      name: 'Scripts',
      href: '/buyers/scripts',
      buyerProtected: true,
      icon: FolderIcon,
      current: isScript,
    },
    {
      name: 'Executor',
      href: '/buyers/executor',
      icon: CodeIcon,
      buyerProtected: true,
      current: isExecutor,
    },
    {
      name: 'Admin',
      href: '/admin/logs',
      icon: ShieldCheckIcon,
      adminProtected: true,
      buyerProtected: false,
      current: isLogs,
    },
  ];

  return (
    <div>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 flex z-40 md:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="-translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="-translate-x-full"
          >
            <div className="relative flex-1 flex flex-col max-w-xs w-full bg-white">
              <Transition.Child
                as={Fragment}
                enter="ease-in-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in-out duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="absolute top-0 right-0 -mr-12 pt-2">
                  <button
                    type="button"
                    className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XIcon className="h-6 w-6" aria-hidden="true" />
                  </button>
                </div>
              </Transition.Child>
              <div className="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                <div className="flex-shrink-0 flex items-left px-4">
                  <BrandLogo />
                </div>

                <nav className="mt-5 px-2 space-y-1">
                {navigation.map((item) =>
                item.adminProtected ? (
                  user && user.permission >= 2 ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-red-200 border-red-300 text-red-600'
                          : ' hover:bg-gray-100 hover:bg-opacity-70',
                        'group text-gray-500 flex transition bg-opacity-70 items-center px-2 py-2 text-sm font-medium rounded-md',
                      )}
                    >
                      <item.icon
                        className={classNames(
                          'mr-4 flex-shrink-0 h-6 w-6 text-gray-500',
                          item.current ? 'text-red-600' : '',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ) : null
                ) : item.buyerProtected ? (
                  user && user.buyer ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-red-200 border-red-300 text-red-600'
                          : ' hover:bg-gray-100 hover:bg-opacity-70',
                        'group text-gray-500 flex transition bg-opacity-70 items-center px-2 py-2 text-sm font-medium rounded-md',
                      )}
                    >
                      <item.icon
                        className={classNames(
                          'mr-4 flex-shrink-0 h-6 w-6 text-gray-500',
                          item.current ? 'text-red-600' : '',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ) : null
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-red-200 border-red-300 text-red-600'
                        : ' hover:bg-gray-100 hover:bg-opacity-70',
                      'group text-gray-500 flex transition bg-opacity-70 items-center px-2 py-2 text-sm font-medium rounded-md',
                    )}
                  >
                    <item.icon
                      className={classNames(
                        'mr-4 flex-shrink-0 h-6 w-6 text-gray-500',
                        item.current ? 'text-red-600' : '',
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ),
              )}
                </nav>
              </div>
              <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            
              
            
            <div className="flex items-center">
              <div>
                <img
                  className="inline-block h-9 w-9 rounded-full"
                  src={user && user.profilePicture}
                  alt=""
                />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium">
                  {user && user.username}
                </p>
                <a href="https://api.serverside.fun/auth/logout" className="flex-shrink-0 w-full group block">
                <p className="text-xs font-medium text-gray-500 hover:text-black transition">
                {user && (
             <p>Logout
            </p>
            )}
                </p>
                </a>
               
              </div>
           
          
        </div>
          
        </div>
            </div>
          </Transition.Child>
          <div className="flex-shrink-0 w-14" aria-hidden="true">
            {/* Force sidebar to shrink to fit close icon */}
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        {/* Sidebar component, swap this element with another sidebar if you like */}
        <div className="flex-1 flex flex-col min-h-0 bg-white border-r border-gray-200">
          <div className="flex-1 flex flex-col pb-45 ">
            <div className="flex items-center justify-center">
              <BrandLogo className="w-full mx-10" />
            </div>
            <p className="pl-4 text-sm text-gray-500">
              Current Plan:{' '}
              <span className="text-red-400 font-medium">{ (user &&
          user.buyer &&
          user.buyer.type.charAt(0).toUpperCase() +
            user.buyer.type.slice(1).toLowerCase()) ||
        'None'}</span>
            </p>
            <nav className="mt-5 flex-1 px-2 space-y-1">
              {navigation.map((item) =>
                item.adminProtected ? (
                  user && user.permission >= 2 ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-red-200 border-red-300 text-red-600'
                          : ' hover:bg-gray-100 hover:bg-opacity-70',
                        'group text-gray-500 flex transition bg-opacity-70 items-center px-2 py-2 text-sm font-medium rounded-md',
                      )}
                    >
                      <item.icon
                        className={classNames(
                          'mr-4 flex-shrink-0 h-6 w-6 text-gray-500',
                          item.current ? 'text-red-600' : '',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ) : null
                ) : item.buyerProtected ? (
                  user && user.buyer ? (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={classNames(
                        item.current
                          ? 'bg-red-200 border-red-300 text-red-600'
                          : ' hover:bg-gray-100 hover:bg-opacity-70',
                        'group text-gray-500 flex transition bg-opacity-70 items-center px-2 py-2 text-sm font-medium rounded-md',
                      )}
                    >
                      <item.icon
                        className={classNames(
                          'mr-4 flex-shrink-0 h-6 w-6 text-gray-500',
                          item.current ? 'text-red-600' : '',
                        )}
                        aria-hidden="true"
                      />
                      {item.name}
                    </Link>
                  ) : null
                ) : (
                  <Link
                    key={item.name}
                    to={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-red-200 border-red-300 text-red-600'
                        : ' hover:bg-gray-100 hover:bg-opacity-70',
                      'group text-gray-500 flex transition bg-opacity-70 items-center px-2 py-2 text-sm font-medium rounded-md',
                    )}
                  >
                    <item.icon
                      className={classNames(
                        'mr-4 flex-shrink-0 h-6 w-6 text-gray-500',
                        item.current ? 'text-red-600' : '',
                      )}
                      aria-hidden="true"
                    />
                    {item.name}
                  </Link>
                ),
              )}
            </nav>
          </div>
          <div className="flex-shrink-0 flex border-t border-gray-200 p-4">
            
              <div className="flex items-center">
                <div>
                  <img
                    className="inline-block h-9 w-9 rounded-full"
                    src={user && user.profilePicture}
                    alt=""
                  />
                </div>
                <div className="ml-3">
                  <p className="text-sm font-medium">
                    {user && user.username}
                  </p>
                  <a href="https://api.serverside.fun/auth/logout" className="flex-shrink-0 w-full group block">
                  <p className="text-xs font-medium text-gray-500 hover:text-black transition">
                  {user && (
               <p>Logout
              </p>
              )}
                  </p>
                  </a>
                 
                </div>
              </div>
            
          </div>
        </div>
      </div>
      <div className="md:pl-64 flex flex-col flex-1">
        <div className="sticky top-0 z-10 md:hidden pl-1 pt-1 sm:pl-3 sm:pt-3 bg-gray-100">
          <button
            type="button"
            className="-ml-0.5 -mt-0.5 h-12 w-12 inline-flex items-center justify-center rounded-md text-gray-500 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-red-500"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <MenuIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <main className="flex-1">
          {props.header && <PageHeader />}
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              <h1 className="text-2xl mb-2 font-semibold text-gray-900">
                {props.title}
              </h1>
            </div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {props.children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
