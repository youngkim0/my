import { Fragment, type SetStateAction, type Dispatch, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";
import type { ClientConsult } from "@prisma/client";
import { format } from "date-fns";
import { api } from "~/utils/api";

export default function ConsultModal({
  open,
  setOpen,
  customerName,
  consult,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  customerName: string;
  consult: ClientConsult;
}) {
  const [text, setText] = useState<string>("");
  const util = api.useUtils();

  const replyConsult = api.customer.replyCustomerConsult.useMutation({
    onSuccess: async () => {
      await util.customer.getCustomerConsultList.invalidate();
    },
  });

  console.log(consult);

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
                    {customerName}님을 위해 최선을 다 하겠습니다.
                  </div>
                  <div>
                    상담 신청일:{" "}
                    {format(new Date(consult.createdAt), "yyyy년 MM월 dd일")}
                  </div>
                  <div>마지막 시술 상담: ? </div>
                  <div className="mt-2 font-bold">상담 시술: ?</div>
                </div>
                <div className="mt-6">
                  <p className="mb-3 text-base">현재</p>
                  <div className="flex flex-row space-x-3">
                    <div className="relative h-52 w-52">
                      <Image
                        src={
                          consult.front1 !== ""
                            ? consult.front1
                            : "/images/no-image.jpg"
                        }
                        alt="consult"
                        quality={100}
                        fill
                      />
                    </div>
                    <div className="relative h-52 w-52">
                      <Image
                        src={
                          consult.side1 !== ""
                            ? consult.side1
                            : "/images/no-image.jpg"
                        }
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
                        src={
                          consult.front2 !== ""
                            ? consult.front2
                            : "/images/no-image.jpg"
                        }
                        alt="consult"
                        quality={100}
                        fill
                      />
                    </div>
                    <div className="relative h-52 w-52">
                      <Image
                        src={
                          consult.side2 !== ""
                            ? consult.side2
                            : "/images/no-image.jpg"
                        }
                        alt="consult"
                        quality={100}
                        fill
                      />
                    </div>
                  </div>
                </div>
                <p className="my-3 text-base">상담 내용</p>

                <div className="my-3 rounded-md bg-gray-200 px-3 py-3">
                  {consult.memo}
                </div>
                <TextareaAutosize
                  minRows={4}
                  className="mt-3 w-full resize-none rounded-md bg-[#ececec] px-3 py-3"
                  placeholder="답변을 입력해주세요. "
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="mt-4">
                  <button
                    type="button"
                    className="mb-4 inline-flex w-full justify-center rounded-full bg-[#2d2d2d] px-3 py-3  text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={async () => {
                      await replyConsult.mutateAsync({
                        consultID: consult.id,
                        reply: text,
                      });
                      setOpen(false);
                    }}
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
