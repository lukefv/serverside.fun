import SideNavContainer from '../../components/SideNavContainer';
import React, { useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { MailIcon } from '@heroicons/react/outline';
import FadeIn from 'react-fade-in';
import {
  CodeIcon,
  CubeIcon,
  RefreshIcon,
  TrashIcon,
} from '@heroicons/react/solid';
import axios from 'axios';
import toast from 'react-hot-toast';
import useUser from 'lib/Hooks';
import instance from 'lib/AxiosClient';
function Executor() {
  const editorRef = useRef(null);
  const { user, isFetching } = useUser();

  function handleEditorDidMount(editor: any, monaco: any) {
    editorRef.current = editor;
  }

  const submitCode = (script: any) => {
    if (!user) return toast.error('Not logged in');
    if (!user.buyer) return toast.error('You must be a buyer, nice try.');
    toast.promise(
      instance.post('/v1/pending-script', {
        //@ts-ignore
        script,
        robloxId: user && user.buyer.robloxId,
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

  return (
    <SideNavContainer header={false} title="Executor">
      <FadeIn>
        <div className="flex justify-between">
          <p className="font-medium text-2xl">Script Executor</p>

          <div className="space-x-2 mb-4">
            <button
              type="button"
              //@ts-ignore
              onClick={() => submitCode(editorRef.current.getValue())}
              className="inline-flex items-center transition px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              <CodeIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Execute
            </button>

            <button
              type="button"
              //@ts-ignore
              onClick={() => editorRef.current.setValue('')}
              className="inline-flex items-center transition px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-yellow-500 hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500"
            >
              <TrashIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              Clear
            </button>
            <button
              type="button"
              //@ts-ignore
              onClick={() => submitCode('r6()')}
              className="inline-flex items-center transition px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <CubeIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              R6
            </button>
            <button
              type="button"
              //@ts-ignore
              onClick={() => submitCode('re()')}
              className="inline-flex items-center transition px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-500 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              <RefreshIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
              RE
            </button>
          </div>
        </div>
      </FadeIn>
      <Editor
        height="90vh"
        theme="vs-light"
        defaultLanguage="lua"
        onMount={handleEditorDidMount}
      />
    </SideNavContainer>
  );
}

export default Executor;
