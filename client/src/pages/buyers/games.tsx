//@ts-ignore
//@es-lint-disable
import instance from 'lib/AxiosClient';
import useUser from 'lib/Hooks';
import { Listbox, Transition } from '@headlessui/react';
import {
  ArrowNarrowLeftIcon,
  ArrowNarrowRightIcon,
  CheckIcon,
  CodeIcon,
  HeartIcon,
  PuzzleIcon,
  SelectorIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import React, {
  Fragment,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import SideNavContainer from '../../components/SideNavContainer';

import FadeIn from 'react-fade-in';

import { ExclamationIcon, FingerPrintIcon, XCircleIcon } from '@heroicons/react/outline';

import GameInfo from '../../components/Modals/GameInfo';
import { useGames } from '../../lib/Hooks';
import { useUnique } from '../../lib/Hooks';
function Games() {
  const [modalOpen, setModalOpen] = useState(false);
  const [data, setData] = useState([]);
  const { user, isFetching } = useUser();
  const { games, isLoading } = useGames();
  const { cache } = useUnique();
  const searchInput = useRef<HTMLInputElement>(null);

  const [searchTerm, setSearchTerm] = useState('');

  const handleKeyPress = useCallback((event: any) => {
    if (!searchInput.current) return;
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      searchInput.current.focus();
    }
  }, []);

  const filteredListings =
    games &&
    games.filter((listing: any) =>
      listing.name.toLowerCase().includes(searchTerm.toLowerCase()),
    );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  var totalPlayers =
    games &&
    games.reduce(
      (accumulator: number, currentValue: { playerCount: number }) => {
        return accumulator + currentValue.playerCount;
      },
      0,
    );

  const stats = [
    {
      id: 1,
      name: 'Total Games',
      //@ts-ignore
      stat: (games && games.length.toLocaleString()) || '0',
      icon: PuzzleIcon,
      change: '122',
      changeType: 'increase',
    },
    {
      id: 2,
      name: 'Total Players',
      stat: (totalPlayers && totalPlayers.toLocaleString()) || '0',
      icon: UserGroupIcon,
      change: '5.4%',
      changeType: 'increase',
    },
    {
      id: 3,
      name: 'Unique Games',
      //@ts-ignore
      stat: (cache && cache.toLocaleString()) || 'N/A',
      icon: FingerPrintIcon,
      change: '3.2%',
      changeType: 'decrease',
    },
  ];

  return (
    <>
      <GameInfo open={modalOpen} setOpen={setModalOpen} data={data} />
      <SideNavContainer header={false} title="Games">
        <FadeIn delay={50}>
          <div>
            <h3 className="text-lg leading-6 font-medium text-gray-900 focus:border-red-500 border-gray-200">
              Updates Every 5 Minutes
            </h3>
            <FadeIn delay={5}>
              <div className="bg-yellow-400 rounded-lg mt-2">
                <div className="max-w-7xl mx-auto py-1 px-3 sm:px-6 lg:px-4">
                  <div className="flex items-center justify-between flex-wrap">
                    <div className="w-0 flex-1 flex items-center">
                      <span className="flex p-2 rounded-lg yellow-50">
                        <ExclamationIcon
                          className="h-6 w-6 text-white"
                          aria-hidden="true"
                        />
                      </span>
                      <p className="ml-3 font-medium text-white bold truncate">
                        <span className="md:hidden">
                          90% of our games are disabled temp!
                        </span>
                        <span className="hidden md:inline">
                          We have disabled around 90% of our games due to heavy
                          abuse, our larger games will return at a later date.
                        </span>
                      </p>
                    </div>

                    <div className="order-2 flex-shrink-0 sm:order-3 sm:ml-3">
                      <button
                        type="button"
                        className="-mr-1 flex p-2 rounded-md hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-white sm:-mr-2"
                      ></button>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
            <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stats.map((item) => (
                <div
                  key={item.id}
                  className="relative bg-white pt-5 px-4  sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
                >
                  <dt>
                    <div className="absolute bg-red-500 rounded-md p-3">
                      <item.icon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <p className="ml-16 text-sm font-medium text-gray-500 truncate">
                      {item.name}
                    </p>
                  </dt>
                  <dd className="ml-16 pb-6 flex items-baseline sm:pb-7">
                    <p className="text-2xl font-semibold text-gray-900">
                      {item.stat}
                    </p>
                    <p></p>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div className="mt-4 relative flex items-center">
            <input
              type="text"
              name="search"
              ref={searchInput}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search Games"
              id="search"
              className="shadow rounded-lg transition focus:ring-red-500 focus:border-red-500 block w-full pr-12 sm:text-sm border-gray-200 rounded-md "
            />

            <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
              <kbd className="inline-flex invisible sm:visible items-center border border-gray-200 rounded px-2 text-sm font-sans font-medium text-gray-400 ">
                Control + K
              </kbd>
            </div>
          </div>
        </FadeIn>
        <FadeIn delay={200}>
          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-4 mt-3 gap-3">
              {Array.from({ length: 12 }).map((_, i) => (
                <>
                  <div className="border rounded-lg p-1 bg-gray-100 text-left h-52 border-gray-200 animate-pulse min-w-full shadow"></div>
                </>
              ))}
            </div>
          )}
          {games && !isLoading && filteredListings.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-4 mt-3 gap-3 ">
              {games &&
                filteredListings.map((item: any, index: any) => (
                  <button
                    key={index}
                    onClick={() => {
                      setData(item);
                      setModalOpen(true);
                    }}
                    className="border hover:scale-105 transition hover:border-red-500 text-left border-gray-200 shadow rounded-lg"
                  >
                    <img
                      className="mx-auto rounded-t-lg shadow shadow-lg w-full h-[40vw] sm:h-[17vw] lg:h-[10vw] object-cover"
                      src={item.thumbnailUrl}
                      alt="game image"
                    />
                    <div className="px-2 pb-2 mt-2" id="gameInfo">
                      <p className="font-medium w-1/7 truncate">{item.name}</p>
                      <span className="text-gray-400 flex text-sm ">
                        {' '}
                        <UserGroupIcon className="w-3 mr-1" />{' '}
                        {item.playerCount.toLocaleString()} Playing
                      </span>
                    </div>
                  </button>
                ))}
            </div>
          ) : isLoading ? (
            ''
          ) : (
            <div id="centerMessage" className="text-center">
              <XCircleIcon className="w-16 text-red-500 mx-auto my-auto mt-8" />
              <p className="font-medium text-xl">No Games Found</p>
              <p className="text-gray-500">
                We couldn&apos;t find any games in our system, please check
                again later.
              </p>
            </div>
          )}
        </FadeIn>
      </SideNavContainer>
    </>
  );
}

export default Games;
