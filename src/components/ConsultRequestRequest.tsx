/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { Dispatch, SetStateAction } from "react";
import { useState, useRef } from "react";
import Image from "next/image";
import TextareaAutosize from "react-textarea-autosize";
import { api } from "~/utils/api";

type Images = {
  front1: string;
  side1: string;
  front2: string;
  side2: string;
};

const ConsultRequestRequest = ({
  setPage,
  userInfo,
}: {
  setPage: Dispatch<SetStateAction<string>>;
  userInfo: { name: string; phone: string; clientID: string; userID: string };
}) => {
  const [images, setImages] = useState<Images>({
    front1: "",
    side1: "",
    front2: "",
    side2: "",
  });
  const [memo, setMemo] = useState<string>("");
  const addNewConsult = api.customer.addCustomerConsult.useMutation();
  const front1Ref = useRef<HTMLInputElement>(null);
  const side1Ref = useRef<HTMLInputElement>(null);
  const front2Ref = useRef<HTMLInputElement>(null);
  const side2Ref = useRef<HTMLInputElement>(null);

  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    number: number,
  ) => {
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
          if (number === 1) setImages({ ...images, front1: res.secure_url });
          else if (number === 2)
            setImages({ ...images, side1: res.secure_url });
          else if (number === 3)
            setImages({ ...images, front2: res.secure_url });
          else if (number === 4)
            setImages({ ...images, side2: res.secure_url });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="px-3">
      <div className="text-sm">
        <div className="mt-7 text-lg font-bold tracking-wide">
          {userInfo.name}님을 위해 최선을 다 하겠습니다.
        </div>
        <div className="mb-1 mt-4 font-bold">마지막 상담일</div>
        <div>2023년 12월 3일</div>
        {/* <div className="mb-1 mt-6 font-bold">마지막 시술 상담 </div>
        <div>컷트 & 클리닉</div>
        <div className="mb-1 mt-6 font-bold">상담 시술</div>
        <div>컷트</div> */}
      </div>
      <input
        type="file"
        hidden
        ref={front1Ref}
        onChange={(e) => {
          if (e.target.files) {
            handleImageChange(e, 1);
          }
        }}
      />
      <input
        type="file"
        hidden
        ref={side1Ref}
        onChange={(e) => {
          if (e.target.files) {
            handleImageChange(e, 2);
          }
        }}
      />
      <input
        type="file"
        hidden
        ref={front2Ref}
        onChange={(e) => {
          if (e.target.files) {
            handleImageChange(e, 3);
          }
        }}
      />
      <input
        type="file"
        hidden
        ref={side2Ref}
        onChange={(e) => {
          if (e.target.files) {
            handleImageChange(e, 4);
          }
        }}
      />

      <div className="mt-6">
        <p className="mb-3 text-base font-bold">현재 스타일</p>
        <div className="flex flex-row space-x-3 pr-4">
          <div
            className="relative flex h-[150px] w-1/2 cursor-pointer flex-col items-center justify-center rounded-md bg-[#ececec]"
            onClick={() => {
              front1Ref.current?.click();
            }}
          >
            {images.front1 !== "" ? (
              <Image src={images.front1} alt="" fill />
            ) : (
              <>
                <Image src="/images/i-add.png" alt="" width={50} height={50} />
                <span className="text-center">정면</span>
              </>
            )}
          </div>
          <div
            className="relative flex h-[150px] w-1/2 cursor-pointer flex-col items-center justify-center rounded-md bg-[#ececec]"
            onClick={() => {
              side1Ref.current?.click();
            }}
          >
            {images.side1 !== "" ? (
              <Image src={images.side1} alt="" fill />
            ) : (
              <>
                <Image src="/images/i-add.png" alt="" width={50} height={50} />
                <span className="text-center">측면</span>
              </>
            )}
          </div>
        </div>
      </div>
      <div>
        <p className="my-3 text-base font-bold">원하시는 스타일</p>
        <div className="flex flex-row items-center space-x-3 pr-4">
          <div
            className="relative flex h-[150px] w-1/2 cursor-pointer flex-col items-center justify-center rounded-md bg-[#ececec]"
            onClick={() => {
              front2Ref.current?.click();
            }}
          >
            {images.front2 !== "" ? (
              <Image src={images.front2} alt="" fill />
            ) : (
              <>
                <Image src="/images/i-add.png" alt="" width={50} height={50} />
                <span className="text-center">정면</span>
              </>
            )}
          </div>
          <div
            className="relative flex h-[150px] w-1/2 cursor-pointer flex-col items-center justify-center rounded-md bg-[#ececec]"
            onClick={() => {
              side2Ref.current?.click();
            }}
          >
            {images.side2 !== "" ? (
              <Image src={images.side2} alt="" fill />
            ) : (
              <>
                <Image src="/images/i-add.png" alt="" width={50} height={50} />
                <span className="text-center">측면</span>
              </>
            )}
          </div>
        </div>
      </div>
      <TextareaAutosize
        minRows={4}
        className="mt-3 w-full resize-none rounded-md bg-[#ececec] px-4 py-4 placeholder:text-sm placeholder:font-thin placeholder:tracking-wide placeholder:text-[#a3a3a3]"
        placeholder="내용을 입력해주세요."
        value={memo}
        onChange={(e) => setMemo(e.target.value)}
      />
      <div className="mt-4">
        <button
          type="button"
          className="inline-flex w-full justify-center rounded-full bg-[#2D2D2D] px-3 py-4 text-sm font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          onClick={async () => {
            await addNewConsult.mutateAsync({
              customerID: userInfo.clientID,
              userID: userInfo.userID,
              front1: images.front1,
              side1: images.side1,
              front2: images.front2,
              side2: images.side2,
              memo,
            });
            alert("상담 신청이 완료되었습니다.");
            setPage("main");
          }}
        >
          저장
        </button>
      </div>

      <div className="mt-4 flex flex-row space-x-3">
        <button
          type="button"
          className="inline-flex w-1/2 justify-center rounded-full  border border-solid border-[#2d2d2d] px-3 py-3 text-sm font-semibold text-[#2d2d2d] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={() => setPage("main")}
        >
          뒤로가기
        </button>
        <button
          type="button"
          className="inline-flex w-1/2 justify-center rounded-full bg-[#808DD0] px-3 py-3 text-sm  text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"
          onClick={() => setPage("check")}
        >
          상담확인
        </button>
      </div>
    </div>
  );
};

export default ConsultRequestRequest;
