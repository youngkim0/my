import {
  Fragment,
  type SetStateAction,
  type Dispatch,
  useState,
  useRef,
} from "react";
import { Dialog, Transition } from "@headlessui/react";
import TextareaAutosize from "react-textarea-autosize";
import { format } from "date-fns";
import Image from "next/image";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import EditCustomerModal from "./EditCustomerModal";

export default function MemoModal({
  open,
  setOpen,
  id,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  id: string;
}) {
  const { data: session } = useSession();
  const [category, setCategory] = useState<string>("memo");
  const [memoText, setMemoText] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const util = api.useUtils();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [onCloseFake, setOnCloseFake] = useState<boolean>(false);

  const customerInfo = api.customer.getCustomerInfo.useQuery(
    {
      id: id,
    },
    {
      enabled: !!id,
    },
  );
  const customerMemo = api.customer.getCustomerMemo.useQuery(
    {
      userID: session?.user?.name ?? "",
      clientID: id,
    },
    {
      enabled: !!id && !!session?.user?.name,
    },
  );
  const addMemo = api.customer.addCustomerMemo.useMutation({
    onSuccess: async () => {
      await util.customer.getCustomerMemo.invalidate();
    },
  });
  const deleteCustomer = api.customer.deleteCustomer.useMutation({
    onSuccess: async () => {
      await util.customer.getCustomerList.invalidate({
        id: session?.user.name,
      });
      await util.customer.getCustomerListByID.invalidate({
        id: session?.user.id,
      });
    },
  });

  if (!customerInfo.data) return <></>;

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[2000]" onClose={setOnCloseFake}>
        {editOpen && (
          <EditCustomerModal
            setOpen={setEditOpen}
            open={editOpen}
            customerID={id}
          />
        )}
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
                  <button type="button" onClick={() => setOpen(false)}>
                    <Image
                      src="/images/i-close.png"
                      alt=""
                      width={30}
                      height={30}
                    />
                  </button>
                </div>
                <div className="text-sm">
                  <div className="mb-2 text-base font-bold">고객 정보</div>
                  <div className="flex flex-row space-x-3 text-base">
                    <span>
                      {customerInfo.data.name} {customerInfo.data.gender}
                    </span>
                    <span>|</span>
                    <span>
                      {new Date().getFullYear() -
                        parseInt(customerInfo.data.birth.slice(0, 4))}
                      세
                    </span>
                    <span>|</span>
                    <span>
                      {customerInfo.data.birth.slice(0, 4) +
                        "." +
                        customerInfo.data.birth.slice(4, 6) +
                        "." +
                        customerInfo.data.birth.slice(6)}
                    </span>
                  </div>
                  <div>
                    <span>
                      {customerInfo.data.phoneNumber.slice(0, 3) +
                        "-" +
                        customerInfo.data.phoneNumber.slice(3, 7) +
                        "-" +
                        customerInfo.data.phoneNumber.slice(7)}
                    </span>
                    <span
                      className="ml-10 cursor-pointer text-blue-800"
                      onClick={() => setEditOpen(true)}
                    >
                      수정
                    </span>
                    <span
                      className="ml-5 cursor-pointer text-red-800"
                      onClick={async () => {
                        await deleteCustomer.mutateAsync({
                          id: id,
                        });
                        setOpen(false);
                      }}
                    >
                      삭제
                    </span>
                  </div>
                  <div className="mt-4">
                    방문경로: {customerInfo.data.visitPath}
                  </div>
                  <div className="mt-3">
                    모발굵기: {customerInfo.data.hairThickness}
                  </div>
                  <div className="mt-3">
                    모발종류: {customerInfo.data.hairType}
                  </div>

                  <div className="mt-3">
                    <p>최근6개월 내 시술 경험</p> 펌:{" "}
                    {customerInfo.data.hairFerm}, 염색:{" "}
                    {customerInfo.data.hairDye}, 클리닉:{" "}
                    {customerInfo.data.hairClinic}
                  </div>
                  <div className="mt-3">
                    관심 있는 시술:{" "}
                    {customerInfo.data.interestService.map((item, index) => (
                      <span className="mr-2">
                        {item}
                        {index !== customerInfo.data!.interestService.length - 1
                          ? ","
                          : ""}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <p>헤어스타일에서 중요하게 생각하는 부분:</p>
                    {customerInfo.data.importantHair.map((item, index) => (
                      <span className="mr-2">
                        {item}
                        {index !== customerInfo.data!.importantHair.length - 1
                          ? ","
                          : ""}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <p>고객이 추구하는 스타일 컨셉:</p>
                    {customerInfo.data.styleConcept.map((item, index) => (
                      <span className="mr-2">
                        {item}
                        {index !== customerInfo.data!.styleConcept.length - 1
                          ? ","
                          : ""}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <p>홈케어시 불편한 사항:</p>
                    {customerInfo.data.important.map((item, index) => (
                      <span className="mr-2">
                        {item}
                        {index !== customerInfo.data!.important.length - 1
                          ? ","
                          : ""}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    두피 유형: {customerInfo.data.scalpType}
                  </div>
                  <div className="mt-3">비듬: {customerInfo.data.dandruff}</div>
                  <div className="mt-3">탈모: {customerInfo.data.hairLoss}</div>
                  <div className="mt-3">
                    민감성 두피: {customerInfo.data.sensitiveScalp}
                  </div>
                  <div className="mt-3">
                    긴장성 두피: {customerInfo.data.tensionScalp}
                  </div>
                  <div className="mt-3 whitespace-pre-wrap">
                    <p>추가 정보:</p> {customerInfo.data.memo}
                  </div>
                </div>
                <div className="mt-6 flex flex-row space-x-3">
                  <div
                    className={`${
                      category === "memo" ? "bg-[#808DD0]" : "bg-[#2d2d2d]"
                    } w-28 cursor-pointer rounded-full px-2 py-2 text-center text-white`}
                    onClick={() => setCategory("memo")}
                  >
                    고객메모
                  </div>
                  <div
                    className={`${
                      category === "consult" ? "bg-[#808DD0]" : "bg-[#2d2d2d]"
                    } w-28 cursor-pointer rounded-full px-2 py-2 text-center text-white`}
                    onClick={() => setCategory("consult")}
                  >
                    최근상담
                  </div>
                  <div
                    className={`${
                      category === "review" ? "bg-[#808DD0]" : "bg-[#2d2d2d]"
                    } w-28 cursor-pointer rounded-full px-2 py-2 text-center text-white`}
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
                      <input
                        type="file"
                        hidden
                        ref={fileInputRef}
                        onChange={(e) => {
                          if (e.target.files) {
                            const target = e.currentTarget;
                            const file = target.files![0];
                            const formData = new FormData();
                            formData.append("file", file!);
                            formData.append("upload_preset", "t3yt1oxa");
                            fetch(
                              "https://api.cloudinary.com/v1_1/dzxtjyhmk/upload",
                              {
                                method: "POST",
                                body: formData,
                              },
                            )
                              .then((res) => res.json())
                              .then(async (res) => {
                                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
                                setImage(res.secure_url);
                              })
                              .catch((err) => console.log(err));
                          }
                        }}
                      />
                      <div
                        className="relative flex h-[200px] w-full cursor-pointer flex-col items-center space-y-2 bg-gray-200 py-9"
                        onClick={() => {
                          if (fileInputRef.current) {
                            fileInputRef.current.click();
                          }
                        }}
                      >
                        {image === "" ? (
                          <>
                            <Image
                              src="/images/i-add.png"
                              alt="consult"
                              quality={100}
                              height={80}
                              width={80}
                            />
                            <p>사진 첨부</p>
                          </>
                        ) : (
                          <Image src={image} alt="consult" quality={100} fill />
                        )}
                      </div>
                      <TextareaAutosize
                        minRows={4}
                        className="mt-3 w-full resize-none rounded-md bg-[#ececec] px-3 py-3"
                        placeholder="내용을 입력해주세요."
                        value={memoText}
                        onChange={(e) => setMemoText(e.target.value)}
                      />
                      <button
                        className="mt-3 w-full rounded-full bg-[#2d2d2d] px-3 py-2 text-base text-white"
                        onClick={async () => {
                          await addMemo.mutateAsync({
                            customerID: id,
                            userID: session?.user?.name ?? "",
                            memo: memoText,
                            image,
                          });
                          setMemoText("");
                        }}
                      >
                        메모 저장
                      </button>
                    </div>

                    <div className="mt-6">
                      {customerMemo.data
                        ?.sort(
                          (a, b) =>
                            new Date(b.createdAt).getTime() -
                            new Date(a.createdAt).getTime(),
                        )
                        .map((item) => (
                          <>
                            <div className="mt-3">
                              {format(
                                new Date(item.createdAt),
                                "yyyy년 MM월 dd일",
                              )}
                            </div>
                            {item.image !== "" && item.image !== null && (
                              <div className="relative h-60 w-full">
                                <Image
                                  src={item.image ?? ""}
                                  alt="consult"
                                  quality={100}
                                  fill
                                />
                              </div>
                            )}
                            <div className="mt-2 rounded-md bg-gray-700 px-3 py-3 text-sm text-white">
                              {item.memo}
                            </div>
                          </>
                        ))}
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

                <div className="mb-4 mt-8">
                  <button
                    type="button"
                    className="inline-flex w-full justify-center rounded-full bg-[#808DD0] px-3 py-3 text-white  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
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
