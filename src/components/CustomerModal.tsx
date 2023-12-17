import { Fragment, type SetStateAction, type Dispatch, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import TextareaAutosize from "react-textarea-autosize";
import { format } from "date-fns";
import Image from "next/image";

export default function MemoModal({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [category, setCategory] = useState<string>("memo");
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
                  <div className="mb-2 text-base font-bold">고객 정보</div>
                  <div className="flex flex-row space-x-3">
                    <span>강연식 남</span>
                    <span>|</span>
                    <span>28세</span>
                    <span>|</span>
                    <span>97.12.11</span>
                  </div>
                  <div>
                    <span>010-1232-0022</span>
                    <span className="ml-10 cursor-pointer text-blue-800">
                      수정
                    </span>
                    <span className="ml-5 cursor-pointer text-red-800">
                      삭제
                    </span>
                  </div>
                  <div className="mt-6">
                    <div>가는모발 / 직모</div>
                    <div>최근 6개월 내 펌 1회, 염색 1회, 클리닉 0회</div>
                  </div>
                  <div className="mt-6">
                    <div>
                      커트에 관심있고 길이와 컬러를 중요하게 생 각하며,
                      어려보이고, 고급스러운 스타일을 추 구. 헤어스타일에서
                      손질이 어렵다.
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-row space-x-5">
                  <div
                    className={`${
                      category === "memo" ? "bg-purple-700" : "bg-gray-600"
                    } w-28 cursor-pointer rounded-md px-2 py-2 text-center text-white`}
                    onClick={() => setCategory("memo")}
                  >
                    고객메모
                  </div>
                  <div
                    className={`${
                      category === "consult" ? "bg-purple-700" : "bg-gray-600"
                    } w-28 cursor-pointer rounded-md px-2 py-2 text-center text-white`}
                    onClick={() => setCategory("consult")}
                  >
                    최근상담
                  </div>
                  <div
                    className={`${
                      category === "review" ? "bg-purple-700" : "bg-gray-600"
                    } w-28 cursor-pointer rounded-md px-2 py-2 text-center text-white`}
                    onClick={() => setCategory("review")}
                  >
                    리뷰
                  </div>
                </div>
                {category === "memo" && (
                  <>
                    <div className="mt-6">
                      <p className="mb-3 text-base font-bold">고객 메모</p>
                      <div>{format(new Date(), "yyyy년 MM월 dd일")}</div>
                      <TextareaAutosize
                        minRows={4}
                        className="mt-3 w-full resize-none border border-solid border-gray-300 px-2 py-2"
                        placeholder="내용을 입력해주세요."
                      />
                      <button className="mt-3 w-full rounded-full bg-purple-500 px-3 py-2 text-base text-white">
                        메모 저장
                      </button>
                    </div>

                    <div className="mt-6">
                      <div>2023년 11월 31일</div>
                      <div className="mt-2 bg-blue-800 px-2 py-2 text-sm text-white">
                        {`
                      머리가 많이 상해서, 클리닉 서비스로 한번 진행.
내일 여자친구랑 데이트 간다고함.
기존 컬러가 많이 지루하다함.
사이드 2호로 말아서 뽀글함.
두피에 염색약이 안지워져있고 머리가 숱이 장난 아
니게 많음. 말이 많음. 기빨린날임.
                    `}
                      </div>
                    </div>
                  </>
                )}

                {category === "consult" && (
                  <>
                    <div className="text-sm">
                      <div className="mb-2 mt-6 font-bold">
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
                    <div className="my-2 text-sm">
                      "고객님과의 소중한 컨설팅에서 얼굴형과 개성을 고려하여
                      특별한 레이어드컷을 제안했습니다. 색다른 컬러와 헤어 케어
                      꿀팁으로 더욱 돋보이는 아름다움을 찾아드릴게요. 함께한
                      시간이 뜻깊고 행복했습니다!"
                    </div>
                  </>
                )}

                {category === "review" && (
                  <div className="my-6">
                    <div className="relative h-60 w-full">
                      <Image
                        src="/images/sample_hair.png"
                        fill
                        alt="review"
                        quality={100}
                      />
                    </div>
                    <div className="h-44 overflow-y-auto break-keep px-2 py-5 text-sm">
                      이 미용실은 정말로 최고예요! 전문적이고 친절한 스태프들이
                      항상 웃음으로 맞이해줍니다. 최신 트렌드에 맞춘 스타일링에
                      정말 만족했고, 특히 손님을 위한 세심한 배려가 눈에 띕니다.
                      깨끗하고 아늑한 분위기도 좋아 자주 방문하게 되었어요.
                      다양한 서비스와 훌륭한 경험을 제공해주셔서 감사합니다!
                    </div>
                  </div>
                )}

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
