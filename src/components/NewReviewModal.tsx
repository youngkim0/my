/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import {
  Fragment,
  type SetStateAction,
  type Dispatch,
  useState,
  useRef,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";
import type { ClientConsult } from "@prisma/client";
import { format } from "date-fns";
import { api } from "~/utils/api";

export default function NewReviewModal({
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

  const [image, setImage] = useState<string>("");
  const fileRef = useRef<HTMLInputElement>(null);

  const addReview = api.customer.addNewReview.useMutation();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const target = e.currentTarget;
      const file = target.files![0];
      const formData = new FormData();
      formData.append("file", file!);
      formData.append("upload_preset", "t3yt1oxa");
      fetch("https://api.cloudinary.com/v1_1/dzxtjyhmk/upload", {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then(async (res) => {
          setImage(res.secure_url);
        })
        .catch((err) => console.log(err));
    }
  };

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
                        src={consult.front1}
                        alt="consult"
                        quality={100}
                        fill
                      />
                    </div>
                    <div className="relative h-52 w-52">
                      <Image
                        src={consult.side1}
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
                        src={consult.front2}
                        alt="consult"
                        quality={100}
                        fill
                      />
                    </div>
                    <div className="relative h-52 w-52">
                      <Image
                        src={consult.side2}
                        alt="consult"
                        quality={100}
                        fill
                      />
                    </div>
                  </div>
                </div>
                <p className="mb-3 mt-5 text-base">디자이너 답변</p>

                <div className="mb-3 rounded-md bg-[#ececec] px-3 py-3 text-sm">
                  {consult.reply}
                </div>
                <p className="mb-3 mt-5 text-base">리뷰 작성</p>
                <input
                  type="file"
                  hidden
                  ref={fileRef}
                  onChange={(e) => {
                    if (e.target.files) {
                      handleImageChange(e);
                    }
                  }}
                />
                <div
                  className="relative flex h-[150px] w-1/2 cursor-pointer flex-col items-center justify-center rounded-md bg-[#ececec]"
                  onClick={() => {
                    fileRef.current?.click();
                  }}
                >
                  {image !== "" ? (
                    <Image src={image} alt="" fill />
                  ) : (
                    <>
                      <Image
                        src="/images/i-add.png"
                        alt=""
                        width={50}
                        height={50}
                      />
                      <span className="text-center">사진 첨부</span>
                    </>
                  )}
                </div>
                <TextareaAutosize
                  minRows={4}
                  className="mt-3 w-full resize-none rounded-md bg-[#ececec] px-3 py-3"
                  placeholder="리뷰를 입력해주세요. "
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
                <div className="mt-4">
                  <button
                    type="button"
                    className="mb-4 inline-flex w-full justify-center rounded-full bg-[#2d2d2d] px-3 py-3  text-sm text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={async () => {
                      await addReview.mutateAsync({
                        clientID: consult.clientID,
                        userID: consult.userID,
                        consultID: consult.id,
                        review: text,
                        image,
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
