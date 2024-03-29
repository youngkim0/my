import { Fragment, type SetStateAction, type Dispatch } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { api } from "~/utils/api";

export default function ReviewModal({
  open,
  setOpen,
  reviewID,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  reviewID: string;
}) {
  const review = api.account.getReviewByID.useQuery({
    reviewID: reviewID,
  });

  if (!review.data) return <></>;
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
                <div
                  className={`relative h-60 w-full bg-contain bg-center bg-no-repeat`}
                  style={{ backgroundImage: `url(${review.data.image})` }}
                >
                  {/* <Image
                    src={review.data.image}
                    fill
                    alt="review"
                    quality={100}
                  /> */}
                </div>
                <div className="h-44 overflow-y-auto break-keep px-2 py-5 text-sm">
                  {review.data.review}
                </div>
                <div className="mt-4">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-full bg-[#2d2d2d] px-3 py-3 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
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
