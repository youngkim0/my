import { Fragment, type SetStateAction, type Dispatch } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";

export default function ConsultModal({
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
              <Dialog.Panel className="relative h-full w-full max-w-md transform overflow-hidden rounded-xl bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:max-w-[400px]">
                <div className="mt-10 text-sm">
                  <div className="mb-2  font-bold">
                    강연식님을 위해 최선을 다 하겠습니다.
                  </div>
                  <div>마지막 상담일: 2023년 12월 3일</div>
                  <div>마지막 시술 상담: 컷트 & 클리닉</div>
                  <div className="mt-2 font-bold">상담 시술: 컷트</div>
                </div>
                <div className="mt-6">
                  <p className="mb-3 text-base">현재</p>
                  <div className="flex flex-row space-x-3">
                    <div className="relative h-52 w-52">
                      <Image
                        src="/images/hair3.jpg"
                        alt="consult"
                        quality={100}
                        fill
                      />
                    </div>
                    <div className="relative h-52 w-52">
                      <Image
                        src="/images/hair2.jpg"
                        alt="consult"
                        quality={100}
                        fill
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <p className="my-3 text-base">원하는 스타일</p>
                  <div className="flex flex-row space-x-3">
                    <div className="relative h-52 w-52">
                      <Image
                        src="/images/hair4.jpg"
                        alt="consult"
                        quality={100}
                        fill
                      />
                    </div>
                    <div className="relative h-52 w-52">
                      <Image
                        src="/images/hair5.jpg"
                        alt="consult"
                        quality={100}
                        fill
                      />
                    </div>
                  </div>
                </div>
                <TextareaAutosize
                  minRows={4}
                  className="mt-3 w-full resize-none border border-solid border-gray-300 px-2 py-2"
                  placeholder="내용을 입력해주세요."
                />
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
