import SideNavContainer from '../../components/SideNavContainer';
import { PencilAltIcon, PlusIcon, TrashIcon } from '@heroicons/react/solid';
import { useEffect, useState } from 'react';
import FadeIn from 'react-fade-in';
import {
  SpeakerphoneIcon,
  XIcon,
  ExclamationIcon,
} from '@heroicons/react/outline';
import instance from 'lib/AxiosClient';
import NewScriptModal from 'components/Modals/NewScriptModal';
import PublicScriptModal from 'components/Modals/PublicScriptModal';
import toast from 'react-hot-toast';
import useUser from 'lib/Hooks';
const tabs = [
  { id: 0, name: 'Public Scripts', href: '#', current: true },
  { id: 1, name: 'Private Scripts', href: '#', current: false },
];

function Scripts() {
  function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
  }
  const [currentTab, setCurrentTab] = useState(0);
  const [scripts, setScripts] = useState([]);

  const [privateScripts, setPrivateScripts] = useState([]);
  const { user, isFetching } = useUser();

  const [editMode, setEditMode] = useState(false);
  const [selectedScripts, setSelectedScripts] = useState([]);

  const submitCode = (script: any) => {
    if (!user.buyer) return toast.error('You are not authorized to do this.');

    toast.promise(
      instance.post('/v1/pending-script', {
        //@ts-ignore
        script,
        robloxId: user.buyer.robloxId,
      }),
      {
        loading: 'Executing script...',
        success: (response) => {
          return response.data.message;
        },
        error: (err) => {
          return err.response.data.message;
        },
      },
    );
  };

  useEffect(() => {
    instance.get('/v1/scripts').then((res: any) => {
      setScripts(res.data.scripts);
    });

    instance.get('/v1/private-scripts').then((res: any) => {
      setPrivateScripts(res.data.scripts);
    });
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalOpen2, setModalOpen2] = useState(false);
  const refreshScripts = () => {
    setPrivateScripts([]);
    instance.get('/v1/private-scripts').then((res: any) => {
      setPrivateScripts(res.data.scripts);
    });
  };
  const refreshPublic = () => {
    setScripts([]);
    instance.get('/v1/scripts').then((res: any) => {
      setScripts(res.data.scripts);
    });
  };

  const deleteScripts = () => {
    toast.promise(
      instance.post('/v1/delete-scripts', {
        //@ts-ignore
        selectedScripts: selectedScripts,
      }),
      {
        loading: `Deleting ${selectedScripts.length} scripts...`,
        success: (response) => {
          setSelectedScripts([]);
          setEditMode(false);
          refreshScripts();
          return response.data.message;
        },
        error: (err) => {
          return err.response.data.message;
        },
      },
    );
  };
  return (
    <>
      <NewScriptModal
        open={modalOpen}
        setOpen={setModalOpen}
        callback={refreshScripts}
      />
      <PublicScriptModal
        open={modalOpen2}
        setOpen={setModalOpen2}
        callback={refreshPublic}
      />
      <SideNavContainer title="Scripts" header={false}>
        <FadeIn delay={200}>
          <div className="bg-yellow-400 rounded-lg">
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
                      Make sure to follow our TOS!
                    </span>
                    <span className="hidden md:inline">
                      Scripts are monitored regularly, make sure to follow our
                      terms of service.
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
        <FadeIn delay={100}>
          <div className="mt-5">
            <div className="sm:hidden">
              <label htmlFor="tabs" className="sr-only">
                Select a tab
              </label>
              {/* Use an "onChange" listener to redirect the user to the selected tab URL. */}
              <select
                id="tabs"
                name="tabs"
                className="block w-full focus:ring-red-500 focus:border-red-500 border-gray-300 rounded-md"
              >
                {tabs.map((tab) => (
                  <option key={tab.name}>{tab.name}</option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block">
              <nav
                className="relative z-0 rounded-lg shadow flex divide-x divide-gray-200"
                aria-label="Tabs"
              >
                {tabs.map((tab, tabIdx) => (
                  <button
                    key={tab.name}
                    onClick={() => setCurrentTab(tab.id)}
                    className={classNames(
                      tab.id == currentTab
                        ? 'text-gray-900'
                        : 'text-gray-500 hover:text-gray-700',
                      tabIdx === 0 ? 'rounded-l-lg' : '',
                      tabIdx === tabs.length - 1 ? 'rounded-r-lg' : '',
                      'group relative transition min-w-0 flex-1 overflow-hidden bg-white py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10',
                    )}
                    aria-current={tab.id == currentTab ? 'page' : undefined}
                  >
                    <span>{tab.name}</span>
                    <span
                      aria-hidden="true"
                      className={classNames(
                        tab.id == currentTab ? 'bg-red-500' : 'bg-transparent',
                        'absolute inset-x-0 transition bottom-0 h-0.5',
                      )}
                    />
                  </button>
                ))}
              </nav>
            </div>
          </div>
        </FadeIn>
        <div id="tabContent" className="mt-2">
          {currentTab == 0 && (
            <FadeIn delay={150}>
              <div id="actions" className="flex justify-end space-x-1.5">
                {user && user.permission >= 2 && (
                  <button
                    type="button"
                    onClick={() => setModalOpen2(true)}
                    className="inline-flex items-center px-3 py-2 mt-1 border border-transparent transition shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  >
                    <PlusIcon className="-ml-1 mr-1 h-5 w-5" /> New Script
                  </button>
                )}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-6 mt-2 gap-2">
                {scripts.map((scriptinfo: any, idx) => (
                  <button
                    key={idx}
                    onClick={() => submitCode(scriptinfo.script)}
                    className="border hover:scale-105 transition hover:border-red-500 rounded-lg text-left border-gray-200 shadow rounded-lg"
                  >
                    <div id="cardImage" className="overflow-hidden h-40">
                      <img
                        className="mx-auto rounded-t-lg w-full h-[40vw] sm:h-[17vw] lg:h-[10vw] object-cover"
                        src={`${scriptinfo.thumbnailImage}`}
                        alt="script image"
                      />
                    </div>
                    <div className="px-2 pt-2 pb-3">
                      <p className="font-medium text-black">
                        {scriptinfo.name}
                      </p>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {scriptinfo.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </FadeIn>
          )}
          {currentTab == 1 && (
            <FadeIn delay={150}>
              <div id="actions" className="flex justify-end space-x-1.5">
                <button
                  type="button"
                  onClick={() => setModalOpen(true)}
                  className="inline-flex items-center px-3 py-2 mt-1 border border-transparent transition shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PlusIcon className="-ml-1 mr-1 h-5 w-5" /> New Script
                </button>
                <button
                  type="button"
                  onClick={() => setEditMode(!editMode)}
                  className="inline-flex items-center px-3 py-2 mt-1 border border-transparent transition shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <PencilAltIcon className="-ml-1 mr-1 h-5 w-5" />{' '}
                  {editMode ? `Edit ${selectedScripts.length}` : 'Edit'}
                </button>
                {selectedScripts.length > 0 && (
                  <button
                    type="button"
                    onClick={deleteScripts}
                    className="inline-flex items-center px-3 py-2 mt-1 border border-transparent transition shadow-sm text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:ring-offset-bgPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                  >
                    <TrashIcon
                      className="-ml-0.5 mr-2 h-4 w-4"
                      aria-hidden="true"
                    />
                    {selectedScripts.length > 0
                      ? `Delete ${selectedScripts.length}`
                      : 'Delete'}
                  </button>
                )}
              </div>

              <div className="grid mt-3 grid-cols-6 gap-2">
                {privateScripts.map((scriptinfo: any, idx) => (
                  <button
                    key={idx}
                    onClick={() =>
                      editMode
                        ? //@ts-ignore
                          selectedScripts.includes(scriptinfo)
                          ? setSelectedScripts(
                              selectedScripts.filter((i) => i !== scriptinfo),
                            )
                          : //@ts-ignore
                            setSelectedScripts([...selectedScripts, scriptinfo])
                        : submitCode(scriptinfo.script)
                    }
                    className={classNames(
                      //@ts-ignore
                      selectedScripts.includes(scriptinfo)
                        ? 'border-blue-400'
                        : '',
                      'border-2 hover:scale-105 transition hover:border-red-500 rounded-lg p-1 text-left border-gray-200 shadow rounded-lg',
                    )}
                  >
                    <div
                      id="cardImage"
                      className="overflow-hidden h-40 relative"
                    >
                      <img
                        className="mx-auto rounded-t-lg w-full h-[40vw] sm:h-[17vw] lg:h-[10vw] object-cover"
                        src={`${scriptinfo.thumbnailImage}`}
                        alt="script image"
                      />
                    </div>
                    <div className="px-1">
                      <p className="font-medium text-black">
                        {scriptinfo.name}
                      </p>
                      <p className="text-gray-500 text-sm line-clamp-2">
                        {scriptinfo.description}
                      </p>
                    </div>
                  </button>
                ))}
              </div>
            </FadeIn>
          )}
        </div>
      </SideNavContainer>
    </>
  );
}

export default Scripts;
