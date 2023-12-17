import { Fragment, type SetStateAction, type Dispatch } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TextareaAutosize from "react-textarea-autosize";

export default function NewCustomerModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
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
                <div className="text-sm">
                  <div className="mb-2 text-base font-bold">고객 등록</div>
                  <div className="flex flex-row space-x-3">
                    <input
                      type="text"
                      className="rounded-md border border-solid border-gray-400 px-2 py-1"
                      placeholder="이름"
                    />
                    <select className="rounded-md border border-solid border-gray-400 px-2 py-1">
                      <option>남</option>
                      <option>여</option>
                    </select>
                  </div>
                  <p className="my-2">방문경로</p>
                  <select className="rounded-md border border-solid border-gray-400 px-2 py-1">
                    <option>네이버</option>
                    <option>인스타그램</option>
                    <option>지인소개</option>
                    <option>기타</option>
                  </select>
                </div>
                <div className="mt-6">
                  <p className="mb-3 text-base font-bold">고객 세부정보</p>

                  <TextareaAutosize
                    minRows={4}
                    className="mt-3 w-full resize-none border border-solid border-gray-300 px-2 py-2"
                    placeholder="추후 세부적으로 보강"
                  />
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    저장
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
