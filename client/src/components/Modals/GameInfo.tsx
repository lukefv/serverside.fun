import { Fragment, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import toast from 'react-hot-toast';

function GameInfo(props: { open: any; setOpen: any; data: any }) {
  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={props.open} as={Fragment}>
      <Dialog
        as="div"
        className="fixed z-10 inset-0 overflow-y-auto"
        initialFocus={cancelButtonRef}
        onClose={props.setOpen}
      >
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <Dialog.Title
                    as="h3"
                    className="text-lg leading-6 font-medium text-gray-900"
                  >
                    {props.data.name}
                  </Dialog.Title>
                  <div className="mt-2 text-left">
                    <img
                      src={props.data.thumbnailUrl}
                      alt="thumbnail"
                      className="rounded-md border-2 border-gray-200"
                    />
                    <p className="font-medium text-lg mt-1">Description</p>
                    <div
                      id="gameDescription"
                      className="border-2 rounded border-gray-200 h-44 overflow-y-auto p-2"
                    >
                      {props.data.description}
                    </div>
                    {/* when the button is clicked, copy hi to the clipboard */}
                    <p className="font-medium text-lg mt-1">Server Join Code</p>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(
                          `javascript:Roblox.GameLauncher.joinGameInstance(${props.data.placeId},"${props.data.jobId}")`,
                        );
                        toast.success('Successfully copied server join code!');
                      }}
                      className="w-full break-words hover:border-red-500 transition mt-2 p-2 bg-gray-800 text-gray-200 font-medium rounded border"
                    >
                      javascript:Roblox.GameLauncher.joinGameInstance(
                      <span className="text-blue-400">
                        {props.data.placeId}
                      </span>
                      ,
                      <span className="text-yellow-500">
                        "{props.data.jobId}"
                      </span>
                      )
                    </button>
                    <span className="text-sm">
                    Don't know how to use server code? Go on <strong style={{color: 'blue'}}> <a target="_blank" href="https://serverside.fun/servercode.mp4" rel="noreferrer">this link</a></strong>
                      </span>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                <a
                  href={`https://www.roblox.com/games/${props.data.placeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:col-start-2 sm:text-sm"
                  onClick={() => props.setOpen(false)}
                >
                  Visit Place
                </a>
                <button
                  type="button"
                  className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                  onClick={() => props.setOpen(false)}
                  ref={cancelButtonRef}
                >
                  Close
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}

export default GameInfo;
