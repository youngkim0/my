import { Fragment, type SetStateAction, type Dispatch, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import ConsultRequestMain from "./ConsultRequestMain";
import ConsultRequestCheck from "./ConsultRequestCheck";
import ConsultRequestRequest from "./ConsultRequestRequest";

export default function ConsultRequestModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [page, setPage] = useState<string>("main");
  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[2000]" onClose={setOpen}>
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

        <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 "
              enterTo="opacity-100 translate-y-0 "
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 "
              leaveTo="opacity-0 translate-y-4 "
            >
              <Dialog.Panel className="relative h-full w-full max-w-md transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:max-w-[400px]">
                <div className="absolute right-0 top-0 mr-4 mt-4">
                  <button
                    type="button"
                    className="inline-flex justify-center rounded-md bg-white px-2 py-2 text-sm font-semibold text-gray-400 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    <span>닫기</span>
                  </button>
                </div>

                {page === "main" && <ConsultRequestMain setPage={setPage} />}
                {page === "check" && <ConsultRequestCheck setPage={setPage} />}
                {page === "request" && (
                  <ConsultRequestRequest setPage={setPage} />
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}