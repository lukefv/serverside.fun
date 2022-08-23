import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { PencilAltIcon } from '@heroicons/react/outline';
import FadeIn from 'react-fade-in';
import toast from 'react-hot-toast';
import instance from 'lib/AxiosClient';

function ManageUser(props: {
  open: any;
  setOpen: any;
  data: any;
  callback: any;
}) {
  const cancelButtonRef = useRef(null);
  const [whitelistType, setWhitelistType] = useState(
    props.data.buyer && props.data.buyer.type,
  );
  const [warningCount, setWarningCount] = useState(0);
  const [robloxId, setRobloxId] = useState('0');

  function submitChanges() {
    toast.promise(
      instance.post('/v1/update-user', {
        userId: props.data.buyer ? props.data.buyer.id : null,
        whitelistType,
        //warningCount,
        robloxId,
        user: props.data,
      }),
      {
        loading: `Saving changes...`,
        success: (response) => {
          props.callback();
          props.setOpen(false);
          return response.data.message;
        },
        error: (err) => {
          return err.response.data.message;
        },
      },
    );
  }

  function submitBlacklist() {
    toast.promise(
      instance.post('/v1/blacklist', {
        buyerId: props.data.buyer ? props.data.buyer.id : null,
      }),
      {
        loading: `Blacklisting ${props.data.username}...`,
        success: (response) => {
          props.callback();
          props.setOpen(false);
          return response.data.message;
        },
        error: (err) => {
          return err.response.data.message;
        },
      },
    );
  }

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end sm:items-center justify-center min-h-full p-4 text-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full">
                <FadeIn>
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <PencilAltIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-lg leading-6 font-medium text-gray-900"
                        >
                          Managing User: {props.data.username}
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-red-500">
                            Modifications to user data are logged and reviewed regularly, please do not abuse this system or you will be banned.
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="relative">
                      <div
                        className="absolute inset-0 flex items-center"
                        aria-hidden="true"
                      >
                        <div className="w-full border-t border-gray-300" />
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-2 bg-white text-sm text-gray-500">
                          User Data
                        </span>
                      </div>
                    </div>

                    <div className="mt-2 sm:flex sm:items-start">
                      <img
                        className="inline-block h-24 w-24 rounded-md"
                        src={props.data.profilePicture}
                        alt=""
                      />
                      <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                        <div className="grid grid-cols-3 gap-2">
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Username
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                readOnly
                                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={props.data.username}
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="email"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Discord ID
                            </label>
                            <div className="mt-1">
                              <input
                                type="text"
                                readOnly
                                className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                value={props.data.discordId}
                              />
                            </div>
                          </div>
                          <div>
                            <label
                              htmlFor="location"
                              className="block text-sm font-medium text-gray-700"
                            >
                              Whitelist Type
                            </label>
                            <select
                              id="location"
                              name="location"
                              onChange={(e) => setWhitelistType(e.target.value)}
                              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-red-500 focus:border-red-500 sm:text-sm rounded-md"
                              defaultValue={
                                props.data.buyer
                                  ? props.data.buyer.type
                                  : 'USER'
                              }
                            >
                              <option>USER</option>
                              <option>NORMAL</option>
                              <option>PREMIUM</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>
                    {props.data && props.data.buyer && (
                      <>
                        <div className="relative mt-2">
                          <div
                            className="absolute mt-2 inset-0 flex items-center"
                            aria-hidden="true"
                          >
                            <div className="w-full border-t border-gray-300" />
                          </div>
                          <div className="relative flex justify-center">
                            <span className="px-2 bg-white text-sm text-gray-500">
                              Buyer Data
                            </span>
                          </div>
                        </div>
                        <div id="buyerData" className="mt-2">
                          <div className="grid grid-cols-3 gap-2">
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Roblox ID
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  onChange={(e) => setRobloxId(e.target.value)}
                                  className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  value={props.data.buyer.robloxId}
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Purchase ID
                              </label>
                              <div className="mt-1">
                                <input
                                  type="text"
                                  readOnly
                                  className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  value={props.data.buyer.purchaseIdentifier}
                                />
                              </div>
                            </div>
                            <div>
                              <label
                                htmlFor="email"
                                className="block text-sm font-medium text-gray-700"
                              >
                                Warning Count
                              </label>
                              <div className="mt-1">
                                <input
                                  type="number"
                                  onChange={(e) =>
                                    //@ts-ignore
                                    setWarningCount(e.target.value)
                                  }
                                  className="shadow-sm focus:ring-red-500 focus:border-red-500 block w-full sm:text-sm border-gray-300 rounded-md"
                                  defaultValue={props.data.buyer.warningCount}
                                />
                              </div>
                            </div>
                            <p className="text-sm">
                              Last Updated:{' '}
                              <span className="font-medium text-green-500">
                                {new Date(
                                  props.data.buyer.lastUpdated,
                                ).toLocaleDateString()}
                              </span>
                            </p>
                            <p className="text-sm">
                              Buyer Since:{' '}
                              <span className="font-medium text-green-500">
                                {new Date(
                                  props.data.buyer.createdAt,
                                ).toLocaleDateString()}
                              </span>
                            </p>
                            <p className="text-sm">
                              Member Since:{' '}
                              <span className="font-medium text-green-500">
                                {new Date(
                                  props.data.createdAt,
                                ).toLocaleDateString()}
                              </span>
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => submitChanges()}
                    >
                      Save Changes
                    </button>
                    {props.data && props.data.buyer && (
                      <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => submitBlacklist()}
                    >
                      Blacklist User
                    </button>
                    )}
                    
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={() => props.setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </FadeIn>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default ManageUser;
