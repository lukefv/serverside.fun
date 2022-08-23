//@ts-nocheck
import SideNavContainer from 'components/SideNavContainer';
import FadeIn from 'react-fade-in';
import {
  CalendarIcon,
  CodeIcon,
  ExclamationIcon,
  UserIcon,
} from '@heroicons/react/solid';
import { classNames } from 'lib/CustomFunctions';
import { useEffect, useState } from 'react';
import Pagination from 'components/Pagination';
import useUser from 'lib/Hooks';
import instance from 'lib/AxiosClient';
import { FingerPrintIcon } from '@heroicons/react/outline';

const pageSize = 4;

export default function Dashboard() {
  const [news, setNews] = useState([]);
  const [activity, setActivity] = useState([]);
  const [currentActivity, setCurrentActivity] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user, isFetching } = useUser();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const onPageChanged = (page: number, newArr?: Array<any>) => {
    setCurrentPage(page);
    const firstPageIndex = (page - 1) * pageSize;
    const lastPageIndex = firstPageIndex + pageSize;
    const newActivity =
      typeof newArr === 'undefined'
        ? activity.slice(firstPageIndex, lastPageIndex)
        : newArr.slice(firstPageIndex, lastPageIndex);
    setCurrentActivity(newActivity);
  };

  const stats = [
    {
      id: 1,
      name: 'Whitelist Type',
      stat:
        (user &&
          user.buyer &&
          user.buyer.type.charAt(0).toUpperCase() +
            user.buyer.type.slice(1).toLowerCase()) ||
        'None',
      icon: CodeIcon,
      change: '122',
      changeType: 'increase',
    },
    {
      id: 2,
      name: 'Roblox Username',
      stat: (user && user.buyer && user.buyer.robloxUsername) || 'N/A',
      icon: UserIcon,
      change: '5',
      changeType: 'increase',
    },
    {
      id: 3,
      name: 'User ID',
      stat: user && user.id,
      icon: FingerPrintIcon,
      change: '3.2%',
      changeType: 'decrease',
    },
  ];
 
  useEffect(() => {
    instance.get('/v1/get-news').then((res) => {
      setNews(res.data.news);
    });

    instance.get('/v1/get-activity').then((res) => {
      setActivity(res.data.activity);
      onPageChanged(1, res.data.activity);

      setLoading(false);
    });
  }, []);
  return (
    <SideNavContainer header title="Dashboard">
      <FadeIn delay={50}>
        <div>
          <dl className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {stats.map((item) => (
              <div
                key={item.id}
                className="relative bg-white pt-5 px-4 pb-6 border border-gray-200 sm:pt-6 sm:px-6 shadow rounded-lg overflow-hidden"
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
                <dd className="ml-16 flex items-baseline">
                  <p className="text-xl font-semibold text-gray-900">
                    {item.stat}
                  </p>
                  <p
                    className={classNames(
                      item.changeType === 'increase'
                        ? 'text-green-600'
                        : 'text-red-600',
                      'ml-2 flex items-baseline text-sm font-semibold',
                    )}
                  />
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div id="content" className="grid mt-4  gap-3 grid-cols-1 sm:grid-cols-2">
          <div id="activityCard" className="border rounded-md shadow">
            <p className="font-medium text-lg p-3">Activity</p>

            <div className="-my-2  overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5">
                  <table className="min-w-full divide-y mb-1 divide-gray-300">
                    <thead className="bg-gray-50">
                      <tr>
                        <th
                          scope="col"
                          className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                        >
                          ID
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Activity History
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Date
                        </th>
                        <th
                          scope="col"
                          className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {activity.length > 0 ? (
                        currentActivity.map((person, idx) => (
                          <tr key={person.email}>
                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                              {person.id}
                            </td>
                            <td className="whitespace-wrap px-3 py-4 text-sm text-gray-500">
                              {person.action}
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                            {new Date(
                                  person.createdAt
                                ).toLocaleDateString()}  
                            </td>
                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                {person.status}
                              </span>
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
                                ? 'Loading activity log...'
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
                    totalCount={activity.length}
                    pageSize={pageSize}
                    doubleSkip
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            id="newsCard"
            className="border p-3 rounded-md shadow max-h-96 overflow-scroll"
          >
            <p className="font-medium text-lg">News</p>

            <div id="newsContainer" className="mt-2 space-y-2">
              {news.map((news, idx) => (
                <div
                  id="newsCard"
                  className="bg-gray-50 p-2 rounded shadow border"
                >
                  <p id="title" className="text-md font-medium">
                    {news.title}
                  </p>
                  <p className="text-xs flex text-gray-500">
                    <UserIcon className="w-3 mr-0.5" />{' '}
                    <span className="mr-1 text-blue-500">{news.author}</span>
                    {new Date(news.createdAt).toLocaleString()}
                  </p>

                  <div id="content" className="mt-2 grid grid-cols-2 space-x-1">
                    <div className="w-1/2">
                      <img src={news.imageURL} className="" alt="news" />
                    </div>
                    <div className="flex justify-start">
                      <p className="text-sm w-96 -ml-[105px]">{news.content}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </FadeIn>
    </SideNavContainer>
  );
}
