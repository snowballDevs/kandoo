import {useContext, useEffect, Fragment, useState} from 'react';
import {Dialog, Transition} from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline';
import {ModalContext} from '../contexts/ModalContext/ModalContext';


const Modal = ({children}) => {
    const {isModalOpen, handleClose, setIsModalOpen} = useContext(ModalContext);

    useEffect(() => {
        console.log('Rendered');

        function handleEscapeKey(event) {
            console.log(event);
            if (event.code === 'Escape') {
                handleClose();
            }
        }
        document.addEventListener('keydown', handleEscapeKey);

        // cleanup when unmounting/removing this component
        return () => {
            console.log('removed');
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);


    return (
        
        <Transition.Root show={isModalOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={handleClose}>
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
  
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-primaryLight px-4 pb-4 pt-5 text-left shadow-xl transition-all  sm:w-full sm:max-w-lg sm:p-6">
                  <div className="absolute right-0 top-0 hidden pr-4 pt-4 sm:block">
                    <button
                      type="button"
                      className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => setIsModalOpen(false)}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-6 w-6 bg-primaryLight" aria-hidden="true" />
                    </button>
                  </div>
                  <div className='sm:w-full sm:max-w-lg sm:my-8 sm:p-6'>
                  {children}
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    );
};

export default Modal;
