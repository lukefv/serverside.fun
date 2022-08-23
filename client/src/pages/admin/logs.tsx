//@ts-nocheck
import SideNavContainer from '../../components/SideNavContainer';
import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

import FadeIn from 'react-fade-in';
import { SearchIcon } from '@heroicons/react/solid';

import instance from 'lib/AxiosClient';

import ManageUser from 'components/Modals/ManageUser';
import Pagination from 'components/Pagination';

const tabs = [
  { name: 'Users', id: 0 },
  { name: 'Script Logs', id: 1 },
  { name: 'Access Logs', id: 2 }, //
  { name: 'Activity Logs', id: 3 }, // map activity table
];

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}

function Logs() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  // get total buyers from users.buyer using reduce

  // script logs
  const [scripts, setScripts] = useState([]);
  const [loadingScripts, setLoadingScripts] = useState(true);
  //snitch logs
  const [snitch, setSnitch] = useState([]);
  //activity logs
  const [activity, setActivity] = useState([]);
  const [loadingSnitch, setLoadingSnitch] = useState(true);

  const inputRef = useRef(null);

  const [searchInput, setSearchInput] = useState('');

  const handleKeyPress = useCallback((event: any) => {
    if (!searchInput.current) return;
    if (event.ctrlKey && event.key === 'k') {
      event.preventDefault();
      searchInput.current.focus();
    }
  }, []);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [handleKeyPress]);

  const totalBuyers = users.reduce((acc, curr) => {
    if (curr.buyer) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const totalActivity = activity.reduce((acc, curr) => {
    if (curr) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const totalSnitch = snitch.reduce((acc, curr) => {
    if (curr) {
      return acc + 1;
    } else {
      return acc;
    }
  }, 0);

  const [selectedTab, setSelectedTab] = useState(0);

  const [manageOpen, setManageOpen] = useState(false);
  const [data, setData] = useState([]);

  const [filteredUsers, setFilteredUsers] = useState([]);
  const [currentUsers, setCurrentUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const [currentScriptsPage, setCurrentScriptsPage] = useState(1);
  const [currentScripts, setCurrentScripts] = useState([]);

  const [accessLogsPage, setAccessLogsPage] = useState(1);
  const [currentAccessLogs, setCurrentAccessLogs] = useState([]);

  const [currentAdminActivityPage, setCurrentAdminActivityPage] = useState(1);
  const [currentAdminActivity, setCurrentAdminActivity] = useState([]);
  const pageSize = 8;

  const onPageChanged = (page, newArr) => {
    setCurrentPage(page);
    const firstPageIndex = (page - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    const newTickets =
      typeof newArr === 'undefined'
        ? users.slice(firstPageIndex, lastPageIndex)
        : newArr.slice(firstPageIndex, lastPageIndex);
    setCurrentUsers(newTickets);
  };

  const onAccessLogPageChanged = (page, newArr) => {
    setAccessLogsPage(page);
    const firstPageIndex = (page - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    const newTickets =
      typeof newArr === 'undefined'
        ? snitch.slice(firstPageIndex, lastPageIndex)
        : newArr.slice(firstPageIndex, lastPageIndex);
    setCurrentAccessLogs(newTickets);
  };

  const onAdminActivityPageChanged = (page, newArr) => {
    setCurrentAdminActivityPage(page);
    const firstPageIndex = (page - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    const newTickets =
      typeof newArr === 'undefined'
        ? activity.slice(firstPageIndex, lastPageIndex)
        : newArr.slice(firstPageIndex, lastPageIndex);
    setCurrentAdminActivity(newTickets);
  };
  const onLogsPageChanged = (page, newArr) => {
    setCurrentScriptsPage(page);
    const firstPageIndex = (page - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    const newTickets =
      typeof newArr === 'undefined'
        ? scripts.slice(firstPageIndex, lastPageIndex)
        : newArr.slice(firstPageIndex, lastPageIndex);
    setCurrentScripts(newTickets);
  };

  useMemo(() => {
    if (searchInput.length === 0) setFilteredUsers(users);
    const filteredUsers = users.filter((user) => {
      if (user.username.toLowerCase().includes(searchInput.toLowerCase()))
        return true;
      if (
        user.buyer &&
        String(user.buyer.id).toLowerCase().includes(searchInput.toLowerCase())
      )
        return true;
      if (
        user.buyer &&
        String(user.buyer.robloxUsername)
          .toLowerCase()
          .includes(searchInput.toLowerCase())
      )
        return true;
    });
    setFilteredUsers(filteredUsers);
    onPageChanged(1, filteredUsers);
  }, [searchInput]);

  useEffect(() => {
    instance.get('/v1/users').then((res) => {
      setUsers(res.data.users);
      setFilteredUsers(res.data.users);
      onPageChanged(1, res.data.users);
      setLoading(false);
    });
    instance.get('/v1/script-logs').then((res) => {
      onLogsPageChanged(1, res.data.authenticated);
      setScripts(res.data.authenticated);
      setLoadingScripts(false);
    });

    instance.get('/v1/snitch-logs').then((res) => {
      setSnitch(res.data.users);
      onAccessLogPageChanged(1, res.data.users);
      setLoadingSnitch(false);
    });
    instance.get('/v1/activity').then((res) => {
      onAdminActivityPageChanged(1, res.data.activity);
      setActivity(res.data.activity);
      setLoadingActivity(false);
    });
  }, []);

  function refetchData() {
    setLoading(true);
    setLoadingScripts(true);
    setUsers([]);
    setScripts([]);

    instance.get('/v1/users').then((res) => {
      setUsers(res.data.users);
      setLoading(false);
    });

    instance.get('/v1/script-logs').then((res) => {
      setScripts(res.data.authenticated);
      setLoadingScripts(false);
    });
  }

  const stats = [
    {
      name: 'Total Buyers',
      stat: totalBuyers.toLocaleString(),
      previousStat: '70,946',
      change: '12%',
      changeType: 'increase',
    },
    {
      name: 'Total Access Logs',
      stat: totalSnitch.toLocaleString(),
      previousStat: '56.14%',
      change: '2.02%',
      changeType: 'increase',
    },
    {
      name: 'Total Activity Logged',
      stat: totalActivity.toLocaleString(),
      previousStat: '28.62%',
      change: '4.05%',
      changeType: 'decrease',
    },
  ];

  return (
    <>
      <ManageUser
        open={manageOpen}
        setOpen={setManageOpen}
        data={data}
        callback={refetchData}
      />
      <SideNavContainer header={false} title="Admin">
        <FadeIn delay={5}>
          <div>
            <dl className="mt-5 grid grid-cols-1 rounded-lg bg-white overflow-hidden shadow divide-y divide-gray-200 md:grid-cols-3 md:divide-y-0 md:divide-x">
              {stats.map((item) => (
                <div key={item.name} className="px-4 py-5 sm:p-6">
                  <dt className="text-base font-normal text-gray-900">
                    {item.name}
                  </dt>
                  <dd className="mt-1 flex justify-between items-baseline md:block lg:flex">
                    <div className="flex items-baseline text-2xl font-semibold text-red-500">
                      {item.stat}
                    </div>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="mt-2">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full focus:ring-red-500 focus:border-red-500 border-gray-300 rounded-md"
                // defaultValue={tabs.find((tab) => tab.id == selectedTab).name}
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex" aria-label="Tabs">
                  {tabs.map((tab) => (
                    <button
                      key={tab.name}
                      onClick={() => setSelectedTab(tab.id)}
                      className={classNames(
                        tab.id == selectedTab
                          ? 'border-red-500 text-red-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                        'w-1/4 transition py-4 px-1 text-center border-b-2 font-medium text-sm',
                      )}
                      aria-current={tab.id == selectedTab ? 'page' : undefined}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>

          <div id="contentContainer" className="mt-3">
            {selectedTab == 0 && (
              <FadeIn>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Search
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <SearchIcon
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
                    </div>
                    <input
                      type="text"
                      ref={inputRef}
                      onChange={(e) => setSearchInput(e.target.value)}
                      className="focus:ring-red-500 transition focus:border-red-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                      placeholder="Search Username / Buyer ID / Roblox Username"
                    />
                  </div>
                </div>

                <div className="mt-4 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                User Information
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Permission
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Whitelist Info
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Member Since
                              </th>
                              <th
                                scope="col"
                                className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                              >
                                <span className="sr-only">Edit</span>
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {users.length > 0 && users && !loading ? (
                              currentUsers.map((person) => (
                                <tr key={person.username}>
                                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                    <div className="flex items-center">
                                      <div className="h-10 w-10 flex-shrink-0">
                                        <img
                                          className="h-10 w-10 rounded-full"
                                          src={person.profilePicture}
                                          alt="pfp"
                                        />
                                      </div>
                                      <div className="ml-4">
                                        <div className="font-medium text-gray-900">
                                          {person.username} ({person.id})
                                        </div>
                                        <div className="text-gray-500">
                                          {person.discordId}
                                        </div>
                                      </div>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="text-gray-900">
                                      {person.permission}
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="font-medium text-gray-900">
                                      RBX ID:{' '}
                                      {person.buyer
                                        ? person.buyer.robloxId
                                        : 'N/A'}
                                    </div>
                                    <div className="text-gray-500">
                                      Buyer ID:{' '}
                                      {person.buyer ? person.buyer.id : 'N/A'}
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {new Date(
                                      person.createdAt,
                                    ).toLocaleString()}
                                  </td>
                                  <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                    <button
                                      onClick={() => {
                                        setData(person);
                                        setManageOpen(true);
                                      }}
                                      className="text-red-600 hover:text-red-900"
                                    >
                                      Edit
                                      <span className="sr-only">
                                        , {person.name}
                                      </span>
                                    </button>
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr className="bg-white">
                                <td
                                  aria-colspan={9}
                                  colSpan={9}
                                  className={classNames(
                                    loading ? 'animate-pulse' : '',
                                    'whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-500',
                                  )}
                                >
                                  <div>
                                    {loading
                                      ? 'Loading users database...'
                                      : 'No activity logs found.'}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <Pagination
                          onPageChange={(page) => onPageChanged(page)}
                          currentPage={currentPage}
                          totalCount={filteredUsers.length}
                          pageSize={pageSize}
                          doubleSkip
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}
            {selectedTab == 1 && (
              <FadeIn>
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                Buyer Info
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Game Info
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Script
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Timestamp
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {scripts.length > 0 ? (
                              currentScripts.map((person) => (
                                <tr key={person.buyerId}>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="text-gray-900 font-medium">
                                      <p>Buyer ID: {person.buyerId}</p>
                                    </div>
                                    <div className="text-gray-900 ">
                                      <p>
                                        RBX: {person.buyer.robloxUsername} (
                                        {person.buyer.type})
                                      </p>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    <div className="text-gray-900">
                                      Game ID: {person.gameId}
                                    </div>
                                    <div className="text-blue-900 underline">
                                      {person.placeId !== 'UNKNOWN' && (
                                        <p>
                                          <a
                                            href={`https://www.roblox.com/games/${person.placeId}`}
                                          >
                                            Game Link
                                          </a>
                                        </p>
                                      )}
                                    </div>
                                  </td>
                                  <td className="whitespace-wrap px-3 py-4 text-sm text-gray-500">
                                    <div className="text-gray-900">
                                      {person.script.length > 50
                                        ? person.script.substring(0, 50) + '...'
                                        : person.script}
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {new Date(
                                      person.createdAt,
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr className="bg-white">
                                <td
                                  aria-colspan={9}
                                  colSpan={9}
                                  className={classNames(
                                    loadingScripts ? 'animate-pulse' : '',
                                    'whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-500',
                                  )}
                                >
                                  <div>
                                    {loadingScripts
                                      ? 'Loading script logs...'
                                      : 'No script logs found.'}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <Pagination
                          onPageChange={(page) => onLogsPageChanged(page)}
                          currentPage={currentScriptsPage}
                          totalCount={scripts.length}
                          pageSize={pageSize}
                          doubleSkip
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}
            {selectedTab == 2 && (
              <FadeIn>
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                Discord Name
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                User Agent
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                IP Address
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Date Accessed
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {snitch.length > 0 ? (
                              currentAccessLogs.map((person) => (
                                <tr key={person.id}>
                                  
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:pl-6">
                                  <div className="flex items-center">
                                      <div className="h-10 w-10 flex-shrink-0">
                                        <img
                                          className="h-10 w-10 rounded-full"
                                          src={person.thumbnailImage}
                                          alt="pfp"
                                        />
                                      </div>
                                      <div className="ml-4">
                                      <div className="font-medium text-gray-900">
                                      {person.discordName}
                                    </div>
                                    <div className="">{person.discordId}</div>
                                      </div>
                                    </div>
                                    
                                  </td>
                                  <td className="whitespace-wrap px-3 py-4 text-sm text-gray-500">
                                    <div className="">
                                      <p>{person.userAgent}</p>
                                    </div>
                                  </td>
                                  <td className="whitespace-wrap px-3 py-4 text-sm text-gray-500">
                                    <div className="">
                                      <p>{person.ip}</p>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {new Date(
                                      person.createdAt,
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr className="bg-white">
                                <td
                                  aria-colspan={9}
                                  colSpan={9}
                                  className={classNames(
                                    loadingSnitch ? 'animate-pulse' : '',
                                    'whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-500',
                                  )}
                                >
                                  <div>
                                    {loadingSnitch
                                      ? 'Loading access logs...'
                                      : 'No access logs found.'}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <Pagination
                          onPageChange={(page) => onAccessLogPageChanged(page)}
                          currentPage={accessLogsPage}
                          totalCount={snitch.length}
                          pageSize={pageSize}
                          doubleSkip
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}
            {selectedTab == 3 && (
              <FadeIn>
                <div className="mt-8 flex flex-col">
                  <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                      <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                        <table className="min-w-full divide-y divide-gray-300">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                Activity ID
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                              >
                                User ID
                              </th>

                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Action
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                              >
                                Date
                              </th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-gray-200 bg-white">
                            {activity.length > 0 ? (
                              currentAdminActivity.map((person) => (
                                <tr key={person.id}>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 sm:pl-6">
                                    <div className="font-medium text-gray-900">
                                      {person.id}
                                    </div>
                                  </td>
                                  <td className="whitespace-wrap px-3 py-4 text-sm text-gray-500">
                                    <div className="">
                                      <p>{person.userId}</p>
                                    </div>
                                  </td>

                                  <td className="whitespace-wrap px-3 py-4 text-sm text-gray-500">
                                    <div className="">
                                      <p>{person.action}</p>
                                    </div>
                                  </td>
                                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                    {new Date(
                                      person.createdAt,
                                    ).toLocaleString()}
                                  </td>
                                </tr>
                              ))
                            ) : (
                              <tr className="bg-white">
                                <td
                                  aria-colspan={9}
                                  colSpan={9}
                                  className={classNames(
                                    loadingScripts ? 'animate-pulse' : '',
                                    'whitespace-nowrap px-6 py-4 text-center text-sm font-medium text-gray-500',
                                  )}
                                >
                                  <div>
                                    {loadingScripts
                                      ? 'Loading activity logs...'
                                      : 'No activity logs found.'}
                                  </div>
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                        <Pagination
                          onPageChange={(page) =>
                            onAdminActivityPageChanged(page)
                          }
                          currentPage={currentAdminActivityPage}
                          totalCount={activity.length}
                          pageSize={pageSize}
                          doubleSkip
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </FadeIn>
            )}
          </div>
        </FadeIn>
      </SideNavContainer>
    </>
  );
}

export default Logs;
