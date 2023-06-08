import React, { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

const ModalAcceptBuy = ({ open, setOpen, title, message, submited }) => {
  const handleClose = () => {
    setOpen(false);
    submited(true);
  };

  return (
    <>
      <Transition appear show={open} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => handleClose()}
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
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-xl font-medium leading-6 text-gray-900"
                  >
                    {title}
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-md text-gray-500">{message}</p>
                  </div>

                  <div className="mt-4 flex float-right">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-500 focus-visible:ring-offset-2"
                      onClick={() => handleClose()}
                    >
                      Aceptar
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ModalAcceptBuy;
