import { Fragment, type SetStateAction, type Dispatch } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";

export default function ReviewModal({
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
              <Dialog.Panel className="relative h-[520px] w-full max-w-md transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:max-w-[400px]">
                <div className="relative h-60 w-full">
                  <Image
                    src="/images/sample_hair.png"
                    fill
                    alt="review"
                    quality={100}
                  />
                </div>
                <div className="h-44 overflow-y-auto break-keep px-2 py-5 text-sm">
                  이 미용실은 정말로 최고예요! 전문적이고 친절한 스태프들이 항상
                  웃음으로 맞이해줍니다. 최신 트렌드에 맞춘 스타일링에 정말
                  만족했고, 특히 손님을 위한 세심한 배려가 눈에 띕니다. 깨끗하고
                  아늑한 분위기도 좋아 자주 방문하게 되었어요. 다양한 서비스와
                  훌륭한 경험을 제공해주셔서 감사합니다!
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-md bg-purple-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => setOpen(false)}
                  >
                    닫기
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
