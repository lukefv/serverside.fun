import { StarIcon, UserCircleIcon, UsersIcon } from '@heroicons/react/outline';
import {
  CheckCircleIcon,
  ShieldCheckIcon,
  SwitchVerticalIcon,
  PencilAltIcon,
  CreditCardIcon,
  UserGroupIcon,
  UserIcon,
} from '@heroicons/react/solid';
import useUser from 'lib/Hooks';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { Route } from 'react-router-dom';
import UpdateAccount from './Modals/UpdateAccount';
import PurchaseModal from 'components/Modals/PurchaseModal';
export default function PageHeader() {
  const currentHour = new Date().getHours();
  const [open, setOpen] = useState(false);

  const { user, isFetching } = useUser();

  let timestamp;
  const [modalOpen, setModalOpen] = useState(false);
  if (currentHour < 12) {
    timestamp = 'morning';
  } else if (currentHour < 18) {
    timestamp = 'afternoon';
  } else {
    timestamp = 'evening';
  }

  return (
    <>
     <PurchaseModal
        open={modalOpen}
        setOpen={setModalOpen}
        callback={() => {}}
      />
      <UpdateAccount open={open} setOpen={setOpen} callback={() => {}} />
      <div className="bg-white shadow">
        <div className="lg:max-w-6xl lg:mx-auto">
          <div className="p-6 md:flex md:items-center md:justify-between lg:border-t lg:border-gray-200">
            <div className="flex-1 min-w-0">
              {/* Profile */}
              <div className="flex items-center">
                <img
                  className="hidden h-16 w-16 rounded-full sm:block"
                  src={user ? user.profilePicture : ''}
                  alt=""
                />
                <div>
                  <div className="flex items-center">
                    <img
                      className="h-16 w-16 rounded-full sm:hidden"
                      src={user ? user.profilePicture : ''}
                      alt=""
                    />
                    <h1 className="ml-3 text-2xl font-bold leading-7 text-gray-900 sm:leading-9 sm:truncate">
                      Good {timestamp},{' '}
                      {user ? user.username : ''}.
                    </h1>
                  </div>
                  <dl className="mt-6 flex flex-col sm:ml-3 sm:mt-1 sm:flex-row sm:flex-wrap">
                  {user  && (
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <UserIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-400" />
                        User
                      </dd>
                    )}
                    {user && user.buyer && (
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <CheckCircleIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-green-400" />
                        Buyer
                      </dd>
                    )}

                    {user && user.permission >= 2 && (
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <ShieldCheckIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-yellow-400" />
                        Staff
                      </dd>
                    )}

                    {user && user.permission >= 3 && (
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <UserGroupIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-blue-400" />
                        Administrator
                      </dd>
                    )}

                    {user && user.permission >= 4 && (
                      <dd className="mt-3 flex items-center text-sm text-gray-500 font-medium sm:mr-6 sm:mt-0 capitalize">
                        <ShieldCheckIcon className="flex-shrink-0 mr-1.5 h-5 w-5 text-red-400" />
                        Owner
                      </dd>
                    )}
                  </dl>
                </div>
              </div>
            </div>
            <div className="mt-6 flex space-x-3 md:mt-0 md:ml-4">
              {/* {user && !user.buyer && (
                <button
                  type="button"
                  className="transition dark:bg-dModeLightDark dark:border-dModeSelected dark:focus-within:ring-offset-dModeDark inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 dark:focus:ring-red-500"
                  onClick={() => {}}
                >
                  Start Free Trial
                </button>
              )} */}
              {user && !user.buyer && (
                <button
                  type="button"
                  className="transition dark:bg-dModeLightDark dark:border-dModeSelected dark:focus-within:ring-offset-dModeDark inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 dark:focus:ring-red-500"
                  onClick={() => setModalOpen(true)}
                >
                  <CreditCardIcon className="-ml-0.5 mr-2 h-4 w-4 text-green-600" aria-hidden="true" />
                  Purchase Whitelist
                </button>
              )}
              {user && user.buyer && (
                <button
                  type="button"
                  className="transition dark:bg-dModeLightDark dark:border-dModeSelected dark:focus-within:ring-offset-dModeDark inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 dark:focus:ring-red-500"
                  onClick={() => {
                    toast.loading('Redirecting to buyers server...');
                    setTimeout(() => {
                      window.location.href = `https://discord.gg/HQt3juHxjN`;
                    }, 500);
                  }}
                >
                  <UserGroupIcon className="-ml-0.5 mr-2 h-4 w-4 " aria-hidden="true" />
                  Buyers Server
                </button>
              )}
              {user && user.buyer && (
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  className="transition text-center dark:bg-dModeLightDark dark:focus-within:ring-offset-dModeDark dark:border-dModeSelected inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400 dark:focus:ring-red-500"
                >
                  <PencilAltIcon className="-ml-0.5 mr-2 h-4 w-4" aria-hidden="true" />
                  Manage Whitelist
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
