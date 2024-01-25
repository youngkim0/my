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
import type { Clients } from "@prisma/client";
import { api } from "~/utils/api";
import { useSession } from "next-auth/react";
import EditCustomerModal from "./EditCustomerModal";

export default function MemoModal({
  open,
  setOpen,
  customerInfo,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  customerInfo: Clients;
}) {
  const { data: session } = useSession();
  const util = api.useUtils();
  const [memoText, setMemoText] = useState<string>("");
  const [editOpen, setEditOpen] = useState<boolean>(false);
  const [image, setImage] = useState<string>("");
  const inputFileRef = useRef<HTMLInputElement>(null);
  const customerMemo = api.customer.getCustomerMemo.useQuery(
    {
      clientID: customerInfo.id,
      userID: session?.user.name ?? "",
    },
    {
      enabled: !!customerInfo.id && !!session?.user.name,
    },
  );

  const addMemo = api.customer.addCustomerMemo.useMutation({
    onSuccess: async () => {
      await util.customer.getCustomerMemo.invalidate({
        clientID: customerInfo.id,
        userID: session?.user.name ?? "",
      });
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

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-[2000]" onClose={setOpen}>
        {editOpen && (
          <EditCustomerModal
            setOpen={setEditOpen}
            open={editOpen}
            customerID={customerInfo.id}
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
                      {customerInfo.name} {customerInfo.gender}
                    </span>
                    <span>|</span>
                    <span>
                      {new Date().getFullYear() -
                        parseInt(customerInfo.birth.slice(0, 4))}
                      세
                    </span>
                    <span>|</span>
                    <span>
                      {customerInfo.birth.slice(0, 4) +
                        "." +
                        customerInfo.birth.slice(4, 6) +
                        "." +
                        customerInfo.birth.slice(6)}
                    </span>
                  </div>
                  <div>
                    <span>
                      {customerInfo.phoneNumber.slice(0, 3) +
                        "-" +
                        customerInfo.phoneNumber.slice(3, 7) +
                        "-" +
                        customerInfo.phoneNumber.slice(7)}
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
                          id: customerInfo.id,
                        });
                        setOpen(false);
                      }}
                    >
                      삭제
                    </span>
                  </div>
                  <div className="mt-4">방문경로: {customerInfo.visitPath}</div>
                  <div className="mt-3">
                    모발굵기: {customerInfo.hairThickness}
                  </div>
                  <div className="mt-3">모발종류: {customerInfo.hairType}</div>

                  <div className="mt-3">
                    <p>최근6개월 내 시술 경험</p> 펌: {customerInfo.hairFerm},
                    염색: {customerInfo.hairDye}, 클리닉:{" "}
                    {customerInfo.hairClinic}
                  </div>
                  <div className="mt-3">
                    관심 있는 시술: 관심 있는 시술:{" "}
                    {customerInfo.interestService.map((item, index) => (
                      <span className="mr-2">
                        {item}
                        {index !== customerInfo.interestService.length - 1
                          ? ","
                          : ""}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <p>헤어스타일에서 중요하게 생각하는 부분:</p>
                    {customerInfo.importantHair.map((item, index) => (
                      <span className="mr-2">
                        {item}
                        {index !== customerInfo.importantHair.length - 1
                          ? ","
                          : ""}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <p>고객이 추구하는 스타일 컨셉:</p>
                    {customerInfo.styleConcept.map((item, index) => (
                      <span className="mr-2">
                        {item}
                        {index !== customerInfo.styleConcept.length - 1
                          ? ","
                          : ""}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    <p>고객이 중요하게 생각하는 것:</p>
                    {customerInfo.important.map((item, index) => (
                      <span className="mr-2">
                        {item}
                        {index !== customerInfo.important.length - 1 ? "," : ""}
                      </span>
                    ))}
                  </div>
                  <div className="mt-3">
                    두피 유형: {customerInfo.scalpType}
                  </div>
                  <div className="mt-3">비듬: {customerInfo.dandruff}</div>
                  <div className="mt-3">탈모: {customerInfo.hairLoss}</div>
                  <div className="mt-3">
                    민감성 두피: {customerInfo.sensitiveScalp}
                  </div>
                  <div className="mt-3">
                    긴장성 두피: {customerInfo.tensionScalp}
                  </div>
                  <div className="mt-3 whitespace-pre-wrap">
                    <p>추가 정보:</p> {customerInfo.memo}
                  </div>
                </div>

                <div className="mt-6">
                  <p className="mb-3 text-base font-bold">고객 메모</p>
                  <div>{format(new Date(), "yyyy년 MM월 dd일")}</div>
                  <input
                    type="file"
                    hidden
                    ref={inputFileRef}
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
                      if (inputFileRef.current) {
                        inputFileRef.current.click();
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
                        customerID: customerInfo.id,
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
                          {format(new Date(item.createdAt), "yyyy년 MM월 dd일")}
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
